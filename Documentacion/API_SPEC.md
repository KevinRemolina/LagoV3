# API_SPEC.md

## Especificación de API — Lago Spa · Estética · Salud

**Versión:** 1.0
**Stack:** Next.js 15 (App Router) + Supabase (PostgreSQL, Auth, Storage)
**Estado:** Alineado con TDD v1.0, FRD v1.0, Database.md v1.0
**Idioma del sistema:** Español (código en inglés, según TDD-517)

---

# 1. PROPÓSITO DE ESTE DOCUMENTO

Este documento es la **fuente única de verdad** sobre la capa de API/lógica de negocio del proyecto Lago Spa · Estética · Salud.

No describe un backend REST tradicional, porque **este proyecto no tiene uno**. Según TDD-004 y TDD-201, la arquitectura es un **monolito moderno Next.js**, sin NestJS, Express, Fastify ni ningún framework backend independiente.

Toda la "API" del sistema vive dentro de Next.js mediante tres mecanismos, y **solo estos tres**:

```text
1. Data Access Layer (Server Components / Queries)
   → Lecturas públicas, directo a Supabase con el cliente anónimo.

2. Server Actions
   → Todas las mutaciones (crear, editar, eliminar, archivar, marcar, etc.)

3. Route Handlers (/api/*)
   → Únicamente para los 2 casos reales del MVP:
     - /api/contact   (recepción de formulario desde el sitio público)
     - /api/upload    (subida de imágenes desde el panel administrativo)
```

No se documentará nada fuera de esto. No existen microservicios, no existe GraphQL, no existe un API Gateway, no existen webhooks activos en el MVP (están reservados para fases futuras, ver TDD-227 y FR-406).

Este documento debe permitir que cualquier desarrollador, o cualquier herramienta de IA generando código, sepa **exactamente**:

* Qué función/endpoint existe.
* Qué datos recibe (forma exacta).
* Qué validaciones aplica (Zod) antes de tocar la base de datos.
* Qué responde en éxito y en error.
* Qué tabla(s) de `Database.md` toca.
* Qué reglas de negocio del FRD enforce.
* Quién puede llamarla (anónimo vs administrador `OWNER`).

---

# 2. ARQUITECTURA GENERAL DE LA API

```text
Cliente (Browser)
      │
      ▼
┌─────────────────────────────────────────────┐
│              Next.js 15 (App Router)         │
│                                               │
│  Server Components ──► supabaseServer (anon) │ → Lecturas públicas
│                                               │
│  Server Actions ──────► supabaseServer        │ → Mutaciones admin
│        (sesión validada en cada acción)       │
│                                               │
│  Route Handlers ──────► supabaseServer        │ → /api/contact
│   (/api/contact, /api/upload)                 │ → /api/upload
└─────────────────────────────────────────────┘
      │
      ▼
Supabase
  ├── PostgreSQL (RLS activo en las 11 tablas)
  ├── Auth (sesión OWNER)
  └── Storage (buckets: services, specialists, static)
```

## 2.1 Regla de oro

Ninguna mutación de datos deberá ejecutarse jamás directamente desde el navegador contra Supabase usando el cliente público. **Toda escritura pasa por una Server Action o un Route Handler**, que valida sesión, rol y payload con Zod antes de tocar la base de datos.

RLS (sección 8 de `Database.md`) es la **segunda capa de seguridad**, no la primera. La primera siempre es la validación explícita en el servidor (TDD-206, TDD-228).

## 2.2 Dos clientes de Supabase usados en este documento

```typescript
// lib/supabase/server.ts
supabaseServer    // usa la sesión del usuario autenticado (cookies)
                  // usado en Server Components, Server Actions y Route Handlers
                  // respeta RLS según el usuario autenticado (o anónimo)

// lib/supabase/admin.ts
supabaseAdmin     // usa SUPABASE_SERVICE_ROLE_KEY
                  // SOLO para operaciones server-side que requieran
                  // saltar RLS de forma controlada (ej: revisar settings
                  // internos para exponerlos procesados al público).
                  // NUNCA se expone al navegador. NUNCA se usa en Route
                  // Handlers públicos sin control estricto.
```

En este documento, cuando se indique `supabaseServer`, se asume que la sesión (o ausencia de ella) determina lo que las políticas RLS permiten.

---

# 3. CONVENCIONES GENERALES

## 3.1 Formato de respuesta estándar (TDD-215)

Todas las Server Actions y Route Handlers devuelven **siempre** una de estas dos formas:

### Éxito

```json
{
  "success": true,
  "data": { }
}
```

### Error

```json
{
  "success": false,
  "message": "Mensaje amigable para el usuario.",
  "code": "VALIDATION_ERROR"
}
```

## 3.2 Códigos de error internos (`code`)

Estos códigos son internos (para logs y manejo en frontend), **nunca se muestran tal cual al usuario** (UI-413, UI-339):

| code | Significado |
|---|---|
| `VALIDATION_ERROR` | El payload no pasó Zod. |
| `UNAUTHORIZED` | No hay sesión activa. |
| `FORBIDDEN` | Hay sesión, pero el rol no tiene permiso. |
| `NOT_FOUND` | El recurso solicitado no existe. |
| `BUSINESS_RULE_VIOLATION` | Se violó una regla de negocio (ej. fecha fin antes que fecha inicio). |
| `LIMIT_EXCEEDED` | Se superó un límite (ej. 15 imágenes). |
| `STORAGE_ERROR` | Falló la subida/eliminación en Supabase Storage. |
| `EMAIL_ERROR` | Falló el envío con Resend (no bloquea el guardado, TDD-219). |
| `DATABASE_ERROR` | Error inesperado de Postgres/Supabase. |
| `INTERNAL_ERROR` | Cualquier otro error no controlado. |

## 3.3 Convención de nombres

* Funciones y variables: `camelCase` (`createService`, `serviceId`).
* Columnas de base de datos: `snake_case` (`category_id`, `is_featured`) — ver TDD-517.
* Las Server Actions traducen explícitamente entre ambos formatos. Ningún `snake_case` debe llegar al frontend ni viceversa sin pasar por ese mapeo.

## 3.4 Validación

