# CHECKLIST_ENTREGA.md

> Criterios de aceptación del **desarrollo**, uno por cada "Hecho cuando" de `TAREAS.md`. Lo leen Héctor, Carolina y las IAs que los ayudan.
> **T-01 verificada documentalmente el 2026-10-01; no se han realizado pruebas funcionales.** Un punto se marca solo con evidencia verificable (código, PR o prueba).
> Las decisiones y los pendientes de entrega final (hosting, aceptación, pruebas) están en `PLAN.md`, no aquí.
> Generado el 2026-10-01.

## Hito 0 — Fundación técnica

**Héctor**
- [x] T-01 · El repositorio existe y Héctor y Carolina tienen acceso. Evidencia: `HectorD20/Turistaran_CRM`, base `522e743`; Héctor confirmó los permisos de Carolina el 2026-10-01.
- [x] T-01 · La convención de ramas y commits está escrita en `CLAUDE.md`, sección 6.1, en la rama local `codex/fundacion-repositorio` (pendiente de publicación).
- [ ] T-02 · El servidor backend arranca en local y se conecta a PostgreSQL sin errores
- [ ] T-03 · Las migraciones crean todas las tablas del modelo aprobado en una base de datos vacía
- [ ] T-03 · `Obra` incluye `presupuesto`
- [ ] T-03 · `Egreso` incluye `obra_id` y `etapa_id` opcionales
- [ ] T-04 · Héctor y Carolina pueden iniciar sesión
- [ ] T-04 · Un usuario sin sesión no puede acceder a las rutas protegidas

**Carolina**
- [ ] T-05 · El proyecto de frontend arranca en local
- [ ] T-05 · La pantalla base se ve bien en ancho móvil y en ancho desktop
- [ ] T-05 · El estilo base corresponde al estilo elegido (D-11)
- [ ] T-06 · Un usuario puede iniciar sesión desde la pantalla de login
- [ ] T-06 · Con credenciales incorrectas se muestra un mensaje de error
- [ ] T-06 · La pantalla de login funciona en móvil y en desktop

## Hito 1 — Comercial

**Carolina**
- [ ] T-07 · Se puede crear y editar un Lead
- [ ] T-07 · Se puede cambiar el estado del Lead (nuevo, contactado, en negociación, convertido, perdido)
- [ ] T-07 · Se puede asignar un responsable al Lead
- [ ] T-08 · La ficha del Cliente muestra sus datos completos
- [ ] T-08 · Al convertir un Lead se crea el Cliente con `lead_origen_id` y el Lead no se borra
- [ ] T-10 · La ficha de Cliente muestra el historial de sus ventas

**Héctor**
- [ ] T-09 · Se puede crear y editar una Venta ligada a un Cliente
- [ ] T-09 · Al confirmarse una Venta de obra se crea la Obra con el presupuesto capturado
- [ ] T-09 · Una Venta sin obra no genera registro en `Obra`
- [ ] T-11 · Una Venta confirmada con obra aparece como Obra en el sistema
- [ ] T-11 · El listado y el detalle de Obras muestran nombre, cliente, presupuesto y estado
- [ ] T-11 · Contenido mínimo del dashboard principal en esta fase: **Por confirmar**

## Hito 2 — Financiero

**Héctor**
- [ ] T-12 · Se puede registrar un egreso ligado a una Obra, y opcionalmente a una Etapa
- [ ] T-12 · Se puede registrar un egreso sin Obra (gasto general)
- [ ] T-12 · Ningún otro módulo captura gastos por su cuenta
- [ ] T-14 · El ahorro por obra se calcula como presupuesto menos la suma de sus egresos, sin captura manual
- [ ] T-14 · El ahorro consolidado suma el ahorro de todas las obras

**Carolina**
- [ ] T-13 · Se puede registrar un ingreso con monto, concepto y fecha, y ligarlo a una Venta
- [ ] T-13 · Criterios adicionales de Ingreso: **Por confirmar**
- [ ] T-15 · La tabla de Ahorro lista todas las obras con datos generales, destacando presupuesto y gasto final
- [ ] T-15 · El dashboard principal muestra el ahorro consolidado de todas las obras

## Hito 3 — Operación

**Héctor**
- [ ] T-16 · Se puede capturar y ver el porcentaje de avance por Etapa de una Obra
- [ ] T-16 · Los gastos por etapa vienen de Egreso, sin captura propia
- [ ] T-16 · Criterios adicionales de Avance de obra (salen de D-14): **Por confirmar**

**Carolina**
- [ ] T-17 · Criterios de Logística: **Por confirmar**
- [ ] T-18 · Criterios de Inventario: **Por confirmar**

## Transversales (aplican a todas las tareas)

- [ ] Cada pantalla funciona en móvil y en desktop (D-02)
- [ ] No existe captura de gastos fuera de Egreso (D-06)
- [ ] No hay funciones multi-tenant ni módulos fuera de los 9 sin una decisión registrada en `PLAN.md` (D-01, D-12)
