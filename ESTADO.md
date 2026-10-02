# ESTADO.md

> Estado del desarrollo. Lo leen Héctor, Carolina y las IAs que los ayudan.
> Las cifras se actualizan solo con evidencia (archivo, código o PR verificable).
> **Semáforo (Propuesta):** 🟢 en tiempo y sin bloqueos · 🟡 en riesgo o con decisiones pendientes · 🔴 bloqueado o atrasado con impacto confirmado.
> Generado el 2026-10-01.

## Hito actual

**Hito 0 — Fundación técnica.** Estado: 🟡

- Repositorio verificado: https://github.com/HectorD20/Turistaran_CRM, rama predeterminada `main`, base `522e743`. Contiene los documentos de coordinación y los archivos de referencia `index.html` y `app.js`; esto no acredita el backend ni los módulos del plan.
- T-01 completada en la rama local `codex/fundacion-repositorio`: acceso de Carolina confirmado por Héctor y convención escrita en `CLAUDE.md`, sección 6.1. Cambios pendientes de publicación; no hay PR creado.
- La ventana propuesta originalmente (16–30 sep 2026) ya pasó. T-01 se trabajó el 2026-10-01; fecha de arranque del calendario y reprogramación pendientes (`PLAN.md`, sección Fases).

## Avance

| Concepto | Valor | Evidencia |
|---|---|---|
| Tareas completadas | 1 de 18 | T-01: repositorio verificado, acceso confirmado por Héctor y convención en `CLAUDE.md` §6.1 (rama local) |
| Hito 0 | 1 de 6 | T-01 |
| Hito 1 | 0 de 5 | — |
| Hito 2 | 0 de 4 | — |
| Hito 3 | 0 de 3 | — |
| Héctor | 1 de 9 | T-01 |
| Carolina | 0 de 9 | — |

## Bloqueos activos

Son decisiones pendientes de `PLAN.md` (sección Decisiones).

| ID | Bloqueo | Bloquea a | Qué se necesita |
|---|---|---|---|
| B-01 | D-07: stack técnico sin confirmar | T-02 (Héctor), T-05 (Carolina) | Decisión del equipo |
| B-02 | D-11: estilo visual sin elegir | T-05 (Carolina) | Decisión del equipo |
| B-03 | D-13: modelo de entidades sin aprobar, y puntos abiertos de Arquitectura 5.4 (clave primaria, relación Venta↔Obra, campos de Usuario) | T-03 (Héctor) | Aprobación y decisiones del equipo |
| B-04 | D-12: alcance del HTML de referencia sin decidir | Alcance y estimaciones | Decisión del equipo |
| B-05 | D-14: alcance de Avance de obra sin definir | T-16 (Héctor), aún lejano | Decisión del equipo antes del Hito 3 |
| B-06 | Fecha real de arranque desconocida | Calendario | Confirmación del equipo |

## Hoy le toca a…

**Fecha: jueves 2026-10-01.** La disponibilidad de cada persona está **Por confirmar** (no se asume). Asignación **Propuesta**:

- **Héctor:** T-01 completada localmente. Sigue T-02, pendiente de confirmar D-07 (React, Node.js + Express y PostgreSQL). No se ha iniciado el backend.
- **Carolina:** T-01 satisface la dependencia de T-05; los cambios de coordinación todavía deben compartirse. T-05 sigue pendiente de cerrar D-07 y D-11. Sus tareas no se modificaron.

## Registro diario

| Fecha | Registro |
|---|---|
| 2026-10-01 | Registro original de planeación: se crearon los 5 documentos de coordinación y se repartieron las 18 tareas entre Héctor y Carolina. En ese registro todavía no se había verificado el repositorio; esa afirmación quedó desactualizada y se corrige en la entrada siguiente. |
| 2026-10-01 | Se verificó `HectorD20/Turistaran_CRM` y se descargó `main` (base `522e743`) en esta carpeta. Héctor confirmó los permisos de Carolina y D-08. T-01 completada localmente: convención en `CLAUDE.md` §6.1 y checklist actualizado. Rama `codex/fundacion-repositorio`, sin publicación ni PR. D-07 mantiene bloqueada T-02. |
