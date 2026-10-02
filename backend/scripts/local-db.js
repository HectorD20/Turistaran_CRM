import { randomBytes } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import pg from 'pg';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const local = join(root, '.local');
const data = join(local, 'postgres');
const settingsFile = join(local, 'postgres.json');
const passwordFile = join(local, 'init-password');
const envFile = join(root, '.env');
const action = process.argv[2];
const bin = process.env.PG_BIN_DIR || (process.platform === 'win32'
  ? 'C:\\Program Files\\PostgreSQL\\18\\bin' : '');

function run(tool, args, { allowStopped = false } = {}) {
  const executable = bin ? join(bin, `${tool}${process.platform === 'win32' ? '.exe' : ''}`) : tool;
  // PostgreSQL permanece en segundo plano; no heredar pipes que bloqueen spawnSync en Windows.
  const result = spawnSync(executable, args, { stdio: 'ignore', windowsHide: true, timeout: 60000 });
  if (allowStopped && result.status === 3) return false;
  if (result.error || result.status !== 0) {
    throw new Error(`Fallo ${tool}. Revisa PG_BIN_DIR y backend/.local/postgres.log. Codigo: ${result.error?.code || result.status}`);
  }
  return true;
}

function start() {
  if (!run('pg_ctl', ['-D', data, 'status'], { allowStopped: true })) {
    run('pg_ctl', ['-D', data, '-l', join(local, 'postgres.log'),
      '-o', '-h 127.0.0.1 -p 55432', '-w', '-t', '30', 'start']);
  }
}

try {
  if (!['setup', 'start', 'stop'].includes(action)) {
    throw new Error('Uso: node scripts/local-db.js setup|start|stop');
  }
  if (action !== 'setup') {
    if (!existsSync(join(data, 'PG_VERSION'))) {
      throw new Error('Primero ejecuta npm run db:local:setup.');
    }
    if (action === 'start') start();
    else if (run('pg_ctl', ['-D', data, 'status'], { allowStopped: true })) {
      run('pg_ctl', ['-D', data, '-m', 'fast', '-w', '-t', '30', 'stop']);
    }
    console.log(`PostgreSQL local: ${action === 'start' ? 'iniciado' : 'detenido'}.`);
  } else {
    mkdirSync(local, { recursive: true });
    let settings;
    if (existsSync(settingsFile)) {
      settings = JSON.parse(readFileSync(settingsFile, 'utf8'));
    } else {
      if (existsSync(join(data, 'PG_VERSION'))) {
        throw new Error('Ya existe un cluster sin su configuracion local. No se modifica.');
      }
      settings = {
        adminPassword: randomBytes(32).toString('hex'),
        appPassword: randomBytes(32).toString('hex'),
      };
      writeFileSync(settingsFile, JSON.stringify(settings), { flag: 'wx', mode: 0o600 });
    }
    if (![settings.adminPassword, settings.appPassword].every((value) => /^[a-f0-9]{64}$/.test(value))) {
      throw new Error('Configuracion local invalida. No se modifica el cluster.');
    }
    if (!existsSync(join(data, 'PG_VERSION'))) {
      writeFileSync(passwordFile, settings.adminPassword, { mode: 0o600 });
      try {
        run('initdb', ['-D', data, '-U', 'turistaran_admin', '--pwfile', passwordFile,
          '--auth-host=scram-sha-256', '--auth-local=scram-sha-256', '--encoding=UTF8']);
      } finally {
        if (existsSync(passwordFile)) unlinkSync(passwordFile);
      }
    }
    start();

    const client = new pg.Client({
      host: '127.0.0.1', port: 55432, database: 'postgres',
      user: 'turistaran_admin', password: settings.adminPassword,
      ssl: false, connectionTimeoutMillis: 5000,
    });
    try {
      await client.connect();
      const role = await client.query('SELECT 1 FROM pg_roles WHERE rolname = $1', ['turistaran_app']);
      if (!role.rowCount) {
        await client.query(`CREATE ROLE turistaran_app LOGIN PASSWORD '${settings.appPassword}' NOSUPERUSER NOCREATEDB NOCREATEROLE`);
      }
      const database = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', ['turistaran_crm']);
      if (!database.rowCount) {
        await client.query('CREATE DATABASE turistaran_crm OWNER turistaran_app');
      }
    } finally {
      await client.end();
    }

    if (!existsSync(envFile)) {
      writeFileSync(envFile, [
        'HOST=127.0.0.1', 'PORT=3001', 'PGHOST=127.0.0.1', 'PGPORT=55432',
        'PGDATABASE=turistaran_crm', 'PGUSER=turistaran_app',
        `PGPASSWORD=${settings.appPassword}`, 'PGSSL=false', '',
      ].join('\n'), { flag: 'wx', mode: 0o600 });
    }
    console.log('Base turistaran_crm disponible en 127.0.0.1:55432; usuario turistaran_app.');
    console.log('Credenciales locales en .env y .local; ambos estan excluidos de Git. Un .env existente se conserva.');
  }
} catch (error) {
  // Los errores PostgreSQL pueden contener SQL o detalles de conexion; solo mostrar su codigo.
  console.error(error instanceof pg.DatabaseError ? `Error PostgreSQL (${error.code}).` : error.message);
  process.exitCode = 1;
}
