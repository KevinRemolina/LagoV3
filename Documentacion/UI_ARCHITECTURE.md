# UI_ARCHITECTURE.md

# BLOQUE 1

# INTRODUCCIÓN · NAVEGACIÓN GLOBAL · MAPA DE PANTALLAS · JERARQUÍA DE NAVEGACIÓN · FLUJOS PRINCIPALES

---

# UI-100 OBJETIVO DEL DOCUMENTO

## UI-100.1 Propósito

Este documento define la arquitectura completa de interfaces del sistema Lago Spa · Estética · Salud.

Su objetivo es establecer de forma precisa:

* Todas las pantallas existentes.
* Relaciones entre pantallas.
* Flujos de navegación.
* Jerarquía visual.
* Experiencia de usuario.
* Inventario completo de vistas.
* Estados de acceso.
* Comportamientos esperados.

---

## Alcance

Este documento cubre:

### Sitio Público

```text
Home

Categorías

Servicios

Especialistas

Contacto

Páginas SEO
```

---

### Panel Administrativo

```text
Dashboard

Servicios

Especialistas

Formularios

Configuración
```

---

### Arquitectura Futura

```text
Usuarios

Roles

CRM

Citas

Pagos

Analytics

Blog
```

---

## Fuera de Alcance MVP

```text
Pagos online

Sistema de citas

CRM

Analytics

Blog

Marketplace
```

---

# UI-101 PRINCIPIOS DE ARQUITECTURA

## UI-101.1 Mobile First

Toda pantalla debe diseñarse primero para móvil.

Posteriormente:

```text
Tablet

Desktop
```

---

## UI-101.2 Navegación Clara

Un usuario debe saber en todo momento:

```text
Dónde está

Qué puede hacer

Cómo regresar
```

---

## UI-101.3 Máximo Tres Clics

Toda información importante deberá encontrarse en:

```text
3 clics o menos
```

---

## UI-101.4 Conversión Prioritaria

Toda pantalla pública deberá facilitar:

```text
WhatsApp

Formulario

Contacto
```

---

## UI-101.5 Escalabilidad

Todas las pantallas deberán permitir crecimiento futuro sin rediseño completo.

---

# UI-102 TIPOS DE USUARIO

## Usuario Anónimo

Puede acceder únicamente al sitio público.

---

### Acceso

```text
Home

Categorías

Servicios

Especialistas

Contacto
```

---

### Restricciones

```text
Dashboard

Servicios privados

Administración
```

---

## Administrador

Acceso completo.

---

### Acceso

```text
Dashboard

Servicios

Especialistas

Formularios

Configuración
```

---

## Empleado (Futuro)

Acceso limitado.

---

## SuperAdmin (Futuro)

Control total del sistema.

---

# UI-103 ESTRUCTURA GENERAL DEL SITIO

## Arquitectura Principal

```text
/
│
├── Inicio
│
├── Servicios
│
│   ├── Facial
│   ├── Corporal
│   ├── Salud
│   └── Spa
│
├── Especialistas
│
├── Contacto
│
└── Login
```

---

## Arquitectura Administrativa

```text
/admin
│
├── Dashboard
│
├── Servicios
│
├── Especialistas
│
├── Formularios
│
└── Configuración
```

---

# UI-104 MAPA GENERAL DE NAVEGACIÓN

## Vista Global

```text
HOME
│
├── Categorías
│   │
│   ├── Facial
│   ├── Corporal
│   ├── Salud
│   └── Spa
│
├── Servicios
│   │
│   └── Servicio Individual
│
├── Especialistas
│   │
│   └── Perfil Especialista
│
├── Contacto
│
└── Login
     │
     └── Dashboard
```

---

# UI-105 NAVEGACIÓN PÚBLICA

## Navbar Principal

Visible en todas las páginas públicas.

---

### Elementos

```text
Logo

Inicio

Servicios

Especialistas

Contacto

Agendar
```

---

### CTA Principal

```text
Agendar
```

---

### Comportamiento

Desktop:

```text
Horizontal
```

---

Mobile:

```text
Menú Drawer
```

---

# UI-106 NAVEGACIÓN DEL HOME

## Flujo Principal

```text
Hero
↓
Servicios Destacados
↓
Categorías
↓
Especialistas
↓
Nosotros
↓
Certificaciones
↓
Galería
↓
Mapa
↓
Contacto
```

---

## Objetivo

Permitir exploración natural.

---

## Conversión

CTAs distribuidos estratégicamente durante el recorrido.

---

# UI-107 JERARQUÍA DE NAVEGACIÓN PÚBLICA

## Nivel 1

```text
Home
```

---

## Nivel 2

```text
Categorías
Especialistas
Contacto
```

---

## Nivel 3

```text
Servicio Individual

Perfil Especialista
```

---

# UI-108 BREADCRUMBS

## Ubicación

Todas las páginas internas.

---

## Ejemplo Categoría

```text
Inicio
>
Servicios
>
Facial
```

---

## Ejemplo Servicio

```text
Inicio
>
Servicios
>
Facial
>
Limpieza Facial Profunda
```

---

## Ejemplo Especialista

```text
Inicio
>
Especialistas
>
Dr. Juan Pérez
```

---

# UI-109 NAVEGACIÓN ADMINISTRATIVA

## Sidebar

Siempre visible en Desktop.

---

## Estructura

```text
Dashboard

Servicios

Especialistas

Formularios

Configuración
```

---

## Estado Activo

La sección actual debe resaltarse visualmente.

---

# UI-110 HEADER ADMINISTRATIVO

## Componentes

```text
Breadcrumb

Título

Perfil

Cerrar Sesión
```

---

# UI-111 FLUJO PRINCIPAL DE CONVERSIÓN

## Objetivo

Convertir visitantes en consultas.

---

## Flujo

```text
Home

↓

Servicio

↓

Interés

↓

WhatsApp o Formulario

↓

Contacto
```

---

# UI-112 FLUJO DE WHATSAPP

## Recorrido

```text
Usuario

↓

Selecciona servicio

↓

Agendar

↓

WhatsApp

↓

Mensaje precargado

↓

Conversación
```

---

# UI-113 FLUJO DE FORMULARIO

## Recorrido

```text
Usuario

↓

Servicio

↓

Formulario

↓

Envío

↓

Confirmación

↓

Panel Administrativo
```

---

# UI-114 FLUJO DE DESCUBRIMIENTO

## Objetivo

Explorar catálogo.

---

## Recorrido

```text
Home

↓

Categoría

↓

Listado

↓

Servicio

↓

Contacto
```

---

# UI-115 FLUJO DE CONFIANZA

## Objetivo

Reducir incertidumbre.

---

## Recorrido

```text
Home

↓

Especialistas

↓

Certificaciones

↓

Instalaciones

↓

Contacto
```

---

# UI-116 FLUJO ADMINISTRATIVO GENERAL

## Recorrido

```text
Login

↓

Dashboard

↓

Gestión

↓

Guardar

↓

Confirmación
```

---

# UI-117 FLUJO CRUD SERVICIOS

## Crear

```text
Dashboard

↓

Servicios

↓

Crear Servicio

↓

Guardar

↓

Listado
```

---

## Editar

```text
Listado

↓

Editar

↓

Guardar

↓

Listado
```

---

## Eliminar

```text
Listado

↓

Eliminar

↓

Confirmar

↓

Listado
```

---

# UI-118 FLUJO CRUD ESPECIALISTAS

## Crear

