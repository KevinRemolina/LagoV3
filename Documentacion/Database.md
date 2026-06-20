# DATABASE.md

## Documentación de Base de Datos — Lago Spa · Estética · Salud

**Versión:** 1.0
**Motor:** PostgreSQL (Supabase)
**Estado:** Implementado y desplegado
**Idioma del sistema:** Español
**Ubicación objetivo:** Sogamoso, Boyacá, Colombia

---

# 1. PROPÓSITO DE ESTE DOCUMENTO

Este documento es la **fuente única de verdad** sobre la estructura de la base de datos del proyecto Lago Spa · Estética · Salud.

Describe:

* Todas las tablas y sus campos.
* Todas las relaciones entre entidades.
* Todas las reglas de negocio implementadas a nivel de base de datos (triggers, constraints, funciones).
* La estrategia de seguridad (Row Level Security).
* Los buckets de almacenamiento de archivos.
* El cron job de automatización.
* Los datos iniciales (seed data) ya cargados.
* Los pasos pendientes y las recomendaciones para producción.

Cualquier persona (desarrollador, diseñador técnico, o el propio equipo de Lago Spa) debería poder leer este documento y entender completamente cómo está construida la base de datos, sin necesidad de leer el script SQL línea por línea.

> **Importante:** este documento describe la base de datos **tal como fue instalada** mediante el script `lago_spa_database_schema.sql`. Si en el futuro se modifica el script o se ejecutan cambios manuales en Supabase, este documento debe actualizarse para evitar que quede desincronizado con la realidad.

---

# 2. RESUMEN GENERAL

| Aspecto | Detalle |
|---|---|
| Proveedor | Supabase (PostgreSQL + Auth + Storage + Cron) |
| Tablas totales | 11 |
| Tipos ENUM personalizados | 3 |
| Funciones personalizadas | 9 |
| Triggers activos | 10 |
| Políticas RLS | 32 |
| Buckets de Storage | 3 |
| Cron Jobs | 1 |
| Claves primarias | UUID en todas las tablas |
| Eliminación de registros | Hard delete (excepto formularios, que se archivan) |

---

# 3. EXTENSIONES Y HERRAMIENTAS HABILITADAS

| Extensión | Uso |
|---|---|
| `pgcrypto` | Generación de UUID (`gen_random_uuid()`) |
| `uuid-ossp` | Soporte adicional de generación de UUID |
| `pg_cron` | Ejecución del job diario de expiración de promociones |
| `unaccent` | Generación de slugs sin tildes ni diacríticos |

---

# 4. TIPOS ENUM PERSONALIZADOS

En lugar de usar `VARCHAR` libre para los estados, se definieron tipos `ENUM` nativos de PostgreSQL. Esto garantiza que **nunca pueda guardarse un estado inválido** (por ejemplo, escribir `"publico"` en minúscula o con un typo), y mejora el rendimiento de los índices.

### 4.1 `service_status`

Valores permitidos:

```text
PUBLIC
PRIVATE
ARCHIVED
```

Usado en: `services.status`

### 4.2 `contact_form_status`

Valores permitidos:

```text
PENDING
READ
ARCHIVED
```

Usado en: `contact_forms.status`

### 4.3 `role_name`

Valores permitidos:

```text
OWNER
EMPLOYEE
SUPER_ADMIN
```

Usado en: `roles.name`

> Solo `OWNER` está activo funcionalmente en el MVP. `EMPLOYEE` y `SUPER_ADMIN` existen para no requerir migraciones cuando se implementen en fases futuras.

---

# 5. DIAGRAMA GENERAL DE RELACIONES

```text
auth.users (Supabase Auth)
      │
      ▼ (trigger automático)
public.users
      │
      ▼
user_roles ◄────── roles


categories
      │
      ▼
  services ─────────────┬──────────── service_images
      │                 │
      │                 ▼
      │         service_specialists
      │                 │
      │                 ▼
      │           specialists
      │
      ▼
contact_forms (FK opcional a services)


settings (independiente)
promotion_rules (FK a services, reservada para el futuro)
```

---

# 6. DESCRIPCIÓN DETALLADA DE TABLAS

## 6.1 `roles`

Define los roles posibles del sistema administrativo.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | UUID (PK) | Generado automáticamente |
| `name` | `role_name` (ENUM) | Único, obligatorio |
| `description` | TEXT | Opcional |
| `created_at` | TIMESTAMPTZ | Automático |

