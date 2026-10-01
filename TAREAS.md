# TAREAS.md

> Solo tareas de **desarrollo**. Las decisiones del plan (stack, estilo visual, alcance, etc.) están en `PLAN.md`, sección Decisiones.
> Lo leen Héctor, Carolina y las IAs que los ayudan.
> Generado el 2026-10-01. Todas las tareas están sin completar: no hay código ni repositorio verificado.

## Cómo usar este archivo

- **Una tarea, una persona.** Trabaja solo en las tareas de tu responsable. Una IA que ayuda a Héctor trabaja en las de Héctor; una IA que ayuda a Carolina, en las de Carolina.
- **Formato:** `- [ ] T-XX · descripción · responsable · depende de: T-YY`. Los IDs son consecutivos y nunca se reutilizan.
- **🔓** = esta tarea desbloquea a la otra persona; se indica a quién.
- **Requiere decisión** = decisión de `PLAN.md` que debe estar cerrada antes de empezar. Si no lo está, no empieces la tarea: avisa.
- **Una tarea se marca `[x]` solo si se cumple cada punto de su "Hecho cuando"** y hay evidencia (código, PR o prueba). Si no puedes comprobarlo, déjala pendiente.
- **Dificultad (Propuesta):** Alta, Media o Baja; criterio en `PLAN.md`, sección Equipo y reparto.
- No cambies un responsable ni una dependencia sin escribir el motivo aquí.

**Total: 18 tareas** (0 completadas).

## Vista por responsable

| Responsable | Tareas (dificultad) | Cantidad |
|---|---|---|
| Héctor | T-01 (Baja), T-02 (Media), T-03 (Alta), T-04 (Alta), T-09 (Alta), T-11 (Media), T-12 (Media), T-14 (Alta), T-16 (Alta) | 9 |
| Carolina | T-05 (Media), T-06 (Baja), T-07 (Baja), T-08 (Media), T-10 (Baja), T-13 (Baja), T-15 (Media), T-17 (Por definir), T-18 (Por definir) | 9 |

## Camino crítico (Propuesta)

`T-01 → T-02 → T-03 → T-04 → T-06 → T-07 → T-08 → T-09 → T-11 → T-12 → T-14 → T-15`, con la rama `T-12 → T-16`.
Ruta paralela: `T-01 → T-05 → T-06`.

---

## Hito 0 — Fundación técnica (~2 semanas)

### Héctor

- [ ] T-01 🔓 · Crear el repositorio compartido y escribir la convención de ramas y commits en `CLAUDE.md` · Héctor · depende de: —
  - **Desbloquea a:** Carolina (T-05).
  - **Requiere decisión:** D-08.
  - **Hecho cuando:**
    - Existe el repositorio y Héctor y Carolina tienen acceso.
    - La convención de ramas y commits está escrita en `CLAUDE.md`.
- [ ] T-02 · Setup de backend: proyecto Node.js + Express y conexión a PostgreSQL · Héctor · depende de: T-01
  - **Requiere decisión:** D-07.
  - **Hecho cuando:** el servidor backend arranca en local y se conecta a la base de datos PostgreSQL sin errores.
- [ ] T-03 · Migraciones de las entidades del modelo (Lead, Cliente, Venta, Obra, Etapa, Egreso, Ingreso, Logística, Inventario y Usuario) · Héctor · depende de: T-02
  - **Requiere decisión:** D-13 y los puntos Por confirmar de `PLAN.md`, sección Arquitectura 5.4 (clave primaria, relación Venta↔Obra, campos de Usuario).
  - **Hecho cuando:**
    - Las migraciones crean todas las tablas del modelo aprobado en una base de datos vacía.
    - `Obra` incluye el campo `presupuesto`.
    - `Egreso` incluye `obra_id` y `etapa_id` opcionales.
- [ ] T-04 🔓 · Autenticación básica: login de los 2 usuarios (backend) · Héctor · depende de: T-03
  - **Desbloquea a:** Carolina (T-06, T-07), que necesita el login y las rutas protegidas.
  - **Hecho cuando:**
    - Héctor y Carolina pueden iniciar sesión.
    - Un usuario sin sesión no puede acceder a las rutas protegidas.

### Carolina

- [ ] T-05 · Setup de frontend: proyecto React, estructura de carpetas y sistema de diseño base responsivo · Carolina · depende de: T-01
  - **Requiere decisión:** D-07 y D-11.
  - **Hecho cuando:**
    - El proyecto arranca en local.
    - La pantalla base se ve bien en ancho móvil y en ancho desktop.
    - El estilo base corresponde al estilo elegido en D-11.
- [ ] T-06 · Pantalla de login conectada al backend · Carolina · depende de: T-04, T-05
  - **Hecho cuando:**
    - Un usuario puede iniciar sesión desde la pantalla de login.
    - Con credenciales incorrectas se muestra un mensaje de error.
    - La pantalla funciona en móvil y en desktop.

---

## Hito 1 — Comercial: Leads, Clientes, Ventas (5–6 semanas)

### Carolina

