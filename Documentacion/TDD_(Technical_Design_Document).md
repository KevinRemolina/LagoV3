# BLOQUE 1

# ARQUITECTURA GENERAL DEL SISTEMA

---

# TDD-001 INFORMACIÓN GENERAL

## Proyecto

Lago Spa · Estética · Salud

---

## Tipo de Proyecto

Sitio web corporativo con panel administrativo integrado.

---

## Versión

MVP 1.0

---

## Estado

Aprobado para diseño técnico y desarrollo.

---

## Ubicación Objetivo

Sogamoso, Boyacá, Colombia.

---

## Idioma

Español.

---

# TDD-002 OBJETIVOS TÉCNICOS

## TDD-002.1 Objetivo Principal

Diseñar una plataforma web moderna, escalable y mantenible que permita:

* Publicitar los servicios del establecimiento.
* Mejorar la visibilidad digital de la marca.
* Facilitar la captación de clientes.
* Permitir la administración autónoma de contenidos.
* Servir como base para futuras expansiones funcionales.

---

## TDD-002.2 Objetivos Secundarios

La arquitectura deberá estar preparada para soportar futuras fases que incluyan:

* Sistema de reservas.
* CRM.
* Pagos en línea.
* Dashboard analítico.
* Automatizaciones comerciales.
* Multi-sede.
* Aplicaciones móviles.

Sin requerir rediseños estructurales importantes.

---

# TDD-003 PRINCIPIOS ARQUITECTÓNICOS

## TDD-003.1 Simplicidad

La solución deberá minimizar complejidad innecesaria.

Se priorizarán soluciones nativas del stack seleccionado.

---

## TDD-003.2 Escalabilidad

Toda decisión técnica deberá favorecer la escalabilidad futura.

---

## TDD-003.3 Modularidad

Los módulos deberán estar desacoplados.

---

## TDD-003.4 Mantenibilidad

El sistema deberá poder mantenerse por otros desarrolladores sin necesidad de conocimiento previo del proyecto.

---

## TDD-003.5 Seguridad

La seguridad deberá implementarse desde el diseño inicial.

---

## TDD-003.6 SEO First

Toda la arquitectura pública deberá diseñarse considerando posicionamiento orgánico.

---

## TDD-003.7 Mobile First

La experiencia móvil tendrá prioridad sobre escritorio.

---

# TDD-004 ARQUITECTURA SELECCIONADA

## Patrón General

Arquitectura Monolítica Moderna.

---

## Justificación

Para el alcance actual no existe necesidad de separar frontend y backend.

La solución monolítica moderna permite:

* Menor complejidad.
* Menor costo operativo.
* Menor tiempo de desarrollo.
* Menor mantenimiento.
* Escalabilidad suficiente para el MVP.

---

## Modelo

```text
Usuario
   │
   ▼
Next.js Application
   │
   ├── Frontend
   ├── Server Components
   ├── Server Actions
   ├── Route Handlers
   │
   ▼
Supabase
   ├── Auth
   ├── PostgreSQL
   └── Storage
```

---

# TDD-005 STACK TECNOLÓGICO

## Frontend

### Framework

Next.js 15

---

### Librería UI

React 19

---

### Lenguaje

TypeScript

---

### Estilos

TailwindCSS

---

### Componentes

Shadcn/UI

---

### Formularios

React Hook Form

---

### Validaciones

Zod

---

### Animaciones

Framer Motion

---

## Backend

### Runtime

Node.js

---

### Framework

Next.js Route Handlers

---

### Mutaciones

Next.js Server Actions

---

### API Interna

REST basada en Route Handlers.

---

## Base de Datos

### Motor

PostgreSQL

---

### Proveedor

Supabase PostgreSQL

---

## Autenticación

### Proveedor

Supabase Auth

---

### Métodos Iniciales

* Email + contraseña.

---

### Métodos Futuros

* Magic Link.
* MFA.
* OAuth.

---

## Almacenamiento

### Proveedor

Supabase Storage

---

## Hosting

### Plataforma

Vercel

---

## Correo

### Proveedor

Resend

---

# TDD-006 ARQUITECTURA LÓGICA

El sistema se dividirá en cinco dominios principales.

---

# Dominio Público

Responsable de:

* Home.
* Categorías.
* Servicios.
* Especialistas.
* Contacto.
* SEO.

---

# Dominio Administrativo

Responsable de:

* Autenticación.
* Dashboard.
* Gestión de servicios.
* Gestión de promociones.
* Gestión de especialistas.
* Gestión de formularios.

---

# Dominio de Contenido

Responsable de:

* Servicios.
* Especialistas.
* Imágenes.
* Promociones.

---

# Dominio de Comunicación

Responsable de:

* Formularios.
* Correos.
* WhatsApp.

---

# Dominio de Infraestructura

Responsable de:

* Auth.
* Base de datos.
* Storage.
* Hosting.

---

# TDD-007 MÓDULOS DEL SISTEMA

## Módulo Público

### Home

Página principal.

---

### Categorías

Listado por categoría.

---

### Servicios

Catálogo completo.

---

### Especialistas

Equipo profesional.

---

### Contacto

Formulario y medios de contacto.

---

# Módulo Administrativo

### Dashboard

Panel principal.

---

### Servicios

CRUD completo.

---

### Promociones

Gestión de promociones.

---

### Especialistas

CRUD completo.

---

### Formularios

Bandeja administrativa.

---

### Imágenes

Gestión multimedia.

---

# TDD-008 PATRONES DE DESARROLLO

## Arquitectura por Features

El proyecto se organizará por funcionalidades y no por tipos de archivos.

---

## Ejemplo

```text
src/

features/
├ services/
├ specialists/
├ promotions/
├ contact/
├ auth/
```

---

## Beneficios

* Escalabilidad.
* Legibilidad.
* Reutilización.

---

# TDD-009 ESTRATEGIA DE RENDERIZADO

## Sitio Público

Priorizar:

```text
SSR
SSG
ISR
```

según corresponda.

---

## Objetivos

* SEO.
* Rendimiento.
* Indexación.

---

# Home

Renderizado estático.

---

# Categorías

Renderizado estático con revalidación.

---

# Servicios

Renderizado estático con revalidación.

---

# Especialistas

Renderizado estático con revalidación.

---

# Panel Administrativo

Renderizado dinámico.

---

# TDD-010 SEO ARQUITECTÓNICO

## URLs

Todas las URLs deberán ser amigables.

---

## Ejemplos

```text
/servicios

/servicios/limpieza-facial-profunda

/categorias/facial

/especialistas/maria-rodriguez
```

---

## Restricciones

No utilizar:

```text
?id=123
?service=15
```

como URL principal.

---

# Metadatos

Cada página deberá generar:

* Title.
* Description.
* Open Graph.
* Twitter Card.

---

# Sitemap

Generación automática.

---

# Robots

Generación automática.

---

# TDD-011 SEGURIDAD ARQUITECTÓNICA

## Principio

Todo acceso administrativo deberá verificarse en servidor.

---

## Restricción

Nunca confiar únicamente en validaciones frontend.

---

## Implementaciones

* Middleware.
* Server Actions protegidas.
* Row Level Security.
* Validaciones Zod.

---

# TDD-012 ESCALABILIDAD FUTURA

La arquitectura deberá permitir incorporar:

---

## Sistema de Reservas

Estado:

Preparado.

No implementado.

---

## CRM

Estado:

Preparado.

No implementado.

---

## Pagos

Estado:

Preparado.

No implementado.

---

## Dashboard Analítico

Estado:

Preparado.

No implementado.

---

## Multi-sede

Estado:

Preparado.

No implementado.

---

# TDD-013 DECISIONES ARQUITECTÓNICAS (ADR)

## ADR-001

Se selecciona Next.js como framework principal.

Motivo:

SEO, SSR, Server Actions y ecosistema moderno.

---

## ADR-002

Se selecciona Supabase como Backend-as-a-Service.

Motivo:

Reducir tiempo de desarrollo y mantenimiento.