**Datos precargados:**

| name | description |
|---|---|
| `OWNER` | Administrador principal. Acceso completo. |
| `EMPLOYEE` | Reservado para fases futuras. No usado en MVP. |
| `SUPER_ADMIN` | Reservado para fases futuras. No usado en MVP. |

---

## 6.2 `users`

Tabla espejo de `auth.users` (Supabase Auth), con datos de negocio adicionales. **Se llena automáticamente** mediante un trigger cada vez que se crea un usuario nuevo en Authentication — nunca debe insertarse manualmente.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | UUID (PK) | Generado automáticamente |
| `auth_user_id` | UUID | Único. FK a `auth.users.id` (`ON DELETE CASCADE`) |
| `full_name` | VARCHAR(150) | Opcional (se autocompleta con el correo si no se indica) |
| `email` | VARCHAR(255) | Único, obligatorio |
| `avatar_url` | TEXT | Opcional |
| `is_active` | BOOLEAN | Default `true` |
| `created_at` / `updated_at` | TIMESTAMPTZ | Automáticos |

**Comportamiento automático:**
Cuando se crea un usuario en *Authentication → Users* dentro del Dashboard de Supabase, el trigger `trg_on_auth_user_created` crea automáticamente su fila correspondiente aquí.

---

## 6.3 `user_roles`

Relación muchos a muchos entre `users` y `roles`. Permite que, en el futuro, un usuario tenga más de un rol simultáneamente.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | UUID (PK) | Generado automáticamente |
| `user_id` | UUID | FK a `users.id` (`ON DELETE CASCADE`) |
| `role_id` | UUID | FK a `roles.id` (`ON DELETE RESTRICT`) |
| `created_at` | TIMESTAMPTZ | Automático |

Restricción: combinación `(user_id, role_id)` única — un usuario no puede tener el mismo rol asignado dos veces.

---

## 6.4 `categories`

Categorías fijas del catálogo de servicios.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | UUID (PK) | Generado automáticamente |
| `name` | VARCHAR(100) | Único, obligatorio |
| `slug` | VARCHAR(120) | Único, obligatorio |
| `description` | TEXT | Opcional |
| `is_active` | BOOLEAN | Default `true` |
| `created_at` | TIMESTAMPTZ | Automático |

**Datos precargados (RN-001 — fijas en el MVP):**

| name | slug |
|---|---|
| Facial | `facial` |
| Corporal | `corporal` |
| Salud | `salud` |
| Spa | `spa` |

> El administrador **no puede** crear ni eliminar categorías desde el panel en el MVP. Cualquier cambio requiere una operación SQL manual o la implementación de esa funcionalidad en una fase futura.

---

## 6.5 `services`

Entidad principal del sistema. Representa tanto servicios normales como promociones (una promoción es simplemente un servicio con `is_promotional = true`).

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | UUID (PK) | Generado automáticamente |
| `category_id` | UUID | FK a `categories.id` (`ON DELETE RESTRICT`) |
| `title` | VARCHAR(255) | Obligatorio |
| `slug` | VARCHAR(255) | Único. **Generado automáticamente, no editable** |
| `short_description` | TEXT | Opcional |
| `description` | TEXT | Obligatorio |
| `benefits` | JSONB | Lista de beneficios. Default `[]` |
| `included_services` | JSONB | Lista de elementos incluidos. Default `[]` |
| `recommendations` | TEXT | Opcional |
| `contraindications` | TEXT | Opcional |
| `observations` | TEXT | Opcional |
| `price` | NUMERIC(12,2) | Opcional. No puede ser negativo |
| `show_price` | BOOLEAN | Default `true` |
| `status` | `service_status` (ENUM) | Default `PUBLIC` |
| `is_featured` | BOOLEAN | Default `false` |
| `is_promotional` | BOOLEAN | Default `false` |
| `promotion_start` | TIMESTAMPTZ | Obligatorio solo si `is_promotional = true` |
| `promotion_end` | TIMESTAMPTZ | Obligatorio solo si `is_promotional = true`. Debe ser posterior a `promotion_start` |
| `created_at` / `updated_at` | TIMESTAMPTZ | Automáticos |

**Reglas de negocio implementadas a nivel de base de datos:**

