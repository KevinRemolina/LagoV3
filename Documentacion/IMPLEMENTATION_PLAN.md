# IMPLEMENTATION PLAN

# BLOQUE 1

# PREPARACIÓN DEL PROYECTO

---

# IMP-001 OBJETIVO

## IMP-001.1 Propósito

Preparar completamente el entorno de desarrollo del proyecto.

Este bloque tiene como finalidad establecer:

* Repositorio oficial.
* Proyecto base Next.js.
* Herramientas de calidad.
* Convenciones de desarrollo.
* Integración con Supabase.
* Arquitectura inicial.
* Estructura de carpetas.

Al finalizar este bloque no debe existir ninguna funcionalidad de negocio implementada.

El resultado esperado es una base técnica estable y preparada para iniciar el desarrollo del producto.

---

# IMP-002 PRERREQUISITOS

Antes de comenzar verificar disponibilidad de:

* Node.js LTS.
* npm o pnpm.
* Git.
* Cuenta de GitHub.
* Proyecto Supabase ya creado.
* Base de datos ya desplegada.
* Proyecto Vercel creado.
* Acceso al repositorio del proyecto.

---

# IMP-003 CREACIÓN DEL REPOSITORIO

## Objetivo

Crear la fuente oficial de código del proyecto.

---

## Tareas

### Tarea 1

Crear repositorio privado.

Nombre sugerido:

```text
lago-spa-web
```

---

### Tarea 2

Configurar descripción.

Ejemplo:

```text
Sitio web corporativo y panel administrativo para Lago Spa · Estética · Salud
```

---

### Tarea 3

Configurar rama principal.

```text
main
```

---

### Tarea 4

Configurar protección de rama principal.

Requisitos:

* No permitir force push.
* No eliminar rama.
* Requerir pull request para futuras colaboraciones.

---

### Tarea 5

Agregar archivos iniciales.

```text
README.md
.gitignore
LICENSE (opcional)
```

---

# Criterio de Finalización

Existe un repositorio remoto operativo y accesible.

---

# IMP-004 CREACIÓN DEL PROYECTO NEXT.JS

## Objetivo

Generar la aplicación base.

---

## Tareas

### Tarea 1

Crear proyecto.

Stack obligatorio:

```text
Next.js 15
React 19
TypeScript
App Router
TailwindCSS
ESLint
```

---

### Tarea 2

Verificar generación correcta.

La aplicación debe iniciar mediante:

```bash
npm run dev
```

o

```bash
pnpm dev
```

---

### Tarea 3

Verificar compilación.

Ejecutar:

```bash
npm run build
```

La compilación debe finalizar sin errores.

---

# Criterio de Finalización

Proyecto Next.js ejecutándose localmente.

---

# IMP-005 CONFIGURACIÓN DE TYPESCRIPT

## Objetivo

Garantizar tipado estricto desde el inicio.

---

## Tareas

### Tarea 1

Activar modo estricto.

Verificar:

```json
"strict": true
```

---

### Tarea 2

Activar:

```json
"noImplicitAny": true
```

---

### Tarea 3

Activar:

```json
"strictNullChecks": true
```

---

### Tarea 4

Activar:

```json
"noUncheckedIndexedAccess": true
```

---

### Tarea 5

Eliminar configuraciones permisivas.

No utilizar:

```json
"allowJs": true
```

---

# Criterio de Finalización

Proyecto compila con configuración estricta.

---

# IMP-006 CONFIGURACIÓN DE ESLINT

## Objetivo

Mantener calidad consistente del código.

---

## Tareas

### Tarea 1

Mantener configuración oficial de Next.js.

---

### Tarea 2

Agregar reglas para:

* Imports ordenados.
* Variables sin uso.
* Código muerto.
* Errores comunes de React.

---

### Tarea 3

Configurar script:

```json
"lint"
```

---

### Tarea 4

Ejecutar análisis completo.

No deben existir errores.

---

# Criterio de Finalización

Lint operativo y sin errores.

---

# IMP-007 CONFIGURACIÓN DE PRETTIER

## Objetivo

Estandarizar formato de código.

---

## Tareas

### Tarea 1

Instalar Prettier.

---

### Tarea 2

Crear:

```text
.prettierrc
```

---

### Tarea 3

Definir reglas globales.

Ejemplo:

* Semicolons.
* Single quote.
* Trailing comma.

---

### Tarea 4

Crear:

```text
.prettierignore
```

---

### Tarea 5

Agregar script:

```json
"format"
```

---

# Criterio de Finalización

Todo el proyecto puede formatearse automáticamente.

---

# IMP-008 CONFIGURACIÓN DE ALIASES

## Objetivo

Eliminar rutas relativas complejas.

---

## Tareas

### Tarea 1

Configurar alias raíz.

```text
@/*
```

---

### Tarea 2

Verificar funcionamiento.

Ejemplo:

```typescript
import Button from "@/components/ui/button";
```

---

### Tarea 3

Eliminar dependencias de rutas tipo:

```typescript
../../../../
```

---

# Criterio de Finalización

Imports utilizando aliases.

---

# IMP-009 VARIABLES DE ENTORNO

## Objetivo

Centralizar configuración sensible.

---

## Tareas

### Tarea 1

Crear:

```text
.env.local
```

---

### Tarea 2

Registrar variables necesarias.

---

### Variables mínimas

```env
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

RESEND_API_KEY=
```

---

### Tarea 3

Crear plantilla.

```text
.env.example
```

---

### Tarea 4

Agregar protección.

Nunca subir:

```text
.env.local
```

al repositorio.

---

# Criterio de Finalización

Variables disponibles localmente.

---

# IMP-010 INSTALACIÓN DE DEPENDENCIAS

## Objetivo

Instalar todas las dependencias definidas en el TDD.

---

## Dependencias Principales

### UI

```text
shadcn/ui
```

---

### Formularios

```text
react-hook-form
```

---

### Validaciones

```text
zod
```

---

### Resolver

```text
@hookform/resolvers
```

---

### Backend

```text
@supabase/supabase-js
```

---

### Auth SSR

```text
@supabase/ssr
```

---

### Animaciones

```text
framer-motion
```

---

### Correo

```text
resend
```

---

### Utilidades

```text
clsx
tailwind-merge
class-variance-authority
```

---

# Criterio de Finalización

Dependencias instaladas sin conflictos.

---

# IMP-011 CONFIGURACIÓN DE SUPABASE

## Objetivo

Conectar la aplicación con la base de datos existente.

---

## Tareas

### Tarea 1

Crear cliente público.

---

### Tarea 2

Crear cliente servidor.

---

### Tarea 3

Configurar manejo de sesiones.

---

### Tarea 4

Validar conexión.

Realizar consulta simple.

Ejemplo:

```text
categories
```

---

### Tarea 5

Confirmar acceso exitoso.

---

# Criterio de Finalización

Aplicación conectada correctamente a Supabase.

---

# IMP-012 ESTRUCTURA BASE DEL PROYECTO

## Objetivo

Preparar estructura escalable.

---

## Crear estructura inicial

```text
src/

app/

components/

features/

lib/

actions/

types/

hooks/

providers/

constants/

schemas/

services/

```

---

# Criterio de Finalización

Estructura creada y documentada.

---

# IMP-013 ARQUITECTURA POR FEATURES

## Objetivo

Alinear el proyecto con el TDD.

---

## Crear módulos iniciales

```text
features/

auth/

services/

promotions/

specialists/

contact/

dashboard/
```

---

## Regla

Cada módulo deberá contener posteriormente:

```text
components/
actions/
schemas/
types/
services/
```

---

# Criterio de Finalización

Arquitectura preparada para crecimiento.

---

# IMP-014 CONVENCIONES DE DESARROLLO

## Objetivo

Establecer reglas únicas para todo el proyecto.

---

## Convenciones

### Archivos

```text
kebab-case
```

---

### Componentes

```text
PascalCase
```

---

### Hooks

```text
useSomething
```

---

### Types

```text
SomethingType
```

---

### Interfaces

```text
SomethingProps
```

---

### Server Actions

```text
action-name.ts
```

---

### Zod Schemas

```text
entity.schema.ts
```

---

### Constantes

```text
UPPER_SNAKE_CASE
```

---

# Restricciones

No crear estructuras arbitrarias.

No crear carpetas fuera de la arquitectura definida.

No duplicar lógica entre módulos.

---

# IMP-015 VALIDACIÓN FINAL DEL BLOQUE

Antes de continuar con el siguiente bloque verificar:

* Repositorio operativo.
* Proyecto compila.
* Proyecto ejecuta localmente.
* ESLint funcional.
* Prettier funcional.
* Variables configuradas.
* Supabase conectado.
* Dependencias instaladas.
* Arquitectura creada.
* Convenciones definidas.

---

# RESULTADO ESPERADO

Al finalizar este bloque debe existir una aplicación Next.js completamente inicializada, conectada a Supabase, con arquitectura escalable, herramientas de calidad configuradas y preparada para iniciar el desarrollo de funcionalidades sin necesidad de modificaciones estructurales adicionales.

# IMPLEMENTATION PLAN

# BLOQUE 2

# FUNDACIONES TÉCNICAS

---

# IMP-100 OBJETIVO

## IMP-100.1 Propósito

Construir toda la infraestructura técnica reutilizable que servirá de base para el resto de módulos del sistema.

Este bloque establece:

* Sistema de rutas.
* Layouts globales.
* Providers globales.
* Manejo centralizado de errores.
* Estados de carga.
* Metadata global.
* Utilidades compartidas.
* Helpers reutilizables.
* Tipados compartidos.
* Clientes Supabase.

Ninguna funcionalidad de negocio deberá desarrollarse en este bloque.

El objetivo es crear la plataforma técnica sobre la cual se construirá posteriormente el sitio público y el panel administrativo.

---

# IMP-101 DEPENDENCIAS

## Requisitos Previos

El Bloque 1 debe encontrarse completamente finalizado.

Verificar:

* Proyecto ejecutándose correctamente.
* Arquitectura por features creada.
* Supabase conectado.
* Variables de entorno configuradas.
* Dependencias instaladas.
* Convenciones definidas.

---

# IMP-102 SISTEMA DE RUTAS

## Objetivo

Definir la estructura oficial de navegación del proyecto.

---

## Tarea 1

Crear estructura principal del App Router.

```text
src/app

(layout público)

/

/nosotros

/servicios

/servicios/[slug]

/categorias/[slug]

/especialistas

/especialistas/[slug]

/promociones

/contacto
```

---

## Tarea 2

Crear estructura administrativa.

```text
/admin

/admin/login

/admin/dashboard

/admin/services

/admin/promotions

/admin/specialists

/admin/forms
```

---

## Tarea 3

Crear carpetas placeholder.

Cada ruta deberá existir aunque aún no tenga funcionalidad.

Ejemplo:

```text
page.tsx
```

---

## Tarea 4

Crear página temporal para cada ruta.

Contenido mínimo:

```text
Página en construcción
```

---

## Restricción

No implementar lógica de negocio.

Solo estructura.

---

# Criterio de Finalización

Todas las rutas previstas por el alcance existen.

---

# IMP-103 LAYOUT PÚBLICO GLOBAL

## Objetivo

Crear la estructura visual compartida por todo el sitio público.

---

## Tarea 1

Crear:

```text
src/app/(public)/layout.tsx
```

---

## Responsabilidades

El layout deberá contener:

* Navbar global.
* Footer global.
* Contenedor principal.
* Providers públicos.
* Metadata base.

---

## Tarea 2

Definir estructura semántica.

```html
<header>

<main>

<footer>
```

---

## Tarea 3

Implementar estructura responsive.

No incluir estilos finales.

Solo arquitectura.

---

## Restricción

No construir diseño definitivo.

---

# Criterio de Finalización

Todas las páginas públicas utilizan el mismo layout.

---

# IMP-104 LAYOUT ADMINISTRATIVO GLOBAL

## Objetivo

Crear la estructura principal del dashboard.

---

## Tarea 1

Crear:

```text
src/app/admin/layout.tsx
```

---

## Responsabilidades

Gestionar:

* Sidebar.
* Header.
* Área principal.
* Validaciones de acceso.
* Providers administrativos.

---

## Tarea 2

Definir estructura base.

```html
<div>

<aside>

<section>

</section>

</div>
```

---

## Tarea 3

Preparar espacios reservados.

Sidebar temporal.

Header temporal.

---

## Restricción

No construir navegación definitiva.

---

# Criterio de Finalización

El dashboard dispone de layout independiente.

---

# IMP-105 SISTEMA GLOBAL DE PROVIDERS

## Objetivo

Centralizar todos los contextos globales.

---

## Tarea 1

Crear carpeta.

```text
src/providers
```

---

## Tarea 2

Crear proveedor raíz.

```text
app/providers.tsx
```

---

## Responsabilidades

Agrupar:

* Session Provider.
* Theme Provider (si aplica).
* Toast Provider.
* Query Providers futuros.

---

## Tarea 3

Implementar patrón compuesto.

Todos los providers deben registrarse desde un único punto.

---

## Beneficio

Evitar anidaciones complejas.

---

# Criterio de Finalización

La aplicación utiliza un proveedor raíz único.

---

# IMP-106 CLIENTE SUPABASE NAVEGADOR

## Objetivo

Centralizar acceso cliente.

---

## Tarea 1

Crear:

```text
src/lib/supabase/client.ts
```

---

## Responsabilidades

* Inicializar Supabase.
* Gestionar sesión cliente.
* Utilizar variables públicas.

---

## Tarea 2

Implementar singleton.

Evitar múltiples instancias.

---

## Restricción

Nunca utilizar service role.

---

# Criterio de Finalización

Cliente reutilizable disponible.

---

# IMP-107 CLIENTE SUPABASE SERVIDOR

## Objetivo

Centralizar acceso servidor.

---

## Tarea 1

Crear:

```text
src/lib/supabase/server.ts
```

---

## Responsabilidades

* Lectura de cookies.
* Gestión de sesión.
* Operaciones SSR.
* Server Components.

---

## Tarea 2

Preparar integración con middleware.

---

# Criterio de Finalización

Cliente servidor operativo.

---

# IMP-108 MIDDLEWARE GLOBAL

## Objetivo

Preparar infraestructura de protección.

---

## Tarea 1

Crear:

```text
middleware.ts
```

---

## Responsabilidades Iniciales

* Refrescar sesión.
* Leer cookies.
* Mantener autenticación.

---

## Tarea 2

Preparar soporte para:

```text
OWNER
EMPLOYEE
SUPER_ADMIN
```

Aunque únicamente OWNER será utilizado.

---

## Restricción

No implementar autorización completa todavía.

---

# Criterio de Finalización

Middleware operativo sin afectar navegación.

---

# IMP-109 SISTEMA GLOBAL DE ERRORES

## Objetivo

Definir estrategia uniforme de errores.

---

## Tarea 1

Crear:

```text
src/lib/errors
```

---

## Tarea 2

Definir categorías.

```text
ValidationError

AuthenticationError

AuthorizationError

NotFoundError

DatabaseError

ExternalServiceError
```

---

## Tarea 3

Crear clases personalizadas.

Una clase por categoría.

---

## Tarea 4

Definir formato estándar.

Ejemplo:

```typescript
{
 code,
 message,
 details
}
```

---

# Beneficio

Errores consistentes en toda la aplicación.

---

# Criterio de Finalización

Sistema de errores reutilizable.

---

# IMP-110 ERROR BOUNDARIES

## Objetivo

Gestionar errores visuales.

---

## Tarea 1

Crear:

```text
error.tsx
```

en rutas principales.

---

## Tarea 2

Crear pantalla genérica.

Contenido mínimo:

* Mensaje amigable.
* Acción reintentar.
* Acción regresar.

---

## Tarea 3

Crear error administrativo.

Separado del público.

---

# Criterio de Finalización