---

## ADR-003

Se selecciona PostgreSQL.

Motivo:

Escalabilidad y robustez.

---

## ADR-004

Se selecciona arquitectura monolítica moderna.

Motivo:

Menor complejidad para el MVP.

---

## ADR-005

Se selecciona Supabase Auth.

Motivo:

Seguridad y rapidez de implementación.

---

## ADR-006

Se selecciona Supabase Storage.

Motivo:

Integración nativa con la plataforma.

---

## ADR-007

Se selecciona Vercel.

Motivo:

Integración óptima con Next.js.

---

# TDD-014 LÍMITES DEL SISTEMA

El MVP NO incluye:

* Sistema de citas.
* Pagos online.
* CRM.
* Blog.
* Analytics.
* Multiidioma.
* Aplicación móvil.
* Multiempresa.

---

# TDD-015 RESULTADO ESPERADO

La arquitectura deberá permitir:

* Excelente SEO local.
* Excelente rendimiento.
* Administración sencilla.
* Mantenimiento reducido.
* Escalabilidad controlada.
* Base sólida para futuras fases del producto.

# BLOQUE 2

# MODELO DE DATOS, ENTIDADES, RELACIONES, RESTRICCIONES E ÍNDICES

---

# TDD-100 OBJETIVO

## TDD-100.1 Propósito

Definir la estructura completa de persistencia de datos del sistema.

Este documento establece:

* Entidades.
* Relaciones.
* Restricciones.
* Índices.
* Convenciones.
* Estrategias de escalabilidad.

Toda implementación deberá respetar este modelo salvo aprobación explícita de una nueva versión del TDD.

---

# TDD-101 PRINCIPIOS DEL MODELO DE DATOS

## TDD-101.1 Normalización

La base de datos deberá mantenerse normalizada.

Objetivo:

* Reducir duplicidad.
* Facilitar mantenimiento.
* Mejorar integridad.

---

## TDD-101.2 Escalabilidad

El modelo deberá soportar futuras expansiones sin requerir rediseños mayores.

---

## TDD-101.3 Integridad Referencial

Todas las relaciones deberán implementarse mediante claves foráneas.

---

## TDD-101.4 UUID

Todas las entidades principales utilizarán UUID como clave primaria.

---

## Justificación

* Mayor seguridad.
* Mejor escalabilidad.
* Menor exposición de registros.

---

# TDD-102 ENTIDADES PRINCIPALES

El MVP se compone de las siguientes entidades:

```text
users
roles
user_roles

categories

services
service_images

specialists
service_specialists

contact_forms

settings

promotion_rules
```

---

# TDD-103 DIAGRAMA GENERAL DE RELACIONES

```text
roles
  │
  ▼
user_roles
  ▲
  │
users


categories
    │
    ▼
services
    │
    ├─────────── service_images
    │
    └─────────── service_specialists
                     │
                     ▼
                specialists


contact_forms

settings

promotion_rules
```

---

# TDD-104 TABLA ROLES

## Nombre

```sql
roles
```

---

## Descripción

Define los roles del sistema.

---

## Campos

| Campo       | Tipo        |
| ----------- | ----------- |
| id          | UUID        |
| name        | VARCHAR(50) |
| description | TEXT        |
| created_at  | TIMESTAMP   |

---

## Valores Iniciales

```text
OWNER
EMPLOYEE
SUPER_ADMIN
```

---

## MVP

Solo se utilizará:

```text
OWNER
```

---

## Restricciones

name debe ser único.

---

# TDD-105 TABLA USERS

## Nombre

```sql
users
```

---

## Descripción

Información complementaria al usuario autenticado en Supabase Auth.

---

## Relación

```text
Supabase Auth
        │
        ▼
users
```

---

## Campos

| Campo        | Tipo         |
| ------------ | ------------ |
| id           | UUID         |
| auth_user_id | UUID         |
| full_name    | VARCHAR(150) |
| email        | VARCHAR(255) |
| avatar_url   | TEXT         |
| is_active    | BOOLEAN      |
| created_at   | TIMESTAMP    |
| updated_at   | TIMESTAMP    |

---

## Restricciones

auth_user_id único.

email único.

---

# TDD-106 TABLA USER_ROLES

## Nombre

```sql
user_roles
```

---

## Descripción

Relación entre usuarios y roles.

---

## Campos

| Campo      | Tipo      |
| ---------- | --------- |
| id         | UUID      |
| user_id    | UUID      |
| role_id    | UUID      |
| created_at | TIMESTAMP |

---

## Relaciones

```text
users 1:N user_roles
roles 1:N user_roles
```

---

## Beneficio

Permite múltiples roles futuros.

---

# TDD-107 TABLA CATEGORIES

## Nombre

```sql
categories
```

---

## Descripción

Categorías de servicios.

---

## Campos

| Campo       | Tipo         |
| ----------- | ------------ |
| id          | UUID         |
| name        | VARCHAR(100) |
| slug        | VARCHAR(120) |
| description | TEXT         |
| is_active   | BOOLEAN      |
| created_at  | TIMESTAMP    |

---

## Datos Iniciales

```text
Facial
Corporal
Salud
Spa
```

---

## Restricciones

name único.

slug único.

---

## Escalabilidad

Preparada para futuras categorías.

---

# TDD-108 TABLA SERVICES

## Nombre

```sql
services
```

---

## Descripción

Entidad principal del catálogo.

---

## Campos

| Campo             | Tipo          |
| ----------------- | ------------- |
| id                | UUID          |
| category_id       | UUID          |
| title             | VARCHAR(255)  |
| slug              | VARCHAR(255)  |
| short_description | TEXT          |
| description       | TEXT          |
| benefits          | JSONB         |
| included_services | JSONB         |
| recommendations   | TEXT          |
| contraindications | TEXT          |
| price             | NUMERIC(12,2) |
| show_price        | BOOLEAN       |
| status            | VARCHAR(20)   |
| is_featured       | BOOLEAN       |
| is_promotional    | BOOLEAN       |
| promotion_start   | TIMESTAMP     |
| promotion_end     | TIMESTAMP     |
| created_at        | TIMESTAMP     |
| updated_at        | TIMESTAMP     |

---

# Estado

Valores permitidos:

```text
PUBLIC
PRIVATE
ARCHIVED
```

---

## Restricciones

slug único.

title obligatorio.

category_id obligatorio.

status obligatorio.

---

## Índices

```sql
idx_services_slug

idx_services_status

idx_services_featured

idx_services_category
```

---

# TDD-109 TABLA SERVICE_IMAGES

## Nombre

```sql
service_images
```

---

## Descripción

Imágenes asociadas a servicios.

---

## Campos

| Campo        | Tipo      |
| ------------ | --------- |
| id           | UUID      |
| service_id   | UUID      |
| storage_path | TEXT      |
| alt_text     | TEXT      |
| sort_order   | INTEGER   |
| is_cover     | BOOLEAN   |
| created_at   | TIMESTAMP |

---

## Restricciones

Máximo:

```text
15 imágenes por servicio
```

---

## Regla

Solo una portada por servicio.

---

## Índices

```sql
idx_service_images_service
```

---

# TDD-110 TABLA SPECIALISTS

## Nombre

```sql
specialists
```

---

## Descripción

Especialistas mostrados públicamente.

---

## Campos

| Campo          | Tipo         |
| -------------- | ------------ |
| id             | UUID         |
| name           | VARCHAR(255) |
| slug           | VARCHAR(255) |
| photo_url      | TEXT         |
| position       | VARCHAR(255) |
| description    | TEXT         |
| certifications | JSONB        |
| whatsapp       | VARCHAR(50)  |
| social_links   | JSONB        |
| schedules      | JSONB        |
| is_visible     | BOOLEAN      |
| created_at     | TIMESTAMP    |
| updated_at     | TIMESTAMP    |

---

## Restricciones

name obligatorio.

slug único.

---

## Índices

```sql
idx_specialists_slug
```

---

# TDD-111 TABLA SERVICE_SPECIALISTS