```text
Especialistas

↓

Nuevo Especialista

↓

Guardar
```

---

## Editar

```text
Especialistas

↓

Editar

↓

Guardar
```

---

## Eliminar

```text
Especialistas

↓

Eliminar

↓

Confirmar
```

---

# UI-119 FLUJO FORMULARIOS

## Recepción

```text
Formulario enviado

↓

Panel

↓

Pendiente
```

---

## Procesamiento

```text
Pendiente

↓

Leído

↓

Archivado
```

---

# UI-120 MATRIZ GENERAL DE PANTALLAS

## Sitio Público

```text
Home

Categoría

Servicio

Especialistas

Perfil Especialista

Contacto

Login
```

---

## Dashboard

```text
Dashboard Home

Listado Servicios

Crear Servicio

Editar Servicio

Ver Servicio

Listado Especialistas

Crear Especialista

Editar Especialista

Ver Especialista

Listado Formularios

Ver Formulario

Configuración
```

---

# UI-121 PANTALLAS FUTURAS PREVISTAS

No forman parte del MVP.

---

## Arquitectura Reservada

```text
Usuarios

Roles

Citas

Pagos

CRM

Analytics

Blog

Configuraciones Avanzadas
```

---

# UI-122 RESULTADO ESPERADO

La arquitectura deberá garantizar:

```text
Navegación intuitiva

Escalabilidad

SEO sólido

Conversión eficiente

Mantenimiento sencillo

Experiencia premium
```

sin necesidad de rediseñar la estructura principal del sistema en futuras fases.

# UI_ARCHITECTURE.md

# BLOQUE 2

# SITIO PÚBLICO · HOME · CATEGORÍAS · SERVICIOS · PÁGINA DE SERVICIO

---

# UI-200 OBJETIVO

## UI-200.1 Propósito

Definir de manera detallada todas las pantallas públicas relacionadas con:

* Home.
* Categorías.
* Servicios.
* Conversión.
* SEO.
* Navegación comercial.

---

## Objetivo Principal

Convertir visitantes en consultas.

---

## Objetivo Secundario

Posicionar la marca Lago Spa · Estética · Salud como una experiencia premium de bienestar, estética y salud en Sogamoso.

---

# UI-201 HOME

## Ruta

```text
/
```

---

## Tipo

Landing Page Principal.

---

## Estrategia

One Page Experience.

---

## Objetivo

Presentar:

```text
Marca

Servicios

Especialistas

Instalaciones

Confianza

Contacto
```

sin obligar al usuario a navegar entre múltiples páginas.

---

# UI-202 ESTRUCTURA GENERAL DEL HOME

## Orden de Secciones

```text
Header

↓

Hero

↓

Servicios Destacados

↓

Categorías

↓

Especialistas

↓

Nosotros

↓

Certificaciones

↓

Galería

↓

Mapa

↓

Contacto

↓

Footer
```

---

# UI-203 HEADER

## Tipo

Sticky Header.

---

## Comportamiento

Visible durante toda la navegación.

---

## Contenido

```text
Logo

Inicio

Servicios

Especialistas

Contacto

CTA Agendar
```

---

## Mobile

Drawer Navigation.

---

# UI-204 HERO

## Objetivo

Capturar atención inmediatamente.

---

## Mensaje Principal

Debe comunicar:

```text
Bienestar

Salud

Estética

Experiencia Premium
```

---

## Elementos

### Título Principal

Headline comercial.

---

### Subtítulo

Propuesta de valor.

---

### CTA Principal

```text
Agendar Ahora
```

---

### CTA Secundario

```text
Ver Servicios
```

---

### Imagen o Video

Contenido premium del establecimiento.

---

# UI-205 SERVICIOS DESTACADOS

## Objetivo

Mostrar rápidamente los tratamientos prioritarios.

---

## Fuente

Servicios marcados como destacados desde administración.

---

## Cantidad

Entre:

```text
4 y 8 servicios
```

---

## Componente

Service Card.

---

## Información

```text
Imagen

Título

Precio (si aplica)

Descripción corta

CTA
```

---

# UI-206 CATEGORÍAS

## Objetivo

Organizar el catálogo.

---

## Categorías MVP

```text
Facial

Corporal

Salud

Spa
```

---

## Componente

Category Card.

---

## Información

```text
Imagen

Nombre

Descripción breve

CTA
```

---

## Navegación

```text
Categoría

↓

Página Categoría
```

---

# UI-207 ESPECIALISTAS

## Objetivo

Generar confianza.

---

## Mostrar

Especialistas activos.

---

## Información

```text
Fotografía

Nombre

Cargo

Especialidad

CTA Ver Perfil
```

---

# UI-208 NOSOTROS

## Objetivo

Humanizar la marca.

---

## Contenido

```text
Historia

Misión

Visión

Valores
```

---

## Administración

Contenido fijo para MVP.

---

# UI-209 CERTIFICACIONES

## Objetivo

Incrementar credibilidad.

---

## Mostrar

```text
Certificaciones

Licencias

Acreditaciones
```

---

## Administración

Contenido fijo para MVP.

---

# UI-210 GALERÍA

## Objetivo

Mostrar experiencia real.

---

## Tipo

Galería visual.

---

## Contenido

```text
Instalaciones

Tratamientos

Experiencias

Ambientes
```

---

## Administración

No administrable en MVP.

---

# UI-211 MAPA

## Objetivo

Facilitar visitas.

---

## Componente

Google Maps Embed.

---

## Mostrar

Ubicación física.

---

## CTA

```text
Cómo Llegar
```

---

# UI-212 CONTACTO

## Objetivo

Captación final.

---

## Información

```text
Teléfono

WhatsApp

Correo

Dirección

Horarios
```

---

## Acciones

```text
Llamar

WhatsApp

Formulario
```

---

# UI-213 FOOTER

## Información

```text
Logo

Redes Sociales

Contacto

Ubicación

Links Legales
```

---

## MVP

Políticas legales opcionales.

---

# UI-214 PÁGINA DE CATEGORÍA

## Ruta

```text
/servicios/[categoria]
```

---

## Ejemplos

```text
/servicios/facial

/servicios/corporal

/servicios/salud

/servicios/spa
```

---

## Tipo

Template reutilizable.

---

## Objetivo

Mostrar todos los servicios públicos pertenecientes a una categoría.

---

# UI-215 ESTRUCTURA PÁGINA CATEGORÍA

## Orden

```text
Breadcrumb

↓

Hero Categoría

↓

Descripción

↓

Listado Servicios

↓

CTA

↓

Footer
```

---

# UI-216 HERO CATEGORÍA

## Mostrar

```text
Nombre categoría

Imagen destacada

Descripción comercial
```

---

## Ejemplo

```text
Tratamientos Faciales
```

---

# UI-217 LISTADO DE SERVICIOS

## Fuente

Servicios:

```text
PUBLIC
```

---

## Orden

Por fecha de creación descendente.

---

## Arquitectura futura

Preparada para:

```text
Orden manual
```

---

# UI-218 SERVICE CARD

## Elementos

```text
Imagen

Título

Precio

Descripción corta

Botón Ver Más
```

---

## Click

```text
Servicio

↓

Página Servicio
```

---

# UI-219 ESTADOS VACÍOS

## Caso

No existen servicios.

---

## Mensaje

```text
Actualmente no existen servicios disponibles en esta categoría.
```

---

# UI-220 CTA DE CATEGORÍA

## Objetivo

Conversión.