Errores controlados visualmente.

---

# IMP-111 SISTEMA GLOBAL DE LOADING

## Objetivo

Unificar experiencia de carga.

---

## Tarea 1

Crear:

```text
loading.tsx
```

en layouts principales.

---

## Tarea 2

Crear skeletons genéricos.

---

## Tarea 3

Definir componentes reutilizables.

Ejemplos:

```text
PageSkeleton

CardSkeleton

TableSkeleton

FormSkeleton
```

---

## Restricción

No utilizar spinners como solución principal.

---

# Criterio de Finalización

Estados de carga consistentes.

---

# IMP-112 CONFIGURACIÓN GLOBAL DE METADATA

## Objetivo

Preparar la base SEO del proyecto.

---

## Tarea 1

Crear configuración centralizada.

```text
src/lib/metadata
```

---

## Tarea 2

Definir metadata raíz.

---

## Información mínima

Título.

Descripción.

Keywords.

Open Graph.

Twitter Card.

---

## Tarea 3

Preparar función generadora.

Objetivo:

Evitar repetir metadata.

---

## Restricción

No crear metadata específica por página aún.

---

# Criterio de Finalización

Metadata global funcional.

---

# IMP-113 CONFIGURACIÓN DE FUENTES

## Objetivo

Implementar tipografía definida en DESIGN.

---

## Tarea 1

Configurar:

```text
Cormorant Garamond
```

---

## Tarea 2

Configurar:

```text
Inter
```

---

## Tarea 3

Exponer mediante variables CSS.

---

## Tarea 4

Integrar en layout raíz.

---

# Criterio de Finalización

Fuentes disponibles globalmente.

---

# IMP-114 UTILIDADES GLOBALES

## Objetivo

Centralizar funciones reutilizables.

---

## Tarea 1

Crear:

```text
src/lib/utils
```

---

## Tarea 2

Implementar utilidades iniciales.

---

### Utilidad de clases

```typescript
cn()
```

---

### Utilidad de moneda

```typescript
formatCurrency()
```

---

### Utilidad de fecha

```typescript
formatDate()
```

---

### Utilidad de teléfono

```typescript
formatPhone()
```

---

### Utilidad de URL

```typescript
buildUrl()
```

---

# Restricción

No incluir lógica de negocio.

---

# Criterio de Finalización

Utilidades reutilizables disponibles.

---

# IMP-115 HELPERS COMPARTIDOS

## Objetivo

Centralizar lógica auxiliar.

---

## Tarea 1

Crear:

```text
src/lib/helpers
```

---

## Helpers Iniciales

### Slugs

```typescript
slug.helper.ts
```

---

### WhatsApp

```typescript
whatsapp.helper.ts
```

---

### SEO

```typescript
seo.helper.ts
```

---

### Storage

```typescript
storage.helper.ts
```

---

# Restricción

No duplicar funciones en features.

---

# Criterio de Finalización

Helpers reutilizables creados.

---

# IMP-116 TIPADOS COMPARTIDOS

## Objetivo

Definir contratos globales.

---

## Tarea 1

Crear:

```text
src/types
```

---

## Tarea 2

Definir tipos comunes.

---

### Paginación

```typescript
PaginationParams
```

---

### Respuestas

```typescript
ApiResponse
```

---

### Metadata

```typescript
MetadataConfig
```

---

### Selects

```typescript
SelectOption
```

---

### Estados

```typescript
StatusType
```

---

# Restricción

No crear tipos específicos de dominio.

---

# Criterio de Finalización

Tipos reutilizables disponibles.

---

# IMP-117 CONSTANTES GLOBALES

## Objetivo

Centralizar valores del sistema.

---

## Tarea 1

Crear:

```text
src/constants
```

---

## Constantes Iniciales

### Rutas

```typescript
ROUTES
```

---

### Roles

```typescript
ROLES
```

---

### Categorías

```typescript
CATEGORIES
```

---

### Límites

```typescript
SYSTEM_LIMITS
```

---

# Restricción

No utilizar strings mágicos.

---

# Criterio de Finalización

Constantes compartidas disponibles.

---

# IMP-118 VALIDACIÓN FINAL DEL BLOQUE

Antes de continuar verificar:

* Todas las rutas existen.
* Layout público funcional.
* Layout administrativo funcional.
* Providers configurados.
* Cliente Supabase navegador operativo.
* Cliente Supabase servidor operativo.
* Middleware funcional.
* Sistema de errores creado.
* Error boundaries implementados.
* Loading states implementados.
* Metadata global configurada.
* Fuentes configuradas.
* Utilidades disponibles.
* Helpers disponibles.
* Tipados compartidos disponibles.
* Constantes disponibles.

---

# RESULTADO ESPERADO

Al finalizar este bloque debe existir una infraestructura técnica sólida, desacoplada y reutilizable que permita desarrollar cualquier módulo del sistema sin necesidad de volver a modificar elementos fundamentales de arquitectura.

A partir de este punto el proyecto dispone de una base técnica estable sobre la cual comenzar la construcción del sistema de diseño y posteriormente las funcionalidades de negocio.

# IMPLEMENTATION PLAN

# BLOQUE 3

# SISTEMA DE DISEÑO (UI FOUNDATION)

---

# IMP-200 OBJETIVO

## IMP-200.1 Propósito

Implementar completamente el sistema de diseño definido en DESIGN.md.

Este bloque tiene como objetivo transformar las definiciones visuales teóricas en componentes reutilizables y escalables para toda la aplicación.

Al finalizar este bloque deberá existir una UI Foundation completa capaz de soportar:

* Sitio público.
* Dashboard administrativo.
* Formularios.
* Tablas.
* Modales.
* Componentes futuros.

---

# IMP-201 DEPENDENCIAS

## Requisitos Previos

Debe estar finalizado:

* Bloque 1.
* Bloque 2.

Verificar:

* Proyecto funcional.
* Tailwind configurado.
* Shadcn instalado.
* Layouts creados.
* Providers operativos.

---

# IMP-202 ESTRUCTURA DEL DESIGN SYSTEM

## Objetivo

Crear la estructura oficial para todos los elementos visuales.

---

## Tarea 1

Crear estructura.

```text
src/components

ui/

layout/

shared/

feedback/

forms/

tables/

navigation/
```

---

## Responsabilidad

### ui

Componentes atómicos.

---

### layout

Elementos estructurales.

---

### shared

Componentes compartidos.

---

### feedback

Estados visuales.

---

### forms

Componentes de formularios.

---

### tables

Sistema de tablas.

---

### navigation

Navegación global.

---

# Criterio de Finalización

Estructura UI creada.

---

# IMP-203 DESIGN TOKENS

## Objetivo

Convertir DESIGN.md en tokens reutilizables.

---

## Tarea 1

Crear archivo central.

```text
src/constants/design-tokens.ts
```

---

## Responsabilidad

Centralizar:

* Colores.
* Espaciados.
* Border radius.
* Sombras.
* Z-index.
* Breakpoints.

---

## Restricción

No utilizar valores hardcodeados dentro de componentes.

---

# Criterio de Finalización

Tokens centralizados.

---

# IMP-204 SISTEMA DE COLORES

## Objetivo

Implementar la paleta oficial.

---

## Fuente

DESIGN.md

Bloque 1.

---

## Tarea 1

Configurar colores en Tailwind.

---

## Grupos

### Primary

```text
primary-900
primary-800
primary-700
```

---

### Accent

```text
gold
```

---

### Success

```text
success
```

---

### Warning

```text
warning
```

---

### Error

```text
error
```

---

### Neutral

```text
neutral-50
neutral-100
neutral-200
neutral-300
neutral-500
neutral-700
neutral-900
```

---

## Tarea 2

Crear variables CSS.

---

## Restricción

Nunca usar colores HEX directamente en componentes.

---

# Criterio de Finalización

Toda la paleta disponible globalmente.

---

# IMP-205 SISTEMA TIPOGRÁFICO

## Objetivo

Implementar la jerarquía tipográfica oficial.

---

## Fuente

DESIGN.md

Bloque 2.

---

## Tarea 1

Configurar variables tipográficas.

---

### Display Font

```text
Cormorant Garamond
```

---

### UI Font

```text
Inter
```

---

## Tarea 2

Crear escala reutilizable.

---

### H1

Hero principal.

---

### H2

Título sección.

---

### H3

Subsección.

---

### H4

Tarjetas.

---

### Body Large

---

### Body

---

### Body Small

---

### Caption

---

## Tarea 3

Crear clases reutilizables.

---

# Criterio de Finalización

Tipografía estandarizada.

---

# IMP-206 SISTEMA DE ESPACIADO

## Objetivo

Implementar spacing scale oficial.

---

## Fuente

DESIGN.md

Bloque 2.

---

## Tarea 1

Registrar escala.

```text
xs
sm
md
lg
xl
2xl
3xl
4xl
5xl
```

---

## Tarea 2

Crear utilidades reutilizables.

---

## Restricción

No utilizar márgenes arbitrarios.

---

# Criterio de Finalización

Espaciado consistente.

---

# IMP-207 GRID SYSTEM

## Objetivo

Implementar sistema de layout global.

---

## Tarea 1

Crear componente.

```text
Container
```

---

## Responsabilidades

* Max width.
* Padding responsive.
* Centrado horizontal.

---

## Tarea 2

Crear componente.

```text
Section
```

---

## Responsabilidades

* Separación vertical.
* Espaciado consistente.

---

## Tarea 3

Crear utilidades grid.

Desktop.

Tablet.

Mobile.

---

# Criterio de Finalización

Sistema de layout operativo.

---

# IMP-208 COMPONENTE BUTTON

## Objetivo

Crear sistema completo de botones.

---

## Tarea 1

Crear componente.

```text
Button
```

---

## Variantes

### Primary

---

### Secondary

---

### Outline

---

### Ghost

---

### Premium

---

### Destructive

---

## Tamaños

### Small

### Medium

### Large

---

## Estados

### Default

### Hover

### Focus

### Disabled

### Loading

---

## Restricción

Utilizar class-variance-authority.

---

# Criterio de Finalización

Sistema de botones completo.

---

# IMP-209 COMPONENTES DE INPUT

## Objetivo

Construir sistema base de formularios.

---

## Componentes

### Input

### Textarea

### Select

### Checkbox

### Radio Group

### Switch

### Form Label

### Form Error

### Form Hint

---

## Estados

### Default

### Focus

### Error

### Disabled

### Readonly

---

## Restricción

Todos compatibles con React Hook Form.

---

# Criterio de Finalización

Sistema de formularios reutilizable.

---

# IMP-210 SISTEMA DE TARJETAS

## Objetivo

Crear sistema de cards reutilizable.

---

## Componente

```text
Card
```

---

## Variantes

### Default

---

### Elevated

---

### Premium

---

### Dashboard

---

## Subcomponentes

### Header

### Body

### Footer

---

## Restricción

No crear cards específicas de negocio.

---

# Criterio de Finalización

Sistema de cards operativo.

---

# IMP-211 SISTEMA DE MODALES

## Objetivo

Crear infraestructura para diálogos.

---

## Componentes

### Modal

### Alert Dialog

### Confirm Dialog

### Drawer

---

## Capacidades

* Overlay.
* Escape.
* Focus trap.
* Scroll lock.

---

## Restricción

Todos accesibles.

---

# Criterio de Finalización

Sistema de modales funcional.

---

# IMP-212 SISTEMA DE BADGES

## Objetivo

Representar estados visuales.

---

## Componente

```text
Badge
```

---

## Variantes

### Primary

### Secondary

### Success

### Warning

### Error

### Neutral

---

## Casos futuros

* Servicios.
* Promociones.
* Formularios.
* Dashboard.

---

# Criterio de Finalización

Badges reutilizables.

---

# IMP-213 SISTEMA DE ALERTAS

## Objetivo

Mostrar mensajes contextuales.

---

## Componentes

### Alert

### Success Alert

### Warning Alert

### Error Alert

### Info Alert

---

## Restricción

No utilizar alert() del navegador.

---

# Criterio de Finalización

Alertas reutilizables.

---

# IMP-214 SISTEMA DE TOASTS

## Objetivo

Implementar feedback temporal.

---

## Tarea 1

Configurar provider.

---

## Tarea 2

Crear helper global.

---

## Casos

### Success

### Error

### Warning

### Info

---

# Criterio de Finalización

Toasts operativos.

---

# IMP-215 SISTEMA DE TABLAS

## Objetivo

Crear base para dashboard.

---

## Componentes

### Table

### Table Header

### Table Body

### Table Row

### Table Cell

### Empty State

---

## Capacidades futuras

* Paginación.
* Ordenamiento.
* Filtros.

---

## Restricción

No implementar lógica aún.

---

# Criterio de Finalización

Tabla reutilizable disponible.

---

# IMP-216 EMPTY STATES

## Objetivo

Unificar estados sin información.

---

## Componentes

### EmptyServices

### EmptySpecialists

### EmptyForms

### EmptySearch

### EmptyGeneric

---

## Elementos

* Icono.
* Título.
* Descripción.
* Acción opcional.

---

# Criterio de Finalización

Estados vacíos consistentes.

---

# IMP-217 SISTEMA DE SKELETONS

## Objetivo

Eliminar loaders genéricos.

---

## Componentes

### Skeleton

### CardSkeleton

### TableSkeleton

### FormSkeleton

### PageSkeleton

### HeroSkeleton

---

## Restricción

No usar spinners como carga principal.

---

# Criterio de Finalización

Skeletons reutilizables.

---

# IMP-218 COMPONENTES DE NAVEGACIÓN

## Objetivo

Preparar navegación global.

---

## Componentes

### Navbar

### Footer

### Breadcrumb

### Pagination

### Mobile Menu

---

## Restricción

Solo estructura visual.

Sin lógica de negocio.

---

# Criterio de Finalización

Componentes de navegación creados.

---

# IMP-219 ACCESIBILIDAD BASE

## Objetivo

Garantizar accesibilidad desde el inicio.

---

## Verificar

* Labels.
* Focus visible.
* Navegación teclado.
* Contraste.
* Roles ARIA.

---

## Restricción

Ningún componente puede aprobarse sin accesibilidad.

---

# Criterio de Finalización

Base accesible implementada.

---

# IMP-220 STORYBOOK INTERNO (OPCIONAL)

## Objetivo

Documentar componentes.

---

## Tarea

Preparar entorno para visualizar:

* Buttons.
* Inputs.
* Cards.
* Modals.
* Tables.

---

## Beneficio

Validación rápida de UI.

---

# Criterio de Finalización

Componentes visualmente verificables.

---

# IMP-221 VALIDACIÓN FINAL DEL BLOQUE

Antes de continuar verificar:

* Tokens implementados.
* Colores implementados.
* Tipografía implementada.
* Espaciado implementado.
* Grid implementado.
* Container operativo.
* Section operativo.
* Button completo.
* Inputs completos.
* Cards completas.
* Modales completos.
* Badges completos.
* Alertas completas.
* Toasts operativos.
* Tablas creadas.
* Empty states creados.
* Skeletons creados.
* Navegación creada.
* Accesibilidad validada.

---

# RESULTADO ESPERADO

Al finalizar este bloque debe existir una UI Foundation completa y estable basada en DESIGN.md.

Todas las futuras páginas, módulos, formularios, dashboards y funcionalidades deberán construirse exclusivamente utilizando estos componentes reutilizables.

A partir de este punto queda prohibido crear componentes visuales ad hoc sin pasar por el sistema de diseño definido en este bloque.


# IMPLEMENTATION PLAN

# BLOQUE 4

# CAPA DE DATOS

---

# IMP-300 OBJETIVO

## IMP-300.1 Propósito

Construir toda la capa de acceso y manipulación de datos de la aplicación.

Este bloque conecta formalmente el frontend con la base de datos implementada en Supabase y documentada en DATABASE.md.