Toda Server Action y todo Route Handler **debe** validar su entrada con un esquema Zod antes de llamar a Supabase. Los esquemas viven en `features/<entidad>/schemas/`.

## 3.5 Autenticación y autorización (aplica a TODA Server Action administrativa)

Toda Server Action del panel administrativo ejecuta, en este orden, antes de cualquier lógica:

```typescript
1. const session = await getSession();
   if (!session) return { success: false, message: "No autenticado.", code: "UNAUTHORIZED" };

2. const isAdmin = await checkIsAdmin(session.user.id); // usa is_admin() de Database.md
   if (!isAdmin) return { success: false, message: "No tienes permisos.", code: "FORBIDDEN" };

3. const parsed = schema.safeParse(input);
   if (!parsed.success) return { success: false, message: "Datos inválidos.", code: "VALIDATION_ERROR" };

4. // lógica de negocio + llamada a Supabase
```

En el MVP, "admin" equivale siempre a rol `OWNER` (Database.md, sección 8.2). No existe lógica diferenciada para `EMPLOYEE` ni `SUPER_ADMIN` — la arquitectura solo está preparada para ellos, no implementada (FR-208.2).

---

# 4. DATA ACCESS LAYER — LECTURAS PÚBLICAS

## 4.1 Objetivo

Estas no son "endpoints" en el sentido HTTP. Son funciones de consulta (`queries`) llamadas directamente desde Server Components, usando `supabaseServer` sin sesión (rol `anon`). RLS permite la lectura solo de lo que es público (Database.md, sección 8.1).

Se documentan aquí porque son la forma real en que el sitio público obtiene sus datos — no existe una capa REST intermedia (TDD-209, Database.md sección 8).

Ubicación en el código: `features/<entidad>/queries/`.

## 4.2 `getPublishedServices`

**Usado en:** Home (destacados), página de categoría, página de servicio (relacionados).

```typescript
async function getPublishedServices(params?: {
  categorySlug?: string;
  featuredOnly?: boolean;
  limit?: number;
}): Promise<Service[]>
```

**Consulta real (Supabase JS):**

```typescript
let query = supabaseServer
  .from('services')
  .select(`
    id, title, slug, short_description, price, show_price,
    is_featured, is_promotional,
    category:categories(id, name, slug),
    cover_image:service_images(storage_path)
  `)
  .eq('status', 'PUBLIC')
  .order('created_at', { ascending: false });

if (params?.categorySlug) {
  query = query.eq('categories.slug', params.categorySlug);
}
if (params?.featuredOnly) {
  query = query.eq('is_featured', true);
}
if (params?.limit) {
  query = query.limit(params.limit);
}
```

**Respuesta (forma JSON entregada al componente):**

```json
[
  {
    "id": "9b3d53a1-xxxx",
    "title": "Limpieza Facial Profunda",
    "slug": "limpieza-facial-profunda",
    "shortDescription": "Renueva tu piel con tecnología avanzada.",
    "price": 180000,
    "showPrice": true,
    "isFeatured": true,
    "isPromotional": false,
    "category": { "id": "...", "name": "Facial", "slug": "facial" },
    "coverImageUrl": "https://xxxx.supabase.co/storage/v1/object/public/services/.../cover.webp"
  }
]
```

**Regla de negocio aplicada (RN-302.6, RN-302.7):** únicamente `status = PUBLIC`. Nunca se exponen `PRIVATE` ni `ARCHIVED` desde esta función.

---

## 4.3 `getServiceBySlug`

**Usado en:** Página de servicio `/servicios/[slug]`.

```typescript
async function getServiceBySlug(slug: string): Promise<Service | null>
```

**Consulta:**

```typescript
const { data, error } = await supabaseServer
  .from('services')
  .select(`
    *,
    category:categories(id, name, slug),
    images:service_images(id, storage_path, alt_text, sort_order, is_cover),
    specialists:service_specialists(specialist:specialists(id, name, slug, photo_url, position))
  `)
  .eq('slug', slug)
  .eq('status', 'PUBLIC')
  .maybeSingle();
```

**Comportamiento si no existe o no es público:** `data` será `null` → el Server Component invoca `notFound()` de Next.js → página 404 (UI-343, FR-113.3). **Nunca** se debe usar `.single()` (lanza error 500); siempre `.maybeSingle()`.

**Respuesta JSON (ejemplo simplificado):**

```json
{
  "id": "9b3d53a1-xxxx",
  "title": "Limpieza Facial Profunda",
  "slug": "limpieza-facial-profunda",
  "description": "Tratamiento que combina...",
  "benefits": ["Mejora apariencia", "Favorece circulación"],
  "includedServices": ["Limpieza profunda", "Mascarilla calmante"],
  "recommendations": "Evitar exposición solar 24 horas.",
  "contraindications": "No recomendado en piel con heridas activas.",
  "price": 180000,
  "showPrice": true,
  "isPromotional": false,
  "category": { "id": "...", "name": "Facial", "slug": "facial" },
  "images": [
    { "id": "...", "url": "https://.../cover.webp", "altText": "Sala de tratamiento facial", "isCover": true, "sortOrder": 0 }
  ],
  "specialists": [
    { "id": "...", "name": "María Pérez", "slug": "maria-perez", "photoUrl": "https://...", "position": "Esteticista Senior" }
  ]
}
```

---

## 4.4 `getCategoryBySlug`

**Usado en:** Página de categoría `/servicios/[categoria]`.

```typescript
async function getCategoryBySlug(slug: string): Promise<Category | null>
```

```typescript
const { data } = await supabaseServer
  .from('categories')
  .select('id, name, slug, description')
  .eq('slug', slug)
  .eq('is_active', true)
  .maybeSingle();
```

Si `data` es `null` → 404. Las categorías son fijas (RN-001): Facial, Corporal, Salud, Spa. No existe acción para crear/eliminar categorías.

---

## 4.5 `getVisibleSpecialists`

**Usado en:** Home (destacados), página `/especialistas`.

```typescript
async function getVisibleSpecialists(limit?: number): Promise<Specialist[]>
```

```typescript
const { data } = await supabaseServer
  .from('specialists')
  .select('id, name, slug, photo_url, position, description')
  .eq('is_visible', true)
  .order('created_at', { ascending: false })
  .limit(limit ?? 100);
```

---

