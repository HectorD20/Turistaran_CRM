import pg from 'pg';

export function createDatabase(config) {
  const pool = new pg.Pool(config);
  pool.on('error', (error) => {
    console.error('Error en una conexion PostgreSQL inactiva.', { code: error.code ?? 'DB_ERROR' });
  });
  return pool;
}

export async function checkDatabase(database) {
  await database.query('SELECT 1');
}