1. **Slug automático e inmutable**: al crear o editar el `title`, el slug se regenera automáticamente (función `generate_unique_slug`). Si se edita cualquier otro campo sin tocar el título, el slug permanece igual. **No existe forma de que el administrador lo edite manualmente**, ni siquiera enviándolo en la petición — el trigger lo sobrescribe siempre.
2. **Slugs únicos garantizados**: si el slug generado ya existe, se agrega automáticamente `-2`, `-3`, etc.
3. **Fechas de promoción obligatorias y coherentes**: no se puede guardar un servicio promocional sin ambas fechas, y la fecha de fin siempre debe ser posterior a la de inicio. Si se intenta violar esto, la base de datos rechaza la operación con un error claro.
4. **Precio no negativo**: un constraint impide guardar precios menores a 0.

**Estados posibles (`status`):**

| Estado | Significado |
|---|---|
| `PUBLIC` | Visible en el sitio web público |
| `PRIVATE` | Oculto — solo visible desde el panel administrativo |
| `ARCHIVED` | Archivado — no visible públicamente, conservado para histórico |

---

## 6.6 `service_images`

Galería de imágenes asociada a cada servicio.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | UUID (PK) | Generado automáticamente |
| `service_id` | UUID | FK a `services.id` (`ON DELETE CASCADE`) |
| `storage_path` | TEXT | Ruta del archivo en Supabase Storage |
| `alt_text` | TEXT | Opcional (accesibilidad / SEO) |
| `sort_order` | INTEGER | Default `0` |
| `is_cover` | BOOLEAN | Default `false` |
| `created_at` | TIMESTAMPTZ | Automático |

**Reglas de negocio implementadas:**

1. **Máximo 15 imágenes por servicio**: si se intenta insertar una imagen número 16, la base de datos rechaza la operación.
2. **Una sola portada por servicio**: al marcar una imagen como `is_cover = true`, automáticamente se le quita esa marca a cualquier otra imagen del mismo servicio que la tuviera. Nunca pueden coexistir dos portadas para el mismo servicio.
3. **Eliminación en cascada**: si se elimina un servicio, todas sus imágenes se eliminan automáticamente (los registros de la tabla; los archivos físicos en Storage deben eliminarse desde la aplicación al momento de borrar el servicio).

---

## 6.7 `specialists`

Equipo profesional mostrado públicamente.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | UUID (PK) | Generado automáticamente |
| `name` | VARCHAR(255) | Obligatorio |
| `slug` | VARCHAR(255) | Único. **Generado automáticamente, no editable** |
| `photo_url` | TEXT | Obligatorio |
| `position` | VARCHAR(255) | Obligatorio (cargo) |
| `description` | TEXT | Opcional |
| `certifications` | JSONB | Lista de certificaciones. Default `[]` |
| `whatsapp` | VARCHAR(50) | Opcional |
| `social_links` | JSONB | Objeto con redes sociales. Default `{}` |
| `schedules` | JSONB | Horarios de atención. Default `[]` |
| `is_visible` | BOOLEAN | Default `true` |
| `created_at` / `updated_at` | TIMESTAMPTZ | Automáticos |

El slug se genera con la misma lógica y garantías que en `services`.

---

## 6.8 `service_specialists`

Tabla de relación muchos a muchos entre `services` y `specialists`.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | UUID (PK) | Generado automáticamente |
| `service_id` | UUID | FK a `services.id` (`ON DELETE CASCADE`) |
| `specialist_id` | UUID | FK a `specialists.id` (`ON DELETE CASCADE`) |
| `created_at` | TIMESTAMPTZ | Automático |

Restricción: combinación `(service_id, specialist_id)` única.

**Regla de negocio crítica:** al eliminar un especialista **solo se elimina esta relación**; los servicios asociados permanecen intactos. De igual forma, al eliminar un servicio, solo se elimina la relación; los especialistas permanecen intactos.

---

## 6.9 `contact_forms`

Solicitudes de contacto enviadas desde el sitio público.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | UUID (PK) | Generado automáticamente |
| `full_name` | VARCHAR(255) | Obligatorio. Mínimo 2 caracteres |
| `phone` | VARCHAR(50) | Obligatorio |
| `email` | VARCHAR(255) | Obligatorio. Debe tener formato de correo válido |
| `service_interest_id` | UUID | **Opcional.** FK a `services.id` (`ON DELETE SET NULL`) |
| `message` | TEXT | Obligatorio. Mínimo 10 caracteres |
| `ip_address` | INET | Opcional (registrado por el backend) |
| `status` | `contact_form_status` (ENUM) | Default `PENDING` |
| `created_at` | TIMESTAMPTZ | Automático |
| `read_at` | TIMESTAMPTZ | Se completa automáticamente al cambiar a `READ` |
| `archived_at` | TIMESTAMPTZ | Se completa automáticamente al cambiar a `ARCHIVED` |