## 4.6 `getSpecialistBySlug`

**Usado en:** Perfil de especialista `/especialistas/[slug]`.

```typescript
async function getSpecialistBySlug(slug: string): Promise<SpecialistProfile | null>
```

```typescript
const { data } = await supabaseServer
  .from('specialists')
  .select(`
    *,
    services:service_specialists(service:services(id, title, slug, short_description, status))
  `)
  .eq('slug', slug)
  .eq('is_visible', true)
  .maybeSingle();
```

**Regla:** los servicios asociados que se muestren en el perfil deben filtrarse en el componente a `status = PUBLIC` antes de renderizar (UI-317), porque la relación `service_specialists` no filtra por estado del servicio.

---

## 4.7 Lectura de `settings` (uso interno, NO pública)

**No existe** una query pública para `settings`. Esta tabla es 100% privada incluso para lectura (Database.md, sección 6.10 y 8.4).

Los valores que sí deben mostrarse en el sitio público (WhatsApp, Instagram, Facebook, ciudad) se leen **una sola vez en build/request time desde el servidor** usando `supabaseAdmin`, y se entregan ya procesados a los componentes — nunca se expone la tabla completa ni se consulta desde el cliente.

```typescript
// lib/settings/getPublicSettings.ts
async function getPublicSettings(): Promise<{
  whatsappPrimary: string;
  instagramUrl: string;
  facebookUrl: string;
  city: string;
}> {
  const { data } = await supabaseAdmin
    .from('settings')
    .select('key, value')
    .in('key', ['whatsapp_primary', 'social_instagram', 'social_facebook', 'business_city']);

  // mapeo manual key -> campo camelCase
}
```

Esta función se usa en el layout público (header, footer, botón flotante de WhatsApp) y en la página de Contacto.

---

# 5. SERVER ACTIONS — AUTENTICACIÓN

Ubicación: `features/auth/actions/`.

## 5.1 `loginAction`

**Quién la usa:** Formulario en `/admin/login` (UI-404 a UI-413).

```typescript
async function loginAction(input: LoginInput): Promise<ActionResult<{ redirectTo: string }>>
```

**Schema Zod:**

```typescript
const loginSchema = z.object({
  email: z.string().email("Correo inválido."),
  password: z.string().min(1, "La contraseña es obligatoria."),
});
```

**Payload de entrada:**

```json
{
  "email": "admin@lagospa.com",
  "password": "********"
}
```

**Lógica:**

```typescript
const { error } = await supabaseServer.auth.signInWithPassword({
  email: input.email,
  password: input.password,
});
```

**Respuesta éxito:**

```json
{ "success": true, "data": { "redirectTo": "/admin" } }
```

**Respuesta error (UI-413 — nunca exponer el error real de Supabase):**

```json
{ "success": false, "message": "Correo o contraseña incorrectos.", "code": "UNAUTHORIZED" }
```

---

## 5.2 `logoutAction`

**Quién la usa:** Botón "Cerrar sesión" en header administrativo (UI-420, UI-421).

```typescript
async function logoutAction(): Promise<ActionResult<{ redirectTo: string }>>
```

```typescript
await supabaseServer.auth.signOut();
```

```json
{ "success": true, "data": { "redirectTo": "/admin/login" } }
```

---

## 5.3 Recuperación de contraseña

Según UI-415 a UI-419, el flujo de recuperación se delega completamente a Supabase Auth (`resetPasswordForEmail` + página gestionada por Supabase). No es obligatorio en el MVP (FR-201.4) pero la arquitectura está lista. Si se implementa, sería:

```typescript
async function requestPasswordResetAction(input: { email: string }): Promise<ActionResult<null>>
```

```typescript
await supabaseServer.auth.resetPasswordForEmail(input.email, {
  redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/reset-password`,
});
```

**Respuesta (siempre la misma, exista o no la cuenta, por seguridad — UI-418):**

```json
{ "success": true, "data": null }
```

con mensaje en frontend: *"Si existe una cuenta asociada a este correo, recibirás instrucciones para recuperar tu contraseña."*

---

# 6. SERVER ACTIONS — SERVICIOS

Ubicación: `features/services/actions/`. Tabla destino: `services` (Database.md 6.5).

## 6.1 `createServiceAction`

```typescript
async function createServiceAction(input: CreateServiceInput): Promise<ActionResult<{ id: string; slug: string }>>
```

**Schema Zod** (refleja exactamente FR-203.3 y RN-303.2/303.3):

```typescript
const createServiceSchema = z.object({
  title: z.string().min(3, "El nombre del servicio es obligatorio."),
  categoryId: z.string().uuid("Selecciona una categoría."),
  shortDescription: z.string().max(280).optional(),
  description: z.string().min(10, "La descripción es obligatoria."),
  benefits: z.array(z.string()).default([]),
  includedServices: z.array(z.string()).default([]),
  recommendations: z.string().optional(),
  contraindications: z.string().optional(),
  observations: z.string().optional(),
  price: z.number().nonnegative("El precio no puede ser negativo.").optional(),
  showPrice: z.boolean().default(true),
  status: z.enum(['PUBLIC', 'PRIVATE', 'ARCHIVED']).default('PUBLIC'),
  isFeatured: z.boolean().default(false),
  isPromotional: z.boolean().default(false),
  promotionStart: z.string().datetime().optional(),
  promotionEnd: z.string().datetime().optional(),
  specialistIds: z.array(z.string().uuid()).default([]),
}).refine(
  (data) => !data.isPromotional || (data.promotionStart && data.promotionEnd),
  { message: "Las fechas de promoción son obligatorias si el servicio es promocional.", path: ["promotionStart"] }
).refine(
  (data) => !data.isPromotional || new Date(data.promotionEnd!) > new Date(data.promotionStart!),
  { message: "La fecha final debe ser posterior a la fecha inicial.", path: ["promotionEnd"] }
);
```

**Payload de entrada (ejemplo real):**

```json
{
  "title": "Limpieza Facial Profunda",
  "categoryId": "c1a2b3c4-facial-uuid",
  "shortDescription": "Renueva tu piel con tecnología avanzada.",
  "description": "Tratamiento que combina extracción manual, alta frecuencia y mascarilla calmante para una piel renovada.",
  "benefits": ["Mejora apariencia", "Favorece circulación", "Reduce impurezas"],
  "includedServices": ["Limpieza profunda", "Extracción", "Mascarilla calmante"],
  "recommendations": "Evitar exposición solar directa durante 24 horas.",
  "contraindications": "No recomendado en piel con heridas activas o acné severo.",
  "price": 180000,
  "showPrice": true,
  "status": "PUBLIC",
  "isFeatured": true,
  "isPromotional": false,
  "specialistIds": ["specialist-uuid-1", "specialist-uuid-2"]
}
```

**Lógica (en este orden):**

```typescript
1. Validar sesión + rol admin (sección 3.5).
2. Validar payload con createServiceSchema.
3. Insertar en `services` (snake_case). El slug NO se envía — lo genera
   el trigger `generate_unique_slug` de Database.md 7.1 automáticamente
   a partir de `title`. RN-302.3: el slug nunca es editable desde la app.