## Nombre

```sql
service_specialists
```

---

## Descripción

Relación muchos a muchos.

---

## Relación

```text
services N:N specialists
```

---

## Campos

| Campo         | Tipo      |
| ------------- | --------- |
| id            | UUID      |
| service_id    | UUID      |
| specialist_id | UUID      |
| created_at    | TIMESTAMP |

---

## Restricción

No permitir relaciones duplicadas.

---

## Índice

```sql
unique(service_id, specialist_id)
```

---

# TDD-112 TABLA CONTACT_FORMS

## Nombre

```sql
contact_forms
```

---

## Descripción

Solicitudes recibidas desde el sitio.

---

## Campos

| Campo            | Tipo         |
| ---------------- | ------------ |
| id               | UUID         |
| full_name        | VARCHAR(255) |
| phone            | VARCHAR(50)  |
| email            | VARCHAR(255) |
| service_interest | VARCHAR(255) |
| message          | TEXT         |
| ip_address       | INET         |
| status           | VARCHAR(20)  |
| created_at       | TIMESTAMP    |
| read_at          | TIMESTAMP    |
| archived_at      | TIMESTAMP    |

---

## Estados

```text
PENDING
READ
ARCHIVED
```

---

## Índices

```sql
idx_contact_forms_status

idx_contact_forms_created_at
```

---

# TDD-113 TABLA SETTINGS

## Nombre

```sql
settings
```

---

## Descripción

Configuraciones globales del sistema.

---

## Campos

| Campo      | Tipo         |
| ---------- | ------------ |
| id         | UUID         |
| key        | VARCHAR(100) |
| value      | JSONB        |
| created_at | TIMESTAMP    |
| updated_at | TIMESTAMP    |

---

## Uso MVP

Configuraciones internas.

---

## Escalabilidad

Permitirá administrar posteriormente:

* Home.
* Contacto.
* Redes sociales.
* Configuración comercial.

---

# TDD-114 TABLA PROMOTION_RULES

## Nombre

```sql
promotion_rules
```

---

## Descripción

Preparación para automatizaciones futuras.

---

## MVP

No utilizada directamente.

---

## Campos

| Campo      | Tipo      |
| ---------- | --------- |
| id         | UUID      |
| service_id | UUID      |
| starts_at  | TIMESTAMP |
| ends_at    | TIMESTAMP |
| created_at | TIMESTAMP |

---

## Beneficio

Preparación para promociones complejas futuras.

---

# TDD-115 CONVENCIONES DE NOMBRES

## Tablas

Formato:

```text
snake_case
plural
```

---

## Ejemplos

```text
services

service_images

contact_forms
```

---

## Campos

Formato:

```text
snake_case
```

---

## Ejemplos

```text
created_at

updated_at

is_featured
```

---

# TDD-116 TIMESTAMPS

Todas las entidades deberán incluir:

```sql
created_at

updated_at
```

salvo tablas de relación simples.

---

# TDD-117 SOFT DELETE VS HARD DELETE

## MVP

Se utilizará:

```text
HARD DELETE
```

para:

* Servicios.
* Especialistas.
* Imágenes.

---

## Excepción

Formularios.

---

## Formularios

Se archivarán.

No se eliminarán automáticamente.

---

# TDD-118 ESTRATEGIA DE SLUGS

## Generación

Automática.

---

## Ejemplo

```text
Limpieza Facial Profunda
```

↓

```text
limpieza-facial-profunda
```

---

## Colisiones

```text
limpieza-facial-profunda

limpieza-facial-profunda-2

limpieza-facial-profunda-3
```

---

## Restricción

No editable por administradores.

---

# TDD-119 ESTRATEGIA DE BÚSQUEDA FUTURA

La arquitectura deberá soportar:

```text
Búsqueda por servicios

Búsqueda por especialistas

Búsqueda por categorías
```

---

## Índices Recomendados

PostgreSQL Full Text Search.

---

# TDD-120 PREPARACIÓN PARA ESCALABILIDAD

El modelo actual deberá permitir futuras entidades:

```text
appointments

payments

customers

crm_notes

analytics_events
```

sin romper compatibilidad.

---

# TDD-121 RESULTADO ESPERADO

La base de datos deberá proporcionar:

* Integridad referencial.
* Escalabilidad futura.
* Rendimiento adecuado.
* Compatibilidad con SEO.
* Compatibilidad con panel administrativo.
* Preparación para CRM y reservas futuras.
* Mantenimiento sencillo.

# BLOQUE 3

# ARQUITECTURA BACKEND, AUTENTICACIÓN, AUTORIZACIÓN, APIs, VALIDACIONES Y SEGURIDAD

---

# TDD-200 OBJETIVO

## TDD-200.1 Propósito

Definir la arquitectura backend completa del sistema.

Este bloque establece:

* Autenticación.
* Autorización.
* Seguridad.
* APIs.
* Server Actions.
* Validaciones.
* Manejo de errores.
* Integraciones.
* Middleware.
* Estrategia de comunicación con Supabase.

---

# TDD-201 FILOSOFÍA BACKEND

## TDD-201.1 Arquitectura Backend

El sistema utilizará una arquitectura Backend integrada dentro de Next.js.

---

## Componentes

```text
Next.js
 ├ Server Components
 ├ Server Actions
 ├ Route Handlers
 ├ Middleware
 └ Edge Runtime (cuando aplique)
```

---

## Objetivo

Evitar mantener un backend independiente.

---

## Restricción

No se implementará:

* NestJS.
* Express.
* Fastify.
* Laravel.
* Django.
* FastAPI.

---

## Justificación

El MVP no requiere microservicios ni separación de capas físicas.

---

# TDD-202 AUTENTICACIÓN

## Tecnología

Supabase Auth.

---

## Proveedor

Supabase.

---

## Método Inicial

```text
Email
+
Contraseña
```

---

## Flujo

```text
Administrador

      │

      ▼

Formulario Login

      │

      ▼

Supabase Auth

      │

      ▼

JWT

      │

      ▼

Sesión Activa
```

---

# TDD-203 SESIONES

## Características

Las sesiones deberán:

* Persistir entre recargas.
* Persistir entre pestañas.
* Permitir múltiples dispositivos.

---

## Caso Permitido

```text
PC
Laptop
Tablet
Teléfono
```

utilizando la misma cuenta simultáneamente.

---

## Restricción

No se limitarán sesiones concurrentes.

---

# TDD-204 RECUPERACIÓN DE CONTRASEÑA

## MVP

Preparado.

---

## Estado

No visible inicialmente.

---

## Arquitectura

Supabase Auth Recovery.

---

## Beneficio

Implementación futura sin modificar la arquitectura.

---

# TDD-205 AUTORIZACIÓN

## Estrategia

RBAC

(Role Based Access Control)

---

## Tablas

```text
roles

users

user_roles
```

---

## Roles Preparados

```text
OWNER

EMPLOYEE

SUPER_ADMIN
```

---

## Rol Activo MVP

```text
OWNER
```

---

# Permisos OWNER

Acceso total.

---

## Funcionalidades

* Dashboard.
* Servicios.
* Promociones.
* Especialistas.
* Formularios.
* Imágenes.

---

# TDD-206 VERIFICACIÓN DE ROLES

Toda operación administrativa deberá validar:

```text
1. Usuario autenticado

2. Usuario activo

3. Rol válido
```

---

## Restricción

Nunca confiar únicamente en frontend.

---

## Validación

Siempre en servidor.

---

# TDD-207 ROW LEVEL SECURITY

## Política General

RLS habilitado en todas las tablas.

---

# Tablas Públicas

Lectura pública:

```text
categories

services

service_images

specialists

service_specialists
```

---

# Tablas Privadas

Acceso exclusivo administradores:

```text
users

roles

user_roles

contact_forms

settings

promotion_rules
```

---

# TDD-208 POLÍTICAS RLS

## Services

Lectura pública únicamente si:

```text
status = PUBLIC
```

---

## Specialists

