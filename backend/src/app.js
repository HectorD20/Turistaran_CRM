import express from 'express';
import { checkDatabase } from './database.js';

export function createApp({ database }) {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '100kb' }));

  app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok', service: 'turistaran-crm-backend' });
  });

  app.get('/api/health/ready', async (_request, response) => {
    try {
      await checkDatabase(database);
      response.json({ status: 'ok', database: 'connected' });
    } catch {
      response.status(503).json({ status: 'unavailable', database: 'disconnected' });
    }
  });

  app.use((_request, response) => {
    response.status(404).json({ error: 'not_found' });
  });

  app.use((error, _request, response, _next) => {
    if (error.type === 'entity.parse.failed') {
      return response.status(400).json({ error: 'invalid_json' });
    }
    if (error.type === 'entity.too.large') {
      return response.status(413).json({ error: 'payload_too_large' });
    }
    console.error('Error de solicitud.', { code: error.code ?? 'REQUEST_ERROR' });
    response.status(500).json({ error: 'internal_error' });
  });

  return app;
}