4. Si `specialistIds` no está vacío, insertar filas en `service_specialists`
   (una por cada id, con `service_id` = id recién creado).
5. revalidatePath('/servicios') y revalidatePath('/') (TDD-329).
6. Retornar { id, slug } generados.
```

**Respuesta éxito:**

```json
{
  "success": true,
  "data": {
    "id": "9b3d53a1-xxxx",
    "slug": "limpieza-facial-profunda"
  }
}
```

**Respuesta error (ejemplo — categoría faltante):**

```json
{
  "success": false,
  "message": "Selecciona una categoría.",
  "code": "VALIDATION_ERROR"
}
```

**Respuesta error (ejemplo — slug duplicado a nivel de negocio, normalmente resuelto por el trigger, pero si llegara a fallar):**

```json
{
  "success": false,
  "message": "No fue posible guardar el servicio. Intenta nuevamente.",
  "code": "DATABASE_ERROR"
}
```

---

## 6.2 `updateServiceAction`

```typescript
async function updateServiceAction(serviceId: string, input: UpdateServiceInput): Promise<ActionResult<{ id: string; slug: string }>>
```

**Schema:** igual a `createServiceSchema` pero con `.partial()` salvo los campos obligatorios (`title`, `categoryId`, `description` siguen siendo obligatorios si se incluyen, según FR-203.5).

**Payload de entrada:**

```json
{
  "title": "Limpieza Facial Profunda Premium",
  "categoryId": "c1a2b3c4-facial-uuid",
  "description": "Versión actualizada del tratamiento...",
  "price": 195000,
  "isFeatured": false
}
```

**Lógica:**

```typescript
1. Validar sesión + rol admin.
2. Validar payload (parcial).
3. UPDATE en `services` solo con los campos provistos.
   - Si `title` cambia, el trigger regenera el slug automáticamente
     (Database.md 6.5, punto 1). El slug resultante se retorna en la
     respuesta para que el frontend pueda redirigir si es necesario.
4. Si se envía `specialistIds`, se sincroniza la relación:
   DELETE de `service_specialists` donde `service_id = serviceId`
   y `specialist_id NOT IN (specialistIds)`, luego INSERT de los nuevos.
5. revalidatePath('/servicios'), revalidatePath(`/servicios/${nuevoSlug}`), revalidatePath('/').
```

**Respuesta éxito:**

```json
{ "success": true, "data": { "id": "9b3d53a1-xxxx", "slug": "limpieza-facial-profunda-premium" } }
```

---

## 6.3 `setServiceStatusAction`

Cubre FR-203.6 (ocultar), FR-203.7 (publicar) y archivado manual.

```typescript
async function setServiceStatusAction(serviceId: string, status: 'PUBLIC' | 'PRIVATE' | 'ARCHIVED'): Promise<ActionResult<null>>
```

**Payload:**

```json
{ "serviceId": "9b3d53a1-xxxx", "status": "PRIVATE" }
```

**Lógica:**

```typescript
1. Validar sesión + rol admin.
2. Validar que serviceId exista (si no: code NOT_FOUND).
3. UPDATE services SET status = :status WHERE id = :serviceId.
4. revalidatePath('/servicios'), revalidatePath('/').
```

**Respuesta:**

```json
{ "success": true, "data": null }
```

---

## 6.4 `toggleFeaturedAction`

```typescript
async function toggleFeaturedAction(serviceId: string, isFeatured: boolean): Promise<ActionResult<null>>
```

Implementa RN-005 / RN-310.2. Misma estructura que 6.3 pero sobre `is_featured`.

---

## 6.5 `deleteServiceAction`

Implementa FR-203.8, RN-302.8, RN-302.9, CU-404.

```typescript
async function deleteServiceAction(serviceId: string): Promise<ActionResult<null>>
```

**Payload:**

```json
{ "serviceId": "9b3d53a1-xxxx" }
```

**Importante:** el frontend ya debe haber mostrado las dos confirmaciones obligatorias (D-622, RN-302.8) antes de invocar esta acción. La acción en sí no vuelve a confirmar.

**Lógica:**

```typescript
1. Validar sesión + rol admin.
2. Obtener las rutas de Storage de todas las filas en `service_images`
   donde service_id = serviceId (para limpiarlas después).
3. DELETE FROM services WHERE id = serviceId.
   → Por ON DELETE CASCADE (Database.md 6.6, 6.8), esto elimina
     automáticamente sus filas en `service_images` y `service_specialists`.
   → Los especialistas relacionados NO se eliminan (RN-304.5, RN-005
     de Database.md 6.8).