Lectura pública únicamente si:

```text
is_visible = true
```

---

## Contact Forms

Solo administradores.

---

## Settings

Solo administradores.

---

# TDD-209 SUPABASE CLIENTS

## Cliente Público

Uso:

Frontend.

---

## Nombre

```typescript
supabaseClient
```

---

## Cliente Servidor

Uso:

Server Components.

Server Actions.

Route Handlers.

---

## Nombre

```typescript
supabaseServer
```

---

## Service Role

Uso exclusivo:

Backend interno.

Cron Jobs.

Automatizaciones.

---

## Restricción

Nunca exponer al navegador.

---

# TDD-210 SERVER ACTIONS

## Uso

Mutaciones del sistema.

---

## Ejemplos

```text
createService

updateService

deleteService

createSpecialist

updateSpecialist

deleteSpecialist

archiveContactForm
```

---

## Beneficios

* Menos APIs.
* Menos complejidad.
* Seguridad nativa.

---

# TDD-211 ROUTE HANDLERS

## Uso

Endpoints externos.

---

## Ejemplos

```text
/api/contact

/api/upload

/api/webhooks
```

---

## Restricción

No utilizar Route Handlers para operaciones internas simples.

---

## Prioridad

```text
Server Actions
     >
Route Handlers
```

---

# TDD-212 ESTRUCTURA DE SERVICIOS

La lógica de negocio deberá estar separada.

---

## Ejemplo

```text
features/

services/
specialists/
contact/
auth/
```

---

## Estructura

```text
services/

 ├ actions/
 ├ schemas/
 ├ repositories/
 ├ queries/
 ├ components/
 └ types/
```

---

# TDD-213 VALIDACIONES

## Tecnología

Zod.

---

## Objetivo

Validar:

* Formularios.
* APIs.
* Server Actions.

---

## Restricción

Toda entrada deberá validarse.

---

# Ejemplo

Servicio:

```typescript
title
category
price
status
```

---

## Validación

Antes de tocar base de datos.

---

# TDD-214 ESTRATEGIA DE TIPADO

## Lenguaje

TypeScript estricto.

---

## Configuración

```json
strict: true
```

---

## Objetivo

Eliminar errores de ejecución.

---

# TDD-215 MANEJO DE ERRORES

## Categorías

### Error Usuario

Datos inválidos.

---

### Error Negocio

Violación de reglas.

---

### Error Infraestructura

Base de datos.

Storage.

Correo.

---

### Error Interno

Excepciones inesperadas.

---

# Formato Estándar

```typescript
{
 success: false,
 message: string
}
```

---

# TDD-216 LOGGING

## MVP

Logging básico.

---

## Registrar

* Errores críticos.
* Fallos de formularios.
* Fallos de correo.
* Fallos de storage.

---

## No Registrar

* Navegación usuarios.
* Auditoría administrativa.

---

# TDD-217 MIDDLEWARE

## Uso

Protección de rutas.

---

## Rutas Protegidas

```text
/admin

/admin/*
```

---

## Flujo

```text
Usuario

   │

   ▼

Middleware

   │

   ▼

Validar sesión

   │

   ▼

Permitir acceso
```

---

## Resultado

Usuarios anónimos no acceden.

---

# TDD-218 GESTIÓN DE FORMULARIOS

## Flujo

```text
Usuario

  │

  ▼

Formulario

  │

  ▼

Validación Zod

  │

  ▼

Guardar BD

  │

  ▼

Enviar Correo

  │

  ▼

Respuesta Exitosa
```

---

# Datos Registrados

* Nombre.
* Teléfono.
* Correo.
* Servicio interés.
* Mensaje.
* IP.

---

# TDD-219 ENVÍO DE CORREOS

## Proveedor

Resend.

---

## Flujo

```text
Formulario

   │

   ▼

Backend

   │

   ▼

Resend

   │

   ▼

Correo Administrador
```

---

# Desarrollo

Modo Sandbox.

---

# Producción

Dominio cliente verificado.

---

# Comportamiento ante Fallo

Si Resend falla:

```text
El formulario NO se pierde.
```

---

## Prioridad

```text
Guardar BD
     >
Enviar Correo
```

---

# TDD-220 INTEGRACIÓN WHATSAPP

## Estrategia

Deep Link.

---

## Formato

```text
https://wa.me/
```

---

## Ejemplo

```text
https://wa.me/573001112233
```

---

## Mensaje Dinámico

```text
Hola, deseo información sobre:
[Limpieza Facial Profunda]
```

---

## Generación

Automática.

---

# TDD-221 GESTIÓN DE IMÁGENES

## Flujo

```text
Subir

   │

   ▼

Validar

   │

   ▼

Storage

   │

   ▼

Guardar referencia BD
```

---

# Validaciones

## Formatos

* JPG
* JPEG
* PNG
* WEBP

---

## Tamaño

Máximo:

```text
15 MB
```

---

## Cantidad

Máximo:

```text
15 imágenes
```

por servicio.

---

# TDD-222 STORAGE STRATEGY

## Proveedor

Supabase Storage.

---

## Buckets

```text
services

specialists

static
```

---

# Bucket Services

Contenido:

```text
Servicios
Promociones
```

---

# Bucket Specialists

Contenido:

```text
Fotos especialistas
```

---

# Bucket Static

Contenido:

```text
Logo

Hero

Contenido institucional
```

---

# TDD-223 NOMENCLATURA DE ARCHIVOS

## Formato

```text
entity-id/timestamp.ext
```

---

## Ejemplo

```text
services/

c2f8d3/

1719000000.webp
```

---

## Beneficios

* Evita colisiones.
* Facilita limpieza.

---

# TDD-224 CACHE Y REVALIDACIÓN

## Estrategia

Next.js ISR.

---

## Revalidación

Automática después de cambios administrativos.

---

## Ejemplos

Al crear:

* Servicio.
* Especialista.
* Promoción.

---

## Acción

```typescript
revalidatePath()
```

---

# TDD-225 PROTECCIÓN CONTRA SPAM

## Formularios

Validaciones obligatorias.

---

## Medidas

* Validación Zod.
* Rate Limiting.
* Honeypot oculto.

---

## Escalabilidad

Preparado para CAPTCHA futuro.

---

# TDD-226 VARIABLES DE ENTORNO

## Configuración

```env
NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY

SUPABASE_SERVICE_ROLE_KEY

RESEND_API_KEY

NEXT_PUBLIC_SITE_URL
```

---

## Restricción

Las claves privadas nunca serán expuestas al cliente.

---

# TDD-227 WEBHOOKS FUTUROS

Arquitectura preparada para:

```text
Pagos

CRM

Reservas

Automatizaciones
```

---

## Ruta Recomendada

```text
/api/webhooks/*
```

---

# TDD-228 SEGURIDAD BACKEND

## Obligatorio

* RLS.
* Middleware.
* Validaciones.
* Variables seguras.
* Server Actions protegidas.

---

## Prohibido

* Consultas directas desde cliente a tablas privadas.
* Service Role en frontend.
* Secretos expuestos.

---

# TDD-229 OBSERVABILIDAD FUTURA

Preparado para integrar:

```text
Sentry

PostHog

OpenTelemetry
```

---

## Estado

No implementado en MVP.

---

# TDD-230 RESULTADO ESPERADO

La arquitectura backend deberá proporcionar:

* Seguridad empresarial.
* Escalabilidad futura.
* Integración nativa con Supabase.
* Bajo costo operativo.
* Excelente mantenibilidad.
* Excelente experiencia de desarrollo.
* Compatibilidad con futuras fases del producto.

# BLOQUE 4

# ARQUITECTURA FRONTEND, UI, UX, SEO Y EXPERIENCIA DE USUARIO

---

# TDD-300 OBJETIVO

## TDD-300.1 Propósito

Definir la arquitectura frontend completa del sistema.

Este bloque establece:

* Estructura del proyecto.
* App Router.
* Rutas.
* Layouts.
* Componentes.
* Estrategia UI.
* Estrategia UX.
* SEO.
* Responsive Design.
* Optimización de rendimiento.