> **Decisión de diseño relevante:** `service_interest_id` se implementó como **clave foránea** hacia `services` (en lugar de texto libre), para mantener integridad y permitir reportes futuros de qué servicios generan más consultas. Si el servicio relacionado se elimina más adelante, el formulario **no se borra** — solo se limpia esa referencia (`SET NULL`), preservando el historial comercial.

**Reglas de negocio implementadas:**

1. Validación de formato de correo electrónico a nivel de base de datos.
2. Los formularios **nunca se eliminan automáticamente** — solo se archivan. La eliminación manual está restringida únicamente al rol `SUPER_ADMIN` (no usado en el MVP).
3. Las marcas de tiempo `read_at` y `archived_at` se generan solas; no es necesario que la aplicación las envíe.

---

## 6.10 `settings`

Configuración global del sistema, en formato clave/valor (JSONB), pensada para escalar sin necesidad de nuevas columnas o tablas.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | UUID (PK) | Generado automáticamente |
| `key` | VARCHAR(100) | Único, obligatorio |
| `value` | JSONB | Obligatorio |
| `created_at` / `updated_at` | TIMESTAMPTZ | Automáticos |

**Datos precargados (información real proporcionada por el cliente):**

| key | value |
|---|---|
| `whatsapp_primary` | `"+573113118625"` |
| `phone_secondary_1` | `"+573143411955"` |
| `phone_secondary_2` | `"+573135105205"` |
| `social_instagram` | `"https://www.instagram.com/lagospaesteticasalud"` |
| `social_facebook` | `"https://www.facebook.com/profile.php?id=61577780604356"` |
| `business_city` | `"Sogamoso"` |
| `business_department` | `"Boyacá"` |
| `business_country` | `"Colombia"` |

**Pendiente de cargar** (faltó confirmación del cliente al momento de instalar la base de datos):

* `business_address` (dirección exacta).
* Correo electrónico oficial del negocio.
* Horarios de atención.

Para agregarlos más adelante, ejecutar en el SQL Editor:

```sql
insert into public.settings (key, value)
values ('business_address', '"Dirección exacta aquí"')
on conflict (key) do update set value = excluded.value;
```

> ⚠️ **Importante sobre seguridad:** esta tabla es **100% privada** (solo accesible por administradores autenticados, ver sección 8). El sitio público nunca la consulta directamente desde el navegador. Estos valores deben ser leídos desde el servidor (Server Components o Server Actions de Next.js) usando el cliente con privilegios elevados, y luego entregados al frontend ya procesados.

---

## 6.11 `promotion_rules`

Tabla reservada para automatizaciones de promociones más complejas en fases futuras (por ejemplo, reglas recurrentes, promociones por franjas horarias, etc.). **No se utiliza activamente en el MVP** — toda la lógica actual de promociones vive directamente en los campos `is_promotional`, `promotion_start` y `promotion_end` de la tabla `services`.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | UUID (PK) | Generado automáticamente |
| `service_id` | UUID | FK a `services.id` (`ON DELETE CASCADE`) |
| `starts_at` | TIMESTAMPTZ | Obligatorio |
| `ends_at` | TIMESTAMPTZ | Obligatorio. Debe ser posterior a `starts_at` |
| `created_at` | TIMESTAMPTZ | Automático |

---

# 7. AUTOMATIZACIONES Y FUNCIONES PERSONALIZADAS

## 7.1 Generación de slugs (`slugify` y `generate_unique_slug`)

Convierten cualquier texto (ej. `"Limpieza Facial Profunda"`) en una URL amigable (`limpieza-facial-profunda`), eliminando tildes, la letra "ñ", signos de puntuación y espacios, y garantizando que el resultado sea único agregando `-2`, `-3`, etc. en caso de colisión.

Se usa automáticamente en `services` y `specialists` mediante triggers — **nunca debe generarse manualmente desde la aplicación**.

## 7.2 Actualización automática de `updated_at` (`set_updated_at`)

Cualquier tabla con columna `updated_at` la actualiza automáticamente con la fecha/hora actual en cada modificación, sin que la aplicación tenga que enviarla.