La finalidad es crear una capa desacoplada que permita:

* Consultar datos.
* Validar datos.
* Transformar datos.
* Persistir datos.
* Gestionar errores.
* Mantener tipado estricto.

Ningún componente visual deberá consultar Supabase directamente.

Toda interacción con la base de datos deberá pasar por esta capa.

---

# IMP-301 DEPENDENCIAS

## Requisitos Previos

Debe encontrarse finalizado:

* Bloque 1.
* Bloque 2.
* Bloque 3.

Verificar:

* Supabase conectado.
* Arquitectura por features creada.
* Sistema de errores implementado.
* Sistema de tipos compartidos disponible.
* UI Foundation finalizada.

---

# IMP-302 ARQUITECTURA DE LA CAPA DE DATOS

## Objetivo

Definir la estructura oficial para acceso a datos.

---

## Crear estructura base

```text
src/

features/

services/
specialists/
contact/
auth/
dashboard/

repositories/
dto/
mappers/
schemas/
types/
actions/
```

---

## Responsabilidades

### repositories

Acceso a Supabase.

---

### dto

Contratos de entrada y salida.

---

### mappers

Transformación de datos.

---

### schemas

Validaciones Zod.

---

### types

Tipado interno.

---

### actions

Server Actions.

---

# Restricción

No realizar consultas Supabase desde componentes.

---

# Criterio de Finalización

Arquitectura creada.

---

# IMP-303 GENERACIÓN DE TIPOS SUPABASE

## Objetivo

Generar tipado oficial de la base de datos.

---

## Fuente

DATABASE.md

Supabase Schema.

---

## Tarea 1

Generar tipos automáticos.

---

## Resultado esperado

```typescript
Database
```

---

## Tarea 2

Crear archivo.

```text
src/types/database.types.ts
```

---

## Tarea 3

Versionar archivo.

---

## Restricción

No modificar manualmente tipos generados.

---

# Criterio de Finalización

Tipos de base de datos disponibles.

---

# IMP-304 TIPOS DE DOMINIO

## Objetivo

Crear modelos tipados de negocio.

---

## Crear tipos para

### Service

---

### ServiceImage

---

### Category

---

### Specialist

---

### ContactForm

---

### User

---

### Role

---

## Restricción

No utilizar tipos generados de Supabase directamente en UI.

---

## Motivo

Separar infraestructura de dominio.

---

# Criterio de Finalización

Modelos de dominio definidos.

---

# IMP-305 DTOs DE LECTURA

## Objetivo

Definir contratos de salida.

---

## Crear DTOs

### ServiceListDto

---

### ServiceDetailDto

---

### SpecialistListDto

---

### SpecialistDetailDto

---

### PromotionDto

---

### ContactFormDto

---

## Responsabilidad

Representar exactamente la información que consume la UI.

---

# Restricción

No exponer estructuras internas completas.

---

# Criterio de Finalización

DTOs de lectura creados.

---

# IMP-306 DTOs DE ESCRITURA

## Objetivo

Definir contratos de entrada.

---

## Crear DTOs

### CreateServiceDto

---

### UpdateServiceDto

---

### CreateSpecialistDto

---

### UpdateSpecialistDto

---

### CreateContactFormDto

---

### LoginDto

---

## Responsabilidad

Representar exactamente los datos permitidos para escritura.

---

# Restricción

No reutilizar DTOs de lectura.

---

# Criterio de Finalización

DTOs de escritura creados.

---

# IMP-307 MAPPERS DE DOMINIO

## Objetivo

Transformar datos entre capas.

---

## Crear carpeta

```text
mappers
```

---

## Mappers requeridos

### service.mapper.ts

---

### specialist.mapper.ts

---

### promotion.mapper.ts

---

### contact.mapper.ts

---

## Responsabilidades

Transformar:

```text
Database Row

↓

Domain Type

↓

DTO
```

---

## Restricción

La UI nunca debe consumir filas crudas de Supabase.

---

# Criterio de Finalización

Mappers implementados.

---

# IMP-308 VALIDACIONES ZOD GLOBALES

## Objetivo

Crear validaciones centralizadas.

---

## Crear estructura

```text
schemas
```

---

## Validaciones requeridas

### service.schema.ts

---

### specialist.schema.ts

---

### promotion.schema.ts

---

### contact.schema.ts

---

### auth.schema.ts

---

# Responsabilidades

Validar:

* Tipos.
* Longitudes.
* Campos requeridos.
* Rangos.
* Formatos.

---

# Restricción

Nunca confiar únicamente en validaciones visuales.

---

# Criterio de Finalización

Validaciones disponibles.

---

# IMP-309 SCHEMA DE AUTENTICACIÓN

## Objetivo

Validar accesos administrativos.

---

## Crear

### LoginSchema

---

## Validar

### Email

Formato válido.

---

### Password

Longitud mínima.

---

## Restricción

No almacenar validaciones dentro del formulario.

---

# Criterio de Finalización

Autenticación validada.

---

# IMP-310 SCHEMA DE CONTACTO

## Objetivo

Validar formularios públicos.

---

## Crear

### ContactFormSchema

---

## Validar

Nombre.

Correo.

Teléfono.

Mensaje.

Servicio.

---

## Restricción

Toda validación centralizada.

---

# Criterio de Finalización

Formulario validable.

---

# IMP-311 REPOSITORY BASE

## Objetivo

Definir patrón único de acceso a datos.

---

## Crear

```text
base.repository.ts
```

---

## Responsabilidades

* Manejo de errores.
* Conversión de respuestas.
* Logging.
* Validaciones comunes.

---

## Beneficio

Evitar lógica repetida.

---

# Criterio de Finalización

Repository base disponible.

---

# IMP-312 REPOSITORIO DE SERVICIOS

## Objetivo

Crear acceso completo a servicios.

---

## Crear

```text
service.repository.ts
```

---

## Consultas requeridas

### Obtener servicios públicos.

---

### Obtener destacados.

---

### Obtener por slug.

---

### Obtener por categoría.

---

### Obtener promociones.

---

### Obtener administrativos.

---

### Crear servicio.

---

### Actualizar servicio.

---

### Eliminar servicio.

---

# Restricción

No mezclar lógica visual.

---

# Criterio de Finalización

Repositorio funcional.

---

# IMP-313 REPOSITORIO DE ESPECIALISTAS

## Objetivo

Gestionar especialistas.

---

## Consultas requeridas

### Listar.

### Obtener detalle.

### Crear.

### Actualizar.

### Eliminar.

---

## Considerar

Relación:

```text
service_specialists
```

---

# Criterio de Finalización

Repositorio funcional.

---

# IMP-314 REPOSITORIO DE FORMULARIOS

## Objetivo

Gestionar mensajes recibidos.

---

## Consultas requeridas

### Crear formulario.

### Listar formularios.

### Obtener detalle.

### Cambiar estado.

### Archivar.

---

# Restricción

Seguir estados definidos en DATABASE.md.

---

# Criterio de Finalización

Repositorio funcional.

---

# IMP-315 REPOSITORIO DE AUTENTICACIÓN

## Objetivo

Centralizar acceso administrativo.

---

## Operaciones

### Login.

### Logout.

### Obtener usuario actual.

### Obtener roles.

### Validar sesión.

---

## Restricción

No utilizar Supabase Auth directamente desde UI.

---

# Criterio de Finalización

Repositorio funcional.

---

# IMP-316 SERVICIOS DE DOMINIO

## Objetivo

Separar lógica de negocio de acceso a datos.

---

## Crear

### service.service.ts

### specialist.service.ts

### contact.service.ts

### auth.service.ts

---

## Responsabilidades

Coordinar:

* Repositorios.
* Validaciones.
* Reglas de negocio.

---

# Restricción

No realizar consultas directas.

---

# Criterio de Finalización

Servicios creados.

---

# IMP-317 SERVER ACTIONS BASE

## Objetivo

Crear capa oficial de mutaciones.

---

## Crear estructura

```text
actions
```

---

## Responsabilidades

* Validar.
* Ejecutar servicio.
* Manejar errores.
* Retornar respuesta tipada.

---

# Restricción

No incluir lógica visual.

---

# Criterio de Finalización

Infraestructura lista.

---

# IMP-318 SERVER ACTIONS DE AUTENTICACIÓN

## Objetivo

Implementar operaciones de acceso.

---

## Actions

### login.action.ts

### logout.action.ts

---

## Flujo

```text
Schema

↓

Service

↓

Repository

↓

Supabase
```

---

# Criterio de Finalización

Acciones operativas.

---

# IMP-319 SERVER ACTIONS DE CONTACTO

## Objetivo

Implementar envío de formularios.

---

## Action

```text
submit-contact-form.action.ts
```

---

## Flujo

Validar.

Persistir.

Retornar respuesta.

---

# Restricción

No enviar correos todavía.

---

# Criterio de Finalización

Formulario funcional.

---

# IMP-320 SERVER ACTIONS ADMINISTRATIVAS

## Objetivo

Preparar CRUD futuros.

---

## Crear acciones base

### create-service.action.ts

### update-service.action.ts

### delete-service.action.ts

### create-specialist.action.ts

### update-specialist.action.ts

### delete-specialist.action.ts

---

## Restricción

No construir UI todavía.

---

# Criterio de Finalización

Mutaciones preparadas.

---

# IMP-321 RESPUESTAS TIPADAS

## Objetivo

Unificar estructura de respuesta.

---

## Crear contrato

```typescript
ActionResponse<T>
```

---

## Formato

```typescript
{
 success,
 data,
 error
}
```

---

## Restricción

Todas las actions deben utilizarlo.

---

# Criterio de Finalización

Respuestas consistentes.

---

# IMP-322 MANEJO DE ERRORES DE DATOS

## Objetivo

Estandarizar errores.

---

## Casos

### Not Found

---

### Validation

---

### Unauthorized

---

### Database

---

### External Service

---

## Restricción

Nunca retornar errores crudos de Supabase.

---

# Criterio de Finalización

Errores normalizados.

---

# IMP-323 PRUEBAS DE INTEGRACIÓN TÉCNICA

## Objetivo

Validar conexión completa.

---

## Verificaciones

### Obtener categorías.

---

### Obtener servicios.

---

### Obtener especialistas.

---

### Crear formulario.

---

### Login administrativo.

---

### Logout.

---

## Resultado esperado

Todas las operaciones ejecutan correctamente.

---

# IMP-324 VALIDACIÓN FINAL DEL BLOQUE

Antes de continuar verificar:

* Tipos Supabase generados.
* Tipos de dominio creados.
* DTOs lectura creados.
* DTOs escritura creados.
* Mappers implementados.
* Schemas Zod creados.
* Repositories implementados.
* Servicios implementados.
* Server Actions implementadas.
* Respuestas tipadas.
* Errores normalizados.
* Integración Supabase validada.

---

# RESULTADO ESPERADO

Al finalizar este bloque la aplicación deberá estar completamente conectada a la base de datos real de Supabase mediante una arquitectura desacoplada, tipada y escalable.

Toda lectura y escritura de datos deberá realizarse exclusivamente a través de repositories, services y server actions.

A partir de este punto ya existe una capa de datos sólida que permitirá comenzar la construcción de las funcionalidades públicas del sitio sin necesidad de modificar la arquitectura de acceso a datos.

# IMPLEMENTATION PLAN

# BLOQUE 5

# MÓDULO PÚBLICO CORE

---

# IMP-400 OBJETIVO

## IMP-400.1 Propósito

Construir completamente la experiencia pública principal del sitio web.

Este bloque implementa todas las funcionalidades visibles para visitantes:

* Home.
* Categorías.
* Servicios.
* Especialistas.
* Contacto.

Al finalizar este bloque el sitio deberá ser completamente navegable y consumir datos reales desde Supabase.

---

# IMP-401 DEPENDENCIAS

## Requisitos Previos

Debe encontrarse finalizado:

* Bloque 1.
* Bloque 2.
* Bloque 3.
* Bloque 4.

Verificar:

* Sistema de diseño operativo.
* Repositories operativos.
* Services operativos.
* Server Actions funcionales.
* Supabase conectado.
* Tipados implementados.

---

# IMP-402 NAVEGACIÓN PÚBLICA

## Objetivo

Construir la navegación principal del sitio.

---

## Tarea 1

Implementar Navbar definitiva.

---

## Elementos

### Logo

---

### Inicio

---

### Servicios

---

### Especialistas

---

### Promociones

---

### Contacto

---

## Tarea 2

Implementar navegación responsive.

---

## Desktop

Menú horizontal.

---

## Mobile

Menú colapsable.

---

## Tarea 3

Implementar estados activos.

---

## Tarea 4

Implementar CTA principal.

Ejemplo:

```text id="s8j8eo"
Agendar cita
```

---

# Criterio de Finalización

Navegación completa funcional.

---

# IMP-403 FOOTER DEFINITIVO

## Objetivo

Construir pie de página oficial.

---

## Secciones

### Marca

---

### Navegación rápida

---

### Servicios destacados

---

### Contacto

---

### Redes sociales

---

### Derechos reservados

---

## Restricción

No duplicar navegación innecesariamente.

---

# Criterio de Finalización

Footer implementado.

---

# IMP-404 HOME PAGE

## Objetivo

Construir la página principal.

---

## Ruta

```text id="rj08zu"
/
```

---

# IMP-405 HOME - HERO SECTION

## Objetivo

Crear primera impresión del sitio.

---

## Componentes

### Título principal

---

### Descripción

---

### CTA principal

---

### CTA secundaria

---

### Imagen principal

---

## Restricción

No utilizar sliders.

---

# Criterio de Finalización

Hero implementado.

---

# IMP-406 HOME - SERVICIOS DESTACADOS

## Objetivo

Mostrar servicios relevantes.

---

## Fuente

Repositorio de servicios.

---

## Consultas

### Servicios destacados

```text id="myu4c7"
is_featured = true
```

---

## Componentes

### ServiceCard

---

## Información

* Imagen.
* Nombre.
* Categoría.
* Descripción corta.

---

# Criterio de Finalización

Sección funcional.

---

# IMP-407 HOME - CATEGORÍAS

## Objetivo

Mostrar categorías disponibles.

---

## Fuente

Tabla:

```text id="zjlwmx"
categories
```

---

## Categorías

### Facial

### Corporal

### Salud

### Spa

---

## Componente

CategoryCard

---

# Criterio de Finalización

Categorías visibles.

---

# IMP-408 HOME - ESPECIALISTAS DESTACADOS

## Objetivo

Generar confianza.

---

## Fuente

Repositorio especialistas.

---

## Información

* Fotografía.
* Nombre.
* Especialidad.
* Servicios asociados.

---

## Componente

SpecialistCard

---

# Criterio de Finalización

Especialistas visibles.

---

# IMP-409 HOME - PROMOCIONES DESTACADAS

## Objetivo

Promocionar campañas activas.

---

## Fuente

Servicios promocionales.

---

## Consulta

```text id="h2fbdx"
is_promotional = true
```

---

## Restricción

Mostrar únicamente promociones vigentes.

---

# Criterio de Finalización

Promociones visibles.

---

# IMP-410 HOME - CTA FINAL

## Objetivo

Incrementar conversiones.

---

## Componentes

### Título

### Texto

### Botón principal

---

## Acción

WhatsApp.

---

# Criterio de Finalización

CTA implementado.

---

# IMP-411 PÁGINA DE SERVICIOS

## Objetivo

Mostrar catálogo completo.

---

## Ruta

```text id="r1e79w"
/servicios
```

---

## Tarea 1

Consultar servicios públicos.

---

## Tarea 2

Implementar grid.

---

## Tarea 3

Implementar filtros por categoría.

---

## Tarea 4

Implementar ordenamiento.

---

## Restricción

No implementar búsqueda avanzada.

---

# Criterio de Finalización