---

## Mostrar

```text
WhatsApp

Formulario
```

---

# UI-221 PÁGINA DE SERVICIO

## Ruta

```text
/servicio/[slug]
```

---

## Ejemplo

```text
/servicio/limpieza-facial-profunda
```

---

## Tipo

Landing Comercial.

---

## Proporción

```text
70% Comercial

30% Informativa
```

---

# UI-222 OBJETIVOS DE LA PÁGINA

## Principal

Generar contacto.

---

## Secundario

Educar al usuario.

---

# UI-223 ESTRUCTURA GENERAL

## Orden

```text
Breadcrumb

↓

Hero Servicio

↓

Descripción

↓

Beneficios

↓

Contraindicaciones

↓

Galería

↓

Especialistas

↓

CTA Principal

↓

Servicios Relacionados

↓

Footer
```

---

# UI-224 HERO SERVICIO

## Elementos

```text
Título

Precio

Imagen Principal

Resumen

CTA Agendar
```

---

## CTA Principal

```text
Agendar por WhatsApp
```

---

## CTA Secundario

```text
Solicitar Información
```

---

# UI-225 DESCRIPCIÓN

## Fuente

Campo administrable.

---

## Contenido

Explicación completa del tratamiento.

---

# UI-226 BENEFICIOS

## Tipo

Lista estructurada.

---

## Ejemplo

```text
Mejora apariencia

Favorece circulación

Reduce tensión
```

---

# UI-227 CONTRAINDICACIONES

## Objetivo

Transparencia.

---

## Fuente

Campo administrable.

---

## Mostrar

Solo si existen datos.

---

# UI-228 INFORMACIÓN ADICIONAL

## Mostrar

```text
Duración

Incluye

Recomendaciones

Observaciones
```

---

## Condicional

Solo si existen.

---

# UI-229 GALERÍA DEL SERVICIO

## Fuente

Imágenes del servicio.

---

## Límite

```text
15 imágenes
```

---

## Funciones

```text
Zoom

Lightbox

Navegación
```

---

# UI-230 ESPECIALISTAS ASOCIADOS

## Objetivo

Incrementar confianza.

---

## Mostrar

```text
Foto

Nombre

Cargo

CTA Perfil
```

---

# UI-231 CTA PRINCIPAL

## Ubicación

Debajo del contenido principal.

---

## Acciones

```text
WhatsApp

Formulario
```

---

# UI-232 MENSAJE WHATSAPP

## Generación

Automática.

---

## Ejemplo

```text
Hola.

Estoy interesado en el servicio Limpieza Facial Profunda.

¿Podrían brindarme más información?
```

---

## Editable

Sí.

---

# UI-233 FORMULARIO SERVICIO

## Campos

```text
Nombre

Teléfono

Correo

Servicio

Mensaje
```

---

## Servicio

Precargado automáticamente.

---

# UI-234 SERVICIOS RELACIONADOS

## Objetivo

Aumentar exploración.

---

## Mostrar

Entre:

```text
3 y 6 servicios
```

---

## Prioridad

Misma categoría.

---

# UI-235 SEO DE SERVICIO

## Meta Title

Generado automáticamente.

---

## Meta Description

Generada automáticamente.

---

## URL

Slug automático.

---

## Editable

No.

---

# UI-236 VISIBILIDAD

## Servicios Públicos

Accesibles.

---

## Servicios Privados

No visibles.

---

## Servicios Archivados

No visibles.

---

# UI-237 CONTROL DE ACCESO

## Usuario Anónimo

Solo visualiza:

```text
PUBLIC
```

---

## Administrador

Visualiza:

```text
PUBLIC

PRIVATE

ARCHIVED
```

---

# UI-238 INDEXACIÓN

## Google

Indexar:

```text
Home

Categorías

Servicios Públicos
```

---

## No Indexar

```text
Dashboard

Login

Servicios Privados

Servicios Archivados
```

---

# UI-239 RESPONSIVE

## Desktop

Experiencia completa.

---

## Tablet

Adaptativa.

---

## Mobile

Prioridad principal.

---

# UI-240 RESULTADO ESPERADO

Las pantallas públicas deberán:

```text
Posicionar la marca

Transmitir lujo

Transmitir confianza

Explicar tratamientos

Facilitar contacto

Convertir visitantes en clientes
```

manteniendo una experiencia premium, rápida y optimizada para SEO local.

# UI_ARCHITECTURE.md

# BLOQUE 3

# ESPECIALISTAS · NOSOTROS · CONTACTO · ESTADOS PÚBLICOS

---

# UI-300 OBJETIVO

## UI-300.1 Propósito

Definir completamente las pantallas públicas relacionadas con:

* Especialistas.
* Perfiles profesionales.
* Nosotros.
* Contacto.
* Estados visuales del sitio.

---

## Objetivo Principal

Incrementar la confianza del visitante.

---

## Objetivo Secundario

Reducir incertidumbre antes de solicitar información o agendar.

---

# UI-301 PÁGINA DE ESPECIALISTAS

## Ruta

```text
/especialistas
```

---

## Tipo

Listado público.

---

## Objetivo

Mostrar el equipo profesional del establecimiento.

---

## Función Comercial

Reforzar la credibilidad de la marca.

---

# UI-302 ESTRUCTURA GENERAL

## Orden

```text
Breadcrumb

↓

Hero Especialistas

↓

Introducción

↓

Listado de Especialistas

↓

CTA

↓

Footer
```

---

# UI-303 HERO ESPECIALISTAS

## Objetivo

Presentar al equipo profesional.

---

## Elementos

```text
Título

Descripción

Imagen de apoyo
```

---

## Ejemplo de Título

```text
Nuestro Equipo de Especialistas
```

---

## Ejemplo de Descripción

```text
Profesionales comprometidos con tu bienestar,
salud y estética.
```

---

# UI-304 INTRODUCCIÓN

## Objetivo

Explicar el valor del equipo humano.

---

## Contenido

Texto institucional.

---

## Administración

Contenido fijo para MVP.

---

# UI-305 LISTADO DE ESPECIALISTAS

## Fuente

Especialistas activos.

---

## Orden

Orden de creación.

---

## Arquitectura futura

Preparada para:

```text
Orden manual
```

---

# UI-306 SPECIALIST CARD

## Elementos

```text
Fotografía

Nombre

Cargo

Descripción corta

CTA Ver Perfil
```

---

## Objetivo

Permitir exploración rápida.

---

# UI-307 INTERACCIÓN

## Click

```text
Especialista

↓

Perfil Profesional
```

---

# UI-308 ESTADOS VACÍOS

## Caso

No existen especialistas registrados.

---

## Mensaje

```text
Actualmente no hay especialistas disponibles.
```

---

# UI-309 CTA FINAL

## Objetivo

Conversión.

---

## Acciones

```text
Agendar

Contactar por WhatsApp
```

---

# UI-310 PERFIL DE ESPECIALISTA

## Ruta

```text
/especialistas/[slug]
```

---

## Ejemplo

```text
/especialistas/juan-perez
```

---

## Tipo

Perfil Profesional Público.

---

## Objetivo

Generar confianza.

---

# UI-311 ESTRUCTURA GENERAL

## Orden

```text
Breadcrumb

↓

Hero Especialista

↓

Información Profesional

↓

Certificaciones

↓

Servicios Asociados

↓

CTA

↓

Footer
```

---

# UI-312 HERO ESPECIALISTA

## Mostrar