## 7.3 Límite y portada única de imágenes

* `service_images_enforce_limit`: bloquea la inserción de una imagen número 16 o superior para un mismo servicio.
* `service_images_enforce_single_cover`: garantiza que solo exista una imagen marcada como portada por servicio.

## 7.4 Marcas de tiempo automáticas en formularios

`contact_forms_set_status_timestamps`: completa automáticamente `read_at` y `archived_at` cuando el estado del formulario cambia a `READ` o `ARCHIVED`, respectivamente.

## 7.5 Sincronización de usuarios (`handle_new_auth_user`)

Cada vez que se crea un usuario en *Authentication* (Supabase Auth), se crea automáticamente su fila correspondiente en `public.users`. **No se debe insertar manualmente en `public.users`.**

## 7.6 Archivado automático de promociones vencidas (`archive_expired_promotions`)

Revisa todos los servicios marcados como `is_promotional = true` cuya fecha `promotion_end` ya pasó, y los cambia automáticamente a `status = 'ARCHIVED'`.

Esta función es ejecutada automáticamente todos los días por el **cron job** descrito en la sección 9 — no requiere intervención manual.

## 7.7 Funciones de autorización (`is_admin`, `has_role`)

Usadas internamente por las políticas de seguridad (sección 8) para determinar si el usuario que hace la consulta tiene permisos administrativos. No están pensadas para ser llamadas directamente desde el frontend, aunque pueden usarse en consultas SQL de diagnóstico.

```sql
-- Ejemplo: verificar si el usuario actualmente autenticado es admin
select public.is_admin();

-- Ejemplo: verificar si tiene un rol específico
select public.has_role('OWNER');
```

---

# 8. SEGURIDAD: ROW LEVEL SECURITY (RLS)

**RLS está habilitado en las 11 tablas**, sin excepción. Esto significa que, por defecto, ninguna fila es accesible a menos que exista una política explícita que lo permita.

## 8.1 Resumen de acceso por tabla

| Tabla | Lectura pública (anónimos) | Lectura admin | Escritura |
|---|---|---|---|
| `roles` | ❌ No | ✅ Sí | Solo `SUPER_ADMIN` |
| `users` | ❌ No (excepto su propio registro) | ✅ Sí | Propio usuario o `SUPER_ADMIN` |
| `user_roles` | ❌ No | ✅ Sí | Solo `SUPER_ADMIN` |
| `categories` | ✅ Sí (solo activas) | ✅ Sí (todas) | Solo admin |
| `services` | ✅ Sí (solo `status = PUBLIC`) | ✅ Sí (todas) | Solo admin |
| `service_images` | ✅ Sí (si el servicio es público) | ✅ Sí (todas) | Solo admin |
| `specialists` | ✅ Sí (solo `is_visible = true`) | ✅ Sí (todos) | Solo admin |
| `service_specialists` | ✅ Sí (si ambos extremos son públicos/visibles) | ✅ Sí (todas) | Solo admin |
| `contact_forms` | ✅ Solo **insertar** (no leer) | ✅ Sí (leer/gestionar) | Insert: cualquiera. Update: admin. Delete: solo `SUPER_ADMIN` |
| `settings` | ❌ No | ✅ Sí | Solo admin |
| `promotion_rules` | ❌ No | ✅ Sí | Solo admin |

## 8.2 ¿Qué significa "admin" en este contexto?

La función `is_admin()` retorna `true` si el usuario autenticado actual tiene **al menos un rol activo** asignado en `user_roles` (vinculado a un registro `is_active = true` en `users`). En el MVP, el único rol activo es `OWNER`, por lo que en la práctica **"admin" equivale a "tiene rol OWNER"**.

La función `has_role('NOMBRE_ROL')` permite verificar un rol específico, usada para acciones más sensibles (gestión de usuarios y roles), restringidas exclusivamente a `SUPER_ADMIN` aunque ese rol no esté operativo todavía — esto evita tener que tocar la base de datos cuando se implemente ese rol en el futuro.

## 8.3 Caso especial: formularios de contacto

Cualquier visitante anónimo (sin necesidad de autenticarse) puede **enviar** un formulario de contacto (`INSERT`), pero **nadie puede leer, listar o modificar** formularios excepto un administrador autenticado. Esto evita que cualquier persona pueda ver las solicitudes de otros clientes simplemente consultando la tabla desde el navegador.

## 8.4 Caso especial: `settings`