- [ ] T-07 · Módulo Leads (backend y frontend): CRUD, cambio de estado y asignación de responsable · Carolina · depende de: T-04, T-06
  - **Hecho cuando:**
    - Se puede crear y editar un Lead.
    - Se puede cambiar su estado entre nuevo, contactado, en negociación, convertido y perdido.
    - Se puede asignar un responsable.
- [ ] T-08 🔓 · Módulo Clientes (backend y frontend): CRUD y conversión desde Lead ganado · Carolina · depende de: T-07
  - **Desbloquea a:** Héctor (T-09), porque `Venta` requiere `cliente_id`.
  - **Hecho cuando:**
    - La ficha del cliente muestra sus datos completos.
    - Al convertir un Lead se crea el Cliente con `lead_origen_id` y el Lead no se borra.

### Héctor

- [ ] T-09 🔓 · Módulo Ventas (backend y frontend): CRUD, vínculo a Cliente y creación automática de la Obra base · Héctor · depende de: T-08
  - **Desbloquea a:** Carolina (T-10, T-13).
  - **Hecho cuando:**
    - Se puede crear y editar una Venta ligada a un Cliente.
    - Al confirmarse una Venta de obra se crea el registro de `Obra` con el presupuesto capturado.
    - Una Venta sin obra no genera registro en `Obra`.
  - **Alcance:** solo el registro base de Obra; el seguimiento de obra es del Hito 3.
- [ ] T-11 🔓 · Consulta de Obras: una Venta confirmada con obra queda visible como Obra en el sistema (listado y detalle) · Héctor · depende de: T-09
  - **Desbloquea a:** Carolina (T-17, T-18), que ligan sus módulos a una Obra.
  - **Hecho cuando:**
    - Una Venta confirmada con obra aparece como Obra en el sistema.
    - El listado y el detalle de Obras muestran nombre, cliente, presupuesto y estado.
  - **Por confirmar:** contenido mínimo del dashboard principal en esta fase (`PLAN.md`, Arquitectura 5.4).

### Carolina

- [ ] T-10 · Historial de ventas dentro de la ficha de Cliente · Carolina · depende de: T-08, T-09
  - **Hecho cuando:** la ficha de Cliente muestra el historial de sus ventas.

---

## Hito 2 — Financiero: Egreso, Ingreso, Ahorro (4–6 semanas)

### Héctor

- [ ] T-12 · Módulo Egreso (backend y frontend): egresos con obra y etapa opcionales · Héctor · depende de: T-11
  - **Requiere decisión:** D-06.
  - **Hecho cuando:**
    - Se puede registrar un egreso ligado a una Obra, y opcionalmente a una Etapa.
    - Se puede registrar un egreso sin Obra (gasto general).
    - Ningún otro módulo captura gastos por su cuenta.
- [ ] T-14 🔓 · Cálculo de Ahorro (backend): ahorro por obra y ahorro consolidado · Héctor · depende de: T-12, T-09
  - **Desbloquea a:** Carolina (T-15).
  - **Hecho cuando:**
    - El ahorro por obra se calcula como presupuesto menos la suma de los egresos de esa obra, sin captura manual.
    - El ahorro consolidado suma el ahorro de todas las obras.

### Carolina

- [ ] T-13 · Módulo Ingreso (backend y frontend): ingresos ligados opcionalmente a una Venta · Carolina · depende de: T-09
  - **Hecho cuando:** se puede registrar un ingreso con monto, concepto y fecha, y ligarlo a una Venta.
  - **Por confirmar:** criterios adicionales (el equipo no los ha definido).
- [ ] T-15 · Pantalla de Ahorro y bloque de ahorro consolidado en el dashboard principal · Carolina · depende de: T-14
  - **Hecho cuando:**
    - La tabla lista todas las obras con datos generales, destacando presupuesto y gasto final.
    - El dashboard principal muestra el ahorro consolidado de todas las obras.

---

## Hito 3 — Operación: Avance de obra, Logística, Inventario (8–12 semanas)

> El alcance de este hito es el menos definido.

### Héctor

- [ ] T-16 · Módulo Avance de obra (backend y frontend): porcentaje de avance por etapa y gastos por etapa consultados desde Egreso · Héctor · depende de: T-12
  - **Requiere decisión:** D-14 (alcance exacto de Avance de obra). No empezar sin ella.
  - **Hecho cuando:**
    - Se puede capturar y ver el porcentaje de avance por Etapa de una Obra.
    - Los gastos mostrados por etapa vienen de Egreso, sin captura propia.
  - **Por confirmar:** criterios adicionales que salgan de D-14.

### Carolina

- [ ] T-17 · Módulo Logística (backend y frontend) ligado a Obra · Carolina · depende de: T-11
  - **Hecho cuando:** **Por confirmar.** El equipo solo definió la entidad (tipo, estado, fecha); faltan los criterios del módulo.
- [ ] T-18 · Módulo Inventario (backend y frontend) con movimientos de entrada y salida · Carolina · depende de: T-11
  - **Hecho cuando:** **Por confirmar.** El equipo solo definió la entidad (item, cantidad, unidad, tipo de movimiento); faltan los criterios del módulo.