---

# TDD-301 FILOSOFÍA FRONTEND

La experiencia visual del proyecto deberá transmitir:

```text
80% Spa de Lujo
20% Centro de Salud Moderno
```

---

## Objetivos de percepción

El usuario deberá percibir:

* Exclusividad.
* Profesionalismo.
* Confianza.
* Bienestar.
* Relajación.
* Calidad premium.
* Autoridad médica.

---

## Inspiraciones aprobadas

### Lanserhof

Referencia para:

* Motion Design.
* Scroll Animations.
* Transiciones.

---

### Aman Resorts

Referencia para:

* Espaciado.
* Composición.
* Minimalismo premium.

---

### Ritz-Carlton

Referencia para:

* Paleta visual.
* Tratamiento fotográfico.
* Distribución.
* Sensación de lujo.

---

### Skinney Medspa

Referencia para:

* Organización comercial.
* Tarjetas de servicios.
* Conversión de clientes.

---

# TDD-302 FRAMEWORK FRONTEND

## Tecnología

Next.js 15

---

## Arquitectura

App Router.

---

## Ubicación

```text
src/app
```

---

## Beneficios

* SEO.
* SSR.
* ISR.
* Server Components.
* Escalabilidad.

---

# TDD-303 ESTRUCTURA DE RUTAS

## Sitio Público

```text
/

/servicios

/servicios/[slug]

/categorias/[slug]

/especialistas

/especialistas/[slug]

/contacto
```

---

## Panel Administrativo

```text
/admin

/admin/login

/admin/dashboard

/admin/services

/admin/services/create

/admin/services/[id]

/admin/specialists

/admin/specialists/create

/admin/forms
```

---

## Rutas Futuras

Preparadas para expansión.

```text
/blog

/citas

/pagos

/crm
```

---

# TDD-304 ESTRUCTURA DE CARPETAS

## Arquitectura Principal

```text
src/

app/

features/

components/

lib/

hooks/

types/

styles/
```

---

# Features

```text
features/

services/

specialists/

contact/

auth/

dashboard/
```

---

## Objetivo

Agrupar por dominio funcional.

---

# TDD-305 ESTRATEGIA DE COMPONENTES

## Clasificación

### Shared Components

Componentes reutilizables.

---

Ejemplos:

```text
Button

Input

Modal

Badge

Card
```

---

### Feature Components

Componentes específicos.

---

Ejemplos:

```text
ServiceCard

SpecialistCard

ContactForm
```

---

### Layout Components

Elementos estructurales.

---

Ejemplos:

```text
Navbar

Footer

Sidebar

Header
```

---

# TDD-306 SISTEMA DE LAYOUTS

## Layout Público

Responsable de:

* Navbar.
* Footer.
* SEO base.
* Scripts globales.

---

## Layout Administrativo

Responsable de:

* Sidebar.
* Protección de sesión.
* Navegación interna.

---

## Beneficio

Separación total de experiencias.

---

# TDD-307 HOME PAGE

## Objetivo

Ser una landing page premium enfocada en conversión.

---

## Secciones

### Hero

Contenido fijo.

No editable.

---

### Servicios Destacados

Editable desde panel.

---

### Especialistas

Contenido dinámico.

---

### Categorías

Contenido dinámico.

---

### Certificaciones

Contenido fijo.

---

### CTA Principal

WhatsApp.

---

### Mapa

Google Maps.

---

### Contacto

Información fija.

---

# TDD-308 PÁGINA DE CATEGORÍA

## URL

```text
/categorias/[slug]
```

---

## Contenido

* Nombre categoría.
* Descripción.
* Servicios asociados.

---

## Orden

1. Destacados.
2. Servicios normales.

---

# TDD-309 PÁGINA DE SERVICIO

## URL

```text
/servicios/[slug]
```

---

## Contenido

* Nombre.
* Descripción.
* Beneficios.
* Precio.
* Galería.
* Especialistas.
* Recomendaciones.
* Contraindicaciones.
* CTA.

---

## SEO

Metadata individual.

---

# TDD-310 PÁGINA DE ESPECIALISTA

## URL

```text
/especialistas/[slug]
```

---

## Contenido

* Foto.
* Nombre.
* Cargo.
* Certificaciones.
* Descripción.
* Servicios asociados.
* WhatsApp.

---

# TDD-311 PÁGINA DE CONTACTO

## Contenido

* Formulario.
* WhatsApp.
* Correo.
* Teléfono.
* Redes sociales.
* Mapa.

---

# TDD-312 DASHBOARD ADMINISTRATIVO

## Objetivo

Facilitar la gestión diaria.

---

## Características

* Interfaz limpia.
* Rápida.
* Minimalista.
* Funcional.

---

## Inspiración

```text
Notion
Stripe Dashboard
Linear
```

---

## Prioridad

Usabilidad antes que efectos visuales.

---

# TDD-313 SISTEMA DE DISEÑO

## Base

Shadcn/UI

---

## Personalización

Componentes adaptados a branding Lago Spa.

---

## Beneficios

* Consistencia.
* Accesibilidad.
* Escalabilidad.

---

# TDD-314 PALETA DE COLORES

## Filosofía

Premium Wellness.

---

## Sensaciones

* Lujo.
* Salud.
* Serenidad.
* Confianza.

---

## Fuente de verdad

Variables CSS centralizadas.

---

## Restricción

No utilizar colores hardcodeados.

---

# TDD-315 TIPOGRAFÍA

## Títulos

Tipografía premium.

---

## Texto

Tipografía altamente legible.

---

## Restricción

No utilizar múltiples familias innecesarias.

---

## Objetivo

Máximo dos familias tipográficas.

---

# TDD-316 SISTEMA DE ESPACIADO

## Filosofía

Minimalismo de lujo.

---

## Características

* Mucho aire visual.
* Bloques amplios.
* Jerarquía clara.

---

## Inspiración

Aman Resorts.

---

# TDD-317 ANIMACIONES

## Tecnología

Framer Motion.

---

## Objetivo

Aumentar percepción premium.

---

## Tipos Permitidos

### Fade

---

### Reveal

---

### Slide

---

### Parallax ligero

---

### Scroll Trigger

---

## Restricción

Animaciones nunca deben afectar rendimiento.

---

# TDD-318 RESPONSIVE DESIGN

## Estrategia

Mobile First.

---

## Breakpoints

### Mobile

```text
0px+
```

---

### Tablet

```text
768px+
```

---

### Desktop

```text
1024px+
```

---

### Large Desktop

```text
1440px+
```

---

# TDD-319 ACCESIBILIDAD

## Objetivo

Cumplir buenas prácticas WCAG.

---

## Implementaciones

* Alt text.
* Labels.
* Navegación teclado.
* Contraste adecuado.

---

## Restricción

Todo componente interactivo debe ser accesible.

---

# TDD-320 FORMULARIOS

## Tecnología

React Hook Form.

---

## Validación

Zod.

---

## Objetivos

* Rapidez.
* Seguridad.
* Tipado fuerte.

---

# TDD-321 GESTIÓN DE ESTADO

## Filosofía

Estado mínimo global.

---

## Herramientas

### Server Components

Primera opción.

---

### URL State

Segunda opción.

---

### useState

Tercera opción.

---

## Restricción

No incorporar Redux.

---

## Justificación

Complejidad innecesaria para el MVP.

---

# TDD-322 CARGA DE IMÁGENES

## Tecnología

Next Image.

---

## Beneficios

* Lazy Loading.
* Optimización.
* Responsive.

---

## Formatos

Prioridad:

```text
WEBP
```

---

## Secundarios

```text
JPG

PNG
```

---

# TDD-323 GALERÍAS

## Servicios

Máximo:

```text
15 imágenes
```

---

## Comportamiento

* Carrusel.
* Lightbox.
* Imagen principal.

---

# TDD-324 SEO FRONTEND

## Metadata

Cada página deberá generar:

