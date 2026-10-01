# CLAUDE.md — Convenciones del proyecto

> Lo leen Héctor, Carolina y las IAs que los ayudan. Si eres una IA, lee primero la sección 1.
> Generado el 2026-10-01 a partir de la conversación de planeación.
> Etiquetas: **Confirmado** (lo dijo el equipo explícitamente) · **Propuesta** (sin aprobación explícita) · **Por confirmar** (aún no definido).

## 1. Guía rápida para personas e IAs

Orden de lectura:
1. `PLAN.md`: objetivo, alcance, decisiones, arquitectura, fechas y riesgos. Es la fuente de verdad del plan.
2. `TAREAS.md`: tareas de desarrollo, quién hace cada una, dependencias y "Hecho cuando".
3. `ESTADO.md`: avance confirmado, bloqueos y qué le toca hoy a cada persona.
4. `CHECKLIST_ENTREGA.md`: criterios de aceptación de cada tarea.
5. Este archivo: convenciones técnicas y reglas de trabajo.

Reglas para cualquier IA que ayude:
- Trabaja solo en las tareas del responsable al que ayudas (Héctor o Carolina). Nunca tomes una tarea de la otra persona.
- No tomes decisiones del plan. Si una tarea necesita una decisión que está **Por confirmar** o **Propuesta** en `PLAN.md`, detente y avisa.
- No inventes requisitos, fechas, avances ni decisiones. Si falta información, pregunta.
- No marques una tarea como hecha sin comprobar cada punto de su "Hecho cuando".
- Si dos documentos se contradicen, señala el conflicto y cita los archivos; no elijas una versión en silencio.
- No envíes mensajes a nadie ni ejecutes acciones externas. Si hace falta comunicar algo, deja el texto listo para que lo comparta una persona.

## 2. Qué es el proyecto

CRM a medida para ventas, procesos logísticos y de obra, de uso interno para un solo negocio (mono-tenant). Se construye desde cero. **Confirmado.**
El nombre "Turistarán" aparece en el HTML de referencia y está **Por confirmar** como nombre oficial.

## 3. Equipo y responsabilidades

- **Héctor** y **Carolina**. Trabajan entre 2 y 3 días por semana; baja prioridad; sin fecha límite fija. **Confirmado.**
- Cada tarea tiene **un solo responsable**; ninguna tarea es de ambos. Lo más difícil se asigna a Héctor. **Confirmado** (D-09).
- El reparto actual está en `TAREAS.md` (9 tareas cada uno). Para evitar conflictos, dos personas no cambian los mismos archivos al mismo tiempo.
- Disponibilidad de cada persona: **Por confirmar.** No se asume.
- Agentes de IA: ayudan a Héctor o a Carolina; no tienen tareas propias.

## 4. Stack técnico

- Aplicación web responsiva para móvil y desktop; sin app nativa. **Confirmado.**
- Frontend React, backend Node.js + Express, base de datos PostgreSQL. **Propuesta** (D-07).
- Un repositorio Git con ramas por módulo, por ejemplo `feature/leads`, `feature/ventas`. **Propuesta** (D-08). La convención final de ramas y commits se escribe aquí al terminar T-01.
- Nombres de campos en `snake_case`, como en `PLAN.md` (`lead_origen_id`, `obra_id`). **Propuesta.**
- Idioma de la interfaz (español según el HTML de referencia), tipo de clave primaria y moneda: **Por confirmar.**

## 5. Reglas de negocio que no se rompen

1. **Egreso es la única fuente de gastos.** Avance de obra y Ahorro no capturan gastos propios; consultan egresos por `obra_id` y/o `etapa_id`. **Propuesta** (D-06).
2. **Ahorro es una vista calculada**: presupuesto de la Obra menos la suma de sus Egresos, con el consolidado en el dashboard principal. **Confirmado** (definición) / implementación **Propuesta**.
3. Un Lead se convierte en Cliente conservando `lead_origen_id`; el Lead no se borra. **Propuesta.**
4. Una Venta puede o no generar una Obra; solo las ventas de obra la generan. **Propuesta.**

Si una regla choca con "la forma más simple de implementarlo", gana la regla.

## 6. Flujo de trabajo

- Antes de empezar una tarea: revisa que sus dependencias estén hechas con evidencia y que las decisiones que requiere estén cerradas.
- Trabaja en una rama por módulo, con la convención definida en T-01.
- Al terminar: comprueba cada punto del "Hecho cuando", marca la tarea en `TAREAS.md` y los puntos en `CHECKLIST_ENTREGA.md`, y actualiza `ESTADO.md` con evidencia.
- Un cambio de responsable o de dependencia se anota en `TAREAS.md` con su motivo.
- Un cambio de una decisión se anota en `PLAN.md` con su razón e impacto; no se reemplaza en silencio.
- Checkpoint semanal fijo; el día está **Por confirmar**. **Propuesta.**

## 7. Límites

- Fuera de alcance: los módulos que no están entre los 9 (RH, Nómina, Contabilidad, 3-Way Matching, etc.) hasta resolver D-12 en `PLAN.md`.
- El HTML de referencia es solo referencia visual. El estilo (Duolingo o Revolut) está **Por confirmar** (D-11).
- No se construye multi-tenant ni reutilización para otros giros de negocio.
- No se capturan gastos fuera del módulo Egreso.
- Este archivo solo cambia cuando una regla estable cambia de verdad.

## 8. Formato de tareas (en `TAREAS.md`)

- Agrupadas por Hito y responsable. IDs `T-XX` consecutivos, sin duplicar ni reutilizar.
- `- [ ] T-XX · descripción · responsable · depende de: T-YY`
- `🔓` cuando la tarea desbloquea a la otra persona, indicando a quién.
- `**Requiere decisión:**` cuando depende de una decisión de `PLAN.md`.
- `**Hecho cuando:**` con resultados verificables; si hay varios, cada uno se comprueba por separado.
- Se mantienen al día la cantidad de tareas, la vista por responsable y el camino crítico.