Esta tabla es completamente privada, incluso para lectura. Aunque contiene datos que *eventualmente* se muestran en el sitio público (como el número de WhatsApp o el enlace de Instagram), la forma correcta y segura de exponerlos es que el **servidor** (no el navegador) los consulte usando credenciales con privilegios elevados y los entregue ya procesados al frontend. Esto evita exponer toda la tabla de configuración interna a cualquier visitante.

---

# 9. CRON JOB: ARCHIVADO AUTOMÁTICO DE PROMOCIONES

| Propiedad | Valor |
|---|---|
| Nombre del job | `archive-expired-promotions` |
| Frecuencia | Diaria, a las **00:05 UTC** |
| Función ejecutada | `public.archive_expired_promotions()` |
| Efecto | Cambia a `ARCHIVED` cualquier servicio promocional cuya `promotion_end` ya pasó |

## 9.1 Comandos útiles de administración

**Ver todos los cron jobs activos:**

```sql
select * from cron.job;
```

**Ver el historial de ejecuciones (últimas 20):**

```sql
select * from cron.job_run_details order by start_time desc limit 20;
```

**Eliminar el job (si fuera necesario):**

```sql
select cron.unschedule('archive-expired-promotions');
```

**Volver a crearlo (si se eliminó por error):**

```sql
select cron.schedule(
  'archive-expired-promotions',
  '5 0 * * *',
  $$select public.archive_expired_promotions();$$
);
```

> Nota sobre horario: `00:05 UTC` no corresponde directamente a la hora de Colombia (UTC-5). En la práctica, este job corre aproximadamente a las **7:05 p.m.** hora de Sogamoso/Bogotá del día anterior según la fecha UTC. Esto es aceptable para esta automatización (no requiere precisión al minuto), pero si en el futuro se requiere un horario exacto en hora local, el cron debe ajustarse sumando/restando el offset correspondiente.

---

# 10. ALMACENAMIENTO DE ARCHIVOS (STORAGE)

Se configuraron **3 buckets**, todos con **lectura pública** (necesario para que las imágenes se vean en el sitio sin autenticación) y **escritura restringida exclusivamente a administradores autenticados**.

| Bucket | Contenido | Público (lectura) | Tamaño máximo por archivo | Formatos permitidos |
|---|---|---|---|---|
| `services` | Imágenes de servicios y promociones | ✅ Sí | 15 MB | JPG, JPEG, PNG, WEBP |
| `specialists` | Fotografías de especialistas | ✅ Sí | 15 MB | JPG, JPEG, PNG, WEBP |
| `static` | Logo, hero, contenido institucional fijo | ✅ Sí | 15 MB | JPG, JPEG, PNG, WEBP |

**Reglas de escritura:** solo un usuario que cumpla `is_admin() = true` puede subir (`INSERT`), reemplazar (`UPDATE`) o eliminar (`DELETE`) archivos en estos buckets. Cualquier persona, incluso sin sesión, puede **leer/ver** los archivos.

## 10.1 Convención de nomenclatura recomendada

Aunque la base de datos no impone esta convención técnicamente, se recomienda seguir esta estructura al subir archivos desde la aplicación (alineado con el TDD):

```text
bucket/entity-id/archivo.ext

Ejemplo:
services/9b3d53a1-xxxx-xxxx/cover.webp
services/9b3d53a1-xxxx-xxxx/gallery-1.webp
specialists/c2f8d3aa-xxxx-xxxx/photo.webp
```

Esto facilita la limpieza de archivos huérfanos y evita colisiones de nombres.

---

# 11. DATOS PRECARGADOS (SEED DATA) — ESTADO ACTUAL

| Tabla | Registros cargados |
|---|---|
| `roles` | `OWNER`, `EMPLOYEE`, `SUPER_ADMIN` |
| `categories` | Facial, Corporal, Salud, Spa |
| `settings` | WhatsApp, teléfonos secundarios, Instagram, Facebook, ciudad/departamento/país |
| `users` | 1 usuario administrador (creado manualmente vía Authentication) |
| `user_roles` | El usuario administrador tiene asignado el rol `OWNER` |

---

# 12. USUARIO ADMINISTRADOR — ESTADO ACTUAL

✅ Ya completado:

1. Usuario administrador creado en **Authentication → Users**.
2. Rol `OWNER` asignado correctamente en `user_roles`.
3. Verificado mediante consulta de confirmación (sin errores).

