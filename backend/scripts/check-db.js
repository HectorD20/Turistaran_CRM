import { loadConfig } from '../src/config.js';
import { checkDatabase, createDatabase } from '../src/database.js';

let database;
try {
  database = createDatabase(loadConfig().database);
  await checkDatabase(database);
  console.log('Conexion PostgreSQL verificada (SELECT 1).');
} catch (error) {
  if (database) {
    console.error('No se pudo conectar a PostgreSQL. Revisa backend/.env.', {
      code: error.code ?? 'DB_ERROR',
    });
  } else {
    console.error(error.message);
  }
  process.exitCode = 1;
} finally {
  await database?.end();
}