```text
Fotografía

Nombre

Cargo

Descripción breve
```

---

## Objetivo

Identificación inmediata.

---

# UI-313 INFORMACIÓN PROFESIONAL

## Mostrar

```text
Biografía

Experiencia

Especialidades

Horarios
```

---

## Fuente

Panel administrativo.

---

# UI-314 CERTIFICACIONES

## Objetivo

Generar credibilidad.

---

## Mostrar

Listado de certificaciones registradas.

---

## Condicional

Solo si existen.

---

# UI-315 REDES SOCIALES

## Mostrar

```text
Instagram

Facebook

LinkedIn (futuro)
```

---

## Condicional

Solo si existen.

---

# UI-316 WHATSAPP DIRECTO

## Mostrar

Botón de contacto directo.

---

## Condicional

Solo si existe número registrado.

---

# UI-317 SERVICIOS ASOCIADOS

## Objetivo

Conectar especialistas con tratamientos.

---

## Mostrar

Servicios relacionados.

---

## Componente

Service Card.

---

## Interacción

```text
Servicio

↓

Página Servicio
```

---

# UI-318 CTA PRINCIPAL

## Acción

```text
Agendar con Nosotros
```

---

## Destino

WhatsApp.

---

# UI-319 CTA SECUNDARIO

## Acción

```text
Solicitar Información
```

---

## Destino

Formulario.

---

# UI-320 SEO DEL PERFIL

## Meta Title

Automático.

---

## Meta Description

Automática.

---

## URL

Slug generado automáticamente.

---

# UI-321 PÁGINA NOSOTROS

## Ruta

```text
/nosotros
```

---

## MVP

No incluida en navegación principal.

---

## Arquitectura

Preparada para futura implementación.

---

# UI-322 OBJETIVO

Humanizar la marca.

---

## Comunicar

```text
Historia

Filosofía

Valores

Propósito
```

---

# UI-323 ESTRUCTURA FUTURA

```text
Hero

↓

Historia

↓

Misión

↓

Visión

↓

Valores

↓

Instalaciones

↓

CTA
```

---

# UI-324 ADMINISTRACIÓN

## MVP

Contenido estático.

---

# UI-325 PÁGINA CONTACTO

## Ruta

```text
/contacto
```

---

## Objetivo

Centralizar todos los medios de contacto.

---

# UI-326 ESTRUCTURA GENERAL

## Orden

```text
Breadcrumb

↓

Hero Contacto

↓

Información

↓

Mapa

↓

Formulario

↓

Footer
```

---

# UI-327 HERO CONTACTO

## Mostrar

```text
Título

Descripción
```

---

## Ejemplo

```text
Estamos listos para ayudarte.
```

---

# UI-328 INFORMACIÓN DE CONTACTO

## Mostrar

```text
Teléfono

WhatsApp

Correo

Dirección

Horarios
```

---

## Fuente

Configuración estática del proyecto.

---

# UI-329 ACCIONES

## Disponibles

```text
Llamar

WhatsApp

Enviar Correo

Cómo Llegar
```

---

# UI-330 MAPA

## Fuente

Google Maps Embed.

---

## Objetivo

Facilitar llegada al establecimiento.

---

# UI-331 BOTÓN CÓMO LLEGAR

## Acción

Abrir Google Maps.

---

## Nueva pestaña

Sí.

---

# UI-332 FORMULARIO DE CONTACTO

## Objetivo

Captación de clientes.

---

## Campos

```text
Nombre

Teléfono

Correo

Servicio de interés

Mensaje
```

---

# UI-333 VALIDACIONES

## Nombre

Obligatorio.

---

## Teléfono

Obligatorio.

---

## Correo

Obligatorio.

---

## Servicio

Opcional.

---

## Mensaje

Obligatorio.

---

# UI-334 ENVÍO EXITOSO

## Comportamiento

Mostrar confirmación.

---

## Mensaje

```text
Tu solicitud ha sido enviada correctamente.

Nos pondremos en contacto contigo lo antes posible.
```

---

# UI-335 ERROR DE ENVÍO

## Mostrar

Mensaje amigable.

---

## Ejemplo

```text
No fue posible enviar tu solicitud.

Inténtalo nuevamente.
```

---

# UI-336 DESTINO DE FORMULARIOS

## Acción 1

Enviar correo.

---

## Acción 2

Guardar en base de datos.

---

## Acción 3

Mostrar en panel administrativo.

---

# UI-337 ESTADOS PÚBLICOS

## Objetivo

Mantener una experiencia consistente.

---

# UI-338 ESTADO LOADING

## Uso

Cuando se consulta información.

---

## Implementación

Skeletons.

---

## Prioridad

Alta.

---

# UI-339 ESTADO ERROR

## Uso

Errores inesperados.

---

## Mostrar

```text
Ocurrió un problema.

Por favor intenta nuevamente.
```

---

## Nunca Mostrar

```text
Errores técnicos

Stack traces

Información interna
```

---

# UI-340 ESTADO VACÍO

## Aplicación

```text
Servicios

Especialistas

Resultados
```

---

## Objetivo

Evitar pantallas vacías.

---

# UI-341 ESTADO SIN RESULTADOS

## Caso

Búsqueda futura sin coincidencias.

---

## Mensaje

```text
No encontramos resultados para tu búsqueda.
```

---

# UI-342 ESTADO OFFLINE

## Futuro

Preparado para implementación.

---

## Mensaje

```text
Parece que no tienes conexión a Internet.
```

---

# UI-343 ESTADO SERVICIO NO ENCONTRADO

## Caso

Slug inexistente.

---

## Ruta

404.

---

## Mostrar

```text
El servicio solicitado no existe o ya no está disponible.
```

---

# UI-344 ESTADO ESPECIALISTA NO ENCONTRADO

## Caso

Slug inexistente.

---

## Mostrar

```text
El especialista solicitado no existe o ya no está disponible.
```

---

# UI-345 PÁGINA 404

## Ruta

Automática.

---

## Objetivo

Evitar abandono.

---

## Mostrar

```text
Página no encontrada.
```

---

## Acciones

```text
Volver al inicio

Ver servicios

Contactar
```

---

# UI-346 PÁGINA 500

## Objetivo

Gestionar errores internos.

---

## Mostrar

```text
Ha ocurrido un error inesperado.
```

---

## Acción

```text
Volver al inicio
```

---

# UI-347 RESPONSIVE

## Especialistas

Totalmente responsive.

---

## Contacto

Totalmente responsive.

---

## Formularios

Totalmente responsive.

---

## Estados

Totalmente responsive.

---

# UI-348 INDEXACIÓN SEO

## Indexar

```text
Especialistas

Perfiles

Contacto
```

---

## No Indexar

```text
404

500

Estados internos
```

---

# UI-349 ACCESIBILIDAD

Todas las pantallas públicas deberán:

```text
Mantener contraste AA

Soportar navegación por teclado

Poseer focus states

Tener textos alternativos en imágenes
```

---

# UI-350 RESULTADO ESPERADO

Las pantallas de Especialistas, Nosotros, Contacto y Estados Públicos deberán:

```text
Aumentar confianza

Humanizar la marca

Facilitar contacto

Reducir incertidumbre

Mantener una experiencia premium

Mejorar conversión
```

sin romper la coherencia visual ni la arquitectura general del sitio.

# UI_ARCHITECTURE.md

# BLOQUE 4

