import { once } from 'node:events';
import { createApp } from './app.js';
import { loadConfig } from './config.js';
import { checkDatabase, createDatabase } from './database.js';

let database;
let server;
let stopping = false;

async function shutdown() {
  if (stopping) return;
  stopping = true;
  const deadline = setTimeout(() => process.exit(1), 10000);
  deadline.unref();
  try {
    if (server?.listening) {
      await new Promise((resolve, reject) => {
        server.close((error) => error ? reject(error) : resolve());
      });
    }
    await database?.end();
  } catch {
    console.error('No se pudo cerrar el backend correctamente.');
    process.exitCode = 1;
  } finally {
    clearTimeout(deadline);
  }
}

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);

try {
  const config = loadConfig();
  database = createDatabase(config.database);
  await checkDatabase(database);
  if (stopping) {
    await database.end();
  } else {
    server = createApp({ database }).listen(config.port, config.host);
    await once(server, 'listening');
    console.log(`Backend disponible en http://${config.host}:${config.port}; PostgreSQL conectado.`);
  }
} catch (error) {
  if (database) {
    console.error('No se pudo iniciar el backend. Revisa PostgreSQL y backend/.env.', {
      code: error.code ?? 'STARTUP_ERROR',
    });
  } else {
    console.error(error.message);
  }
  process.exitCode = 1;
  await shutdown();
}