4. Eliminar físicamente los archivos del bucket `services` usando las
   rutas obtenidas en el paso 2 (Database.md 6.6: "los archivos físicos
   en Storage deben eliminarse desde la aplicación").
5. revalidatePath('/servicios'), revalidatePath('/').
```

**Respuesta éxito:**

```json
{ "success": true, "data": null }
```

**Respuesta error (servicio no existe):**

```json
{ "success": false, "message": "El servicio que intentas eliminar no existe.", "code": "NOT_FOUND" }
```

---

## 6.6 `getServicesForAdminAction` (listado administrativo)

A diferencia de la sección 4 (lecturas públicas), el listado del panel (`/admin/services`, UI-602 a UI-612) necesita ver **todos** los estados, por lo que requiere sesión válida y se implementa como Server Action (no como query pública), ya que sus filtros y paginación dependen de inputs del administrador.

```typescript
async function getServicesForAdminAction(params: {
  search?: string;
  status?: 'PUBLIC' | 'PRIVATE' | 'ARCHIVED' | 'ALL';
  categoryId?: string;
  page: number;
  pageSize: 10 | 25 | 50;
}): Promise<ActionResult<{ items: ServiceAdminRow[]; total: number }>>
```

**Payload:**

```json
{ "search": "facial", "status": "ALL", "page": 1, "pageSize": 25 }
```

**Lógica:**

```typescript
1. Validar sesión + rol admin.
2. Construir query sobre `services` con .ilike('title', `%${search}%`)
   si hay búsqueda, .eq('status', status) si status !== 'ALL',
   .eq('category_id', categoryId) si aplica.
3. Paginación server-side: .range((page-1)*pageSize, page*pageSize - 1).
4. Retornar items + count total (UI-612: server side pagination).
```

**Respuesta:**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "9b3d53a1-xxxx",
        "title": "Limpieza Facial Profunda",
        "categoryName": "Facial",
        "price": 180000,
        "status": "PUBLIC",
        "isFeatured": true,
        "createdAt": "2026-05-10T14:00:00.000Z",
        "coverImageUrl": "https://.../cover.webp"
      }
    ],
    "total": 1
  }
}
```

---

# 7. SERVER ACTIONS — IMÁGENES DE SERVICIOS

Ubicación: `features/services/actions/images.ts`. Tabla destino: `service_images` (Database.md 6.6). Bucket de Storage: `services`.

## 7.1 `deleteServiceImageAction`

```typescript
async function deleteServiceImageAction(imageId: string): Promise<ActionResult<null>>
```

**Payload:**

```json
{ "imageId": "img-uuid" }
```

**Lógica:**

```typescript
1. Validar sesión + rol admin.
2. Obtener storage_path de la fila en service_images.
3. Eliminar el archivo en supabaseServer.storage.from('services').remove([storagePath]).
4. DELETE FROM service_images WHERE id = imageId.
5. revalidatePath(`/admin/services/${serviceId}`), revalidatePath(`/servicios/${slug}`).
```

Requiere confirmación previa en frontend (RN-306.8).

---

## 7.2 `setCoverImageAction`

```typescript
async function setCoverImageAction(serviceId: string, imageId: string): Promise<ActionResult<null>>
```

**Lógica:** el trigger `service_images_enforce_single_cover` (Database.md 7.3) ya garantiza que solo una imagen tenga `is_cover = true` por servicio. La acción solo necesita:

```typescript
1. Validar sesión + rol admin.
2. UPDATE service_images SET is_cover = true WHERE id = imageId AND service_id = serviceId.
   → El trigger en base de datos automáticamente pone is_cover = false
     en cualquier otra imagen del mismo servicio.
```

---

## 7.3 `reorderServiceImagesAction`

```typescript
async function reorderServiceImagesAction(serviceId: string, orderedImageIds: string[]): Promise<ActionResult<null>>
```

**Payload:**

```json
{
  "serviceId": "9b3d53a1-xxxx",
  "orderedImageIds": ["img-uuid-3", "img-uuid-1", "img-uuid-2"]
}
```

**Lógica:**

```typescript
1. Validar sesión + rol admin.
2. Para cada id en orderedImageIds, UPDATE service_images
   SET sort_order = index WHERE id = id AND service_id = serviceId.
   (en una transacción / batch).
```

---

# 8. ROUTE HANDLER — UPLOAD DE IMÁGENES

**Ruta:** `POST /api/upload`
**Quién la usa:** El componente `ImageUploader` del panel administrativo (D-646, UI-617).
**Por qué es Route Handler y no Server Action:** recibe `FormData` con archivos binarios; Next.js maneja esto de forma más directa vía Route Handler que vía Server Action con `multipart/form-data` grande (TDD-211).

## 8.1 Request

```http
POST /api/upload
Content-Type: multipart/form-data
Cookie: <sesión administrativa>
```

**Campos del FormData:**

| Campo | Tipo | Obligatorio |
|---|---|---|
| `file` | File | Sí |
| `entityType` | `"service"` \| `"specialist"` | Sí |
| `entityId` | string (UUID) | Sí |
| `altText` | string | No (solo aplica a `service`) |

## 8.2 Validaciones (antes de subir a Storage)

```typescript
const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']; // RN-306.1
const maxSizeBytes = 15 * 1024 * 1024; // 15 MB — RN-306.2

if (!allowedMimeTypes.includes(file.type)) {
  return NextResponse.json(
    { success: false, message: "Formato de imagen no permitido.", code: "VALIDATION_ERROR" },
    { status: 400 }
  );
}

if (file.size > maxSizeBytes) {
  return NextResponse.json(
    { success: false, message: "La imagen supera el tamaño máximo permitido (15 MB).", code: "VALIDATION_ERROR" },
    { status: 400 }
  );
}

if (entityType === 'service') {
  const { count } = await supabaseServer
    .from('service_images')
    .select('id', { count: 'exact', head: true })
    .eq('service_id', entityId);

  if ((count ?? 0) >= 15) { // RN-306.3 — la base de datos también lo
                            // bloquea con el trigger
                            // service_images_enforce_limit, esta
                            // validación es para dar un mensaje
                            // amigable ANTES de intentar subir el archivo.
    return NextResponse.json(
      { success: false, message: "Este servicio ya alcanzó el máximo de 15 imágenes.", code: "LIMIT_EXCEEDED" },
      { status: 400 }
    );
  }
}
```

## 8.3 Lógica completa

```typescript
1. Validar sesión + rol admin (sección 3.5).
2. Validar archivo (8.2).
3. Construir ruta según convención TDD-413 / Database.md 10.1:
     services/<entityId>/gallery-<timestamp>.webp
     specialists/<entityId>/photo.webp
4. Subir a Storage:
     supabaseServer.storage.from(bucket).upload(path, file, { contentType: file.type });
5. Si entityType === 'service':
     INSERT INTO service_images (service_id, storage_path, alt_text, sort_order, is_cover)
     VALUES (entityId, path, altText, nextSortOrder, false);
   Si entityType === 'specialist':
     UPDATE specialists SET photo_url = path WHERE id = entityId;
     (un especialista tiene una sola foto, no galería — Database.md 6.7).
6. revalidatePath() de las rutas públicas afectadas.
```

## 8.4 Response — éxito

```json
{
  "success": true,
  "data": {
    "id": "img-uuid",
    "url": "https://xxxx.supabase.co/storage/v1/object/public/services/9b3d53a1-xxxx/gallery-1718999999.webp",
    "sortOrder": 2,
    "isCover": false
  }
}
```

Status HTTP: `200`.

## 8.5 Response — error (límite alcanzado, error de Storage, etc.)

```json
{
  "success": false,
  "message": "Este servicio ya alcanzó el máximo de 15 imágenes.",
  "code": "LIMIT_EXCEEDED"
}
```

Status HTTP: `400` (validación) o `500` (`STORAGE_ERROR`, `DATABASE_ERROR`).

---

# 9. SERVER ACTIONS — ESPECIALISTAS

Ubicación: `features/specialists/actions/`. Tabla destino: `specialists` (Database.md 6.7).

## 9.1 `createSpecialistAction`

```typescript
async function createSpecialistAction(input: CreateSpecialistInput): Promise<ActionResult<{ id: string; slug: string }>>
```

**Schema Zod** (refleja FR-205.3, RN-304.1 a RN-304.3 — nombre, foto y cargo obligatorios):

```typescript
const createSpecialistSchema = z.object({
  name: z.string().min(3, "El nombre completo es obligatorio."),
  photoUrl: z.string().min(1, "La fotografía es obligatoria."),
  position: z.string().min(2, "El cargo es obligatorio."),
  description: z.string().optional(),
  certifications: z.array(z.string()).default([]),
  whatsapp: z.string().optional(),
  socialLinks: z.object({
    instagram: z.string().url().optional(),
    facebook: z.string().url().optional(),
  }).default({}),
  schedules: z.array(z.object({
    day: z.string(),
    hours: z.string(),
  })).default([]),
  isVisible: z.boolean().default(true),
  serviceIds: z.array(z.string().uuid()).default([]),
});
```

**Nota sobre `photoUrl`:** en el flujo real de UI (D-639, UI-635), la foto se sube primero mediante `POST /api/upload` con `entityType: "specialist"` y un `entityId` provisional o en un paso posterior; por simplicidad de implementación, el flujo recomendado es: 1) crear el especialista con un `photoUrl` vacío temporal, 2) subir la foto inmediatamente después usando el `id` recién creado, 3) la subida actualiza `photo_url` automáticamente (ver 8.3, paso 5). El formulario de creación en el panel debe orquestar ambos pasos en secuencia antes de mostrar éxito al usuario.