# AUTENTICACIÓN · LOGIN · RECUPERACIÓN DE CONTRASEÑA · CONTROL DE ACCESO · SESIONES · PROTECCIÓN DE RUTAS

---

# UI-400 OBJETIVO

## UI-400.1 Propósito

Definir la arquitectura de autenticación y control de acceso del sistema.

---

## Alcance MVP

Incluye:

```text
Login

Logout

Gestión de sesión

Protección de rutas

Control de acceso por rol

Recuperación de contraseña
```

---

## Fuera de Alcance MVP

```text
Registro público

MFA

OAuth

SSO

Invitaciones

Gestión avanzada de usuarios
```

---

# UI-401 ARQUITECTURA DE AUTENTICACIÓN

## Tecnología

```text
Supabase Auth
```

---

## Tipo de autenticación

```text
Email + Password
```

---

## Gestión de sesión

Responsabilidad:

```text
Supabase Auth
```

---

## Persistencia

La sesión deberá mantenerse entre:

```text
Recargas

Cierre de navegador

Nuevas pestañas
```

según las capacidades estándar de Supabase Auth.

---

# UI-402 ACTORES

## Usuario Anónimo

No autenticado.

---

### Acceso permitido

```text
Sitio Público
```

---

### Acceso denegado

```text
Dashboard

Administración

Contenido privado
```

---

## Administrador

Usuario autenticado.

---

### Acceso permitido

```text
Dashboard

Servicios

Especialistas

Formularios

Configuración
```

---

## Empleado (Futuro)

No implementado en MVP.

---

## SuperAdmin (Futuro)

No implementado en MVP.

---

# UI-403 FLUJO GENERAL DE AUTENTICACIÓN

## Recorrido

```text
Login

↓

Validación

↓

Creación de sesión

↓

Dashboard

↓

Uso del sistema

↓

Logout
```

---

# UI-404 PÁGINA LOGIN

## Ruta

```text
/login
```

---

## Objetivo

Permitir acceso administrativo.

---

## Tipo

Pantalla pública controlada.

---

# UI-405 ESTRUCTURA LOGIN

## Layout

```text
Contenedor centrado

Card principal

Formulario

Acciones
```

---

## Desktop

Card centrada.

---

## Mobile

Card adaptada a ancho disponible.

---

# UI-406 COMPONENTES LOGIN

## Mostrar

```text
Logo

Título

Descripción

Correo

Contraseña

Botón Ingresar

Olvidé mi contraseña
```

---

# UI-407 TÍTULO

## Ejemplo

```text
Acceso Administrativo
```

---

# UI-408 SUBTÍTULO

## Ejemplo

```text
Ingresa tus credenciales para acceder al panel.
```

---

# UI-409 CAMPO CORREO

## Tipo

```text
email
```

---

## Obligatorio

Sí.

---

## Validación

Formato email válido.

---

# UI-410 CAMPO CONTRASEÑA

## Tipo

```text
password
```

---

## Obligatorio

Sí.

````

---

## Funciones

```text
Mostrar/Ocultar contraseña
````

---

# UI-411 BOTÓN INGRESAR

## Estado Normal

Disponible.

---

## Estado Loading

Deshabilitado.

---

## Texto Loading

```text
Ingresando...
```

---

# UI-412 ENVÍO EXITOSO

## Comportamiento

```text
Dashboard
```

---

## Redirección

Automática.

---

# UI-413 ERROR DE AUTENTICACIÓN

## Caso

Credenciales incorrectas.

---

## Mostrar

```text
Correo o contraseña incorrectos.
```

---

## No mostrar

```text
Información interna

Errores técnicos

Mensajes de Supabase
```

---

# UI-414 BLOQUEO DE SESIÓN

## MVP

No implementado.

---

## Futuro

Protección contra intentos excesivos.

---

# UI-415 RECUPERACIÓN DE CONTRASEÑA

## Ruta

```text
/forgot-password
```

---

## Objetivo

Permitir recuperación segura.

---

# UI-416 ESTRUCTURA

## Componentes

```text
Título

Descripción

Campo correo

Botón enviar
```

---

# UI-417 FLUJO

```text
Correo

↓

Enviar

↓

Correo recuperación

↓

Nueva contraseña

↓

Login
```

---

# UI-418 MENSAJE EXITOSO

```text
Si existe una cuenta asociada a este correo,
recibirás instrucciones para recuperar tu contraseña.
```

---

# UI-419 NUEVA CONTRASEÑA

## Ruta

Gestionada por Supabase.

---

## Objetivo

Permitir actualización segura.

---

# UI-420 CIERRE DE SESIÓN

## Ubicación

Header administrativo.

---

## Acción

```text
Cerrar sesión
```

---

# UI-421 FLUJO LOGOUT

```text
Click

↓

Eliminar sesión

↓

Redirección Login
```

---

# UI-422 CONTROL DE ACCESO

## Objetivo

Proteger recursos administrativos.

---

# UI-423 RUTAS PÚBLICAS

## Acceso libre

```text
/