Listado funcional.

---

# IMP-412 SERVICE CARD

## Objetivo

Crear tarjeta oficial de servicio.

---

## Información

### Imagen portada

### Nombre

### Categoría

### Descripción corta

### Precio (si aplica)

### CTA

---

## Acción

Ver detalle.

---

# Criterio de Finalización

Card reutilizable.

---

# IMP-413 DETALLE DE SERVICIO

## Objetivo

Mostrar información completa.

---

## Ruta

```text id="hxh6gi"
/servicios/[slug]
```

---

## Consulta

Obtener servicio por slug.

---

## Mostrar

### Galería

### Nombre

### Descripción

### Beneficios

### Servicios incluidos

### Recomendaciones

### Contraindicaciones

### Observaciones

### Especialistas asociados

---

## CTA

WhatsApp.

---

# Restricción

Slug obtenido desde base de datos.

---

# Criterio de Finalización

Detalle completo funcional.

---

# IMP-414 PÁGINAS DE CATEGORÍAS

## Objetivo

Agrupar servicios.

---

## Ruta

```text id="4v4z9o"
/categorias/[slug]
```

---

## Flujo

Categoría.

↓

Servicios asociados.

---

## Restricción

Utilizar categorías oficiales.

---

# Criterio de Finalización

Páginas funcionales.

---

# IMP-415 PÁGINA DE ESPECIALISTAS

## Objetivo

Mostrar equipo profesional.

---

## Ruta

```text id="hn42yi"
/especialistas
```

---

## Consulta

Especialistas activos.

---

## Mostrar

### Foto

### Nombre

### Cargo

### Descripción

---

## Componente

SpecialistCard.

---

# Criterio de Finalización

Listado funcional.

---

# IMP-416 DETALLE DE ESPECIALISTA

## Objetivo

Mostrar perfil completo.

---

## Ruta

```text id="37xwqg"
/especialistas/[slug]
```

---

## Información

### Fotografía

### Nombre

### Especialidad

### Biografía

### Servicios relacionados

---

## Restricción

Consumir relaciones reales.

---

# Criterio de Finalización

Detalle funcional.

---

# IMP-417 PÁGINA DE PROMOCIONES

## Objetivo

Centralizar promociones.

---

## Ruta

```text id="xzjlwm"
/promociones
```

---

## Consulta

Promociones vigentes.

---

## Restricción

Excluir promociones expiradas.

---

# Criterio de Finalización

Página funcional.

---

# IMP-418 CONTACTO

## Objetivo

Implementar captación de clientes.

---

## Ruta

```text id="c8x9nm"
/contacto
```

---

# IMP-419 FORMULARIO DE CONTACTO

## Objetivo

Permitir envío de consultas.

---

## Campos

### Nombre

### Correo

### Teléfono

### Servicio de interés

### Mensaje

---

## Validación

Schema Zod.

---

## Acción

Server Action.

---

## Persistencia

Tabla:

```text id="c7z57w"
contact_forms
```

---

# Criterio de Finalización

Formulario funcional.

---

# IMP-420 CONFIRMACIÓN DE ENVÍO

## Objetivo

Proporcionar feedback.

---

## Mostrar

### Mensaje éxito

---

### Error validación

---

### Error servidor

---

## Utilizar

Toast System.

---

# Criterio de Finalización

Feedback operativo.

---

# IMP-421 INTEGRACIÓN WHATSAPP

## Objetivo

Maximizar conversiones.

---

## Implementar

Botón global.

---

## Ubicaciones

### Hero

### Servicios

### Detalles

### Contacto

### CTA final

---

## Utilizar

Helper global.

---

# Criterio de Finalización

WhatsApp integrado.

---

# IMP-422 EMPTY STATES PÚBLICOS

## Objetivo

Gestionar ausencia de datos.

---

## Casos

### Sin servicios

### Sin especialistas

### Sin promociones

### Categoría vacía

---

# Criterio de Finalización

Estados vacíos implementados.

---

# IMP-423 MANEJO DE ERRORES PÚBLICOS

## Objetivo

Evitar pantallas rotas.

---

## Casos

### Servicio inexistente

### Categoría inexistente

### Especialista inexistente

### Error consulta

---

## Mostrar

Página amigable.

---

# Criterio de Finalización

Errores controlados.

---

# IMP-424 LOADING STATES

## Objetivo

Mejorar experiencia de usuario.

---

## Crear

### Home Skeleton

### Services Skeleton

### Detail Skeleton

### Specialists Skeleton

---

# Criterio de Finalización

Carga optimizada.

---

# IMP-425 VALIDACIÓN FINAL DEL BLOQUE

Antes de continuar verificar:

* Navbar funcional.
* Footer funcional.
* Home completa.
* Servicios listados.
* Detalles de servicio funcionales.
* Categorías funcionales.
* Especialistas funcionales.
* Detalles de especialista funcionales.
* Promociones funcionales.
* Contacto funcional.
* Formulario persistiendo datos.
* WhatsApp operativo.
* Empty states implementados.
* Errores controlados.
* Skeletons implementados.

---

# RESULTADO ESPERADO

Al finalizar este bloque el sitio público estará completamente operativo y navegable.

Los usuarios podrán:

* Explorar servicios.
* Navegar categorías.
* Consultar especialistas.
* Visualizar promociones.
* Contactar al negocio.
* Enviar formularios.
* Comunicarse mediante WhatsApp.

Toda la información deberá provenir de la base de datos real mediante la arquitectura definida en los bloques anteriores.

Este es el primer punto donde el producto puede considerarse funcional para usuarios finales, aunque todavía faltan SEO, autenticación administrativa y panel de gestión.

# IMPLEMENTATION PLAN

# BLOQUE 6

# SEO Y DESCUBRIMIENTO

---

# IMP-500 OBJETIVO

## IMP-500.1 Propósito

Implementar toda la infraestructura SEO del proyecto para garantizar:

* Indexación correcta.
* Descubrimiento orgánico.
* Compartición en redes sociales.
* Posicionamiento local.
* Correcta interpretación por motores de búsqueda.

Al finalizar este bloque el sitio deberá estar preparado para ser rastreado e indexado correctamente.

---

# IMP-501 DEPENDENCIAS

## Requisitos Previos

Debe encontrarse finalizado:

* Bloque 1.
* Bloque 2.
* Bloque 3.
* Bloque 4.
* Bloque 5.

Verificar:

* Sitio público completamente funcional.
* Rutas dinámicas implementadas.
* Metadata global configurada.
* Servicios disponibles.
* Categorías disponibles.
* Especialistas disponibles.

---

# IMP-502 CONFIGURACIÓN SEO CENTRALIZADA

## Objetivo

Crear una capa única para gestión SEO.

---

## Crear estructura

```text
src/lib/seo
```

---

## Archivos

```text
metadata.ts

structured-data.ts

seo-config.ts

canonical.ts

open-graph.ts
```

---

## Responsabilidad

Centralizar toda la configuración SEO.

---

## Restricción

No duplicar configuraciones SEO dentro de páginas.

---

# Criterio de Finalización

Infraestructura SEO creada.

---

# IMP-503 CONFIGURACIÓN GLOBAL DE METADATA

## Objetivo

Definir la metadata raíz del sitio.

---

## Implementar

### Título base

---

### Descripción principal

---

### Keywords globales

---

### Robots

---

### Open Graph

---

### Twitter Card

---

### URL principal

---

## Fuente

Información corporativa definida en el alcance.

---

# Restricción

No utilizar metadata genérica.

---

# Criterio de Finalización

Metadata raíz implementada.

---

# IMP-504 GENERADOR DE METADATA DINÁMICA

## Objetivo

Evitar repetición de configuraciones.

---

## Crear

```typescript
generatePageMetadata()
```

---

## Responsabilidades

Generar:

* Title.
* Description.
* Canonical.
* Open Graph.
* Robots.

---

## Entradas

```typescript
title

description

image

url
```

---

# Criterio de Finalización

Generador reutilizable disponible.

---

# IMP-505 METADATA HOME

## Objetivo

Optimizar página principal.

---

## Ruta

```text
/
```

---

## Configurar

### Title

---

### Description

---

### Keywords

---

### Open Graph

---

### Canonical

---

## Restricción

No duplicar textos corporativos.

---

# Criterio de Finalización

Home optimizada.

---

# IMP-506 METADATA SERVICIOS

## Objetivo

Optimizar catálogo general.

---

## Ruta

```text
/servicios
```

---

## Configurar

### Título específico

### Descripción específica

### Canonical

### Open Graph

---

# Criterio de Finalización

Listado optimizado.

---

# IMP-507 METADATA DETALLE DE SERVICIO

## Objetivo

Posicionar cada servicio individualmente.

---

## Ruta

```text
/servicios/[slug]
```

---

## Generar dinámicamente

### Nombre del servicio

### Descripción resumida

### Imagen principal

### URL canónica

---

## Fuente

Base de datos.

---

## Restricción

No utilizar metadata estática.

---

# Criterio de Finalización

Servicios optimizados individualmente.

---

# IMP-508 METADATA CATEGORÍAS

## Objetivo

Posicionar categorías.

---

## Ruta

```text
/categorias/[slug]
```

---

## Generar

### Nombre categoría

### Descripción categoría

### Canonical

---

# Criterio de Finalización

Categorías optimizadas.

---

# IMP-509 METADATA ESPECIALISTAS

## Objetivo

Posicionar perfiles profesionales.

---

## Ruta

```text
/especialistas/[slug]
```

---

## Generar dinámicamente

### Nombre

### Especialidad

### Descripción

### Imagen

---

# Restricción

Excluir especialistas inactivos.

---

# Criterio de Finalización

Perfiles optimizados.

---

# IMP-510 OPEN GRAPH

## Objetivo

Controlar apariencia en redes sociales.

---

## Implementar

### og:title

### og:description

### og:image

### og:url

### og:type

---

## Aplicar a

### Home

### Servicios

### Categorías

### Especialistas

### Promociones

---

# Restricción

No reutilizar imágenes incorrectas.

---

# Criterio de Finalización

Open Graph funcional.

---

# IMP-511 IMÁGENES SEO

## Objetivo

Optimizar recursos visuales.

---

## Tarea 1

Definir imagen OG principal.

---

## Tarea 2

Definir imágenes OG dinámicas.

---

## Tarea 3

Crear fallback.

---

## Restricción

No utilizar imágenes vacías.

---

# Criterio de Finalización

Imágenes SEO disponibles.

---

# IMP-512 CANONICAL URLS

## Objetivo

Evitar contenido duplicado.

---

## Crear helper

```typescript
buildCanonicalUrl()
```

---

## Aplicar a

### Home

### Servicios

### Categorías

### Especialistas

### Promociones

### Contacto

---

# Restricción

Toda página indexable debe tener canonical.

---

# Criterio de Finalización

Canonicals implementadas.

---

# IMP-513 ROBOTS.TXT

## Objetivo

Controlar rastreo.

---

## Crear

```text
/app/robots.ts
```

---

## Permitir

```text
/
```

---

## Bloquear

```text
/admin
```

---

## Bloquear

```text
/admin/*
```

---

## Incluir

Sitemap.

---

# Criterio de Finalización

robots.txt generado.

---

# IMP-514 SITEMAP.XML

## Objetivo

Facilitar indexación.

---

## Crear

```text
/app/sitemap.ts
```

---

## Incluir

### Home

### Servicios

### Categorías

### Especialistas

### Promociones

### Contacto

---

## Tarea adicional

Generar rutas dinámicas.

---

## Fuente

Base de datos.

---

# Restricción

Excluir URLs administrativas.

---

# Criterio de Finalización

Sitemap generado dinámicamente.

---

# IMP-515 STRUCTURED DATA BASE

## Objetivo

Implementar Schema.org.

---

## Crear

```text
structured-data.ts
```

---

## Formato

```json
JSON-LD
```

---

## Restricción

Utilizar especificaciones oficiales.

---

# Criterio de Finalización

Infraestructura disponible.

---

# IMP-516 ORGANIZATION SCHEMA

## Objetivo

Describir el negocio.

---

## Implementar

```text
Organization
```

---

## Información

### Nombre

### Logo

### URL

### Redes sociales

### Contacto

---

# Criterio de Finalización

Schema implementado.

---

# IMP-517 LOCAL BUSINESS SCHEMA

## Objetivo

Mejorar SEO local.

---

## Implementar

```text
LocalBusiness
```

---

## Datos

### Nombre comercial

### Dirección

### Ciudad

### País

### Teléfono

### Horarios

### Coordenadas

### Redes

---

## Fuente

Información corporativa oficial.

---

# Criterio de Finalización

Schema local implementado.

---

# IMP-518 SERVICE SCHEMA

## Objetivo

Mejorar posicionamiento de servicios.

---

## Aplicar

Detalle de servicio.

---

## Información

### Nombre

### Descripción

### Categoría

### Proveedor

---

# Restricción

Generación dinámica.

---

# Criterio de Finalización

Servicios enriquecidos.

---

# IMP-519 BREADCRUMB SCHEMA

## Objetivo

Mejorar navegación indexada.

---

## Aplicar

### Servicios

### Categorías

### Especialistas

---

## Generar

Jerarquía real.

---

# Criterio de Finalización

Breadcrumb schema operativo.

---

# IMP-520 SEO LOCAL

## Objetivo

Posicionar búsquedas geográficas.

---

## Optimizar

### Home

### Servicios

### Contacto

---

## Incluir

Ubicación real del establecimiento.

---

## Keywords

Ciudad.

Barrio.

Región.

Servicios.

---

## Restricción

No realizar keyword stuffing.

---

# Criterio de Finalización

SEO local configurado.

---

# IMP-521 URLS SEO FRIENDLY

## Objetivo

Garantizar URLs limpias.

---

## Verificar

### Servicios

```text
/servicios/masaje-relajante
```

---

### Especialistas

```text
/especialistas/juliana-gomez
```

---

### Categorías

```text
/categorias/facial
```

---

## Restricción

No utilizar IDs visibles.

---

# Criterio de Finalización

URLs amigables.

---

# IMP-522 INDEXABILIDAD

## Objetivo

Validar rastreo correcto.

---

## Verificar

### Meta Robots

### Canonicals

### Sitemap

### Robots

### Structured Data

---

## Restricción

No indexar panel administrativo.

---

# Criterio de Finalización

Rastreo correcto.

---

# IMP-523 VALIDACIÓN DE GOOGLE

## Objetivo

Preparar integración futura.

---

## Preparar

Google Search Console.

---

## Verificar

Ownership verification.

---

## Restricción

No conectar herramientas analíticas aún.

---

# Criterio de Finalización

Preparado para registro.

---

# IMP-524 VALIDACIÓN FINAL DEL BLOQUE

Antes de continuar verificar:

* Metadata global implementada.
* Metadata dinámica implementada.
* Open Graph implementado.
* Canonicals implementadas.
* Robots configurado.
* Sitemap generado.
* Structured Data implementado.
* Organization Schema implementado.
* Local Business Schema implementado.
* Service Schema implementado.
* Breadcrumb Schema implementado.
* SEO local implementado.
* URLs amigables verificadas.
* Rutas administrativas excluidas.

---

# RESULTADO ESPERADO

Al finalizar este bloque el sitio deberá encontrarse completamente preparado para ser rastreado, interpretado e indexado por motores de búsqueda.

Cada página pública tendrá metadata dinámica, URLs amigables, Open Graph, Structured Data y configuración SEO adecuada.

El sitio estará listo para ser conectado posteriormente a Google Search Console y comenzar su posicionamiento orgánico sin requerir modificaciones estructurales adicionales.

# IMPLEMENTATION PLAN

# BLOQUE 7

# AUTENTICACIÓN Y SEGURIDAD

---

# IMP-600 OBJETIVO

## IMP-600.1 Propósito