* Title.
* Description.
* OpenGraph.
* Twitter Card.

---

## URLs

SEO Friendly.

---

## Ejemplo

```text
/servicios/limpieza-facial-profunda
```

---

## Prohibido

```text
/service?id=123
```

---

# TDD-325 SEO LOCAL

## Ubicación Principal

```text
Sogamoso
Boyacá
Colombia
```

---

## Keywords Objetivo

* Spa en Sogamoso.
* Quiropraxia en Sogamoso.
* Estética en Sogamoso.
* Tratamientos faciales en Boyacá.

---

## Implementaciones

* Metadata.
* Schema Markup.
* Sitemap.
* Robots.

---

# TDD-326 SCHEMA ORG

## Tipo

```text
LocalBusiness
MedicalBusiness
Spa
```

---

## Objetivo

Mayor visibilidad local.

---

# TDD-327 CORE WEB VITALS

## Objetivos

### LCP

Menor a:

```text
2.5s
```

---

### CLS

Menor a:

```text
0.1
```

---

### INP

Menor a:

```text
200ms
```

---

# TDD-328 ESTRATEGIA DE CACHÉ

## Público

ISR.

---

## Administrativo

No cacheado.

---

# TDD-329 ESTRATEGIA DE REVALIDACIÓN

Después de:

* Crear servicio.
* Editar servicio.
* Eliminar servicio.
* Crear especialista.
* Editar especialista.

---

## Acción

```typescript
revalidatePath()
```

---

# TDD-330 ESTRATEGIA DE ERRORES UI

## Usuario Público

Mensajes amigables.

---

## Administrador

Mensajes descriptivos.

---

## Restricción

Nunca exponer errores internos.

---

# TDD-331 MODO OSCURO

## MVP

No implementado.

---

## Arquitectura

Preparada.

---

# TDD-332 INTERNACIONALIZACIÓN

## MVP

Solo español.

---

## Arquitectura

Preparada para i18n futura.

---

# TDD-333 PREPARACIÓN PARA FUTURAS FUNCIONALIDADES

La arquitectura frontend deberá permitir incorporar:

* Blog.
* CRM.
* Reservas.
* Pagos.
* Dashboard analítico.

sin reestructurar el proyecto.

---

# TDD-334 RESULTADO ESPERADO

La arquitectura frontend deberá proporcionar:

* Excelente SEO.
* Excelente rendimiento.
* Experiencia premium.
* Responsive real.
* Accesibilidad adecuada.
* Mantenibilidad.
* Escalabilidad futura.
* Alta percepción de calidad y confianza.

# BLOQUE 5

# INFRAESTRUCTURA, DEVOPS, HOSTING, SEGURIDAD OPERACIONAL, STORAGE, DESPLIEGUE Y MONITOREO

---

# TDD-400 OBJETIVO

## TDD-400.1 Propósito

Definir la infraestructura completa que soportará la plataforma.

Este documento establece:

* Hosting.
* Dominio.
* Entornos.
* Storage.
* Seguridad operacional.
* Gestión de secretos.
* Despliegue.
* Monitoreo.
* Backups.
* Escalabilidad futura.

---

# TDD-401 FILOSOFÍA DE INFRAESTRUCTURA

La infraestructura deberá cumplir los siguientes principios:

---

## Simplicidad

Reducir al mínimo la cantidad de servicios externos.

---

## Escalabilidad

Permitir crecimiento sin rediseñar la arquitectura.

---

## Disponibilidad

Maximizar tiempo operativo.

---

## Seguridad

Proteger información y accesos administrativos.

---

## Mantenibilidad

Facilitar despliegues y actualizaciones.

---

# TDD-402 ARQUITECTURA DE INFRAESTRUCTURA

## Arquitectura General

```text
Internet
    │
    ▼
Dominio
    │
    ▼
Vercel
    │
    ▼
Next.js 15
    │
    ├── Frontend
    ├── Server Actions
    ├── Route Handlers
    │
    ▼
Supabase
    ├── PostgreSQL
    ├── Auth
    └── Storage
    │
    ▼
Resend
```

---

## Beneficios

* Infraestructura moderna.
* Costos reducidos.
* Mantenimiento mínimo.
* Excelente rendimiento global.

---

# TDD-403 ENTORNOS

## MVP

Se utilizarán dos entornos.

---

## Desarrollo

```text
development
```

---

### Objetivo

Construcción del producto.

---

### Características

* Datos de prueba.
* Correos sandbox.
* Storage de pruebas.

---

## Producción

```text
production
```

---

### Objetivo

Sistema utilizado por clientes reales.

---

### Características

* Datos reales.
* Correos reales.
* Dominio oficial.

---

## Restricción

Nunca utilizar credenciales de producción en desarrollo.

---

# TDD-404 GESTIÓN DEL DOMINIO

## Propiedad

Todos los dominios deberán estar registrados a nombre del cliente.

---

## Justificación

Evitar dependencia del proveedor de desarrollo.

---

## Recomendaciones

```text
lagospa.com

lagospaestetica.com

lagospaesteticasalud.com
```

---

## Restricción

El desarrollador no deberá figurar como propietario.

---

# TDD-405 DNS

## Gestión

DNS administrado por el propietario del dominio.

---

## Registros Iniciales

### Sitio Web

```text
A
CNAME
```

---

### Correo

```text
MX
SPF
DKIM
DMARC
```

---

### Resend

Configuración requerida para envío confiable.

---

# TDD-406 HOSTING

## Plataforma

Vercel.

---

## Justificación

* Integración nativa con Next.js.
* Despliegue automático.
* CDN global.
* SSL automático.

---

## Características Esperadas

* HTTPS.
* Edge Network.
* Alta disponibilidad.

---

# TDD-407 CERTIFICADOS SSL

## Proveedor

Vercel.

---

## Renovación

Automática.

---

## Obligatorio

Todo acceso deberá utilizar HTTPS.

---

## Restricción

No permitir HTTP plano.

---

# TDD-408 GESTIÓN DE SECRETOS

## Ubicación

Variables de entorno.

---

## Ejemplos

```env
NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY

SUPABASE_SERVICE_ROLE_KEY

RESEND_API_KEY

NEXT_PUBLIC_SITE_URL
```

---

## Restricciones

Nunca almacenar secretos:

* En Git.
* En repositorios.
* En frontend.
* En archivos públicos.

---

# TDD-409 CONTROL DE VERSIONES

## Plataforma

Git.

---

## Repositorio

GitHub.

---

## Rama Principal

```text
main
```

---

## Rama Desarrollo

```text
develop
```

---

## Flujo Recomendado

```text
feature/*
```

---

## Ejemplos

```text
feature/services

feature/specialists

feature/contact-form
```

---

# TDD-410 PIPELINE DE DESPLIEGUE

## Estrategia

CI/CD Automático.

---

## Flujo

```text
GitHub

   │

   ▼

Push

   │

   ▼

Vercel Build

   │

   ▼

Deploy
```

---

## Beneficios

* Menos errores humanos.
* Despliegues rápidos.
* Versionado automático.

---

# TDD-411 STORAGE

## Proveedor

Supabase Storage.

---

# Buckets Oficiales

```text
services

specialists

static
```

---

# Bucket Services

Contenido:

```text
Imágenes servicios

Imágenes promociones
```

---

# Bucket Specialists

Contenido:

```text
Fotografías especialistas
```

---

# Bucket Static

Contenido:

```text
Logo

Hero

Contenido institucional
```

---

# TDD-412 ESTRUCTURA STORAGE

## Convención

```text
bucket/entity-id/file
```

---

## Ejemplo

```text
services/

service-id/

cover.webp
```

---

## Ejemplo Completo

```text
services/

9b3d53a1/

cover.webp

gallery-1.webp

gallery-2.webp
```

---

# TDD-413 CONVENCIONES DE ARCHIVOS

## Formato Recomendado

```text
cover.webp

gallery-1.webp

gallery-2.webp
```

---

## Restricción