A partir de este punto, ese usuario puede iniciar sesión en `/admin/login` y tendrá acceso administrativo completo a todos los módulos, validado automáticamente por las políticas RLS descritas en la sección 8.

### Para crear administradores adicionales en el futuro:

```sql
-- 1. Crear el usuario desde Authentication > Users > Add User (Dashboard de Supabase)

-- 2. Asignarle el rol OWNER (reemplazar el correo):
insert into public.user_roles (user_id, role_id)
select u.id, r.id
from public.users u
join public.roles r on r.name = 'OWNER'
where u.email = 'nuevo-correo@ejemplo.com'
on conflict (user_id, role_id) do nothing;
```

---

# 13. INFORMACIÓN PENDIENTE POR CONFIRMAR

Estos datos no se cargaron porque aún no fueron suministrados por el cliente. El sistema funciona sin ellos, pero deben completarse antes de salir a producción real:

* [ ] Dirección física exacta del establecimiento (`business_address`).
* [ ] Correo electrónico oficial del negocio (usado para notificaciones de formularios — requiere también configurar Resend).
* [ ] Horarios de atención.

Cuando estén disponibles, se cargan así:

```sql
insert into public.settings (key, value)
values
  ('business_address', '"Dirección exacta aquí"'),
  ('business_email', '"correo@lagospa.com"'),
  ('business_hours', '"Lunes a Sábado, 8:00 a.m. - 7:00 p.m."')
on conflict (key) do update set value = excluded.value;
```

---

# 14. LIMITACIONES CONOCIDAS DEL MVP (INTENCIONALES)

Estas limitaciones **no son errores** — fueron decisiones de diseño explícitas para mantener el MVP simple y dentro del alcance acordado:

* No existe gestión de categorías desde el panel (son fijas: Facial, Corporal, Salud, Spa).
* No existe historial de cambios ni auditoría administrativa.
* Los roles `EMPLOYEE` y `SUPER_ADMIN` existen en la base de datos pero no tienen lógica diferenciada implementada todavía — funcionalmente, solo `OWNER` está operativo.
* `promotion_rules` existe como tabla pero no se usa activamente; la lógica real de promociones vive en `services`.
* No hay límite de tasa (rate limiting) ni CAPTCHA a nivel de base de datos para los formularios — esa protección debe implementarse en la capa de aplicación (Server Actions / Route Handlers), según TDD-225.
* El cron de expiración de promociones corre en horario UTC, no en horario local de Colombia (ver nota en sección 9).

---

# 15. CHECKLIST DE VERIFICACIÓN

Usa esta lista para confirmar que la base de datos está correctamente instalada y operativa:

- [x] Las 11 tablas existen en el esquema `public`.
- [x] RLS está habilitado en las 11 tablas.
- [x] Las 32 políticas de seguridad están creadas.
- [x] Los 3 buckets de Storage existen y son públicos para lectura.
- [x] El cron job `archive-expired-promotions` aparece en `cron.job`.
- [x] Los roles `OWNER`, `EMPLOYEE`, `SUPER_ADMIN` existen en la tabla `roles`.
- [x] Las 4 categorías (Facial, Corporal, Salud, Spa) existen.
- [x] Los datos de contacto (WhatsApp, redes sociales) están en `settings`.
- [x] Existe al menos un usuario con rol `OWNER` asignado.
- [ ] Dirección, correo y horarios del negocio cargados en `settings` (pendiente).
- [ ] Primer servicio de prueba creado y visible correctamente en el sitio público.
- [ ] Primer especialista de prueba creado y visible correctamente en el sitio público.
- [ ] Prueba de envío de formulario de contacto desde el sitio público realizada con éxito.

---

# 16. PRÓXIMOS PASOS RECOMENDADOS

1. Completar la información pendiente en `settings` (sección 13).
2. Configurar el proveedor de correo (Resend) para que los formularios notifiquen al correo del negocio.
3. Crear el primer servicio y el primer especialista reales desde el panel administrativo para validar que todo el flujo (slug automático, imágenes, relaciones) funciona de extremo a extremo.
4. Verificar visualmente en Supabase (`Database → Tables`) que las políticas RLS no bloqueen accidentalmente la app cuando esté conectada.
5. Antes de pasar a producción, revisar el checklist de la sección 15 completo.

---

*Documento generado para el proyecto Lago Spa · Estética · Salud — control de versiones recomendado junto al repositorio de código.*