Implementar la infraestructura completa de autenticación y protección del panel administrativo.

Este bloque tiene como finalidad:

* Gestionar acceso administrativo.
* Proteger rutas privadas.
* Gestionar sesiones.
* Controlar permisos.
* Evitar accesos no autorizados.
* Proteger operaciones críticas.

Al finalizar este bloque únicamente usuarios autenticados podrán acceder al dashboard.

---

# IMP-601 DEPENDENCIAS

## Requisitos Previos

Debe encontrarse finalizado:

* Bloque 1.
* Bloque 2.
* Bloque 3.
* Bloque 4.
* Bloque 5.
* Bloque 6.

Verificar:

* Supabase Auth operativo.
* Middleware configurado.
* Repositories disponibles.
* Services disponibles.
* Server Actions disponibles.
* Dashboard preparado.

---

# IMP-602 ARQUITECTURA DE AUTENTICACIÓN

## Objetivo

Definir la estructura oficial del módulo.

---

## Crear estructura

```text
features/auth

actions/

components/

repositories/

services/

schemas/

types/

guards/

utils/
```

---

## Responsabilidades

### actions

Operaciones autenticadas.

---

### repositories

Acceso a Supabase Auth.

---

### services

Lógica de autenticación.

---

### guards

Protección de acceso.

---

### schemas

Validaciones.

---

### components

UI de login.

---

# Criterio de Finalización

Arquitectura creada.

---

# IMP-603 MODELO DE ROLES

## Objetivo

Definir jerarquía de acceso.

---

## Roles soportados

```text
OWNER
EMPLOYEE
SUPER_ADMIN
```

---

## MVP

Rol utilizado:

```text
OWNER
```

---

## Restricción

Aunque sólo OWNER se utilice inicialmente, toda la arquitectura debe soportar múltiples roles.

---

# Criterio de Finalización

Roles definidos.

---

# IMP-604 TIPOS DE AUTENTICACIÓN

## Objetivo

Definir contratos del dominio.

---

## Crear tipos

### AuthUser

---

### SessionUser

---

### UserRole

---

### AuthSession

---

### LoginCredentials

---

### Permission

---

# Restricción

No utilizar directamente tipos internos de Supabase en UI.

---

# Criterio de Finalización

Tipos implementados.

---

# IMP-605 LOGIN PAGE

## Objetivo

Crear acceso administrativo.

---

## Ruta

```text
/admin/login
```

---

## Componentes

### LoginForm

---

### LoginCard

---

### LoginHeader

---

## Campos

### Email

### Password

---

## Validación

Schema Zod.

---

## Restricción

No almacenar lógica en componentes.

---

# Criterio de Finalización

Pantalla creada.

---

# IMP-606 FORMULARIO DE LOGIN

## Objetivo

Implementar flujo de autenticación.

---

## Flujo

```text
Formulario

↓

Validación Zod

↓

Server Action

↓

Auth Service

↓

Auth Repository

↓

Supabase Auth
```

---

## Casos

### Credenciales válidas

---

### Credenciales inválidas

---

### Usuario inexistente

---

### Error servidor

---

# Criterio de Finalización

Login funcional.

---

# IMP-607 AUTH REPOSITORY

## Objetivo

Centralizar acceso a Supabase Auth.

---

## Crear

```text
auth.repository.ts
```

---

## Operaciones

### Sign In

### Sign Out

### Get Session

### Get User

### Refresh Session

---

## Restricción

No acceder a Supabase Auth desde componentes.

---

# Criterio de Finalización

Repositorio funcional.

---

# IMP-608 AUTH SERVICE

## Objetivo

Centralizar reglas de autenticación.

---

## Crear

```text
auth.service.ts
```

---

## Responsabilidades

### Validar usuario

### Obtener rol

### Crear sesión

### Cerrar sesión

### Validar permisos

---

## Restricción

Toda lógica de negocio debe pasar por este servicio.

---

# Criterio de Finalización

Servicio implementado.

---

# IMP-609 SERVER ACTION LOGIN

## Objetivo

Implementar autenticación segura.

---

## Crear

```text
login.action.ts
```

---

## Responsabilidades

### Validar schema

### Ejecutar login

### Gestionar errores

### Retornar respuesta tipada

---

## Restricción

Nunca exponer errores internos.

---

# Criterio de Finalización

Action funcional.

---

# IMP-610 SERVER ACTION LOGOUT

## Objetivo

Cerrar sesión correctamente.

---

## Crear

```text
logout.action.ts
```

---

## Flujo

```text
Usuario

↓

Action

↓

Service

↓

Repository

↓

Supabase
```

---

# Criterio de Finalización

Logout funcional.

---

# IMP-611 GESTIÓN DE SESIONES

## Objetivo

Mantener autenticación persistente.

---

## Implementar

### Recuperación automática.

### Renovación automática.

### Lectura SSR.

### Lectura Middleware.

---

## Restricción

No depender únicamente del cliente.

---

# Criterio de Finalización

Sesiones persistentes.

---

# IMP-612 SESSION PROVIDER

## Objetivo

Exponer sesión globalmente.

---

## Crear

```text
SessionProvider
```

---

## Responsabilidades

### Usuario actual.

### Estado autenticado.

### Estado cargando.

---

# Restricción

No almacenar datos sensibles.

---

# Criterio de Finalización

Provider funcional.

---

# IMP-613 MIDDLEWARE DE AUTENTICACIÓN

## Objetivo

Proteger acceso antes de renderizar.

---

## Ubicación

```text
middleware.ts
```

---

## Verificar

### Usuario autenticado.

### Sesión válida.

---

## Proteger

```text
/admin/*
```

---

## Redirección

```text
/admin/login
```

---

# Restricción

No permitir acceso sin sesión.

---

# Criterio de Finalización

Middleware operativo.

---

# IMP-614 GUARD DE AUTENTICACIÓN

## Objetivo

Proteger layouts y páginas.

---

## Crear

```text
AuthGuard
```

---

## Responsabilidades

### Verificar sesión.

### Verificar usuario.

### Verificar permisos.

---

## Restricción

No confiar únicamente en middleware.

---

# Criterio de Finalización

Guard implementado.

---

# IMP-615 GUARD DE ROLES

## Objetivo

Controlar permisos.

---

## Crear

```text
RoleGuard
```

---

## Entradas

```typescript
allowedRoles
```

---

## Validaciones

### OWNER

### EMPLOYEE

### SUPER_ADMIN

---

# Criterio de Finalización

Control de roles funcional.

---

# IMP-616 PROTECCIÓN DE LAYOUT ADMIN

## Objetivo

Bloquear acceso a dashboard.

---

## Aplicar

```text
/admin/layout.tsx
```

---

## Flujo

```text
Usuario

↓

Layout

↓

Guard

↓

Dashboard
```

---

## Restricción

No renderizar contenido protegido sin validación.

---

# Criterio de Finalización

Layout protegido.

---

# IMP-617 PROTECCIÓN DE SERVER ACTIONS

## Objetivo

Evitar ejecución no autorizada.

---

## Aplicar a

### Crear servicio.

### Editar servicio.

### Eliminar servicio.

### Crear especialista.

### Editar especialista.

### Eliminar especialista.

---

## Validar

### Sesión.

### Usuario.

### Rol.

---

# Restricción

Toda action administrativa debe validar permisos.

---

# Criterio de Finalización

Actions protegidas.

---

# IMP-618 PROTECCIÓN DE REPOSITORIES

## Objetivo

Añadir capa adicional de seguridad.

---

## Validar

### Usuario autenticado.

### Rol autorizado.

---

## Restricción

No confiar únicamente en frontend.

---

# Criterio de Finalización

Repositories protegidos.

---

# IMP-619 MANEJO DE ERRORES DE AUTENTICACIÓN

## Objetivo

Unificar respuestas.

---

## Casos

### Invalid Credentials

### Unauthorized

### Forbidden

### Session Expired

### Role Not Allowed

---

## Mostrar mensajes amigables.

---

## Restricción

Nunca mostrar errores internos.

---

# Criterio de Finalización

Errores normalizados.

---

# IMP-620 PÁGINA ACCESS DENIED

## Objetivo

Gestionar permisos insuficientes.

---

## Ruta

```text
/admin/access-denied
```

---

## Mostrar

### Mensaje.

### Explicación.

### Acción regresar.

---

# Criterio de Finalización

Página implementada.

---

# IMP-621 PÁGINA SESSION EXPIRED

## Objetivo

Gestionar sesiones vencidas.

---

## Ruta

```text
/admin/session-expired
```

---

## Mostrar

### Sesión finalizada.

### Reingresar.

---

# Criterio de Finalización

Página implementada.

---

# IMP-622 AUDITORÍA BÁSICA DE ACCESO

## Objetivo

Registrar eventos críticos.

---

## Registrar

### Login exitoso.

### Login fallido.

### Logout.

### Acceso denegado.

---

## Restricción

No almacenar información sensible.

---

# Criterio de Finalización

Eventos registrados.

---

# IMP-623 VALIDACIÓN DE SEGURIDAD

## Objetivo

Comprobar protección completa.

---

## Verificar

### Ruta protegida sin login.

### Ruta protegida con login.

### Logout.

### Expiración de sesión.

### Middleware.

### Guards.

### Roles.

### Server Actions.

---

# Resultado esperado

Ninguna ruta administrativa accesible sin autenticación.

---

# IMP-624 VALIDACIÓN FINAL DEL BLOQUE

Antes de continuar verificar:

* Login implementado.
* Logout implementado.
* Auth Repository operativo.
* Auth Service operativo.
* Session Provider funcional.
* Middleware operativo.
* Auth Guard implementado.
* Role Guard implementado.
* Layout administrativo protegido.
* Server Actions protegidas.
* Repositories protegidos.
* Errores normalizados.
* Página Access Denied creada.
* Página Session Expired creada.
* Auditoría básica implementada.

---

# RESULTADO ESPERADO

Al finalizar este bloque el panel administrativo deberá encontrarse completamente protegido mediante autenticación basada en Supabase.

Toda ruta administrativa, acción crítica y operación de escritura deberá requerir una sesión válida y permisos autorizados.

El sistema dispondrá de una arquitectura escalable para soportar múltiples roles en el futuro, aunque el MVP opere inicialmente con un único rol administrativo.

A partir de este punto la plataforma cuenta con un acceso administrativo seguro y está preparada para comenzar la construcción del dashboard y los módulos de gestión internos.

# IMPLEMENTATION PLAN

# BLOQUE 8

# DASHBOARD ADMINISTRATIVO BASE

---

# IMP-700 OBJETIVO

## IMP-700.1 Propósito

Construir toda la infraestructura visual y funcional del panel administrativo.

Este bloque tiene como finalidad crear:

* Layout administrativo definitivo.
* Sidebar.
* Header.
* Navegación interna.
* Dashboard principal.
* Estados vacíos.
* Componentes administrativos compartidos.

Al finalizar este bloque deberá existir un panel administrativo completamente funcional listo para albergar los módulos de gestión.

---

# IMP-701 DEPENDENCIAS

## Requisitos Previos

Debe encontrarse finalizado:

* Bloque 1.
* Bloque 2.
* Bloque 3.
* Bloque 4.
* Bloque 5.
* Bloque 6.
* Bloque 7.

Verificar:

* Login operativo.
* Middleware operativo.
* Guards operativos.
* Layout protegido.
* Sistema de diseño completo.
* Roles definidos.

---

# IMP-702 ARQUITECTURA ADMINISTRATIVA

## Objetivo

Definir la estructura oficial del dashboard.

---

## Crear estructura

```text
src/

features/dashboard

components/

layouts/

navigation/

widgets/

pages/

types/

services/
```

---

## Responsabilidades

### components

Componentes reutilizables.

---

### layouts

Layouts administrativos.

---

### navigation

Sidebar y navegación.

---

### widgets

Tarjetas de estadísticas.

---

### pages

Dashboard principal.

---

# Restricción

No implementar CRUDs todavía.

---

# Criterio de Finalización

Arquitectura creada.

---

# IMP-703 LAYOUT ADMINISTRATIVO DEFINITIVO

## Objetivo

Construir estructura principal del panel.

---

## Ruta

```text
/admin
```

---

## Crear

```text
AdminLayout
```

---

## Estructura

```html
<div>

<Sidebar />

<div>

<Header />

<Main />

</div>

</div>
```

---

## Responsabilidades

### Sidebar persistente

### Header persistente

### Área de contenido

### Gestión responsive

---

# Restricción

Todo módulo administrativo debe renderizar dentro de este layout.

---

# Criterio de Finalización

Layout funcional.

---

# IMP-704 SIDEBAR ADMINISTRATIVO

## Objetivo

Construir navegación principal.

---

## Crear

```text
AdminSidebar
```

---

## Secciones

### Dashboard

```text
/admin/dashboard
```

---

### Servicios

```text
/admin/services
```

---

### Promociones

```text
/admin/promotions
```

---

### Especialistas

```text
/admin/specialists
```

---

### Formularios

```text
/admin/forms
```

---

## Elementos

### Icono

### Nombre

### Estado activo

---

# Restricción

No mostrar opciones no autorizadas.

---

# Criterio de Finalización

Sidebar operativo.

---

# IMP-705 SIDEBAR RESPONSIVE

## Objetivo

Garantizar funcionamiento móvil.

---

## Desktop

Sidebar fija.

---

## Tablet

Sidebar colapsable.

---

## Mobile

Drawer.

---

## Capacidades

### Abrir

### Cerrar

### Overlay

### Escape

---

# Restricción

No duplicar componentes.

---

# Criterio de Finalización

Sidebar responsive.

---

# IMP-706 HEADER ADMINISTRATIVO

## Objetivo

Crear encabezado global.

---

## Crear

```text
AdminHeader
```

---

## Elementos

### Título página

### Breadcrumb

### Usuario actual

### Menú usuario

### Logout

---

## Restricción

No mostrar información sensible.

---

# Criterio de Finalización

Header funcional.

---

# IMP-707 BREADCRUMB ADMINISTRATIVO

## Objetivo

Mejorar orientación.

---

## Crear

```text
AdminBreadcrumb
```

---

## Ejemplos

```text
Dashboard
```

---

```text
Dashboard / Servicios
```

---

```text
Dashboard / Especialistas
```

---

## Generación

Basada en ruta actual.

---

# Criterio de Finalización

Breadcrumb operativo.

---

# IMP-708 NAVEGACIÓN INTERNA

## Objetivo

Centralizar rutas administrativas.

---

## Crear

```text
src/constants/admin-routes.ts
```

---

## Registrar

### Dashboard

### Servicios

### Promociones

### Especialistas

### Formularios

---

## Restricción

No utilizar rutas hardcodeadas.

---

# Criterio de Finalización

Rutas centralizadas.

---

# IMP-709 DASHBOARD HOME

## Objetivo

Construir página principal administrativa.

---

## Ruta

```text
/admin/dashboard
```

---

## Crear

```text
DashboardHome
```

---

## Secciones

### Bienvenida

### Resumen general

### Accesos rápidos

### Actividad reciente

---

# Restricción

No implementar métricas complejas todavía.

---

# Criterio de Finalización

Dashboard visible.

---

# IMP-710 WIDGETS ADMINISTRATIVOS

## Objetivo

Crear sistema reutilizable de estadísticas.

---

## Crear

```text
StatCard
```

---

## Componentes

### Título

### Valor

### Icono

### Descripción

---

## Casos futuros

### Servicios

### Promociones

### Especialistas

### Formularios

---

# Criterio de Finalización

Widgets reutilizables.

---

# IMP-711 TARJETAS DE RESUMEN

## Objetivo

Mostrar información general.

---

## Widgets

### Total servicios

### Total promociones

### Total especialistas

### Formularios recibidos

---

## Fuente

Repositorios existentes.

---

## Restricción

Solo métricas básicas.

---