Evitar nombres aleatorios difíciles de identificar.

---

## Beneficio

Facilita mantenimiento.

---

# TDD-414 OPTIMIZACIÓN DE IMÁGENES

## Formato Prioritario

```text
WEBP
```

---

## Formatos Permitidos

```text
WEBP

JPG

JPEG

PNG
```

---

## Tamaño Máximo

```text
15 MB
```

---

## Conversión Recomendada

Automática a WEBP cuando sea posible.

---

# TDD-415 SEGURIDAD STORAGE

## Acceso Público

Permitido únicamente para imágenes públicas.

---

## Acceso Privado

Preparado para futuras funcionalidades.

---

## Restricción

Nunca almacenar:

* Contraseñas.
* Información sensible.
* Documentos internos.

---

# TDD-416 AUTENTICACIÓN OPERACIONAL

## Sistema

Supabase Auth.

---

## Seguridad

Gestión delegada a Supabase.

---

## Beneficios

* Tokens seguros.
* Refresh automático.
* Gestión de sesiones.

---

# TDD-417 CONTROL DE ACCESO

## Protección

Middleware.

RLS.

Roles.

---

## Verificaciones

Todo acceso administrativo deberá validar:

```text
Sesión válida

Usuario activo

Rol permitido
```

---

# TDD-418 BACKUPS

## Base de Datos

Gestionados por Supabase.

---

## Recomendación

Backups automáticos habilitados.

---

## Frecuencia

Diaria.

---

## Retención Recomendada

7 a 30 días.

---

# TDD-419 RECUPERACIÓN ANTE FALLAS

## Objetivo

Reducir pérdida de información.

---

## Casos Cubiertos

* Error humano.
* Eliminación accidental.
* Corrupción de datos.

---

## Fuente

Backups de Supabase.

---

# TDD-420 CORREOS

## Proveedor

Resend.

---

## Entorno Desarrollo

Sandbox.

---

## Entorno Producción

Dominio verificado.

---

## Restricción

Los formularios no deberán depender exclusivamente del correo.

---

## Prioridad

```text
Guardar en Base de Datos

      >

Enviar Correo
```

---

# TDD-421 MONITOREO

## MVP

Monitoreo básico.

---

## Registrar

* Errores críticos.
* Fallos de despliegue.
* Fallos de formularios.
* Fallos de correo.

---

## No Registrar

Analítica avanzada.

---

# TDD-422 OBSERVABILIDAD FUTURA

Preparado para:

```text
Sentry

PostHog

OpenTelemetry
```

---

## Estado

No implementado en MVP.

---

# TDD-423 PROTECCIÓN CONTRA ATAQUES

## Formularios

Implementar:

* Validación Zod.
* Rate Limiting.
* Honeypot.

---

## Futuro

Preparado para:

```text
Cloudflare Turnstile

reCAPTCHA
```

---

# TDD-424 CDN

## Proveedor

Vercel Edge Network.

---

## Objetivo

Reducir latencia global.

---

## Beneficio

Mayor velocidad de carga.

---

# TDD-425 RENDIMIENTO OPERACIONAL

## Objetivos

### Disponibilidad

```text
99%+
```

---

### Tiempo de Respuesta

```text
< 500ms
```

para operaciones administrativas normales.

---

### Tiempo de Carga

```text
< 3 segundos
```

en conexiones estándar.

---

# TDD-426 ESTRUCTURA PROFESIONAL DEL PROYECTO

## Organización Global

```text
src/

├ app/
│
├ features/
│
├ components/
│   ├ ui/
│   ├ marketing/
│   ├ dashboard/
│   ├ shared/
│
├ lib/
│
├ hooks/
│
├ types/
│
├ styles/
│
├ config/
│
├ constants/
│
├ services/
│
└ middleware/
```

---

# components/ui

Componentes base de Shadcn.

---

Ejemplos:

```text
Button

Input

Dialog

Sheet

Dropdown
```

---

# components/marketing

Componentes exclusivos del sitio público.

---

Ejemplos:

```text
HeroSection

FeaturedServices

CategoryGrid

SpecialistShowcase

TestimonialsSection

ContactCTA

GallerySection
```

---

## Beneficio

Separación total entre marketing y dashboard.

---

# components/dashboard

Componentes exclusivos de administración.

---

Ejemplos:

```text
DashboardSidebar

DashboardHeader

ServicesTable

SpecialistsTable

FormsInbox

ImageUploader
```

---

# components/shared

Componentes reutilizables por ambas áreas.

---

Ejemplos:

```text
Logo

LoadingSpinner

EmptyState

ConfirmDialog
```

---

# TDD-427 PREPARACIÓN PARA ESCALABILIDAD

La infraestructura deberá permitir incorporar:

```text
Sistema de citas

CRM

Pagos

Analytics

Multi-sede

Aplicación móvil
```

sin modificar la infraestructura principal.

---

# TDD-428 COSTOS OPERATIVOS ESPERADOS

## MVP

Costos mínimos.

---

## Servicios

```text
Vercel

Supabase

Resend

Dominio
```

---

## Objetivo

Mantener operación económica durante la etapa inicial.

---

# TDD-429 RESULTADO ESPERADO

La infraestructura deberá proporcionar:

* Alta disponibilidad.
* Excelente rendimiento.
* Bajo costo operativo.
* Seguridad adecuada.
* Despliegue automatizado.
* Escalabilidad futura.
* Mantenimiento sencillo.
* Independencia del cliente respecto al proveedor de desarrollo.

# BLOQUE 6

# ROADMAP DE ESCALABILIDAD, ARQUITECTURA EVOLUTIVA, RIESGOS TÉCNICOS, CONVENCIONES DE DESARROLLO Y CHECKLIST DE PRODUCCIÓN

---

# TDD-500 OBJETIVO

## TDD-500.1 Propósito

Documentar la evolución prevista del sistema más allá del MVP.

Este bloque NO forma parte del alcance actual.

Su objetivo es:

* Evitar decisiones que bloqueen futuras fases.
* Reducir refactorizaciones.
* Facilitar la escalabilidad.
* Mantener coherencia arquitectónica.

---

# TDD-501 ALCANCE DEL MVP

## Regla Fundamental

Todo lo descrito en este bloque:

```text
NO forma parte del MVP.
NO será desarrollado.
NO será presupuestado.
NO será considerado entregable.
```

---

## Objetivo

Únicamente garantizar que la arquitectura actual no impida futuras expansiones.

---

# TDD-502 EVOLUCIÓN ARQUITECTÓNICA

## Arquitectura Actual

```text
Next.js

Supabase

Storage

Resend

Vercel
```

---

## Estado

Suficiente para:

* Página pública.
* SEO.
* Panel administrativo.
* Gestión de contenido.

---

## Evolución Esperada

A medida que aumente la complejidad del negocio podrán añadirse nuevos módulos.

---

## Restricción

No implementar dichos módulos durante el MVP.

---

# TDD-503 FUTURO SISTEMA DE CITAS

## Estado

No implementado.

---

## Objetivo Futuro

Permitir:

* Solicitar citas.
* Gestionar disponibilidad.
* Confirmar reservas.
* Reprogramar citas.
* Cancelar citas.

---

## Entidades Futuras

```text
appointments

appointment_status

appointment_notes
```

---

## Integraciones Posibles

* Google Calendar.
* Outlook Calendar.
* WhatsApp.
* Correo electrónico.

---

## Impacto MVP

Ninguno.

---

# TDD-504 FUTURO SISTEMA CRM

## Estado

No implementado.

---

## Objetivo Futuro

Gestionar clientes.

---

## Funcionalidades Previstas

* Historial.
* Seguimiento.
* Notas.
* Segmentación.
* Recordatorios.

---

## Entidades Futuras

```text
customers

customer_notes

customer_tags

customer_interactions
```

---

## Impacto MVP

Ninguno.

---

# TDD-505 FUTURO SISTEMA DE PAGOS

## Estado

No implementado.

---

## Objetivo Futuro

Permitir pagos digitales.

---

