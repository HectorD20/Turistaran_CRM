import assert from 'node:assert/strict';
import { once } from 'node:events';
import test from 'node:test';
import { createApp } from '../src/app.js';
import { loadConfig } from '../src/config.js';

async function serve(t, database) {
  const server = createApp({ database }).listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  }));
  return `http://127.0.0.1:${server.address().port}`;
}

test('la comprobacion de disponibilidad ejecuta una consulta', async (t) => {
  let queries = 0;
  const url = await serve(t, { async query(sql) {
    assert.equal(sql, 'SELECT 1');
    queries += 1;
  } });
  const health = await fetch(`${url}/api/health`);
  assert.equal(health.status, 200);
  assert.equal(queries, 0);
  const ready = await fetch(`${url}/api/health/ready`);
  assert.equal(ready.status, 200);
  assert.deepEqual(await ready.json(), { status: 'ok', database: 'connected' });
  assert.equal(queries, 1);
});

test('una caida de PostgreSQL devuelve 503 sin revelar datos de conexion', async (t) => {
  const url = await serve(t, { async query() { throw new Error('password=secreto'); } });
  const response = await fetch(`${url}/api/health/ready`);
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { status: 'unavailable', database: 'disconnected' });
});

test('errores HTTP devuelven JSON y los cuerpos excesivos se rechazan', async (t) => {
  const url = await serve(t, { async query() {} });
  const missing = await fetch(`${url}/inexistente`);
  assert.equal(missing.status, 404);
  assert.deepEqual(await missing.json(), { error: 'not_found' });
  const invalid = await fetch(`${url}/inexistente`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{',
  });
  assert.equal(invalid.status, 400);
  assert.deepEqual(await invalid.json(), { error: 'invalid_json' });
  const large = await fetch(`${url}/inexistente`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: 'a'.repeat(110000) }),
  });
  assert.equal(large.status, 413);
});

test('la configuracion rechaza datos incompletos y puertos invalidos', () => {
  const valid = { PGDATABASE: 'test_db', PGUSER: 'test_user' };
  assert.throws(() => loadConfig({}), /PGDATABASE/);
  assert.throws(() => loadConfig({ PGDATABASE: 'test_db' }), /PGUSER/);
  for (const port of ['0', '-1', '65536', 'abc', '1.5', '']) {
    assert.throws(() => loadConfig({ ...valid, PORT: port }), /PORT/);
    assert.throws(() => loadConfig({ ...valid, PGPORT: port }), /PGPORT/);
  }
  assert.throws(() => loadConfig({ ...valid, PGSSL: 'yes' }), /PGSSL/);
  assert.equal(loadConfig(valid).host, '127.0.0.1');
  assert.equal(loadConfig(valid).database.port, 5432);
  assert.deepEqual(loadConfig({ ...valid, PGSSL: 'true' }).database.ssl, { rejectUnauthorized: true });
});
