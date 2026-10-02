# ESTADO.md

> Estado del desarrollo. Lo leen Héctor, Carolina y las IAs que los ayudan.
> Las cifras se actualizan solo con evidencia (archivo, código o PR verificable).
> **Semáforo (Propuesta):** 🟢 en tiempo y sin bloqueos · 🟡 en riesgo o con decisiones pendientes · 🔴 bloqueado o atrasado con impacto confirmado.
> Generado el 2026-10-01.

## Hito actual

**Hito 0 — Fundación técnica.** Estado: 🟡

- Repositorio verificado: https://github.com/HectorD20/Turistaran_CRM, rama predeterminada `main`, base `522e743`. Contiene los documentos de coordinación y los archivos de referencia `index.html` y `app.js`; esto no acredita el backend ni los módulos del plan.
- T-01 completada en la rama local `codex/fundacion-repositorio`: acceso de Carolina confirmado por Héctor y convención escrita en `CLAUDE.md`, sección 6.1. Cambios pendientes de publicación; no hay PR creado.
- T-02 completada en `codex/backend`, que incluye el commit local `2a983e1` de T-01. Backend Express y conexión PostgreSQL verificados; instrucciones en `backend/README.md`. Cambios pendientes de publicación.
- La ventana propuesta originalmente (16–30 sep 2026) ya pasó. T-01 se trabajó el 2026-10-01; fecha de arranque del calendario y reprogramación pendientes (`PLAN.md`, sección Fases).

## Avance

| Concepto | Valor | Evidencia |
|---|---|---|
| Tareas completadas | 2 de 18 | T-01: convención y acceso; T-02: backend y conexión real (rama local) |
| Hito 0 | 2 de 6 | T-01, T-02 |
| Hito 1 | 0 de 5 | — |
| Hito 2 | 0 de 4 | — |
| Hito 3 | 0 de 3 | — |
| Héctor | 2 de 9 | T-01, T-02 |
| Carolina | 0 de 9 | — |

## Bloqueos activos

Son decisiones pendientes de `PLAN.md` (sección Decisiones).

| ID | Bloqueo | Bloquea a | Qué se necesita |
|---|---|---|---|
| B-02 | D-11: estilo visual sin elegir | T-05 (Carolina) | Decisión del equipo |
| B-03 | D-13: modelo de entidades sin aprobar, y puntos abiertos de Arquitectura 5.4 (clave primaria, relación Venta↔Obra, campos de Usuario) | T-03 (Héctor) | Aprobación y decisiones del equipo |
| B-04 | D-12: alcance del HTML de referencia sin decidir | Alcance y estimaciones | Decisión del equipo |
| B-05 | D-14: alcance de Avance de obra sin definir | T-16 (Héctor), aún lejano | Decisión del equipo antes del Hito 3 |
| B-06 | Fecha real de arranque desconocida | Calendario | Confirmación del equipo |

## Hoy le toca a…

**Fecha: jueves 2026-10-01.** La disponibilidad de cada persona está **Por confirmar** (no se asume). Asignación **Propuesta**:

- **Héctor:** T-01 y T-02 completadas localmente. Sigue T-03, pendiente de D-13 y de las decisiones de Arquitectura 5.4. No se han creado migraciones ni autenticación.
- **Carolina:** T-01 satisface la dependencia de T-05 y D-07 ya está confirmada; los cambios todavía deben compartirse. T-05 sigue pendiente de D-11. Sus tareas no se modificaron.

## Registro diario

| Fecha | Registro |
|---|---|
| 2026-10-01 | Registro original de planeación: se crearon los 5 documentos de coordinación y se repartieron las 18 tareas entre Héctor y Carolina. En ese registro todavía no se había verificado el repositorio; esa afirmación quedó desactualizada y se corrige en la entrada siguiente. |
| 2026-10-01 | Se verificó `HectorD20/Turistaran_CRM` y se descargó `main` (base `522e743`) en esta carpeta. Héctor confirmó los permisos de Carolina y D-08. T-01 completada localmente: convención en `CLAUDE.md` §6.1 y checklist actualizado. Rama `codex/fundacion-repositorio`, sin publicación ni PR. D-07 mantiene bloqueada T-02. |
| 2026-10-01 | Héctor confirmó D-07 y pidió preparar el backend; B-01 resuelto. Se creó `backend/` con Express 5.2.1 y pg 8.23.1 sobre Node 24.14.0. Base de desarrollo PostgreSQL 18.6 independiente en `127.0.0.1:55432`, usuario `turistaran_app`; credenciales y datos excluidos de Git. Verificados SELECT 1, arranque HTTP en puerto 3001, disponibilidad, caída 503 y recuperación. Cuatro pruebas aprobadas. T-02 completada en `codex/backend`, sin publicación ni PR. |