## Posibles Integraciones

* Wompi.
* Mercado Pago.
* Stripe.
* PayU.

---

## Entidades Futuras

```text
payments

payment_transactions

invoices
```

---

## Impacto MVP

Ninguno.

---

# TDD-506 FUTURO DASHBOARD ANALÍTICO

## Estado

No implementado.

---

## Objetivo Futuro

Medir desempeño comercial.

---

## Métricas Previstas

* Visitas.
* Conversiones.
* Formularios.
* Servicios más consultados.
* Especialistas más vistos.

---

## Posibles Herramientas

* PostHog.
* Google Analytics.
* Plausible.

---

## Impacto MVP

Ninguno.

---

# TDD-507 FUTURO SISTEMA DE NOTIFICACIONES

## Estado

No implementado.

---

## Objetivo Futuro

Centralizar comunicaciones.

---

## Canales

* Correo.
* WhatsApp.
* Notificaciones internas.

---

## Entidades Futuras

```text
notifications

notification_templates

notification_logs
```

---

## Impacto MVP

Ninguno.

---

# TDD-508 FUTURO SISTEMA DE EMPLEADOS

## Estado

Preparado únicamente mediante arquitectura de roles.

---

## MVP

Solo:

```text
OWNER
```

---

## Fase Futura

```text
EMPLOYEE
```

---

## Posibles Permisos

* Gestionar servicios.
* Gestionar especialistas.
* Consultar formularios.

---

## Restricciones

Sin acceso total.

---

## Impacto MVP

Ninguno.

---

# TDD-509 FUTURO SUPER ADMINISTRADOR

## Estado

No implementado.

---

## Rol Futuro

```text
SUPER_ADMIN
```

---

## Capacidades Previstas

* Gestionar categorías.
* Configuración global.
* Mantenimiento avanzado.

---

## Impacto MVP

Ninguno.

---

# TDD-510 FUTURA GESTIÓN DINÁMICA DEL HOME

## Estado

No implementado.

---

## MVP

Contenido fijo.

---

## Escalabilidad

La tabla:

```text
settings
```

permitirá posteriormente administrar:

* Hero.
* CTA.
* Certificaciones.
* Galerías.
* Redes sociales.
* Información de contacto.

---

## Impacto MVP

Ninguno.

---

# TDD-511 FUTURO BLOG

## Estado

Descartado actualmente.

---

## Arquitectura

No se construirá.

---

## Consideración

La arquitectura general permitiría añadirlo posteriormente si el negocio lo requiere.

---

## Impacto MVP

Ninguno.

---

# TDD-512 FUTURA MULTI-SEDE

## Estado

No implementado.

---

## Objetivo Futuro

Soportar múltiples sedes.

---

## Entidades Futuras

```text
locations

location_services

location_specialists
```

---

## Impacto MVP

Ninguno.

---

# TDD-513 FUTURA APLICACIÓN MÓVIL

## Estado

No implementado.

---

## Estrategia Recomendada

Cuando exista necesidad:

```text
Next.js
      │
      ▼
API
      │
      ▼
Aplicación móvil
```

---

## Posibles Tecnologías

* React Native.
* Flutter.

---

## Impacto MVP

Ninguno.

---

# TDD-514 POSIBLE MIGRACIÓN BACKEND

## Estado

No requerida.

---

## Arquitectura MVP

```text
Monolito Moderno
```

---

## Escenario Futuro

Si el sistema supera las capacidades del MVP:

```text
Frontend:
Next.js

Backend:
NestJS
```

---

## Condiciones

Solo si existen:

* Reservas masivas.
* CRM complejo.
* Integraciones empresariales.

---

## Impacto MVP

Ninguno.

---

# TDD-515 RIESGOS TÉCNICOS IDENTIFICADOS

## Riesgo 1

Contenido incompleto entregado por el cliente.

---

### Mitigación

Uso de placeholders.

---

## Riesgo 2

Imágenes demasiado pesadas.

---

### Mitigación

Compresión automática.

---

## Riesgo 3

Cambios de alcance.

---

### Mitigación

Documento FRD aprobado.

---

## Riesgo 4

Nuevos requerimientos durante desarrollo.

---

### Mitigación

Proceso formal de Change Request.

---

## Riesgo 5

Dependencia de terceros.

---

### Mitigación

Arquitectura desacoplada.

---

# TDD-516 DEUDA TÉCNICA ACEPTADA

## MVP

Se acepta conscientemente:

---

### Sin Analytics.

---

### Sin CRM.

---

### Sin sistema de citas.

---

### Sin pagos.

---

### Sin auditoría avanzada.

---

### Sin historial de cambios.

---

## Justificación

Reducir tiempo y costo.

---

# TDD-517 CONVENCIONES DE DESARROLLO

## Lenguaje

Todo el código deberá estar en inglés.

---

## Base de Datos

```text
snake_case
```

---

## Variables

```text
camelCase
```

---

## Componentes React

```text
PascalCase
```

---

## Archivos

```text
kebab-case
```

cuando aplique.

---

## Restricción

Mantener consistencia absoluta.

---

# TDD-518 CONVENCIONES DE COMMITS

## Formato

```text
type(scope): description
```

---

## Ejemplos

```text
feat(services): add service creation

fix(auth): resolve login issue

refactor(storage): improve upload flow
```

---

# TDD-519 CALIDAD DE CÓDIGO

## Requisitos

* TypeScript Strict.
* ESLint.
* Prettier.

---

## Objetivo

Código consistente.

---

# TDD-520 DOCUMENTACIÓN INTERNA

## Obligatorio

Documentar:

* Configuración.
* Variables de entorno.
* Instalación.
* Despliegue.

---

## Archivo

```text
README.md
```

---

# TDD-521 CHECKLIST PRE-PRODUCCIÓN

Antes de desplegar deberá verificarse:

---

## Infraestructura

* Dominio configurado.
* SSL activo.
* Variables configuradas.

---

## Base de Datos

* Migraciones ejecutadas.
* RLS activo.
* Políticas verificadas.

---

## Storage

* Buckets creados.
* Permisos configurados.

---

## Correos

* Resend operativo.
* DNS verificado.

---

## Seguridad

* Middleware probado.
* Roles probados.
* Accesos verificados.

---

## SEO

* Sitemap generado.
* Robots generado.
* Metadata configurada.

---

## Rendimiento

* Imágenes optimizadas.
* Lighthouse validado.

---

## Responsive

* Mobile.
* Tablet.
* Desktop.

---

# TDD-522 CRITERIOS DE PRODUCCIÓN

El sistema se considerará listo para producción cuando:

* Sitio público funcional.
* Dashboard funcional.
* CRUD de servicios funcional.
* CRUD de especialistas funcional.
* Formularios funcionales.
* Correos funcionales.
* SEO básico implementado.
* Responsive validado.
* Seguridad validada.
* Despliegue completado.

---

# TDD-523 CRITERIOS DE CIERRE DEL PROYECTO

El proyecto se considerará finalizado cuando se cumplan simultáneamente:

* Todos los requisitos funcionales aprobados.
* Todos los requisitos no funcionales aprobados.
* TDD implementado.
* FRD implementado.
* Despliegue realizado.
* Corrección de errores críticos completada.
* Entrega al cliente realizada.

---

# TDD-524 DECLARACIÓN DE ALCANCE FUTURO

Toda funcionalidad no incluida explícitamente en:

* Documento de Alcance.
* FRD.
* TDD.

será considerada:

```text
Nueva funcionalidad
Nueva fase
Nuevo presupuesto
Nuevo cronograma
```

---

# TDD-525 RESULTADO ESPERADO

La arquitectura diseñada deberá proporcionar:

* Base sólida para producción.
* Excelente mantenibilidad.
* Excelente escalabilidad.
* Bajo costo operativo.
* Evolución controlada.
* Riesgo técnico reducido.
* Independencia tecnológica.
* Capacidad de crecimiento sin rediseños mayores.

FIN DEL DOCUMENTO TDD v1.0