/servicios/*

/servicio/*

/especialistas

/especialistas/*

/contacto

/login

/forgot-password
```

---

# UI-424 RUTAS PRIVADAS

## Requieren autenticación

```text
/admin

/admin/*
```

---

# UI-425 PROTECCIÓN DE RUTAS

## Caso

Usuario no autenticado.

---

## Acción

```text
Redirect

↓

/login
```

---

# UI-426 SESIÓN EXPIRADA

## Caso

Token inválido.

---

## Acción

```text
Logout automático

↓

Login
```

---

## Mensaje

```text
Tu sesión ha expirado.
```

---

# UI-427 CONTROL DE ROLES

## MVP

Un único rol operativo.

---

### Administrador

```text
Acceso completo
```

---

## Arquitectura futura

Preparada para:

```text
Empleado

Supervisor

SuperAdmin
```

---

# UI-428 TABLA DE ROLES

## Objetivo

Escalabilidad.

---

## MVP

Existente en base de datos.

---

## Uso activo

Administrador.

---

# UI-429 MATRIZ DE PERMISOS MVP

| Módulo        | Administrador |
| ------------- | ------------- |
| Dashboard     | Sí            |
| Servicios     | Sí            |
| Especialistas | Sí            |
| Formularios   | Sí            |
| Configuración | Sí            |

---

# UI-430 MATRIZ FUTURA

| Módulo        | Empleado | Administrador | SuperAdmin |
| ------------- | -------- | ------------- | ---------- |
| Dashboard     | Sí       | Sí            | Sí         |
| Servicios     | Limitado | Sí            | Sí         |
| Especialistas | Limitado | Sí            | Sí         |
| Formularios   | Limitado | Sí            | Sí         |
| Configuración | No       | Sí            | Sí         |
| Usuarios      | No       | No            | Sí         |

---

# UI-431 CONTROL DE VISIBILIDAD

## Usuario Anónimo

Visualiza:

```text
Servicios públicos
```

---

## Administrador

Visualiza:

```text
PUBLIC

PRIVATE

ARCHIVED
```

---

# UI-432 SERVICIOS PRIVADOS

## Acceso

Exclusivamente administrativo.

---

## Indexación

```text
No
```

---

## Visibilidad Pública

```text
No
```

---

# UI-433 MANEJO DE ERRORES DE ACCESO

## Caso

Usuario sin permisos.

---

## Mostrar

```text
No tienes permisos para acceder a esta sección.
```

---

## Acción

```text
Volver al Dashboard
```

---

# UI-434 PÁGINA 403

## Objetivo

Gestionar accesos restringidos.

---

## Ruta

Interna.

---

## Mensaje

```text
Acceso denegado.
```

---

# UI-435 SESIONES MÚLTIPLES

## Requisito

Permitidas.

---

## Ejemplo

```text
Computador

Teléfono

Tablet
```

---

## Comportamiento

Una misma cuenta puede permanecer autenticada en múltiples dispositivos simultáneamente.

---

# UI-436 RECORDAR SESIÓN

## MVP

Gestionado por Supabase.

---

## Comportamiento esperado

Persistencia automática.

---

# UI-437 AUDITORÍA

## MVP

No implementada.

---

## No registrar

```text
Cambios realizados

Historial de acciones

Logs administrativos
```

---

## Arquitectura futura

Preparada para incorporación.

---

# UI-438 SEGURIDAD VISUAL

## Nunca mostrar

```text
IDs internos

Tokens

Errores de base de datos

Errores de Supabase

Información sensible
```

---

# UI-439 RESPONSIVE

## Login

Responsive.

---

## Recuperación

Responsive.

---

## Estados de acceso

Responsive.

---

# UI-440 ACCESIBILIDAD

## Formularios

Soporte para:

```text
Teclado

Focus visible

Lectores de pantalla
```

---

# UI-441 EXPERIENCIA DE USUARIO

La autenticación deberá transmitir:

```text
Seguridad

Confianza

Simplicidad

Rapidez
```

---

# UI-442 RESULTADO ESPERADO

El sistema de autenticación deberá:

```text
Proteger el panel administrativo

Gestionar sesiones correctamente

Permitir recuperación de contraseña

Escalar hacia múltiples roles

Mantener una experiencia simple y segura
```

sin introducir complejidad innecesaria para el MVP.

# UI_ARCHITECTURE.md

# BLOQUE 5

# DASHBOARD HOME · LAYOUT ADMINISTRATIVO · SIDEBAR · HEADER · NAVEGACIÓN INTERNA · WIDGETS · ESTADOS ADMINISTRATIVOS

---

# UI-500 OBJETIVO

## UI-500.1 Propósito

Definir la arquitectura visual y funcional del panel administrativo del sistema Lago Spa · Estética · Salud.

---

## Objetivos Principales

Permitir:

```text
Gestión de servicios

Gestión de especialistas

Gestión de formularios

Administración eficiente
```

---

## Objetivos Secundarios

Transmitir:

```text
Profesionalismo

Orden

Control

Rapidez operativa
```

---

# UI-501 FILOSOFÍA DEL DASHBOARD

## Referencias

Inspiración visual:

```text
60% Linear

40% Stripe
```

---

## Características

```text
Minimalista

Limpio

Moderno

Rápido

Sin ruido visual
```

---

## Evitar

```text
Gradientes excesivos

Decoraciones innecesarias

Sombras pesadas

Interfaces saturadas
```

---

# UI-502 ESTRUCTURA GENERAL

## Ruta Base

```text
/admin
```

---

## Módulos MVP

```text
Dashboard

Servicios

Especialistas

Formularios

Configuración
```

---

## Arquitectura Futura

Preparada para:

```text
Usuarios

Roles

CRM

Analytics

Pagos

Citas
```

---

# UI-503 LAYOUT ADMINISTRATIVO

## Estructura Global

```text
┌───────────────────────────────┐
│ Header                        │
├──────────────┬────────────────┤
│ Sidebar      │ Contenido      │
│              │ Principal      │
│              │                │
└──────────────┴────────────────┘
```

---

# UI-504 COMPORTAMIENTO

## Desktop

Sidebar fija.

---

## Tablet

Sidebar colapsable.

---

## Mobile

Sidebar tipo Drawer.

---

# UI-505 SIDEBAR

## Objetivo

Navegación principal.

---

## Ubicación

Lateral izquierda.

---

## Persistencia

Visible durante toda la sesión.

---

# UI-506 CONTENIDO SIDEBAR

## Superior

```text
Logo

Nombre del sistema
```

---

## Centro

```text
Dashboard

Servicios

Especialistas

Formularios

Configuración
```

---

## Inferior

```text
Perfil

Cerrar sesión
```

---

# UI-507 ESTADO ACTIVO

## Requisito

La sección actual debe resaltarse claramente.

---

## Indicadores

```text
Background

Borde lateral

Color de acento
```

---

# UI-508 SIDEBAR COLAPSADA

## Desktop

Permitida.

---

## Comportamiento

Mostrar únicamente:

```text
Iconos
```

---

## Tooltip

Obligatorio.

---

# UI-509 HEADER ADMINISTRATIVO

## Objetivo

Contextualizar la pantalla actual.

---

## Ubicación

Parte superior.

---

## Sticky

Sí.

---

# UI-510 COMPONENTES HEADER

## Izquierda

```text
Botón menú móvil

Breadcrumb

Título
```

---

## Derecha

```text
Perfil

Cerrar sesión
```

---

# UI-511 BREADCRUMB

## Ejemplo

```text
Dashboard

>

Servicios

>

Crear Servicio
```

---

## Objetivo

Orientación.

---

# UI-512 ÁREA DE CONTENIDO

## Objetivo

Mostrar módulos administrativos.

---

## Comportamiento

Scroll independiente.

---

## Espaciado

Consistente en todas las vistas.

---

# UI-513 DASHBOARD HOME

## Ruta

```text
/admin
```

---

## Tipo

Pantalla principal.

---

## Objetivo

Mostrar resumen operativo.

---

# UI-514 ESTRUCTURA DASHBOARD

## Orden

```text
Título

↓

Resumen General

↓

Indicadores

↓

Actividad Reciente

↓
Acciones Rápidas
```

---

# UI-515 TÍTULO DASHBOARD

## Ejemplo

```text
Panel Administrativo
```

---

## Subtítulo

```text
Bienvenido nuevamente.
```

---

# UI-516 TARJETAS RESUMEN

## Objetivo

Mostrar información relevante rápidamente.

---

## Widgets MVP

```text
Servicios

Especialistas

Formularios Pendientes

Formularios Totales
```

---

# UI-517 WIDGET SERVICIOS

## Mostrar

```text
Cantidad total de servicios
```

---

## Acción

```text
Ver Servicios
```

---

# UI-518 WIDGET ESPECIALISTAS

## Mostrar

```text
Cantidad total de especialistas
```

---

## Acción

```text
Ver Especialistas
```

---

# UI-519 WIDGET FORMULARIOS PENDIENTES

## Mostrar

```text
Cantidad pendiente
```

---

## Prioridad

Alta.

---

## Acción

```text
Ver Formularios
```

---

# UI-520 WIDGET FORMULARIOS TOTALES

## Mostrar

```text
Cantidad total histórica
```

---

# UI-521 ACTIVIDAD RECIENTE

## MVP

Versión simplificada.

---

## Mostrar

Últimos registros:

```text
Servicios creados

Especialistas creados

Formularios recibidos
```

---

## Límite

```text
10 registros
```

---

# UI-522 ACCIONES RÁPIDAS

## Objetivo

Reducir clics.

---

## Acciones

```text
Crear Servicio

Crear Especialista

Ver Formularios
```

---

# UI-523 TARJETAS DE ACCESO RÁPIDO

## Diseño

Cards interactivas.

---

## Click

Redirección directa.

---

# UI-524 NAVEGACIÓN INTERNA

## Regla

Todo módulo debe ser accesible desde:

```text
Sidebar

Dashboard
```

---

# UI-525 CONSISTENCIA

## Todas las vistas deberán compartir

```text
Header

Sidebar

Espaciado

Tipografía

Jerarquías
```

---

# UI-526 ESTADOS DE CARGA

## Uso

Carga de datos.

---

## Implementación

Skeletons.

---

## Nunca

```text
Pantallas vacías
```

---

# UI-527 ESTADO VACÍO

## Objetivo

Explicar ausencia de datos.

---

## Ejemplo

```text
No existen servicios registrados.
```

---

## Acción

```text
Crear Servicio
```

---

# UI-528 ESTADO ERROR

## Objetivo

Gestionar errores operativos.

---

## Mostrar

```text
Ocurrió un problema.

Inténtalo nuevamente.
```

---

## Acción

```text
Reintentar
```

---

# UI-529 ESTADO SIN RESULTADOS

## Uso

Búsquedas futuras.

---

## Mensaje

```text
No encontramos resultados.
```

---

# UI-530 TOASTS

## Uso

Feedback inmediato.

---

## Tipos

```text
Success

Error

Warning

Info
```

---

# UI-531 TOAST SUCCESS

## Ejemplo

```text
Servicio creado correctamente.
```

---

# UI-532 TOAST ERROR

## Ejemplo

```text
No fue posible guardar los cambios.
```

---

# UI-533 MODALES

## Uso

Acciones críticas.

---

## Casos

```text
Eliminar

Archivar

Cerrar sesión
```

---

# UI-534 CONFIRMACIONES

## Requisito

Toda acción destructiva debe requerir confirmación.

---

## Ejemplo

```text
¿Deseas eliminar este servicio?
```

---

## Botones

```text
Cancelar

Eliminar
```

---

# UI-535 DOBLE CONFIRMACIÓN

## MVP

No obligatoria.

---

## Arquitectura

Preparada para futuro.

---

# UI-536 NOTIFICACIONES INTERNAS

## MVP

Limitadas.

---

## Mostrar

```text
Formularios pendientes
```

---

# UI-537 BADGES

## Uso

Estados rápidos.

---

## Ejemplos

```text
Pendiente

Leído

Archivado

Activo

Privado
```

---

# UI-538 ETIQUETAS DE ESTADO

## Servicios

```text
PUBLIC

PRIVATE

ARCHIVED
```

---

## Visualización

Mediante Badge.

---

# UI-539 RESPONSIVE DASHBOARD

## Desktop

Experiencia completa.

---

## Tablet

Adaptada.

---

## Mobile

Totalmente funcional.

---

# UI-540 PRIORIDADES MOBILE

## Importante

Administradores deben poder:

```text
Leer formularios

Editar servicios

Crear especialistas
```

desde el móvil.

---

# UI-541 ACCESIBILIDAD

## Dashboard

Soporte para:

```text
Navegación por teclado

Focus visible

Contraste AA
```

---

# UI-542 RENDIMIENTO

## Objetivo

Navegación instantánea.

---

## Requisito

Cambios de pantalla rápidos.

---

## Evitar

```text
Bloqueos

Re-renderizados excesivos

Esperas innecesarias
```

---

# UI-543 ARQUITECTURA FUTURA

## Preparado para incorporar

```text
Usuarios

Roles

CRM

Pagos

Citas

Analytics

Blog
```

sin modificar el layout principal.

---

# UI-544 DISEÑO ESCALABLE

## Regla

Todo nuevo módulo deberá integrarse dentro de:

```text
Sidebar

Header

Área de Contenido
```

---

# UI-545 EXPERIENCIA ESPERADA

El administrador debe sentir que:

```text
Todo está organizado

Todo es fácil de encontrar

Todo responde rápido

Todo es profesional
```

---

# UI-546 RESULTADO ESPERADO

El dashboard deberá proporcionar:

```text
Control operativo

Gestión eficiente

Escalabilidad futura

Experiencia premium

Facilidad de uso
```

manteniendo coherencia con el branding y la arquitectura general del producto.

# UI_ARCHITECTURE.md

# BLOQUE 6

# SERVICIOS · PROMOCIONES · ESPECIALISTAS · FORMULARIOS · CONFIGURACIÓN · CRUD SCREENS · TABLAS · FILTROS · MODALES · ESTADOS INTERNOS

---

# UI-600 OBJETIVO

## UI-600.1 Propósito

Definir completamente las interfaces operativas del panel administrativo.

---

## Módulos Cubiertos

```text
Servicios

Especialistas

Formularios

Configuración
```

---

## Alcance

Incluye:

```text
Listados

Creación

Edición

Visualización

Eliminación

Filtros

Estados

Confirmaciones

Validaciones
```

---

# UI-601 MÓDULO SERVICIOS

## Ruta

```text
/admin/services
```

---

## Objetivo

Administrar completamente el catálogo de servicios.

---

# UI-602 LISTADO DE SERVICIOS

## Tipo

Data Table.

---

## Estructura

```text
Título

↓

Acciones

↓

Filtros

↓

Tabla

↓

Paginación
```

---

# UI-603 HEADER

## Mostrar

```text
Servicios

Descripción

Botón Crear Servicio
```

---

# UI-604 ACCIONES PRINCIPALES

## Botón

```text
Nuevo Servicio
```

---

## Acción

```text
/admin/services/create
```

---

# UI-605 FILTROS

## MVP

```text
Buscar

Estado

Categoría
```

---

# UI-606 BUSCADOR

## Alcance

Buscar por:

```text
Título
```

---

# UI-607 FILTRO ESTADO

## Opciones

```text
Todos

PUBLIC

PRIVATE

ARCHIVED
```

---

# UI-608 FILTRO CATEGORÍA

## Opciones

```text
Facial

Corporal

Salud

Spa
```

---

# UI-609 TABLA SERVICIOS

## Columnas

```text
Imagen

Título

Categoría

Precio

Estado

Destacado

Fecha

Acciones
```

---

# UI-610 ACCIONES POR FILA

## Disponibles

```text
Ver

Editar

Archivar

Eliminar
```

---

# UI-611 BADGES

## Estado

```text
PUBLIC

PRIVATE

ARCHIVED
```

---

## Destacado

```text
Sí

No
```

---

# UI-612 PAGINACIÓN

## MVP

Server Side.

---

## Tamaños

```text
10

25

50
```

---

# UI-613 CREAR SERVICIO

## Ruta

```text
/admin/services/create
```

---

## Tipo

Formulario Multi-Tab.

---

# UI-614 TABS

```text
Información

Galería

SEO

Configuración
```

---

# UI-615 TAB INFORMACIÓN

## Campos

```text
Título

Descripción

Precio

Beneficios

Contraindicaciones

Duración

Incluye

Recomendaciones

Categoría

Especialistas
```

---

# UI-616 ESPECIALISTAS

## Tipo

Multi Select.

---

## Relación

Muchos a Muchos.

---

# UI-617 TAB GALERÍA

## Objetivo

Gestión de imágenes.

---

## Funciones

```text
Subir

Eliminar

Reordenar

Cambiar portada

Recortar
```

---

# UI-618 FORMATOS

```text
JPG

PNG

WEBP
```

---

## Tamaño máximo

```text
15 MB
```

---

# UI-619 LÍMITE

```text
15 imágenes
```

---

# UI-620 TAB SEO

## MVP

Solo lectura.

---

## Mostrar

```text
Slug

URL Final

Preview SEO
```

---

## Editable

No.

---

# UI-621 TAB CONFIGURACIÓN

## Campos

```text
Estado

Destacado

Promocional

Fecha Inicio

Fecha Fin
```

---

# UI-622 PROMOCIÓN

## Funcionamiento

Un servicio promocional es un servicio normal.

---

## Diferencia

```text
Promocional = true
```

---

# UI-623 FECHAS

## Objetivo

Automatización.

---

## Ejemplo

```text
Inicio:
01/12/2026

Fin:
31/12/2026
```

---

# UI-624 EXPIRACIÓN

## Comportamiento

Al finalizar:

```text
ARCHIVED
```

automáticamente.

---

# UI-625 VALIDACIONES

## Obligatorios

```text
Título

Descripción

Categoría
```

---

# UI-626 GUARDAR

## Acción

Guardar servicio.

---

## Resultado

Toast Success.

---

# UI-627 EDITAR SERVICIO

## Ruta

```text
/admin/services/[id]
```

---

## Funcionalidad

Igual a Crear Servicio.

---

## Diferencia

Campos precargados.

---

# UI-628 ELIMINAR SERVICIO

## Acción crítica

Sí.

---

## Modal

```text
¿Deseas eliminar este servicio?
```

---

## Botones

```text
Cancelar

Eliminar
```

---

# UI-629 COMPORTAMIENTO

## Resultado

```text
Eliminar servicio

Eliminar imágenes

Eliminar relaciones
```

---

# UI-630 VER SERVICIO

## Objetivo

Previsualización administrativa.

---

## Mostrar

Versión pública del servicio.

---

# UI-631 MÓDULO ESPECIALISTAS

## Ruta

```text
/admin/specialists
```

---

# UI-632 LISTADO

## Columnas

```text
Foto

Nombre

Cargo

Estado

Fecha

Acciones
```

---

# UI-633 ACCIONES

```text
Ver

Editar

Eliminar
```

---

# UI-634 CREAR ESPECIALISTA

## Ruta

```text
/admin/specialists/create
```

---

# UI-635 CAMPOS

```text
Foto

Nombre

Cargo

Biografía

Especialidades

Certificaciones

Instagram

Facebook

WhatsApp

Horarios
```

---

# UI-636 SERVICIOS ASOCIADOS

## Tipo

Multi Select.

---

## Relación

Muchos a Muchos.

---

# UI-637 CERTIFICACIONES

## Tipo

Lista dinámica.

---

## Acciones

```text
Agregar

Eliminar
```

---

# UI-638 REDES SOCIALES

## Opcionales

Sí.

---

# UI-639 FOTO

## Formatos

```text
JPG

PNG

WEBP
```

---

## Tamaño

```text
15 MB
```

---

# UI-640 EDITAR ESPECIALISTA

## Funcionalidad

Idéntica a Crear.

---

# UI-641 ELIMINAR ESPECIALISTA

## Modal

```text
¿Deseas eliminar este especialista?
```

---

# UI-642 COMPORTAMIENTO

## Resultado

```text
Eliminar especialista

Conservar servicios

Eliminar relaciones
```

---

# UI-643 VER ESPECIALISTA

## Mostrar

Vista pública completa.

---

# UI-644 MÓDULO FORMULARIOS

## Ruta

```text
/admin/forms
```

---

## Objetivo

Gestionar solicitudes recibidas.

---

# UI-645 LISTADO

## Columnas

```text
Nombre

Teléfono

Correo

Servicio

Estado

Fecha

Acciones
```

---

# UI-646 ESTADOS

```text
Pendiente

Leído

Archivado
```

---

# UI-647 FILTROS

## Disponibles

```text
Estado

Fecha

Buscar
```

---

# UI-648 BUSCADOR

## Alcance

```text
Nombre

Correo

Teléfono
```

---

# UI-649 BADGES

```text
Pendiente

Leído

Archivado
```

---

# UI-650 PRIORIDAD

## Pendiente

Color prioritario.

---

# UI-651 VER FORMULARIO

## Ruta

```text
/admin/forms/[id]
```

---

## Mostrar

```text
Nombre

Correo

Teléfono

Servicio

Mensaje

Fecha

IP
```

---

# UI-652 ACCIONES

```text
Marcar Leído

Archivar
```

---

# UI-653 ARCHIVADO

## Resultado

Ocultar del listado principal.

---

## Recuperable

Sí.

---

# UI-654 NOTIFICACIONES

## Dashboard

Mostrar cantidad pendiente.

---

# UI-655 MÓDULO CONFIGURACIÓN

## Ruta

```text
/admin/settings
```

---

## MVP

Muy limitado.

---

# UI-656 OBJETIVO

Centralizar parámetros internos.

---

# UI-657 SECCIONES

```text
Cuenta

Seguridad

Información Sistema
```

---

# UI-658 CUENTA

## Mostrar

```text
Nombre

Correo
```

---

## Editable

Sí.

---

# UI-659 CAMBIO DE CONTRASEÑA

## Acción

Redirección flujo Supabase.

---

# UI-660 INFORMACIÓN DEL SISTEMA

## Mostrar

```text
Versión

Entorno

Fecha despliegue
```

---

# UI-661 NO INCLUIR MVP

```text
Usuarios

Roles

Logs

Permisos

Configuración visual
```

---

# UI-662 MODALES DEL SISTEMA

## Casos

```text
Eliminar

Archivar

Cerrar sesión
```

---

# UI-663 REQUISITOS DE MODALES

## Deben incluir

```text
Título

Descripción

Acción principal

Cancelar
```

---

# UI-664 TOAST SUCCESS

## Ejemplos

```text
Servicio creado correctamente.

Especialista actualizado correctamente.

Formulario archivado correctamente.
```

---

# UI-665 TOAST ERROR

## Ejemplos

```text
No fue posible guardar los cambios.

Error al eliminar registro.
```

---

# UI-666 ESTADOS DE CARGA

## Implementación

Skeletons.

---

## Aplicar en

```text
Tablas

Formularios

Dashboard
```

---

# UI-667 ESTADOS VACÍOS

## Servicios

```text
No existen servicios registrados.
```

---

## Especialistas

```text
No existen especialistas registrados.
```

---

## Formularios

```text
No existen formularios.
```

---

# UI-668 ESTADOS ERROR

## Mensaje estándar

```text
Ha ocurrido un error inesperado.
```

---

## Acción

```text
Reintentar
```

---

# UI-669 RESPONSIVE

## Obligatorio

Todo el panel deberá ser funcional desde:

```text
Desktop

Tablet

Mobile
```

---

# UI-670 PRIORIDADES MOBILE

## Permitir

```text
Crear servicios

Editar servicios

Responder consultas

Gestionar especialistas
```

---

# UI-671 CONSISTENCIA VISUAL

Todos los módulos deberán reutilizar:

```text
Tablas

Inputs

Selects

Modales

Cards

Toasts

Badges
```

---

# UI-672 ESCALABILIDAD FUTURA

La arquitectura deberá permitir incorporar sin rediseño:

```text
Usuarios

Roles

CRM

Analytics

Pagos

Agenda

Blog
```

---

# UI-673 RESULTADO ESPERADO

Los módulos administrativos deberán proporcionar:

```text
Autonomía total para el propietario

Gestión completa del catálogo

Gestión completa de especialistas

Gestión eficiente de formularios

Operación rápida

Escalabilidad futura

Experiencia profesional
```

sin requerir soporte técnico para las tareas operativas diarias del negocio.

