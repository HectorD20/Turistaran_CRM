# Backend de Turistarán CRM — T-02

Servidor Express con pool de conexiones PostgreSQL. Requiere Node.js 24 o superior y PostgreSQL. Las entidades y migraciones corresponden a T-03; el login corresponde a T-04.

## Preparar y arrancar (PowerShell)

Desde la raíz del repositorio:

```powershell
cd backend
npm.cmd ci
```

Si aún no hay base de desarrollo, crear una instancia local con el PostgreSQL instalado:

```powershell
npm.cmd run db:local:setup
```

Esto inicia una instancia independiente en `127.0.0.1:55432`, con sus datos en `backend/.local/postgres`, autenticación por contraseña SCRAM y credenciales aleatorias. Crea la base `turistaran_crm`, su usuario `turistaran_app` sin privilegios de administrador y `.env` si todavía no existe. No modifica el servicio PostgreSQL ya instalado ni crea las tablas del CRM. `.local` y `.env` están excluidos de Git. Los datos locales se conservan para las siguientes sesiones; no se deben publicar ni sincronizar como código.

El script busca las herramientas en `C:\Program Files\PostgreSQL\18\bin` en Windows. Si están en otro lugar, establecer `$env:PG_BIN_DIR` con esa ruta antes de ejecutarlo. Es necesario que el puerto 55432 esté libre. La instancia se administra con:

```powershell
npm.cmd run db:local:start
npm.cmd run db:local:stop
```

Si ya se cuenta con una base externa, copiar el ejemplo **solo si no existe `.env`**:

```powershell
Copy-Item .env.example .env
```

Editar `.env` con el host, puerto, base, usuario y contraseña reales. `.env` y `node_modules` están excluidos de Git. El proceso lee `.env` al arrancar; las variables del entorno tienen prioridad. Los valores del ejemplo son orientativos y no crean una base ni un usuario. Si `.env` ya existe, conservarlo y editarlo en lugar de copiar el ejemplo encima.

```powershell
npm.cmd run db:check
npm.cmd start
```

El servidor comprueba `SELECT 1` antes de escuchar en `http://127.0.0.1:3001`. Si la conexión falla, termina con código 1 y no anuncia que está listo. Para desarrollo con recarga automática: `npm.cmd run dev`. Ctrl+C cierra el servidor y el pool. Cambiar `HOST` o `PORT` en `.env` si se necesita otra dirección.

## Comprobar el servidor

En otra terminal:

```powershell
Invoke-RestMethod http://127.0.0.1:3001/api/health
Invoke-RestMethod http://127.0.0.1:3001/api/health/ready
```

- `GET /api/health`: estado del proceso, HTTP 200.
- `GET /api/health/ready`: consulta PostgreSQL en cada solicitud; HTTP 200 con `database: connected` o HTTP 503 si la conexión falla.
- Las rutas desconocidas devuelven HTTP 404 en JSON. Los errores HTTP no incluyen datos de conexión.

La conexión local usa `PGSSL=false`. Para un servidor con TLS y certificado válido, usar `PGSSL=true`; se verifica el certificado.

## Pruebas

```powershell
npm.cmd test
```

Las pruebas HTTP usan una conexión simulada y verifican disponibilidad, caída de base de datos y manejo de errores. No sustituyen `db:check` y la comprobación del servidor con una base real, necesarias para dar T-02 por completada.

Referencias de implementación: [Express](https://expressjs.com/en/starter/installing/) y [node-postgres](https://node-postgres.com/features/connecting).