# Criterio de Finalización

Resumen funcional.

---

# IMP-712 ACCESOS RÁPIDOS

## Objetivo

Reducir navegación innecesaria.

---

## Mostrar

### Crear servicio

### Crear promoción

### Crear especialista

### Ver formularios

---

## Componente

```text
QuickActionCard
```

---

# Criterio de Finalización

Accesos rápidos implementados.

---

# IMP-713 ACTIVIDAD RECIENTE

## Objetivo

Preparar espacio para eventos recientes.

---

## Mostrar inicialmente

### Últimos formularios

### Últimos servicios creados

### Últimos especialistas creados

---

## Restricción

Información resumida.

---

# Criterio de Finalización

Actividad visible.

---

# IMP-714 ESTADOS VACÍOS ADMINISTRATIVOS

## Objetivo

Gestionar ausencia de información.

---

## Crear

### EmptyServicesAdmin

### EmptyPromotionsAdmin

### EmptySpecialistsAdmin

### EmptyFormsAdmin

### EmptyDashboardAdmin

---

## Elementos

### Icono

### Título

### Descripción

### Acción sugerida

---

# Criterio de Finalización

Estados vacíos implementados.

---

# IMP-715 COMPONENTES DE PÁGINA ADMIN

## Objetivo

Estandarizar estructura de pantallas.

---

## Crear

```text
AdminPageHeader
```

---

## Elementos

### Título

### Descripción

### Acción principal

---

---

## Crear

```text
AdminPageContainer
```

---

## Responsabilidades

### Espaciado

### Layout

### Responsive

---

# Criterio de Finalización

Base reutilizable creada.

---

# IMP-716 SISTEMA DE PERMISOS VISUALES

## Objetivo

Preparar interfaz para múltiples roles.

---

## Crear

```text
PermissionGate
```

---

## Responsabilidades

### Mostrar contenido permitido

### Ocultar contenido restringido

---

## Restricción

Complementa los guards.

No reemplaza validaciones backend.

---

# Criterio de Finalización

Permisos visuales operativos.

---

# IMP-717 LOADING STATES ADMINISTRATIVOS

## Objetivo

Mantener experiencia consistente.

---

## Crear

### DashboardSkeleton

### SidebarSkeleton

### StatsSkeleton

### TableSkeleton

---

## Restricción

Utilizar sistema de skeletons existente.

---

# Criterio de Finalización

Carga optimizada.

---

# IMP-718 MANEJO DE ERRORES ADMINISTRATIVOS

## Objetivo

Gestionar errores internos.

---

## Casos

### Error carga dashboard

### Error métricas

### Error sesión

### Error permisos

---

## Mostrar

### Mensaje amigable

### Acción reintentar

---

# Criterio de Finalización

Errores controlados.

---

# IMP-719 VALIDACIÓN RESPONSIVE

## Objetivo

Garantizar compatibilidad.

---

## Verificar

### Desktop

### Laptop

### Tablet

### Mobile

---

## Validar

### Sidebar

### Header

### Dashboard

### Widgets

---

# Criterio de Finalización

Panel responsive.

---

# IMP-720 VALIDACIÓN FINAL DEL BLOQUE

Antes de continuar verificar:

* Layout administrativo implementado.
* Sidebar implementada.
* Sidebar responsive implementada.
* Header implementado.
* Breadcrumb implementado.
* Navegación centralizada.
* Dashboard Home implementado.
* Widgets implementados.
* Tarjetas de resumen funcionales.
* Accesos rápidos funcionales.
* Actividad reciente visible.
* Estados vacíos implementados.
* Componentes base administrativos creados.
* PermissionGate implementado.
* Loading states implementados.
* Errores administrativos controlados.
* Responsive validado.

---

# RESULTADO ESPERADO

Al finalizar este bloque deberá existir un panel administrativo completamente funcional, protegido y navegable.

Los usuarios autenticados podrán acceder a una experiencia administrativa profesional con navegación estructurada, dashboard principal, métricas básicas, accesos rápidos y componentes reutilizables preparados para soportar todos los módulos de gestión que se implementarán en los siguientes bloques.

A partir de este punto la plataforma dispone de una base administrativa sólida sobre la cual construir los CRUD de Servicios, Promociones, Especialistas y Formularios.

# IMPLEMENTATION PLAN

# BLOQUE 9

# CRUD SERVICIOS Y PROMOCIONES

---

# IMP-800 OBJETIVO

## IMP-800.1 Propósito

Construir el módulo administrativo completo para la gestión de:

* Servicios.
* Promociones.
* Imágenes.
* Destacados.
* Estados de publicación.

Al finalizar este bloque el catálogo comercial deberá ser completamente administrable desde el panel administrativo.

---

# IMP-801 DEPENDENCIAS

## Requisitos Previos

Debe encontrarse finalizado:

* Bloque 1 al Bloque 8.

Verificar:

* Dashboard operativo.
* Autenticación operativa.
* Roles implementados.
* Sistema de diseño completo.
* Repositories funcionales.
* Server Actions funcionales.
* Supabase Storage configurado.

---

# IMP-802 ARQUITECTURA DEL MÓDULO

## Objetivo

Crear la estructura oficial del módulo.

---

## Crear estructura

```text
features/services

components/

pages/

forms/

tables/

actions/

repositories/

services/

schemas/

types/

mappers/
```

---

## Restricción

Toda la funcionalidad de servicios deberá permanecer encapsulada dentro del feature.

---

# Criterio de Finalización

Arquitectura creada.

---

# IMP-803 RUTA ADMINISTRATIVA DE SERVICIOS

## Objetivo

Registrar módulo dentro del dashboard.

---

## Ruta

```text
/admin/services
```

---

## Registrar

### Sidebar

### Breadcrumb

### Navegación interna

### Constantes de rutas

---

# Criterio de Finalización

Ruta accesible.

---

# IMP-804 PÁGINA LISTADO DE SERVICIOS

## Objetivo

Visualizar catálogo completo.

---

## Ruta

```text
/admin/services
```

---

## Mostrar

### Tabla

### Estado

### Destacado

### Categoría

### Fecha creación

### Acciones

---

## Fuente

Repositorio de servicios.

---

# Criterio de Finalización

Listado visible.

---

# IMP-805 TABLA ADMINISTRATIVA DE SERVICIOS

## Objetivo

Crear tabla principal.

---

## Crear

```text
ServicesTable
```

---

## Columnas

### Imagen

### Nombre

### Categoría

### Estado

### Destacado

### Fecha creación

### Acciones

---

## Acciones

### Editar

### Eliminar

### Ver

---

# Restricción

Utilizar sistema de tablas creado en Bloque 3.

---

# Criterio de Finalización

Tabla funcional.

---

# IMP-806 FILTROS DE SERVICIOS

## Objetivo

Facilitar administración.

---

## Implementar

### Buscar por nombre

### Filtrar por categoría

### Filtrar por estado

### Filtrar destacados

---

## Restricción

Filtros sincronizados con URL.

---

# Criterio de Finalización

Filtros operativos.

---

# IMP-807 PAGINACIÓN

## Objetivo

Escalar catálogo.

---

## Implementar

### Página actual

### Total registros

### Registros por página

### Navegación

---

## Restricción

Paginación desde servidor.

---

# Criterio de Finalización

Paginación funcional.

---

# IMP-808 CREAR SERVICIO

## Objetivo

Registrar nuevos servicios.

---

## Ruta

```text
/admin/services/create
```

---

## Crear

```text
CreateServiceForm
```

---

## Campos

### Nombre

### Slug

### Categoría

### Descripción corta

### Descripción completa

### Beneficios

### Recomendaciones

### Contraindicaciones

### Observaciones

### Precio

### Estado

### Destacado

---

# Restricción

Validación mediante Zod.

---

# Criterio de Finalización

Creación funcional.

---

# IMP-809 GENERACIÓN DE SLUG

## Objetivo

Mantener URLs amigables.

---

## Implementar

Generación automática desde nombre.

---

## Casos

### Crear

### Editar

### Conflictos

---

## Restricción

Slug único.

---

# Criterio de Finalización

Slugs operativos.

---

# IMP-810 EDICIÓN DE SERVICIOS

## Objetivo

Modificar información existente.

---

## Ruta

```text
/admin/services/[id]/edit
```

---

## Flujo

Cargar datos.

↓

Mostrar formulario.

↓

Validar.

↓

Actualizar.

↓

Confirmar.

---

# Criterio de Finalización

Edición funcional.

---

# IMP-811 ELIMINACIÓN DE SERVICIOS

## Objetivo

Eliminar registros de forma segura.

---

## Implementar

```text
DeleteServiceDialog
```

---

## Flujo

Confirmar.

↓

Validar permisos.

↓

Eliminar.

↓

Actualizar listado.

---

## Restricción

Nunca eliminar sin confirmación.

---

# Criterio de Finalización

Eliminación segura.

---

# IMP-812 ESTADOS DE SERVICIO

## Objetivo

Controlar visibilidad pública.

---

## Estados

```text
DRAFT

PUBLISHED

ARCHIVED
```

---

## Comportamiento

### DRAFT

No visible públicamente.

---

### PUBLISHED

Visible públicamente.

---

### ARCHIVED

Oculto públicamente.

---

# Criterio de Finalización

Estados funcionales.

---

# IMP-813 SERVICIOS DESTACADOS

## Objetivo

Gestionar contenido prioritario.

---

## Campo

```text
is_featured
```

---

## Implementar

### Activar

### Desactivar

---

## Consumo

Home.

Servicios destacados.

Promociones destacadas.

---

# Criterio de Finalización

Destacados funcionales.

---

# IMP-814 GESTIÓN DE IMÁGENES

## Objetivo

Administrar contenido visual.

---

## Integración

Supabase Storage.

---

## Funcionalidades

### Upload

### Preview

### Reemplazo

### Eliminación

---

## Restricción

Validar formatos.

---

# Criterio de Finalización

Imágenes administrables.

---

# IMP-815 GALERÍA DE SERVICIO

## Objetivo

Permitir múltiples imágenes.

---

## Implementar

### Imagen principal

### Imágenes secundarias

### Orden visual

---

## Restricción

Siempre debe existir portada.

---

# Criterio de Finalización

Galería operativa.

---

# IMP-816 VALIDACIONES DE SERVICIO

## Objetivo

Garantizar integridad.

---

## Validar

### Nombre requerido

### Categoría requerida

### Descripción requerida

### Estado válido

### Slug válido

---

## Restricción

Validar frontend y backend.

---

# Criterio de Finalización

Validaciones completas.

---

# IMP-817 SERVER ACTIONS DE SERVICIOS

## Objetivo

Implementar mutaciones.

---

## Crear

### create-service.action.ts

### update-service.action.ts

### delete-service.action.ts

### publish-service.action.ts

### archive-service.action.ts

---

## Restricción

Validar autenticación.

---

# Criterio de Finalización

Actions funcionales.

---

# IMP-818 MÓDULO DE PROMOCIONES

## Objetivo

Administrar promociones.

---

## Ruta

```text
/admin/promotions
```

---

## Principio

Reutilizar infraestructura de servicios.

---

# Restricción

Evitar duplicación de código.

---

# Criterio de Finalización

Módulo creado.

---

# IMP-819 LISTADO DE PROMOCIONES

## Objetivo

Visualizar promociones activas.

---

## Mostrar

### Nombre

### Servicio asociado

### Descuento

### Estado

### Vigencia

### Acciones

---

# Criterio de Finalización

Listado funcional.

---

# IMP-820 CREAR PROMOCIÓN

## Objetivo

Registrar campañas comerciales.

---

## Campos

### Título

### Servicio asociado

### Descuento

### Descripción

### Fecha inicio

### Fecha fin

### Estado

### Destacado

---

# Restricción

Validar fechas.

---

# Criterio de Finalización

Creación funcional.

---

# IMP-821 VALIDACIÓN DE VIGENCIA

## Objetivo

Controlar promociones activas.

---

## Verificar

### Fecha inicio

### Fecha fin

### Estado

---

## Restricción

Promociones expiradas no visibles.

---

# Criterio de Finalización

Vigencia operativa.

---

# IMP-822 EDICIÓN DE PROMOCIONES

## Objetivo

Modificar campañas.

---

## Funcionalidades

### Editar información

### Cambiar fechas

### Cambiar descuento

### Cambiar estado

---

# Criterio de Finalización

Edición funcional.

---

# IMP-823 ELIMINACIÓN DE PROMOCIONES

## Objetivo

Eliminar campañas.

---

## Flujo

Confirmación.

↓

Validación.

↓

Eliminación.

---

# Criterio de Finalización

Eliminación segura.

---

# IMP-824 PUBLICACIÓN DE PROMOCIONES

## Objetivo

Controlar visibilidad.

---

## Estados

```text
DRAFT

ACTIVE

EXPIRED

ARCHIVED
```

---

# Criterio de Finalización

Estados funcionales.

---

# IMP-825 DASHBOARD INTEGRATION

## Objetivo

Actualizar dashboard.

---

## Mostrar

### Total servicios

### Servicios publicados

### Servicios destacados

### Promociones activas

---

# Restricción

Consumir datos reales.

---

# Criterio de Finalización

Dashboard actualizado.

---

# IMP-826 EMPTY STATES

## Objetivo

Gestionar ausencia de registros.

---

## Crear

### EmptyServicesAdmin

### EmptyPromotionsAdmin

---

## Elementos

### Icono

### Descripción

### Acción crear

---

# Criterio de Finalización

Estados vacíos implementados.

---

# IMP-827 LOADING STATES

## Objetivo

Optimizar experiencia.

---

## Crear

### ServicesTableSkeleton

### ServiceFormSkeleton

### PromotionFormSkeleton

---

# Criterio de Finalización

Carga optimizada.

---

# IMP-828 MANEJO DE ERRORES

## Objetivo

Gestionar fallos operativos.

---

## Casos

### Error creación

### Error edición

### Error eliminación

### Error upload

### Error consulta

---

## Mostrar

### Toast

### Mensaje contextual

---

# Criterio de Finalización

Errores controlados.

---

# IMP-829 VALIDACIÓN FINAL DEL BLOQUE

Antes de continuar verificar:

* Listado de servicios funcional.
* Crear servicio funcional.
* Editar servicio funcional.
* Eliminar servicio funcional.
* Estados funcionales.
* Destacados funcionales.
* Upload de imágenes funcional.
* Galería funcional.
* Filtros funcionales.
* Paginación funcional.
* Listado de promociones funcional.
* Crear promoción funcional.
* Editar promoción funcional.
* Eliminar promoción funcional.
* Vigencias funcionales.
* Dashboard actualizado.
* Empty states implementados.
* Loading states implementados.
* Errores controlados.

---

# RESULTADO ESPERADO

Al finalizar este bloque el catálogo comercial completo deberá ser administrable desde el panel administrativo.

Los administradores podrán crear, modificar, publicar, archivar y eliminar servicios y promociones, gestionar imágenes, controlar contenido destacado y administrar la información que será consumida por el sitio público.

A partir de este punto la operación comercial del negocio puede realizarse íntegramente desde el dashboard sin necesidad de modificar código ni acceder directamente a la base de datos.

# IMPLEMENTATION PLAN

# BLOQUE 10

# CRUD ESPECIALISTAS Y FORMULARIOS

---

# IMP-900 OBJETIVO

## IMP-900.1 Propósito

Implementar los módulos administrativos completos para:

* Especialistas.
* Relaciones especialista-servicio.
* Formularios de contacto.
* Gestión de estados.
* Archivado.

Al finalizar este bloque toda la administración de contenido principal del negocio deberá encontrarse centralizada dentro del dashboard.

---

# IMP-901 DEPENDENCIAS

## Requisitos Previos

Debe encontrarse finalizado:

* Bloque 1 al Bloque 9.

Verificar:

* Dashboard operativo.
* Sistema de autenticación operativo.
* CRUD Servicios operativo.
* CRUD Promociones operativo.
* Upload de imágenes operativo.
* Supabase conectado.

---

# IMP-902 ARQUITECTURA DEL MÓDULO

## Objetivo

Crear estructura oficial para especialistas y formularios.

---

## Crear estructura

```text
features/specialists

components/
pages/
forms/
tables/
actions/
repositories/
services/
schemas/
types/
```

---

```text
features/forms

components/
pages/
tables/
actions/
repositories/
services/
schemas/
types/
```

---

# Restricción

Mantener separación estricta por feature.

---

# Criterio de Finalización

Arquitectura creada.

---

# IMP-903 RUTA ADMINISTRATIVA DE ESPECIALISTAS

## Objetivo

Registrar módulo dentro del dashboard.

---

## Ruta

```text
/admin/specialists
```

---

## Registrar

### Sidebar

### Breadcrumb

### Navegación interna

### Constantes administrativas

---

# Criterio de Finalización

Ruta disponible.

---

# IMP-904 LISTADO DE ESPECIALISTAS

## Objetivo

Visualizar especialistas registrados.

---

## Mostrar

### Fotografía

### Nombre

### Especialidad

### Estado

### Servicios asociados

### Fecha creación

### Acciones

---

## Fuente

Repositorio especialistas.

---

# Criterio de Finalización

Listado operativo.

---

# IMP-905 TABLA DE ESPECIALISTAS

## Objetivo

Crear tabla principal.

---

## Crear

```text
SpecialistsTable
```

---

## Columnas

### Imagen

### Nombre

### Especialidad

### Estado

### Cantidad servicios

### Fecha creación

### Acciones

---

## Acciones

### Editar

### Eliminar

### Ver

---

# Restricción

Utilizar tabla base administrativa.

---

# Criterio de Finalización

Tabla funcional.

---

# IMP-906 FILTROS DE ESPECIALISTAS

## Objetivo

Facilitar gestión.

---

## Implementar

### Buscar por nombre

### Buscar por especialidad

### Filtrar por estado

---

## Restricción

Persistencia en URL.

---

# Criterio de Finalización

Filtros funcionales.

---

# IMP-907 CREAR ESPECIALISTA

## Objetivo

Registrar nuevos profesionales.

---

## Ruta

```text
/admin/specialists/create
```

---

## Crear

```text
CreateSpecialistForm
```

---

## Campos

### Nombre

### Slug

### Especialidad

### Biografía corta

### Biografía completa

### Fotografía

### Estado

### Destacado

---

# Restricción

Validación mediante Zod.

---

# Criterio de Finalización

Creación funcional.

---

# IMP-908 EDICIÓN DE ESPECIALISTAS

## Objetivo

Modificar información existente.

---

## Ruta

```text
/admin/specialists/[id]/edit
```

---

## Flujo

Cargar.

↓

Editar.

↓

Validar.

↓

Guardar.

---

# Criterio de Finalización

Edición funcional.

---

# IMP-909 ELIMINACIÓN DE ESPECIALISTAS

## Objetivo

Eliminar registros de forma segura.

---

## Crear

```text
DeleteSpecialistDialog
```

---

## Flujo

Confirmación.

↓

Validación.

↓

Eliminación.

---

## Restricción

Nunca eliminar sin confirmación.

---

# Criterio de Finalización

Eliminación segura.

---

# IMP-910 GESTIÓN DE IMAGEN DE PERFIL

## Objetivo

Administrar fotografías profesionales.

---

## Integrar

Supabase Storage.

---

## Funcionalidades

### Upload

### Preview

### Reemplazo

### Eliminación

---

## Restricción

Validar tamaño y formato.

---

# Criterio de Finalización

Imagen administrable.

---

# IMP-911 ESTADOS DE ESPECIALISTA

## Objetivo

Controlar visibilidad pública.

---

## Estados

```text
ACTIVE

INACTIVE

ARCHIVED
```

---

## Comportamiento

### ACTIVE

Visible públicamente.

---

### INACTIVE

No visible públicamente.

---

### ARCHIVED

Oculto completamente.

---

# Criterio de Finalización

Estados funcionales.

---

# IMP-912 ESPECIALISTAS DESTACADOS

## Objetivo

Gestionar contenido prioritario.

---

## Campo

```text
is_featured
```

---

## Implementar

### Activar

### Desactivar

---

## Consumo

### Home

### Página especialistas

---

# Criterio de Finalización

Destacados funcionales.

---

# IMP-913 RELACIÓN ESPECIALISTA-SERVICIO

## Objetivo

Gestionar asignación de servicios.

---

## Fuente

Tabla relacional.

```text
service_specialists
```

---

## Implementar

### Asociar servicio

### Desasociar servicio

### Listar servicios asociados

---

# Restricción

Utilizar relaciones reales de base de datos.

---

# Criterio de Finalización

Relaciones operativas.

---

# IMP-914 SELECTOR DE SERVICIOS

## Objetivo

Facilitar asignación.

---

## Crear

```text
ServicesMultiSelect
```

---

## Capacidades

### Buscar

### Seleccionar

### Eliminar

### Mostrar seleccionados

---

# Criterio de Finalización

Selector funcional.

---

# IMP-915 DETALLE ADMINISTRATIVO DE ESPECIALISTA

## Objetivo

Visualizar información consolidada.

---

## Ruta

```text
/admin/specialists/[id]
```

---

## Mostrar

### Datos generales

### Servicios asociados

### Estado

### Historial básico

---

# Criterio de Finalización

Vista detalle funcional.

---

# IMP-916 SERVER ACTIONS DE ESPECIALISTAS

## Objetivo

Implementar mutaciones.

---

## Crear

### create-specialist.action.ts

### update-specialist.action.ts

### delete-specialist.action.ts

### assign-service.action.ts

### remove-service.action.ts

---

## Restricción

Validar permisos.

---

# Criterio de Finalización

Actions funcionales.

---

# IMP-917 MÓDULO FORMULARIOS

## Objetivo

Administrar contactos recibidos.

---

## Ruta

```text
/admin/forms
```

---

## Fuente

Tabla:

```text
contact_forms
```

---

# Criterio de Finalización

Módulo disponible.

---

# IMP-918 LISTADO DE FORMULARIOS

## Objetivo

Visualizar solicitudes recibidas.

---

## Mostrar

### Nombre

### Correo

### Teléfono

### Servicio interés

### Estado

### Fecha recepción

### Acciones

---

# Criterio de Finalización

Listado funcional.

---

# IMP-919 TABLA DE FORMULARIOS

## Objetivo

Crear bandeja administrativa.

---

## Crear

```text
FormsTable
```

---

## Acciones

### Ver

### Cambiar estado

### Archivar

---

# Restricción

Utilizar componentes administrativos compartidos.

---

# Criterio de Finalización

Tabla funcional.

---

# IMP-920 FILTROS DE FORMULARIOS

## Objetivo

Facilitar seguimiento.

---

## Implementar

### Buscar nombre

### Buscar correo

### Filtrar estado

### Filtrar fecha

---

# Criterio de Finalización

Filtros operativos.

---

# IMP-921 DETALLE DE FORMULARIO

## Objetivo

Consultar información completa.

---

## Ruta

```text
/admin/forms/[id]
```

---

## Mostrar

### Nombre

### Correo

### Teléfono

### Servicio interés

### Mensaje

### Estado

### Fecha recepción

---

# Criterio de Finalización

Vista detalle funcional.

---

# IMP-922 ESTADOS DE FORMULARIO

## Objetivo

Gestionar flujo de atención.

---

## Estados

```text
NEW

IN_PROGRESS

CONTACTED

CLOSED

ARCHIVED
```

---

## Comportamiento

### NEW

Solicitud recién recibida.

---

### IN_PROGRESS

En gestión.

---

### CONTACTED

Cliente contactado.

---

### CLOSED

Caso finalizado.

---

### ARCHIVED

Oculto de flujo activo.

---

# Criterio de Finalización

Estados operativos.

---

# IMP-923 CAMBIO DE ESTADO

## Objetivo

Gestionar seguimiento comercial.

---

## Implementar

### Cambio individual

### Cambio rápido

### Actualización inmediata

---

# Restricción

Validar transición de estados.

---

# Criterio de Finalización

Gestión operativa.

---

# IMP-924 ARCHIVADO DE FORMULARIOS

## Objetivo

Mantener bandeja organizada.

---

## Implementar

### Archivar

### Desarchivar

### Ver archivados

---

## Restricción

No eliminar registros.

---

# Criterio de Finalización

Archivado funcional.

---

# IMP-925 SERVER ACTIONS DE FORMULARIOS

## Objetivo

Implementar operaciones administrativas.

---

## Crear

### update-form-status.action.ts

### archive-form.action.ts

### restore-form.action.ts

---

## Restricción

Validar permisos.

---

# Criterio de Finalización

Actions operativas.

---

# IMP-926 DASHBOARD INTEGRATION

## Objetivo

Actualizar métricas administrativas.

---

## Incorporar

### Total especialistas

### Especialistas activos

### Formularios nuevos

### Formularios pendientes

---

## Fuente

Datos reales.

---

# Criterio de Finalización

Dashboard actualizado.

---

# IMP-927 EMPTY STATES

## Objetivo

Gestionar ausencia de información.

---

## Crear

### EmptySpecialistsAdmin

### EmptyFormsAdmin

---

## Elementos

### Icono

### Descripción

### Acción sugerida

---

# Criterio de Finalización

Estados vacíos implementados.

---

# IMP-928 LOADING STATES

## Objetivo

Mantener consistencia UX.

---

## Crear

### SpecialistsTableSkeleton

### SpecialistFormSkeleton

### FormsTableSkeleton

### FormDetailSkeleton

---

# Criterio de Finalización

Carga optimizada.

---

# IMP-929 MANEJO DE ERRORES

## Objetivo

Controlar fallos operativos.

---

## Casos

### Error creación

### Error edición

### Error eliminación

### Error asignación

### Error actualización estado

### Error archivado

---

## Mostrar

### Toast

### Mensaje contextual

---

# Criterio de Finalización

Errores controlados.

---

# IMP-930 VALIDACIÓN FINAL DEL BLOQUE

Antes de continuar verificar:

* Listado de especialistas funcional.
* Crear especialista funcional.
* Editar especialista funcional.
* Eliminar especialista funcional.
* Estados de especialista funcionales.
* Especialistas destacados funcionales.
* Fotografía administrable.
* Relaciones especialista-servicio funcionales.
* Selector de servicios funcional.
* Detalle administrativo de especialista funcional.
* Bandeja de formularios funcional.
* Filtros de formularios funcionales.
* Detalle de formulario funcional.
* Estados de formularios funcionales.
* Cambio de estado funcional.
* Archivado funcional.
* Dashboard actualizado.
* Empty states implementados.
* Loading states implementados.
* Errores controlados.

---

# RESULTADO ESPERADO

Al finalizar este bloque toda la administración de contenido principal del negocio estará completamente operativa.

Los administradores podrán gestionar especialistas, controlar sus relaciones con servicios, administrar formularios de contacto, realizar seguimiento comercial mediante estados y mantener organizada la bandeja de solicitudes mediante archivado.

A partir de este punto el sistema cubrirá completamente las necesidades operativas del negocio definidas para el MVP, dejando únicamente los bloques de consolidación, calidad, responsive, manejo global de estados, errores y cierre de proyecto.

# IMPLEMENTATION PLAN

# BLOQUE 11

# CALIDAD, RESPONSIVE Y HARDENING

---

# IMP-1000 OBJETIVO

## IMP-1000.1 Propósito

Realizar la consolidación técnica final del proyecto.

Este bloque tiene como finalidad:

* Garantizar responsive completo.
* Mejorar accesibilidad.
* Validar flujos completos.
* Robustecer manejo de errores.
* Optimizar rendimiento.
* Optimizar imágenes.
* Aplicar endurecimiento de seguridad.
* Eliminar inconsistencias.

Al finalizar este bloque la aplicación deberá encontrarse lista para despliegue productivo.

---

# IMP-1001 DEPENDENCIAS

## Requisitos Previos

Debe encontrarse finalizado:

* Bloque 1 al Bloque 10.

Verificar:

* Sitio público completo.
* Dashboard completo.
* CRUD Servicios operativo.
* CRUD Promociones operativo.
* CRUD Especialistas operativo.
* Formularios operativos.
* SEO implementado.
* Seguridad implementada.

---

# IMP-1002 AUDITORÍA GLOBAL DEL PROYECTO

## Objetivo

Realizar inspección completa.

---

## Revisar

### Sitio público

### Dashboard

### Servicios

### Promociones

### Especialistas

### Formularios

### Login

### Navegación

---

## Verificar

### Flujos felices

### Flujos de error

### Casos límite

---

# Criterio de Finalización

Auditoría completada.

---

# IMP-1003 RESPONSIVE GLOBAL

## Objetivo

Garantizar experiencia consistente.

---

## Breakpoints oficiales

```text
Mobile
Tablet
Laptop
Desktop
Wide Desktop
```

---

## Revisar

### Navbar

### Footer

### Home

### Servicios

### Especialistas

### Promociones

### Contacto

### Login

### Dashboard

### CRUDs

---

## Corregir

### Overflow horizontal

### Saltos visuales

### Elementos truncados

### Scrolls innecesarios

### Espaciados inconsistentes

---

# Restricción

No permitir scroll horizontal involuntario.

---

# Criterio de Finalización

Responsive validado.

---

# IMP-1004 RESPONSIVE ADMINISTRATIVO

## Objetivo

Garantizar operatividad móvil.

---

## Validar

### Sidebar

### Drawer

### Tablas

### Formularios

### Modales

### Filtros

### Breadcrumbs

---

## Corregir

### Layouts rotos

### Acciones inaccesibles

### Botones fuera de pantalla

---

# Criterio de Finalización

Panel responsive.

---

# IMP-1005 ACCESIBILIDAD GLOBAL

## Objetivo

Mejorar experiencia universal.

---

## Revisar

### Contrastes

### Jerarquía visual

### Navegación teclado

### Lectores de pantalla

### Estados focus

### Etiquetas formularios

---

## Implementar

### aria-label

### aria-describedby

### aria-invalid

### roles semánticos

---

# Restricción

No utilizar componentes inaccesibles.

---

# Criterio de Finalización

Accesibilidad validada.

---

# IMP-1006 NAVEGACIÓN POR TECLADO

## Objetivo

Garantizar accesibilidad funcional.

---

## Validar

### Tab

### Shift + Tab

### Enter

### Escape

---

## Revisar

### Menús

### Modales

### Formularios

### Drawer

---

# Criterio de Finalización

Navegación operativa.

---

# IMP-1007 VALIDACIONES DE FORMULARIOS

## Objetivo

Verificar integridad de datos.

---

## Revisar

### Login

### Contacto

### Servicios

### Promociones

### Especialistas

---

## Verificar

### Campos obligatorios

### Longitudes

### Formatos

### Tipos

---

## Restricción

Frontend y Backend deben validar.

---

# Criterio de Finalización

Validaciones consistentes.

---

# IMP-1008 VALIDACIONES DE SERVER ACTIONS

## Objetivo

Blindar operaciones críticas.

---

## Verificar

### Create

### Update

### Delete

### Publish

### Archive

---

## Revisar

### Permisos

### Roles

### Sesión

### Payload

---

# Criterio de Finalización

Actions protegidas.

---

# IMP-1009 MANEJO GLOBAL DE ERRORES

## Objetivo

Eliminar errores no controlados.

---

## Revisar

### Server Components

### Client Components

### Actions

### Repositories

### Services

---

## Implementar

### Error boundaries

### Fallback UI

### Retry actions

---

# Restricción

No exponer stack traces.

---

# Criterio de Finalización

Errores controlados.