**Payload de entrada:**

```json
{
  "name": "María Pérez",
  "photoUrl": "",
  "position": "Esteticista Senior",
  "description": "10 años de experiencia en tratamientos faciales avanzados.",
  "certifications": ["Certificación en Radiofrecuencia", "Diplomado en Cosmetología"],
  "whatsapp": "+573001112233",
  "socialLinks": { "instagram": "https://instagram.com/maria.perez" },
  "schedules": [{ "day": "Lunes a Viernes", "hours": "9:00 a.m. - 5:00 p.m." }],
  "isVisible": true,
  "serviceIds": ["service-uuid-1", "service-uuid-2"]
}
```

**Lógica:**

```typescript
1. Validar sesión + rol admin.
2. Validar payload.
3. INSERT INTO specialists (...). El slug se genera automáticamente
   por trigger a partir de `name` (Database.md 6.7) — no editable.
4. INSERT en service_specialists para cada serviceId provisto.
5. revalidatePath('/especialistas'), revalidatePath('/').
```

**Respuesta:**

```json
{ "success": true, "data": { "id": "specialist-uuid", "slug": "maria-perez" } }
```

---

## 9.2 `updateSpecialistAction`

```typescript
async function updateSpecialistAction(specialistId: string, input: UpdateSpecialistInput): Promise<ActionResult<{ id: string; slug: string }>>
```

Misma estructura que 9.1, con schema `.partial()`. Si `name` cambia, el slug se regenera automáticamente igual que en servicios (RN-302.3 aplica también aquí por el mismo mecanismo de trigger).

---

## 9.3 `setSpecialistVisibilityAction`

Implementa FR-205.6.

```typescript
async function setSpecialistVisibilityAction(specialistId: string, isVisible: boolean): Promise<ActionResult<null>>
```

```json
{ "specialistId": "specialist-uuid", "isVisible": false }
```

---

## 9.4 `deleteSpecialistAction`

Implementa CU-407, RN-304.5, FR-205.5.

```typescript
async function deleteSpecialistAction(specialistId: string): Promise<ActionResult<null>>
```

**Lógica crítica:**

```typescript
1. Validar sesión + rol admin.
2. Eliminar la foto del bucket `specialists` (photo_url de la fila).
3. DELETE FROM specialists WHERE id = specialistId.
   → ON DELETE CASCADE elimina automáticamente las filas de
     `service_specialists` relacionadas (Database.md 6.8).
   → Los SERVICIOS asociados NO se eliminan ni se modifican —
     solo desaparece la relación. Esto es una regla de negocio
     crítica (RN-304.5 / RN-005 de Database.md).
4. revalidatePath('/especialistas'), revalidatePath('/').
```

**Respuesta:**

```json
{ "success": true, "data": null }
```

---

## 9.5 `getSpecialistsForAdminAction`

Listado administrativo (UI-632), análogo a 6.6 pero sobre `specialists`, mostrando todos (visibles y ocultos) — no filtra por `is_visible`.

```typescript
async function getSpecialistsForAdminAction(params: {
  search?: string;
  page: number;
  pageSize: 10 | 25 | 50;
}): Promise<ActionResult<{ items: SpecialistAdminRow[]; total: number }>>
```

---

# 10. ROUTE HANDLER — FORMULARIO DE CONTACTO

**Ruta:** `POST /api/contact`
**Quién la usa:** El formulario de contacto público (Home, página de servicio, página de Contacto — D-341, FR-109.2).
**Por qué es Route Handler:** TDD-211 lo define explícitamente como uno de los dos Route Handlers reales del MVP, separado de las Server Actions administrativas, porque es invocado por usuarios anónimos sin sesión y conviene mantenerlo como un endpoint HTTP simple y desacoplado del árbol de Server Actions protegidas.

