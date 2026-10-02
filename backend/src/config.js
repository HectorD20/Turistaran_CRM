function integer(value, fallback, name, maximum) {
  const raw = String(value ?? fallback);
  const parsed = Number(raw);
  if (!/^\d+$/.test(raw) || !Number.isSafeInteger(parsed) || parsed < 1 || parsed > maximum) {
    throw new Error(`${name} debe ser un entero entre 1 y ${maximum}.`);
  }
  return parsed;
}

function required(value, name) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`Falta ${name}. Configura backend/.env antes de arrancar.`);
  }
  return value.trim();
}

export function loadConfig(env = process.env) {
  const ssl = env.PGSSL ?? 'false';
  if (ssl !== 'true' && ssl !== 'false') {
    throw new Error('PGSSL debe ser true o false.');
  }

  return {
    host: env.HOST?.trim() || '127.0.0.1',
    port: integer(env.PORT, 3001, 'PORT', 65535),
    database: {
      host: env.PGHOST?.trim() || '127.0.0.1',
      port: integer(env.PGPORT, 5432, 'PGPORT', 65535),
      database: required(env.PGDATABASE, 'PGDATABASE'),
      user: required(env.PGUSER, 'PGUSER'),
      password: env.PGPASSWORD ?? '',
      ssl: ssl === 'true' ? { rejectUnauthorized: true } : false,
      max: 10,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      query_timeout: 5000,
      statement_timeout: 5000,
    },
  };
}