---

# IMP-1010 PÁGINAS DE ERROR

## Objetivo

Completar experiencia de fallo.

---

## Implementar

### 404

### 403

### 500

### Session Expired

### Access Denied

---

## Mantener

Diseño consistente.

---

# Criterio de Finalización

Páginas operativas.

---

# IMP-1011 OPTIMIZACIÓN DE IMÁGENES

## Objetivo

Reducir peso visual.

---

## Revisar

### Servicios

### Promociones

### Especialistas

### Open Graph

---

## Aplicar

### next/image

### Lazy loading

### Responsive images

### Tamaños adecuados

---

## Restricción

No servir imágenes originales innecesariamente.

---

# Criterio de Finalización

Imágenes optimizadas.

---

# IMP-1012 OPTIMIZACIÓN DE CARGA

## Objetivo

Reducir tiempo de render.

---

## Revisar

### Home

### Servicios

### Dashboard

### Tablas

---

## Aplicar

### Dynamic imports

### Code splitting

### Memoización

### Server Components

---

# Restricción

No optimizar prematuramente.

---

# Criterio de Finalización

Carga optimizada.

---

# IMP-1013 OPTIMIZACIÓN DE CONSULTAS

## Objetivo

Reducir operaciones innecesarias.

---

## Revisar

### Queries repetidas

### Consultas duplicadas

### N+1 queries

### Relaciones

---

## Aplicar

### Select específico

### Paginación

### Reutilización de consultas

---

# Criterio de Finalización

Consultas optimizadas.

---

# IMP-1014 OPTIMIZACIÓN DE RENDERIZADO

## Objetivo

Reducir renders innecesarios.

---

## Revisar

### Componentes pesados

### Formularios

### Tablas

### Modales

---

## Aplicar

### Memo

### Callbacks estables

### Selectores específicos

---

# Criterio de Finalización

Render optimizado.

---

# IMP-1015 SEGURIDAD FRONTEND

## Objetivo

Reducir superficie de ataque.

---

## Revisar

### Variables públicas

### Exposición de datos

### Datos sensibles

### Navegación protegida

---

## Verificar

### Variables NEXT_PUBLIC

### Tokens

### Sesiones

---

# Restricción

Nunca exponer secretos.

---

# Criterio de Finalización

Frontend validado.

---

# IMP-1016 SEGURIDAD BACKEND

## Objetivo

Blindar operaciones críticas.

---

## Revisar

### Repositories

### Services

### Server Actions

### Middleware

---

## Verificar

### Autenticación

### Autorización

### Roles

### Permisos

---

# Criterio de Finalización

Backend protegido.

---

# IMP-1017 HARDENING DE STORAGE

## Objetivo

Asegurar archivos.

---

## Revisar

### Buckets

### Políticas

### Accesos

### Uploads

---

## Verificar

### Tipos permitidos

### Tamaño máximo

### Permisos lectura

### Permisos escritura

---

# Criterio de Finalización

Storage protegido.

---

# IMP-1018 HARDENING DE BASE DE DATOS

## Objetivo

Validar protección de datos.

---

## Revisar

### RLS Policies

### Roles

### Permisos

### Accesos administrativos

---

## Verificar

### Lectura pública

### Escritura protegida

### Relaciones

---

# Criterio de Finalización

Base protegida.

---

# IMP-1019 LOGGING Y OBSERVABILIDAD

## Objetivo

Preparar diagnóstico futuro.

---

## Registrar

### Login

### Errores críticos

### Operaciones administrativas

### Cambios de estado

---

## Restricción

No almacenar información sensible.

---

# Criterio de Finalización

Logs operativos.

---

# IMP-1020 LIMPIEZA DE CÓDIGO

## Objetivo

Eliminar deuda técnica inmediata.

---

## Revisar

### Código muerto

### Imports sin uso

### Componentes duplicados

### Helpers duplicados

### Tipos duplicados

---

## Aplicar

### Refactorización

### Consolidación

---

# Criterio de Finalización

Código limpio.

---

# IMP-1021 VALIDACIÓN DE FLUJOS DE NEGOCIO

## Objetivo

Verificar experiencia completa.

---

## Escenarios

### Crear servicio

### Publicar servicio

### Crear promoción

### Crear especialista

### Recibir formulario

### Gestionar formulario

### Login

### Logout

---

## Resultado esperado

Flujo completo sin errores.

---

# Criterio de Finalización

Procesos validados.

---

# IMP-1022 CHECKLIST PRE-PRODUCCIÓN

## Objetivo

Validación final.

---

## Verificar

### Responsive

### SEO

### Seguridad

### Accesibilidad

### CRUDs

### Formularios

### Dashboard

### Storage

### Base de datos

### Errores

### Performance

---

# Restricción

No avanzar al despliegue con incidencias críticas abiertas.

---

# Criterio de Finalización

Checklist completado.

---

# IMP-1023 VALIDACIÓN FINAL DEL BLOQUE

Antes de continuar verificar:

* Responsive completo.
* Responsive administrativo completo.
* Accesibilidad validada.
* Navegación por teclado funcional.
* Formularios validados.
* Server Actions protegidas.
* Error handling implementado.
* Páginas de error implementadas.
* Imágenes optimizadas.
* Consultas optimizadas.
* Renderizado optimizado.
* Frontend protegido.
* Backend protegido.
* Storage protegido.
* Base de datos protegida.
* Logging implementado.
* Código limpio.
* Flujos de negocio validados.
* Checklist pre-producción completado.

---

# RESULTADO ESPERADO

Al finalizar este bloque el producto deberá encontrarse completamente estabilizado y preparado para despliegue productivo.

Toda la funcionalidad implementada en bloques anteriores habrá sido validada, optimizada, protegida y refinada.

El sistema deberá ofrecer una experiencia consistente en todos los dispositivos, contar con controles de seguridad robustos, manejar adecuadamente los errores y mantener un nivel de calidad suficiente para operar en un entorno real sin requerir modificaciones estructurales adicionales.

# IMPLEMENTATION PLAN

# BLOQUE 12

# PRODUCCIÓN Y CIERRE

---

# IMP-1100 OBJETIVO

## IMP-1100.1 Propósito

Preparar la aplicación para despliegue productivo.

Este bloque tiene como finalidad:

* Configurar entorno de producción.
* Configurar Vercel.
* Configurar dominio.
* Configurar variables productivas.
* Validar funcionamiento completo.
* Ejecutar QA final.
* Completar checklist de despliegue.
* Formalizar cierre técnico.

Al finalizar este bloque el sistema deberá encontrarse listo para operar en producción.

---

# IMP-1101 DEPENDENCIAS

## Requisitos Previos

Debe encontrarse finalizado:

* Bloque 1 al Bloque 11.

Verificar:

* Sitio público funcional.
* Dashboard funcional.
* SEO implementado.
* Seguridad validada.
* Responsive validado.
* Performance validada.
* Hardening completado.

---

# IMP-1102 CONFIGURACIÓN DE ENTORNO PRODUCTIVO

## Objetivo

Separar claramente desarrollo y producción.

---

## Verificar

### Development

```text
.env.local
```

---

### Production

```text
Vercel Environment Variables
```

---

## Restricción

No desplegar utilizando variables locales.

---

# Criterio de Finalización

Entornos separados.

---

# IMP-1103 AUDITORÍA DE VARIABLES DE ENTORNO

## Objetivo

Validar configuración final.

---

## Revisar

### Supabase URL

### Supabase Anon Key

### Service Role Key

### Site URL

### WhatsApp URL

### Contact Email

### Storage Buckets

---

## Verificar

### Variables requeridas

### Variables opcionales

### Variables obsoletas

---

## Restricción

Eliminar variables sin uso.

---

# Criterio de Finalización

Variables auditadas.

---

# IMP-1104 CONFIGURACIÓN DE VERCEL

## Objetivo

Preparar infraestructura principal.

---

## Crear proyecto

En Vercel.

---

## Conectar

Repositorio principal.

---

## Configurar

### Production Branch

### Preview Branches

### Build Command

### Output Configuration

### Environment Variables

---

## Restricción

No utilizar configuraciones experimentales innecesarias.

---

# Criterio de Finalización

Proyecto conectado.

---

# IMP-1105 VALIDACIÓN DE BUILD

## Objetivo

Garantizar compilación limpia.

---

## Ejecutar

```bash
npm run build
```

---

## Verificar

### Sin errores.

### Sin warnings críticos.

### Sin dependencias faltantes.

---

## Restricción

No desplegar builds inestables.

---

# Criterio de Finalización

Build exitoso.

---

# IMP-1106 VALIDACIÓN DE TYPESCRIPT

## Objetivo

Garantizar consistencia del proyecto.

---

## Ejecutar

```bash
tsc --noEmit
```

---

## Verificar

### Sin errores.

### Sin tipos rotos.

### Sin imports inválidos.

---

# Criterio de Finalización

Tipado validado.

---

# IMP-1107 VALIDACIÓN ESLINT

## Objetivo

Mantener calidad de código.

---

## Ejecutar

```bash
npm run lint
```

---

## Corregir

### Warnings relevantes.

### Errores críticos.

### Problemas de calidad.

---

# Restricción

No ignorar errores importantes.

---

# Criterio de Finalización

Lint limpio.

---

# IMP-1108 CONFIGURACIÓN DEL DOMINIO

## Objetivo

Conectar dominio productivo.

---

## Configurar

### Dominio principal

### WWW

### Redirecciones

---

## Verificar

### DNS

### SSL

### Certificados

---

## Restricción

Forzar HTTPS.

---

# Criterio de Finalización

Dominio operativo.

---

# IMP-1109 CONFIGURACIÓN HTTPS

## Objetivo

Garantizar tráfico seguro.

---

## Verificar

### SSL activo

### HTTPS obligatorio

### Redirección HTTP → HTTPS

---

# Criterio de Finalización

Comunicación segura.

---

# IMP-1110 VALIDACIÓN DE SEO PRODUCTIVO

## Objetivo

Verificar configuración real.

---

## Revisar

### Metadata

### Sitemap

### Robots

### Open Graph

### Structured Data

### Canonicals

---

## Verificar

URLs productivas.

---

# Criterio de Finalización

SEO validado.

---

# IMP-1111 VALIDACIÓN DE STORAGE

## Objetivo

Comprobar archivos en producción.

---

## Verificar

### Upload imágenes

### Lectura imágenes

### Eliminación imágenes

### URLs públicas

---

## Restricción

No exponer buckets privados.

---

# Criterio de Finalización

Storage validado.

---

# IMP-1112 VALIDACIÓN DE BASE DE DATOS

## Objetivo

Comprobar conectividad productiva.

---

## Verificar

### Lecturas

### Escrituras

### Relaciones

### RLS Policies

---

## Restricción

No utilizar base de pruebas.

---

# Criterio de Finalización

Base validada.

---

# IMP-1113 VALIDACIÓN DEL SITIO PÚBLICO

## Objetivo

Comprobar experiencia real.

---

## Verificar

### Home

### Servicios

### Categorías

### Especialistas

### Promociones

### Contacto

---

## Validar

### Navegación

### Carga

### Formularios

### SEO

---

# Criterio de Finalización

Sitio validado.

---

# IMP-1114 VALIDACIÓN DEL PANEL ADMINISTRATIVO

## Objetivo

Comprobar operación administrativa.

---

## Verificar

### Login

### Logout

### Dashboard

### CRUD Servicios

### CRUD Promociones

### CRUD Especialistas

### Formularios

---

## Validar

### Permisos

### Sesiones

### Acciones

---

# Criterio de Finalización

Dashboard validado.

---

# IMP-1115 QA FUNCIONAL COMPLETO

## Objetivo

Ejecutar pruebas manuales finales.

---

## Escenarios

### Crear servicio

### Editar servicio

### Publicar servicio

### Crear promoción

### Editar promoción

### Crear especialista

### Editar especialista

### Enviar formulario

### Gestionar formulario

### Login

### Logout

---

## Resultado esperado

Sin incidencias críticas.

---

# Criterio de Finalización

QA funcional completado.

---

# IMP-1116 QA RESPONSIVE FINAL

## Objetivo

Validar producción real.

---

## Revisar

### Mobile

### Tablet

### Laptop

### Desktop

---

## Validar

### Sitio público

### Dashboard

### Formularios

### Tablas

### Modales

---

# Criterio de Finalización

Responsive validado.

---

# IMP-1117 QA DE SEGURIDAD

## Objetivo

Realizar verificación final.

---

## Revisar

### Middleware

### Guards

### Roles

### Server Actions

### Variables

### Storage

### RLS

---

## Validar

### Accesos no autorizados

### Rutas protegidas

### Sesiones

---

# Criterio de Finalización

Seguridad validada.

---

# IMP-1118 MONITOREO INICIAL

## Objetivo

Preparar observabilidad básica.

---

## Verificar

### Logs Vercel

### Logs aplicación

### Errores runtime

### Errores build

---

## Restricción

No ignorar errores recurrentes.

---

# Criterio de Finalización

Monitoreo preparado.

---

# IMP-1119 DOCUMENTACIÓN OPERATIVA

## Objetivo

Formalizar entrega técnica.

---

## Documentar

### URL producción

### Acceso dashboard

### Variables utilizadas

### Integraciones

### Estructura general

---

## Restricción

No incluir credenciales.

---

# Criterio de Finalización

Documentación actualizada.

---

# IMP-1120 CHECKLIST DE DESPLIEGUE

## Objetivo

Verificación definitiva.

---

## Confirmar

### Build exitoso

### Lint exitoso

### TypeScript válido

### Dominio configurado

### HTTPS activo

### SEO validado

### Storage operativo

### Base de datos operativa

### Dashboard operativo

### Formularios operativos

### Seguridad validada

### Responsive validado

### Performance validada

### Logs operativos

---

## Restricción

Todos los ítems deben estar aprobados.

---

# Criterio de Finalización

Checklist completado.

---

# IMP-1121 APROBACIÓN DE PRODUCCIÓN

## Objetivo

Autorizar salida a producción.

---

## Verificar

### Sin errores críticos.

### Sin bloqueadores.

### Sin incidencias abiertas de alta prioridad.

---

## Resultado

Sistema aprobado para producción.

---

# Criterio de Finalización

Aprobación emitida.

---

# IMP-1122 CIERRE TÉCNICO DEL PROYECTO

## Objetivo

Formalizar finalización del desarrollo.

---

## Confirmar

### Alcance completado.

### Funcionalidades entregadas.

### Seguridad validada.

### SEO validado.

### Dashboard validado.

### Producción operativa.

---

## Registrar

Versión inicial estable.

```text
v1.0.0
```

---

# Criterio de Finalización

Proyecto cerrado técnicamente.

---

# IMP-1123 VALIDACIÓN FINAL DEL BLOQUE

Antes de considerar el proyecto finalizado verificar:

* Entorno productivo configurado.
* Variables productivas configuradas.
* Proyecto Vercel configurado.
* Build validado.
* TypeScript validado.
* ESLint validado.
* Dominio configurado.
* HTTPS operativo.
* SEO validado.
* Storage validado.
* Base de datos validada.
* Sitio público validado.
* Dashboard validado.
* QA funcional completado.
* QA responsive completado.
* QA seguridad completado.
* Logs operativos.
* Documentación actualizada.
* Checklist despliegue completado.
* Producción aprobada.

---

# RESULTADO ESPERADO

Al finalizar este bloque el sistema deberá encontrarse completamente desplegado, validado y operativo en producción.

Todas las funcionalidades definidas en el alcance del proyecto deberán estar disponibles para usuarios finales y administradores, con infraestructura estable, seguridad validada, SEO implementado, rendimiento aceptable y monitoreo básico operativo.

La versión **v1.0.0** quedará formalmente cerrada y lista para uso real, mantenimiento evolutivo y futuras iteraciones del producto.