## 10.1 Request

```http
POST /api/contact
Content-Type: application/json
```

```json
{
  "fullName": "Carlos Gómez",
  "phone": "+573001234567",
  "email": "carlos.gomez@gmail.com",
  "serviceInterestId": "9b3d53a1-xxxx",
  "message": "Hola, me gustaría recibir información sobre el servicio Limpieza Facial Profunda."
}
```

`serviceInterestId` es **opcional** (FR-109.2: "Servicio de Interés" es opcional) — corresponde a la FK `service_interest_id` de `contact_forms` (Database.md 6.9). Si el formulario no se originó desde una página de servicio específica (ej. página general de Contacto), se omite o se envía `null`.

## 10.2 Validación Zod (RN-307.1 a RN-307.5)

```typescript
const contactFormSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  phone: z.string().min(7, "Ingresa un número de teléfono válido."),
  email: z.string().email("Ingresa un correo electrónico válido."),
  serviceInterestId: z.string().uuid().optional().nullable(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
  honeypot: z.string().max(0).optional(), // TDD-225 — campo oculto anti-spam,
                                            // si llega con contenido se descarta
                                            // silenciosamente como bot
});
```

## 10.3 Lógica completa (TDD-218)

```typescript
1. Parsear y validar el body con contactFormSchema.
   → Si falla: 400, code VALIDATION_ERROR.
2. Si `honeypot` tiene contenido: responder 200 con success:true
   simulando éxito (para no delatar la protección al bot), pero
   NO guardar nada en base de datos.
3. Capturar `ip_address` desde los headers de la request
   (x-forwarded-for / request.ip).
4. INSERT INTO contact_forms (full_name, phone, email,
   service_interest_id, message, ip_address, status)
   VALUES (..., 'PENDING').
   → Esto SIEMPRE ocurre antes de intentar enviar el correo
     (TDD-219: "Guardar BD > Enviar Correo" — prioridad).
5. Intentar enviar correo de notificación vía Resend al correo
   configurado del establecimiento.
   → Si Resend falla: el error se registra en logs (TDD-216)
     pero NO se revierte el INSERT ni se le muestra error al
     usuario. El formulario ya quedó guardado y visible en el
     panel administrativo (TDD-219: "El formulario NO se pierde").
6. Responder éxito al cliente.
```

## 10.4 Response — éxito

```json
{
  "success": true,
  "data": {
    "message": "Tu solicitud ha sido enviada correctamente. Nos pondremos en contacto contigo lo antes posible."
  }
}
```

Status HTTP: `200`.

## 10.5 Response — error de validación

```json
{
  "success": false,
  "message": "Ingresa un correo electrónico válido.",
  "code": "VALIDATION_ERROR"
}
```

Status HTTP: `400`.

## 10.6 Response — error inesperado (base de datos caída, etc.)

```json
{
  "success": false,
  "message": "No fue posible enviar tu solicitud. Inténtalo nuevamente.",
  "code": "DATABASE_ERROR"
}
```

Status HTTP: `500`.

## 10.7 Seguridad (RLS aplicable, Database.md 8.3)

Este endpoint usa `supabaseServer` sin sesión (rol `anon`). La política RLS de `contact_forms` permite **únicamente INSERT** para anónimos — ni lectura, ni actualización, ni borrado. Esto es una segunda capa de protección incluso si el Route Handler tuviera un bug.

---

# 11. SERVER ACTIONS — GESTIÓN DE FORMULARIOS (ADMIN)

Ubicación: `features/contact-forms/actions/`. Tabla destino: `contact_forms`.

## 11.1 `getContactFormsForAdminAction`

```typescript
async function getContactFormsForAdminAction(params: {
  status?: 'PENDING' | 'READ' | 'ARCHIVED' | 'ALL';
  search?: string;
  page: number;
  pageSize: 10 | 25 | 50;
}): Promise<ActionResult<{ items: ContactFormAdminRow[]; total: number; pendingCount: number }>>
```

Implementa UI-645 a UI-650 y FR-202.2 (contador para el dashboard).

**Respuesta:**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "form-uuid",
        "fullName": "Carlos Gómez",
        "phone": "+573001234567",
        "email": "carlos.gomez@gmail.com",
        "serviceInterestTitle": "Limpieza Facial Profunda",
        "status": "PENDING",
        "createdAt": "2026-06-18T10:00:00.000Z"
      }
    ],
    "total": 1,
    "pendingCount": 1
  }
}
```

---

## 11.2 `markContactFormAsReadAction`

Implementa FR-206.6, RN-305.5.

```typescript
async function markContactFormAsReadAction(formId: string): Promise<ActionResult<null>>
```

```typescript
1. Validar sesión + rol admin.
2. UPDATE contact_forms SET status = 'READ' WHERE id = formId.
   → El trigger contact_forms_set_status_timestamps (Database.md 7.4)
     completa automáticamente read_at. La acción NO debe enviar
     read_at manualmente.
```

---

## 11.3 `archiveContactFormAction`

Implementa FR-206.7, RN-305.6.

```typescript
async function archiveContactFormAction(formId: string): Promise<ActionResult<null>>
```

```typescript
1. Validar sesión + rol admin.
2. UPDATE contact_forms SET status = 'ARCHIVED' WHERE id = formId.
   → archived_at se completa automáticamente por trigger.
