# Cambios H-01 — contexto de trabajo

**Fecha:** 1 de octubre de 2026  
**Repositorio:** `HectorD20/Turistaran_CRM`  
**Rama de trabajo actual:** `codex/backend`  
**Responsable:** Héctor  
**Estado:** T-01 y T-02 terminadas y guardadas en commits locales; sin publicar en GitHub ni crear PR.

## Resumen

Se revisó el repositorio y los documentos de coordinación, se acordó con Héctor una convención para ramas y commits, y se preparó un backend inicial con Express y PostgreSQL. También se creó una base de desarrollo local para poder comprobar la conexión sin modificar el servicio PostgreSQL que ya estaba instalado. Los criterios de T-01 y T-02 se actualizaron con su evidencia.

Este trabajo **no implementa las tablas y migraciones del CRM** ni los módulos comerciales, financieros u operativos. Esas tareas siguen pendientes conforme a `TAREAS.md`.

## Punto de partida

La carpeta local inicialmente solo contenía los metadatos `.git`: no tenía archivos de trabajo, commits ni remoto configurado. Se verificó que el repositorio compartido es `https://github.com/HectorD20/Turistaran_CRM`, que su rama predeterminada es `main` y que Héctor confirmó que Carolina cuenta con permisos.

Se descargó `main` desde el commit `522e743` (`CONTEXTO DEL PROYECTO`). El repositorio ya contenía los documentos de coordinación y los archivos de referencia `app.js` e `index.html`; estos últimos no se modificaron. También existe una rama remota `Dev`; su función en la integración quedó por confirmar y no se cambió.

## Decisiones confirmadas

- **D-08:** ramas de equipo por módulo con el formato `feature/<modulo>`; nombres en minúsculas y con guiones, por ejemplo `feature/ventas` y `feature/avance-obra`.
- **D-07:** React para frontend, Node.js con Express para backend y PostgreSQL para base de datos. Héctor confirmó este stack y pidió preparar el backend.
- **Convención de commits:** `<tipo>: <descripción breve>`; se acordaron `feat:`, `fix:` y `docs:`. Agregar el ID de la tarea cuando corresponda.
- **Ramas de Codex:** `codex/<modulo-o-tarea>`. Este trabajo quedó en `codex/backend`.

Se anotaron D-07 y D-08 en la tabla de decisiones y en su registro en `PLAN.md`. La convención quedó escrita en la sección 6.1 de `CLAUDE.md`.

## Trabajo realizado

### T-01 — repositorio y convención

Quedó documentado el repositorio, el acceso a Carolina confirmado por Héctor, la convención de ramas y el formato de commits. `TAREAS.md`, `CHECKLIST_ENTREGA.md` y `ESTADO.md` se actualizaron con el avance y la evidencia.

### T-02 — backend y PostgreSQL

Se añadió `backend/` con:

- Proyecto privado ES modules para Node.js 24 o superior, Express 5.2.1 y `pg` 8.23.1. Se incluyen `package-lock.json` y comandos npm reproducibles.
- Servidor HTTP en `127.0.0.1:3001` por defecto. Antes de escuchar, verifica la conexión a PostgreSQL con `SELECT 1`.
- `GET /api/health` comprueba el estado del proceso. `GET /api/health/ready` comprueba PostgreSQL y devuelve HTTP 503 cuando la base no está disponible.
- Respuestas JSON para rutas desconocidas y errores de solicitud; no se envían mensajes de error de base de datos ni credenciales en las respuestas HTTP.
- Variables de configuración validadas. `.env.example` documenta los valores necesarios y `.env` no se versiona.
- `db:check` para verificar una configuración existente y `start` / `dev` para ejecutar el servidor.
- `backend/README.md` explica la instalación, configuración, arranque y comprobaciones.

Como no había una base de desarrollo configurada, se añadió un asistente para el PostgreSQL 18 instalado en el equipo. `db:local:setup` prepara una instancia independiente en `127.0.0.1:55432`, crea la base `turistaran_crm` y el usuario `turistaran_app`, y genera credenciales locales aleatorias. `db:local:start` y `db:local:stop` controlan esa instancia. Sus datos y credenciales viven en `backend/.local/` y `backend/.env`; ambos están excluidos de Git. El asistente conserva un `.env` si ya existía. No crea tablas del CRM ni cambia el servicio PostgreSQL instalado.

Se añadieron cuatro pruebas automatizadas para las rutas de salud, la caída de la base, los errores HTTP y la validación de configuración.

### Documentos de coordinación

Además de `CLAUDE.md` y `PLAN.md`, actualizados con D-07/D-08, se actualizaron:

- `TAREAS.md`: T-01 y T-02 marcadas completas con evidencia; 2 de 18 tareas completas.
- `CHECKLIST_ENTREGA.md`: criterios correspondientes marcados y descritos.
- `ESTADO.md`: estado corregido y registro de los avances. T-03 queda como siguiente tarea de Héctor. D-07 ya no bloquea T-05 de Carolina; D-11 sigue pendiente para esa tarea.
- `.gitignore`: excluye dependencias instaladas, `.env`, datos locales de PostgreSQL, logs y cobertura.

## Comprobaciones

El 1 de octubre de 2026 se comprobó lo siguiente:

1. `npm.cmd run db:local:setup` creó la instancia y pudo repetirse conservando sus datos y credenciales.
2. `npm.cmd run db:check` conectó a PostgreSQL 18.6 y ejecutó `SELECT 1`.
3. `npm.cmd start` arrancó el servidor con esa base; ambos endpoints de salud devolvieron respuestas correctas.
4. Al detener brevemente la instancia local, `/api/health/ready` respondió HTTP 503; después de reiniciarla, volvió a responder con la base conectada.
5. `npm.cmd test`: cuatro pruebas aprobadas, ninguna fallida. `git diff --check` no reportó errores.

La instancia de PostgreSQL local se dejó detenida tras las comprobaciones. La base y sus credenciales permanecen en el equipo para volver a arrancarla.

## Commits locales

La rama `codex/backend` contiene:

- `2a983e1` — `docs: definir convenciones y registrar T-01`
- `7b0d3bd` — `feat: preparar backend Express y PostgreSQL T-02`

Los dos commits están en el repositorio local y aún no se han publicado en GitHub. La rama actual incluye T-01 y T-02.

## Siguiente paso y pendientes

La siguiente tarea asignada a Héctor es **T-03: migraciones del modelo aprobado**. Antes de crear el esquema, el equipo debe aprobar D-13 y resolver los puntos abiertos de Arquitectura 5.4 en `PLAN.md`, incluidos el tipo de clave primaria, el lado que almacena la relación Venta–Obra, los campos de Usuario y si Inventario usa un catálogo. También quedan por definir la moneda y el contenido mínimo del dashboard. Las tablas y migraciones no forman parte de este cambio.

Carolina ya tiene cumplida la dependencia T-01 y D-07 está confirmada; para T-05 aún debe resolverse D-11, la elección de estilo visual. No se modificó ninguna tarea asignada a Carolina.

Al retomar: abrir la rama `codex/backend`, leer `PLAN.md`, `TAREAS.md` y `ESTADO.md`, y acordar los puntos de T-03 antes de implementar migraciones. Comandos de PostgreSQL local y backend: `backend/README.md`.