```

**Nota:** no existe `deleteContactFormAction` en el MVP. Los formularios nunca se eliminan (RN-305.7) — la única vía de baja lógica es el archivado. La eliminación física está restringida a `SUPER_ADMIN`, rol no operativo en el MVP (Database.md 8.1), por lo tanto esa acción **no se construye**.

---

# 12. DASHBOARD — ACCIÓN DE RESUMEN

Implementa FR-202.2, UI-516 a UI-520.

```typescript
async function getDashboardSummaryAction(): Promise<ActionResult<{
  totalServices: number;
  totalSpecialists: number;
  pendingFormsCount: number;
  totalFormsCount: number;
}>>
```

**Lógica:** cuatro `count` simples con `head: true` sobre `services`, `specialists` y `contact_forms` (uno general y uno filtrado por `status = 'PENDING'`).

**Respuesta:**

```json
{
  "success": true,
  "data": {
    "totalServices": 24,
    "totalSpecialists": 6,
    "pendingFormsCount": 3,
    "totalFormsCount": 41
  }
}
```

---

# 13. AUTOMATIZACIÓN — NO ES UNA ACTION INVOCABLE

El archivado automático de promociones vencidas (RN-303.5, RN-310.3) **no se expone como Server Action ni Route Handler**, porque no lo dispara el usuario: lo ejecuta exclusivamente el cron job de PostgreSQL descrito en `Database.md` sección 9 (`archive-expired-promotions`, diario a las 00:05 UTC, llamando a `public.archive_expired_promotions()`).

Ningún desarrollador debe crear un endpoint para esto. Se documenta aquí únicamente para dejar explícito que **no existe** y **no debe existir** una ruta como `/api/cron/archive-promotions` en el código de Next.js — la automatización vive enteramente en la base de datos.

---

# 14. LO QUE EXPLÍCITAMENTE NO EXISTE EN ESTA API (NO CONSTRUIR)

Para evitar que el equipo o herramientas de IA generen código fuera de alcance, se listan explícitamente las acciones/endpoints que **no deben crearse** en el MVP, por estar fuera del alcance (ver DOCUMENTO_DE_ALCANCE secciones 7 y 56, FRD FR-406):

```text
- CRUD de categorías (categories es fija — RN-001).
- CRUD de settings desde el panel (es estática en el MVP, FR-200.4).
- CRUD de roles / usuarios / user_roles (se gestionan manualmente
  desde el Dashboard de Supabase, Database.md sección 12).
- Endpoints de pagos.
- Endpoints de citas / calendario.
- Endpoints de CRM.
- Endpoints de analytics.
- Endpoints de blog.
- /api/webhooks/* (reservado, no implementado — TDD-227).
- Cualquier endpoint de búsqueda avanzada o filtros más allá de los
  descritos en las secciones 6.6, 9.5 y 11.1 (D-328, D-616: "MVP no
  implementar, arquitectura preparada").
- Doble confirmación a nivel de backend (D-623, UI-535: no obligatoria
  en MVP, se maneja solo en frontend con dos diálogos).
```

---

# 15. TABLA MAESTRA DE ENDPOINTS Y SERVER ACTIONS

| # | Nombre | Tipo | Auth | Tabla(s) | Sección |
|---|---|---|---|---|---|
| 1 | `getPublishedServices` | Query (Server Component) | Anónimo | services | 4.2 |
| 2 | `getServiceBySlug` | Query (Server Component) | Anónimo | services | 4.3 |
| 3 | `getCategoryBySlug` | Query (Server Component) | Anónimo | categories | 4.4 |
| 4 | `getVisibleSpecialists` | Query (Server Component) | Anónimo | specialists | 4.5 |
| 5 | `getSpecialistBySlug` | Query (Server Component) | Anónimo | specialists | 4.6 |
| 6 | `getPublicSettings` | Query interna (server-only) | N/A | settings | 4.7 |
| 7 | `loginAction` | Server Action | Anónimo → crea sesión | auth.users | 5.1 |
| 8 | `logoutAction` | Server Action | Admin | auth.users | 5.2 |
| 9 | `createServiceAction` | Server Action | Admin | services, service_specialists | 6.1 |
| 10 | `updateServiceAction` | Server Action | Admin | services, service_specialists | 6.2 |
| 11 | `setServiceStatusAction` | Server Action | Admin | services | 6.3 |
| 12 | `toggleFeaturedAction` | Server Action | Admin | services | 6.4 |
| 13 | `deleteServiceAction` | Server Action | Admin | services, service_images, service_specialists, Storage | 6.5 |
| 14 | `getServicesForAdminAction` | Server Action | Admin | services | 6.6 |
| 15 | `deleteServiceImageAction` | Server Action | Admin | service_images, Storage | 7.1 |
| 16 | `setCoverImageAction` | Server Action | Admin | service_images | 7.2 |
| 17 | `reorderServiceImagesAction` | Server Action | Admin | service_images | 7.3 |
| 18 | `POST /api/upload` | Route Handler | Admin | service_images / specialists, Storage | 8 |
| 19 | `createSpecialistAction` | Server Action | Admin | specialists, service_specialists | 9.1 |
| 20 | `updateSpecialistAction` | Server Action | Admin | specialists, service_specialists | 9.2 |
| 21 | `setSpecialistVisibilityAction` | Server Action | Admin | specialists | 9.3 |
| 22 | `deleteSpecialistAction` | Server Action | Admin | specialists, service_specialists, Storage | 9.4 |
| 23 | `getSpecialistsForAdminAction` | Server Action | Admin | specialists | 9.5 |
| 24 | `POST /api/contact` | Route Handler | Anónimo | contact_forms | 10 |
| 25 | `getContactFormsForAdminAction` | Server Action | Admin | contact_forms | 11.1 |
| 26 | `markContactFormAsReadAction` | Server Action | Admin | contact_forms | 11.2 |
| 27 | `archiveContactFormAction` | Server Action | Admin | contact_forms | 11.3 |
| 28 | `getDashboardSummaryAction` | Server Action | Admin | services, specialists, contact_forms | 12 |

---

# 16. RESULTADO ESPERADO

Esta especificación deberá permitir que cualquier desarrollador o herramienta de generación de código:

```text
Implemente cada Server Action y Route Handler sin ambigüedad.

Use exactamente los mismos nombres de campos, tipos y reglas
que ya existen en la base de datos real (Database.md).

No invente endpoints, entidades ni funcionalidades fuera del
alcance aprobado (DOCUMENTO_DE_ALCANCE, FRD).

Respete siempre el formato de respuesta estándar
{ success, data } / { success, message, code }.

Aplique las validaciones de negocio en el servidor antes de
confiar en las restricciones de la base de datos.
```

de forma que el código generado sea consistente con TDD, FRD, UI_ARCHITECTURE y Database.md, sin necesidad de interpretar ni adivinar comportamientos no documentados.

FIN DEL DOCUMENTO API_SPEC.md
