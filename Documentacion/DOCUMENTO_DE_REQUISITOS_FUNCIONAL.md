# DOCUMENTO DE REQUISITOS FUNCIONALES (FRD)

# BLOQUE 1

# INTRODUCCIÓN, ACTORES, CASOS DE USO Y REGLAS DE NEGOCIO GLOBALES

---

# FR-001 INTRODUCCIÓN

## FR-001.1 Propósito

El presente documento define los requisitos funcionales del sistema web "Lago Spa · Estética · Salud".

El objetivo del documento es especificar de forma detallada el comportamiento esperado de la plataforma para garantizar una implementación consistente, verificable y alineada con los objetivos comerciales definidos para el proyecto.

Este documento complementa el documento de alcance previamente aprobado.

---

## FR-001.2 Objetivos del Sistema

La plataforma deberá permitir:

* Promocionar los servicios del establecimiento.
* Mejorar la presencia digital de la marca.
* Facilitar el contacto entre clientes y establecimiento.
* Gestionar servicios desde un panel administrativo.
* Gestionar promociones.
* Gestionar especialistas.
* Gestionar formularios de contacto.
* Posicionar la marca en buscadores locales.

---

## FR-001.3 Alcance Funcional

La solución estará compuesta por dos módulos principales:

### Sitio Público

Orientado a visitantes y potenciales clientes.

---

### Panel Administrativo

Orientado a propietarios y administradores del establecimiento.

---

# FR-002 ACTORES DEL SISTEMA

---

# FR-002.1 Usuario Anónimo

Corresponde a cualquier visitante que acceda al sitio web sin autenticarse.

---

## Capacidades

El usuario anónimo podrá:

* Navegar el sitio web.
* Consultar categorías.
* Consultar servicios públicos.
* Consultar promociones activas.
* Consultar especialistas.
* Visualizar contenido institucional.
* Utilizar formularios de contacto.
* Contactar mediante WhatsApp.
* Utilizar enlaces de redes sociales.
* Consultar ubicación mediante Google Maps.

---

## Restricciones

El usuario anónimo NO podrá:

* Acceder al panel administrativo.
* Modificar contenido.
* Visualizar servicios ocultos.
* Visualizar promociones archivadas.
* Gestionar especialistas.
* Gestionar formularios.

---

# FR-002.2 Administrador Principal

Corresponde al propietario o responsable autorizado del establecimiento.

---

## Capacidades

El administrador principal podrá:

* Acceder al panel administrativo.
* Crear servicios.
* Editar servicios.
* Eliminar servicios.
* Ocultar servicios.
* Publicar servicios.
* Gestionar promociones.
* Gestionar especialistas.
* Gestionar formularios.
* Gestionar imágenes.
* Consultar contenido archivado.

---

## Restricciones

No existen restricciones funcionales dentro del alcance actual.

El administrador posee control total sobre todos los módulos administrativos contemplados en el MVP.

---

# FR-002.3 Empleado (Preparación Futura)

El sistema deberá contemplar una arquitectura compatible con futuros roles de empleado.

Este actor no será implementado funcionalmente durante el MVP.

---

## Posibles capacidades futuras

* Edición parcial de contenido.
* Gestión limitada de formularios.
* Gestión limitada de servicios.

---

# FR-002.4 Super Administrador (Preparación Futura)

La arquitectura deberá permitir incorporar posteriormente un rol de mayor jerarquía.

No forma parte del MVP.

---

# FR-003 CASOS DE USO GLOBALES

---

# CU-001 Navegar Sitio Web

### Actor

Usuario Anónimo

---

### Objetivo

Explorar la información pública del establecimiento.

---

### Flujo Principal

1. El usuario accede al sitio web.
2. El sistema muestra la página principal.
3. El usuario navega por las distintas secciones.
4. El usuario consulta información.
5. El usuario puede iniciar contacto.

---

### Resultado Esperado

El usuario accede a toda la información pública disponible.

---

# CU-002 Consultar Categoría

### Actor

Usuario Anónimo

---

### Objetivo

Explorar los servicios pertenecientes a una categoría específica.

---

### Flujo Principal

1. El usuario accede a una categoría.
2. El sistema recupera los servicios públicos asociados.
3. El sistema muestra los resultados.
4. El usuario selecciona un servicio.

---

### Resultado Esperado

El usuario puede explorar los servicios disponibles dentro de una categoría.

---

# CU-003 Consultar Servicio

### Actor

Usuario Anónimo

---

### Objetivo

Visualizar información detallada de un tratamiento o servicio.

---

### Flujo Principal

1. El usuario accede a un servicio.
2. El sistema carga la información completa.
3. El usuario revisa detalles.
4. El usuario inicia contacto mediante WhatsApp o formulario.

---

### Resultado Esperado

El usuario obtiene toda la información necesaria para tomar una decisión.

---

# CU-004 Consultar Promoción

### Actor

Usuario Anónimo

---

### Objetivo

Visualizar promociones activas.

---

### Flujo Principal

1. El usuario accede a promociones.
2. El sistema filtra promociones vigentes.
3. El sistema muestra resultados.
4. El usuario inicia contacto.

---

### Resultado Esperado

El usuario puede consultar promociones actualmente disponibles.

---

# CU-005 Enviar Formulario

### Actor

Usuario Anónimo

---

### Objetivo

Solicitar información.

---

### Flujo Principal

1. El usuario completa el formulario.
2. El sistema valida la información.
3. El sistema registra la solicitud.
4. El sistema envía la notificación.
5. El sistema confirma el envío.

---

### Resultado Esperado

La solicitud queda registrada y disponible para el establecimiento.

---

# CU-006 Contactar por WhatsApp

### Actor

Usuario Anónimo

---

### Objetivo

Contactar directamente al establecimiento.

---

### Flujo Principal

1. El usuario pulsa un botón de contacto.
2. El sistema genera un mensaje precargado.
3. WhatsApp se abre automáticamente.
4. El usuario puede modificar el mensaje.
5. El usuario envía la conversación.

---

### Resultado Esperado

El contacto se inicia correctamente.

---

# CU-007 Administrar Servicios

### Actor

Administrador Principal

---

### Objetivo

Gestionar el catálogo de servicios.

---

### Flujo Principal

1. El administrador inicia sesión.
2. Accede al módulo de servicios.
3. Crea, edita, oculta o elimina servicios.
4. Guarda cambios.

---

### Resultado Esperado

Los cambios quedan reflejados en el sistema.

---

# CU-008 Administrar Promociones

### Actor

Administrador Principal

---

### Objetivo

Gestionar promociones activas.

---

### Flujo Principal

1. El administrador accede al módulo.
2. Gestiona promociones.
3. Configura fechas.
4. Guarda cambios.

---

### Resultado Esperado

Las promociones funcionan según las fechas configuradas.

---

# CU-009 Administrar Especialistas

### Actor

Administrador Principal

---

### Objetivo

Gestionar información profesional.

---

### Flujo Principal

1. El administrador accede al módulo.
2. Crea o modifica especialistas.
3. Asocia servicios.
4. Guarda cambios.

---

### Resultado Esperado

La información queda actualizada.

---

# CU-010 Gestionar Formularios

### Actor

Administrador Principal

---

### Objetivo

Administrar solicitudes recibidas.

---

### Flujo Principal

1. El administrador accede al módulo.
2. Consulta formularios pendientes.
3. Marca formularios como leídos.
4. Archiva formularios.

---

### Resultado Esperado

La bandeja de solicitudes permanece organizada.

---

# FR-004 REGLAS DE NEGOCIO GLOBALES

---

# RN-001 Categorías Fijas

Las categorías serán administradas por el sistema.

Las categorías disponibles en el MVP serán:

* Facial.
* Corporal.
* Salud.
* Spa.

El administrador NO podrá:

* Crear categorías.
* Eliminar categorías.

El administrador SÍ podrá:

* Editar información asociada a categorías cuando dicha funcionalidad sea implementada en futuras versiones.

---

# RN-002 Generación Automática de Slugs

Todo servicio deberá generar automáticamente un slug SEO.

Ejemplo:

Nombre:

"Limpieza Facial Profunda"

Slug:

"limpieza-facial-profunda"

El administrador no podrá modificar manualmente el slug.

---

# RN-003 Confirmación de Eliminación

Toda acción destructiva deberá requerir confirmación explícita.

Ejemplos:

* Eliminar servicio.
* Eliminar especialista.
* Eliminar imagen.
* Eliminar promoción.

El sistema deberá solicitar confirmación antes de ejecutar la acción.

---

# RN-004 Conservación de Relaciones

Cuando un especialista sea eliminado:

* Los servicios asociados deberán permanecer.
* Únicamente se eliminará la relación.

No se eliminarán servicios relacionados.

---

# RN-005 Servicios Destacados

Los servicios destacados del Home serán definidos desde administración.

Un servicio podrá marcarse como:

* Destacado.
* No destacado.

El Home mostrará únicamente los servicios marcados como destacados.

---

# RN-006 Múltiples Sesiones

El sistema deberá permitir múltiples sesiones simultáneas para una misma cuenta administrativa.

No existirá limitación de una única sesión activa.

---

# RN-007 Formularios Persistentes

Los formularios enviados deberán almacenarse en la base de datos.

Los formularios archivados:

* No se eliminarán.
* Permanecerán disponibles para recuperación futura.

---

# RN-008 Información Estática

Las siguientes secciones permanecerán fuera del sistema administrativo durante el MVP:

* Hero principal.
* Nosotros.
* Certificaciones.
* Contacto.
* Redes sociales.
* Layouts globales.

Las modificaciones requerirán intervención técnica.

---

# RN-009 Idioma Oficial

Todo el sistema deberá operar exclusivamente en idioma español.

No se contempla internacionalización durante el MVP.

---

# RN-010 Ciudad Objetivo

Toda la estrategia SEO y de posicionamiento deberá estar orientada principalmente a:

Sogamoso, Boyacá, Colombia.

# BLOQUE 2

# REQUISITOS FUNCIONALES DEL SITIO PÚBLICO

---

# FR-100 SITIO WEB PÚBLICO

## FR-100.1 Objetivo

El sitio público deberá permitir a los visitantes:

* Conocer la marca.
* Explorar servicios.
* Consultar promociones.
* Conocer especialistas.
* Contactar al establecimiento.
* Consultar ubicación.
* Iniciar conversaciones comerciales.

El acceso al sitio público no requerirá autenticación.

---

# FR-101 NAVEGACIÓN PRINCIPAL

## FR-101.1 Menú Principal

El sistema deberá mostrar un menú de navegación global accesible desde todas las páginas públicas.

---

## FR-101.2 Opciones de Navegación

Como mínimo deberá incluir:

* Inicio
* Nosotros
* Servicios
* Especialistas
* Promociones
* Contacto

---

## FR-101.3 Comportamiento

Cuando el usuario seleccione una opción:

* El sistema deberá redirigir a la página correspondiente.
* El enlace activo deberá identificarse visualmente.

---

## FR-101.4 Responsive

En dispositivos móviles:

* El menú deberá transformarse en navegación móvil.
* Todas las opciones deberán permanecer accesibles.

---

# FR-102 PÁGINA DE INICIO

## FR-102.1 Objetivo

Presentar la propuesta de valor del establecimiento y dirigir al usuario hacia los servicios o canales de contacto.

---

# FR-102.2 Hero Principal

La página deberá incluir una sección Hero.

---

## Contenido

Deberá permitir mostrar:

* Imagen principal.
* Video opcional.
* Título principal.
* Subtítulo.
* Botón principal.
* Botón secundario.

---

## Acciones

Botón principal:

```text
Agendar Consulta
```

o equivalente definido por el cliente.

---

Botón secundario:

```text
Ver Servicios
```

o equivalente.

---

# FR-102.3 Presentación Institucional

El sistema deberá mostrar una sección descriptiva del establecimiento.

---

## Contenido

* Introducción.
* Filosofía.
* Diferenciadores.

---

# FR-102.4 Categorías Destacadas

El sistema deberá mostrar las categorías principales.

---

## Categorías Iniciales

* Facial.
* Corporal.
* Salud.
* Spa.

---

## Información Mostrada

Cada categoría deberá mostrar:

* Imagen.
* Nombre.
* Descripción.
* Enlace.

---

## Acción

Al seleccionar una categoría:

El sistema deberá redirigir a la página correspondiente.

---

# FR-102.5 Servicios Destacados

El sistema deberá mostrar únicamente servicios marcados como destacados.

---

## Información Mostrada

Cada tarjeta deberá incluir:

* Imagen principal.
* Nombre.
* Descripción resumida.
* Precio (si aplica).
* Indicador promocional.
* Botón de acción.

---

## Regla

Los servicios ocultos nunca podrán aparecer en esta sección.

---

# FR-102.6 Promociones Activas

El sistema deberá mostrar promociones vigentes.

---

## Condiciones

Solo podrán mostrarse promociones:

* Activas.
* Públicas.
* No archivadas.

---

## Información Mostrada

* Imagen.
* Nombre.
* Descripción.
* Precio promocional.
* Fecha de vigencia (opcional).

---

# FR-102.7 Especialistas Destacados

La página podrá mostrar especialistas destacados.

---

## Información Mostrada

* Fotografía.
* Nombre.
* Cargo.
* Especialidad.

---

## Acción

Al seleccionar un especialista:

El sistema deberá redirigir a su ficha completa.

---

# FR-102.8 Instalaciones

El sistema deberá permitir mostrar contenido visual relacionado con:

* Sauna.
* Áreas comunes.
* Consultorios.
* Espacios de relajación.
* Áreas de tratamiento.

---

# FR-102.9 Certificaciones

La página deberá permitir mostrar:

* Certificaciones.
* Licencias.
* Reconocimientos.

---

# FR-102.10 Contacto Rápido

La página deberá mostrar:

* WhatsApp.
* Teléfono.
* Correo.
* Dirección.

---

# FR-103 PÁGINA NOSOTROS

## FR-103.1 Objetivo

Presentar la identidad institucional del establecimiento.

---

## Contenido

La página deberá permitir mostrar:

* Historia.
* Filosofía.
* Misión.
* Visión.
* Valores.
* Diferenciadores.

---

## Administración

El contenido será estático durante el MVP.

---

# FR-104 PÁGINA DE CATEGORÍA

## FR-104.1 Objetivo

Mostrar servicios pertenecientes a una categoría específica.

---

## URL

Ejemplo:

```text
/servicios/facial
```

---

# FR-104.2 Encabezado

Cada categoría deberá mostrar:

* Imagen principal.
* Nombre.
* Descripción.

---

# FR-104.3 Listado de Servicios

El sistema deberá listar servicios asociados a la categoría.

---

## Condiciones

Solo se mostrarán servicios:

* Públicos.
* Activos.

---

## Exclusiones

No se mostrarán:

* Servicios ocultos.
* Servicios eliminados.

---

# FR-104.4 Tarjetas de Servicio

Cada tarjeta deberá mostrar:

* Imagen principal.
* Nombre.
* Resumen.
* Precio.
* Indicador promocional.

---

## Acción

Al seleccionar una tarjeta:

El sistema deberá redirigir a la página del servicio.

---

# FR-105 PÁGINA DE SERVICIO

## FR-105.1 Objetivo

Mostrar información detallada del servicio.

---

## URL

Ejemplo:

```text
/servicios/limpieza-facial-profunda
```

---

# FR-105.2 Información General

El sistema deberá mostrar:

* Nombre.
* Categoría.
* Precio.
* Estado promocional.

---

# FR-105.3 Descripción

El sistema deberá mostrar:

* Descripción.
* Beneficios.
* Servicios incluidos.
* Recomendaciones.
* Contraindicaciones.
* Observaciones.

---

# FR-105.4 Galería

El sistema deberá mostrar la galería asociada.

---

## Límite

Máximo:

```text
15 imágenes
```

por servicio.

---

## Imagen Principal

La imagen marcada como portada deberá mostrarse primero.

---

# FR-105.5 Especialistas Asociados

El sistema deberá mostrar especialistas relacionados.

---

## Información

* Fotografía.
* Nombre.
* Cargo.

---

## Acción

Acceso a ficha profesional.

---

# FR-105.6 WhatsApp

El sistema deberá mostrar un botón de contacto.

---

## Comportamiento

Al pulsarlo:

1. Se abrirá WhatsApp.
2. Se generará mensaje automático.

---

## Ejemplo

```text
Hola, me gustaría recibir información sobre el servicio Limpieza Facial Profunda.
```

---

## Regla

El usuario podrá modificar el mensaje antes de enviarlo.

---

# FR-105.7 Formulario

El sistema deberá permitir iniciar contacto mediante formulario.

---

## Acción

El formulario podrá mostrarse:

* Embebido.
* Modal.
* Sección independiente.

La decisión final dependerá del diseño UX.

---

# FR-106 PÁGINA DE PROMOCIONES

## FR-106.1 Objetivo

Mostrar promociones activas.

---

## Información

Cada promoción deberá mostrar:

* Imagen.
* Nombre.
* Descripción.
* Precio.
* Vigencia.

---

## Condiciones

Solo podrán visualizarse promociones activas.

---

# FR-106.2 Promociones Expiradas

Las promociones expiradas:

* No deberán mostrarse públicamente.
* Permanecerán archivadas internamente.

---

# FR-107 PÁGINA DE ESPECIALISTAS

## FR-107.1 Objetivo

Mostrar el equipo profesional.

---

## Información Mostrada

Cada especialista deberá mostrar:

* Fotografía.
* Nombre.
* Cargo.
* Especialidad.

---

## Acción

Acceso a perfil individual.

---

# FR-108 PERFIL DE ESPECIALISTA

## FR-108.1 Información Profesional

El sistema deberá mostrar:

* Nombre completo.
* Fotografía.
* Cargo.
* Especialidades.
* Descripción.
* Certificaciones.
* Horarios.

---

# FR-108.2 Contacto

El sistema deberá permitir mostrar:

* WhatsApp.
* Redes sociales.

---

# FR-108.3 Servicios Relacionados

El sistema deberá listar servicios asociados.

---

## Acción

Acceso directo a dichos servicios.

---

# FR-109 PÁGINA DE CONTACTO

## FR-109.1 Información General

La página deberá mostrar:

* Dirección.
* Teléfono.
* Correo.
* WhatsApp.
* Horarios.

---

# FR-109.2 Formulario de Contacto

El formulario deberá contener:

### Nombre

Obligatorio.

---

### Teléfono

Obligatorio.

---

### Correo

Obligatorio.

Debe poseer formato válido.

---

### Servicio de Interés

Opcional.

---

### Mensaje

Obligatorio.

---

# FR-109.3 Validación

El sistema deberá impedir envíos con:

* Campos vacíos obligatorios.
* Correos inválidos.

---

# FR-109.4 Confirmación

Al enviarse correctamente:

El sistema deberá mostrar mensaje de éxito.

Ejemplo:

```text
Tu solicitud fue enviada correctamente.
```

---

# FR-110 GOOGLE MAPS

## FR-110.1 Mapa Embebido

La página de contacto deberá incluir Google Maps.

---

## Información

Mostrar ubicación exacta del establecimiento.

---

# FR-110.2 Botón Cómo Llegar

Al pulsarlo:

El sistema deberá abrir Google Maps con la ruta correspondiente.

---

# FR-111 REDES SOCIALES

## FR-111.1 Redes Soportadas

El sistema deberá permitir acceso a:

* Instagram.
* Facebook.
* WhatsApp.

---

## Comportamiento

Al pulsar una red social:

El sistema deberá abrir el perfil correspondiente.

---

# FR-112 MANEJO DE ERRORES

## FR-112.1 Página No Encontrada

Cuando el usuario acceda a una URL inexistente:

El sistema deberá mostrar una página 404.

---

## Contenido

La página deberá incluir:

* Mensaje informativo.
* Acceso al Inicio.
* Acceso a Servicios.

---

# FR-113 RESTRICCIONES DE VISIBILIDAD

## FR-113.1 Servicios Ocultos

Los servicios ocultos:

* No deberán aparecer en búsquedas.
* No deberán aparecer en categorías.
* No deberán aparecer en promociones.
* No deberán aparecer en URLs públicas.

---

# FR-113.2 Promociones Archivadas

Las promociones archivadas:

* No deberán ser visibles públicamente.
* No deberán aparecer en listados.
* No deberán ser indexables.

---

# FR-113.3 Contenido Eliminado

Todo contenido eliminado deberá quedar inaccesible desde el sitio público.

# BLOQUE 3

# REQUISITOS FUNCIONALES DEL PANEL ADMINISTRATIVO

---

# FR-200 PANEL ADMINISTRATIVO

## FR-200.1 Objetivo

El panel administrativo deberá permitir la gestión integral de los contenidos dinámicos del sitio web sin requerir conocimientos técnicos por parte del administrador.

---

## FR-200.2 Acceso

El acceso al panel administrativo requerirá autenticación.

Los usuarios no autenticados no podrán acceder a funcionalidades administrativas.

---

## FR-200.3 Alcance del MVP

El panel administrativo deberá permitir gestionar:

* Servicios.
* Promociones.
* Especialistas.
* Formularios.
* Imágenes.

---

## FR-200.4 Exclusiones del MVP

No serán administrables durante esta versión:

* Hero principal.
* Página Nosotros.
* Certificaciones.
* Información de contacto.
* Redes sociales.
* Layouts.
* Menús globales.

---

# FR-201 AUTENTICACIÓN

## FR-201.1 Inicio de Sesión

El sistema deberá proporcionar una pantalla de inicio de sesión.

---

## Campos

### Correo electrónico

Obligatorio.

---

### Contraseña

Obligatoria.

---

## Acción

Botón:

```text
Iniciar Sesión
```

---

# FR-201.2 Validación

El sistema deberá validar:

* Existencia del usuario.
* Contraseña correcta.
* Permisos válidos.

---

## Resultado Exitoso

El usuario será redirigido al dashboard principal.

---

## Resultado Fallido

El sistema mostrará un mensaje de error.

Ejemplo:

```text
Credenciales incorrectas.
```

---

# FR-201.3 Sesiones Simultáneas

El sistema deberá permitir múltiples sesiones activas para una misma cuenta.

---

## Ejemplos

Un administrador podrá utilizar simultáneamente:

* Computador.
* Teléfono móvil.
* Tablet.

---

# FR-201.4 Recuperación de Contraseña

No forma parte obligatoria del MVP.

La arquitectura deberá permitir incorporarla posteriormente.

---

# FR-202 DASHBOARD PRINCIPAL

## FR-202.1 Objetivo

Centralizar el acceso a todos los módulos administrativos.

---

# FR-202.2 Información General

El dashboard deberá mostrar como mínimo:

### Total Servicios

Cantidad de servicios registrados.

---

### Total Promociones

Cantidad de promociones activas.

---

### Total Especialistas

Cantidad de especialistas registrados.

---

### Formularios Pendientes

Cantidad de formularios sin revisar.

---

# FR-202.3 Accesos Rápidos

El dashboard deberá incluir accesos directos a:

* Servicios.
* Promociones.
* Especialistas.
* Formularios.

---

# FR-202.4 Notificaciones

El sistema deberá mostrar indicadores visuales cuando existan formularios pendientes.

Ejemplo:

```text
3 formularios pendientes
```

---

# FR-203 GESTIÓN DE SERVICIOS

## FR-203.1 Objetivo

Permitir administrar completamente el catálogo de servicios.

---

# FR-203.2 Listado de Servicios

El sistema deberá mostrar una tabla o listado con:

* Imagen principal.
* Nombre.
* Categoría.
* Precio.
* Estado.
* Destacado.
* Fecha de creación.

---

## Acciones Disponibles

* Ver.
* Editar.
* Ocultar.
* Publicar.
* Eliminar.

---

# FR-203.3 Crear Servicio

El administrador podrá crear nuevos servicios.

---

## Campos

### Nombre

Obligatorio.

---

### Categoría

Obligatoria.

Opciones disponibles:

* Facial.
* Corporal.
* Salud.
* Spa.

---

### Descripción

Obligatoria.

---

### Beneficios

Opcional.

---

### Servicios Incluidos

Opcional.

---

### Recomendaciones

Opcional.

---

### Contraindicaciones

Opcional.

---

### Observaciones

Opcional.

---

### Precio

Opcional.

---

### Destacado

Booleano.

Valores:

* Sí.
* No.

---

### Visible

Booleano.

Valores:

* Público.
* Oculto.

---

### Promocional

Booleano.

Valores:

* Sí.
* No.

---

### Fecha Inicio Promoción

Obligatoria únicamente si el servicio es promocional.

---

### Fecha Fin Promoción

Obligatoria únicamente si el servicio es promocional.

---

# FR-203.4 Slug SEO

El sistema deberá generar automáticamente el slug.

---

## Ejemplo

Nombre:

```text
Limpieza Facial Profunda
```

---

Slug:

```text
limpieza-facial-profunda
```

---

## Restricción

El administrador no podrá modificar manualmente el slug.

---

# FR-203.5 Edición de Servicio

El administrador podrá modificar cualquier dato del servicio.

---

## Resultado

Los cambios deberán reflejarse inmediatamente en el sitio público.

---

# FR-203.6 Ocultar Servicio

El administrador podrá ocultar un servicio.

---

## Comportamiento

El servicio:

* Desaparece del sitio público.
* Permanece en administración.

---

# FR-203.7 Publicar Servicio

Un servicio oculto podrá volver a publicarse.

---

## Resultado

Volverá a aparecer en el sitio público.

---

# FR-203.8 Eliminar Servicio

El administrador podrá eliminar servicios.

---

## Confirmación

Antes de eliminar:

```text
¿Está seguro de eliminar este servicio?
```

---

## Segunda Confirmación Recomendada

```text
Esta acción no puede deshacerse.
```

---

## Resultado

Se eliminarán:

* Servicio.
* Imágenes asociadas.

---

# FR-203.9 Servicios Destacados

El administrador podrá marcar servicios como destacados.

---

## Resultado

Los servicios destacados podrán aparecer en la página principal.

---

# FR-203.10 Promociones

El administrador podrá convertir un servicio en promoción.

---

## Condición

El sistema solicitará:

* Fecha inicio.
* Fecha finalización.

---

# FR-203.11 Expiración Automática

Cuando una promoción alcance su fecha final:

El sistema deberá archivarla automáticamente.

---

## Resultado

La promoción:

* Deja de mostrarse públicamente.
* Permanece almacenada.

---

# FR-204 GESTIÓN DE PROMOCIONES

## FR-204.1 Naturaleza

Las promociones serán servicios promocionales.

No existirá una entidad independiente.

---

# FR-204.2 Listado

El sistema deberá permitir visualizar:

* Promociones activas.
* Promociones futuras.
* Promociones archivadas.

---

# FR-204.3 Filtros

El administrador podrá filtrar por:

* Activas.
* Expiradas.
* Ocultas.

---

# FR-205 GESTIÓN DE ESPECIALISTAS

## FR-205.1 Objetivo

Administrar el equipo profesional del establecimiento.

---

# FR-205.2 Listado

El sistema deberá mostrar:

* Fotografía.
* Nombre.
* Cargo.
* Estado.

---

# FR-205.3 Crear Especialista

El administrador podrá registrar especialistas.

---

## Campos

### Fotografía

Obligatoria.

---

### Nombre Completo

Obligatorio.

---

### Cargo

Obligatorio.

---

### Especialidades

Opcional.

---

### Descripción Profesional

Opcional.

---

### Certificaciones

Opcional.

---

### Horarios

Opcional.

---

### WhatsApp

Opcional.

---

### Redes Sociales

Opcional.

---

### Servicios Asociados

Opcional.

Selección múltiple.

---

# FR-205.4 Asociación de Servicios

Un especialista podrá estar asociado a múltiples servicios.

---

## Ejemplo

Especialista:

```text
María Pérez
```

---

Servicios:

```text
Limpieza Facial
Microneedling
Radiofrecuencia
```

---

# FR-205.5 Eliminación de Especialistas

Al eliminar un especialista:

* Los servicios permanecerán.
* Solo se eliminará la relación.

---

# FR-205.6 Ocultar Especialista

El administrador podrá ocultar especialistas.

---

## Resultado

No aparecerán públicamente.

---

# FR-206 GESTIÓN DE FORMULARIOS

## FR-206.1 Objetivo

Administrar las solicitudes recibidas desde el sitio web.

---

# FR-206.2 Recepción

Cada formulario enviado deberá:

* Guardarse en la base de datos.
* Enviarse al correo configurado.

---

# FR-206.3 Información Almacenada

### Nombre

---

### Teléfono

---

### Correo

---

### Servicio de Interés

---

### Mensaje

---

### Fecha de Registro

---

### Estado

Valores:

* Pendiente.
* Leído.
* Archivado.

---

# FR-206.4 Listado

El administrador deberá visualizar todos los formularios recibidos.

---

# FR-206.5 Formularios Pendientes

Los formularios nuevos deberán aparecer como:

```text
Pendiente
```

---

# FR-206.6 Marcar como Leído

El administrador podrá marcar solicitudes como leídas.

---

## Resultado

Desaparecerán de los pendientes.

---

# FR-206.7 Archivar

El administrador podrá archivar formularios.

---

## Resultado

Permanecerán almacenados.

No serán visibles en la bandeja principal.

---

# FR-206.8 Recuperación

El administrador podrá consultar formularios archivados.

---

# FR-207 GESTIÓN DE IMÁGENES

## FR-207.1 Objetivo

Permitir administrar galerías asociadas a servicios y especialistas.

---

# FR-207.2 Formatos Permitidos

El sistema deberá aceptar:

* JPG
* JPEG
* PNG
* WEBP

---

## Formatos Futuros

La arquitectura deberá permitir incorporar formatos adicionales.

---

# FR-207.3 Tamaño Máximo

Cada archivo podrá tener un tamaño máximo de:

```text
15 MB
```

---

# FR-207.4 Carga de Imágenes

El administrador podrá subir múltiples imágenes.

---

## Límite

Máximo:

```text
15 imágenes
```

por servicio.

---

# FR-207.5 Edición de Imágenes

El administrador deberá poder:

* Recortar.
* Reemplazar.
* Eliminar.
* Reordenar.
* Seleccionar portada.

---

# FR-207.6 Imagen de Portada

Una imagen podrá marcarse como:

```text
Portada
```

---

## Resultado

Será la primera imagen mostrada públicamente.

---

# FR-207.7 Eliminación

El sistema deberá solicitar confirmación antes de eliminar una imagen.

---

# FR-207.8 Eliminación de Servicio

Cuando un servicio sea eliminado:

Todas sus imágenes deberán eliminarse automáticamente.

---

# FR-208 ROLES Y PERMISOS

## FR-208.1 Rol Implementado en MVP

### Administrador Principal

Acceso total al sistema.

---

# FR-208.2 Roles Futuros

La arquitectura deberá soportar:

### Empleado

Permisos limitados.

---

### Super Administrador

Control completo de la plataforma.

---

# FR-208.3 Restricción de Acceso

Todo módulo administrativo deberá validar permisos antes de permitir acceso.

---

# FR-209 REGISTRO DE ESTADOS

## FR-209.1 Estados de Servicio

Un servicio podrá encontrarse en:

* Público.
* Oculto.
* Promocional.
* Archivado.

---

# FR-209.2 Estados de Formulario

Un formulario podrá encontrarse en:

* Pendiente.
* Leído.
* Archivado.

---

# FR-209.3 Estados de Especialista

Un especialista podrá encontrarse en:

* Visible.
* Oculto.

---

# FR-210 RESTRICCIONES GENERALES

## FR-210.1 Confirmaciones Obligatorias

Toda acción destructiva deberá requerir confirmación explícita.

---

## FR-210.2 Persistencia

Toda información administrativa deberá almacenarse permanentemente en la base de datos.

---

## FR-210.3 Integridad

La eliminación de una entidad no deberá provocar inconsistencias en otras entidades relacionadas.

---

## FR-210.4 Tiempo Real

Los cambios administrativos deberán reflejarse inmediatamente en el sitio público una vez guardados.

---

## FR-210.5 Idioma

Todo el panel administrativo deberá operar exclusivamente en idioma español.

# BLOQUE 4

# REGLAS DE NEGOCIO AVANZADAS, VALIDACIONES, FLUJOS OPERATIVOS, ESTADOS Y AUTOMATIZACIONES

---

# FR-300 OBJETIVO

## FR-300.1 Propósito

Este bloque define el comportamiento interno del sistema, las validaciones obligatorias, las restricciones operativas, los estados de cada entidad y las automatizaciones que deberán ejecutarse sin intervención manual.

Estas reglas prevalecen sobre cualquier comportamiento implícito no documentado.

---

# FR-301 REGLAS GENERALES DEL SISTEMA

## RN-301.1 Integridad de Datos

El sistema deberá garantizar la consistencia de la información almacenada.

No podrán existir registros huérfanos o relaciones inválidas.

---

## RN-301.2 Persistencia

Toda información creada desde el panel administrativo deberá almacenarse de forma permanente en la base de datos.

---

## RN-301.3 Eliminación Definitiva

Las entidades eliminadas no deberán permanecer visibles públicamente.

---

## RN-301.4 Acceso Administrativo

Toda funcionalidad administrativa deberá requerir autenticación previa.

---

## RN-301.5 Idioma

Todo el sistema deberá operar exclusivamente en español.

---

# FR-302 REGLAS DE SERVICIOS

## RN-302.1 Nombre Obligatorio

Todo servicio deberá poseer un nombre.

---

## Validación

No podrá guardarse un servicio sin nombre.

---

## Mensaje de Error

```text
El nombre del servicio es obligatorio.
```

---

# RN-302.2 Categoría Obligatoria

Todo servicio deberá pertenecer a una categoría.

---

## Categorías Disponibles

* Facial
* Corporal
* Salud
* Spa

---

## Restricción

No podrán existir servicios sin categoría.

---

# RN-302.3 Slug Automático

El sistema deberá generar automáticamente el slug SEO.

---

## Ejemplo

Nombre:

```text
Limpieza Facial Profunda
```

---

Slug:

```text
limpieza-facial-profunda
```

---

## Restricción

El administrador no podrá editar manualmente el slug.

---

# RN-302.4 Slugs Duplicados

El sistema deberá garantizar unicidad.

---

## Ejemplo

Si existe:

```text
limpieza-facial-profunda
```

El siguiente podrá generarse como:

```text
limpieza-facial-profunda-2
```

---

# RN-302.5 Estado Inicial

Todo servicio nuevo deberá crearse como:

```text
Visible
```

salvo que el administrador indique lo contrario.

---

# RN-302.6 Servicios Ocultos

Los servicios ocultos:

* No aparecerán en el sitio público.
* No aparecerán en categorías.
* No aparecerán en destacados.
* No aparecerán en promociones.
* No serán indexables.

---

# RN-302.7 Servicios Destacados

Los servicios destacados serán seleccionados manualmente por el administrador.

---

## Restricción

Solo podrán mostrarse servicios:

* Públicos.
* Activos.

---

# RN-302.8 Eliminación de Servicios

Antes de eliminar un servicio:

El sistema deberá solicitar confirmación.

---

## Confirmación 1

```text
¿Desea eliminar este servicio?
```

---

## Confirmación 2

```text
Esta acción no puede deshacerse.
```

---

# RN-302.9 Eliminación de Recursos Asociados

Cuando un servicio sea eliminado:

También deberán eliminarse:

* Imágenes asociadas.
* Relaciones asociadas.

---

## Conservación

No deberán eliminarse especialistas.

---

# FR-303 REGLAS DE PROMOCIONES

## RN-303.1 Naturaleza

Las promociones serán servicios marcados como promocionales.

---

## RN-303.2 Fechas Obligatorias

Toda promoción deberá poseer:

* Fecha inicio.
* Fecha finalización.

---

## Restricción

No podrá publicarse una promoción sin ambas fechas.

---

# RN-303.3 Validación de Fechas

La fecha final deberá ser posterior a la fecha inicial.

---

## Mensaje de Error

```text
La fecha final debe ser posterior a la fecha inicial.
```

---

# RN-303.4 Activación

Una promoción se considerará activa cuando:

```text
Fecha actual >= Fecha inicio
```

y

```text
Fecha actual <= Fecha fin
```

---

# RN-303.5 Expiración Automática

Cuando la fecha actual supere la fecha final:

La promoción deberá archivarse automáticamente.

---

## Resultado

La promoción:

* Deja de mostrarse públicamente.
* Permanece almacenada.
* Permanece recuperable.

---

# RN-303.6 Promociones Archivadas

Las promociones archivadas:

* No serán visibles públicamente.
* No serán indexables.
* No aparecerán en búsquedas.

---

# FR-304 REGLAS DE ESPECIALISTAS

## RN-304.1 Nombre Obligatorio

Todo especialista deberá tener nombre.

---

# RN-304.2 Fotografía Obligatoria

Todo especialista deberá poseer fotografía.

---

# RN-304.3 Cargo Obligatorio

Todo especialista deberá poseer cargo profesional.

---

# RN-304.4 Asociación de Servicios

Un especialista podrá asociarse a múltiples servicios.

---

## Relación

```text
Especialista 1
 ├─ Servicio A
 ├─ Servicio B
 └─ Servicio C
```

---

# RN-304.5 Eliminación de Especialistas

La eliminación de un especialista:

No deberá afectar los servicios asociados.

---

## Resultado

Únicamente se eliminarán las relaciones.

---

# RN-304.6 Ocultamiento

Un especialista oculto:

* No aparecerá públicamente.
* Permanecerá disponible en administración.

---

# FR-305 REGLAS DE FORMULARIOS

## RN-305.1 Registro Obligatorio

Todo formulario enviado deberá registrarse en la base de datos.

---

# RN-305.2 Envío de Correo

Todo formulario enviado deberá generar una notificación por correo.

---

## Destinatario

Correo configurado para el establecimiento.

---

# RN-305.3 Estado Inicial

Todo formulario nuevo deberá registrarse como:

```text
Pendiente
```

---

# RN-305.4 Notificación Administrativa

El sistema deberá incrementar automáticamente el contador de pendientes.

---

## Ejemplo

```text
5 formularios pendientes
```

---

# RN-305.5 Cambio a Leído

Un administrador podrá marcar formularios como leídos.

---

## Resultado

Dejarán de aparecer como pendientes.

---

# RN-305.6 Archivado

Un formulario archivado:

* Permanecerá almacenado.
* No aparecerá en pendientes.
* Podrá recuperarse posteriormente.

---

# RN-305.7 Eliminación

Los formularios no deberán eliminarse automáticamente.

---

## Justificación

Mantener historial comercial.

---

# FR-306 REGLAS DE IMÁGENES

## RN-306.1 Formatos Permitidos

Se permitirán:

* JPG
* JPEG
* PNG
* WEBP

---

# RN-306.2 Tamaño Máximo

Máximo permitido:

```text
15 MB
```

por archivo.

---

# RN-306.3 Límite por Servicio

Máximo:

```text
15 imágenes
```

por servicio.

---

# RN-306.4 Imagen Principal

Una imagen podrá marcarse como portada.

---

## Restricción

Solo podrá existir una portada por entidad.

---

# RN-306.5 Cambio de Portada

Cuando una nueva imagen se marque como portada:

La portada anterior perderá automáticamente dicho estado.

---

# RN-306.6 Ordenamiento

Las imágenes deberán poder reordenarse.

---

## Resultado

El orden definido por administración será respetado públicamente.

---

# RN-306.7 Recorte

El sistema deberá permitir recortar imágenes antes de guardar.

---

# RN-306.8 Eliminación

Toda eliminación deberá requerir confirmación.

---

# FR-307 VALIDACIONES DE FORMULARIOS

## RN-307.1 Nombre

Obligatorio.

---

## Longitud

Mínimo:

```text
2 caracteres
```

---

# RN-307.2 Teléfono

Obligatorio.

---

## Validación

Solo caracteres válidos para números telefónicos.

---

# RN-307.3 Correo

Obligatorio.

---

## Validación

Formato válido.

---

## Ejemplo válido

```text
usuario@dominio.com
```

---

# RN-307.4 Mensaje

Obligatorio.

---

## Longitud mínima recomendada

```text
10 caracteres
```

---

# RN-307.5 Prevención de Envíos Vacíos

El sistema deberá bloquear formularios incompletos.

---

# FR-308 VALIDACIONES DE AUTENTICACIÓN

## RN-308.1 Credenciales

Todo acceso deberá validar:

* Correo.
* Contraseña.

---

# RN-308.2 Sesión

Una sesión válida deberá mantenerse activa hasta:

* Cierre manual.
* Expiración configurada.

---

# RN-308.3 Sesiones Simultáneas

Se permitirán múltiples sesiones activas.

---

# FR-309 ESTADOS DEL SISTEMA

## RN-309.1 Estados de Servicio

Valores permitidos:

```text
Visible
Oculto
Promocional
Archivado
```

---

# RN-309.2 Estados de Especialista

Valores permitidos:

```text
Visible
Oculto
```

---

# RN-309.3 Estados de Formularios

Valores permitidos:

```text
Pendiente
Leído
Archivado
```

---

# RN-309.4 Estados de Imágenes

Valores permitidos:

```text
Activa
Eliminada
```

---

# FR-310 AUTOMATIZACIONES

## RN-310.1 Generación de Slug

Al crear un servicio:

El sistema deberá generar automáticamente el slug.

---

# RN-310.2 Actualización de Destacados

Cuando un servicio sea marcado como destacado:

Podrá aparecer automáticamente en el Home.

---

# RN-310.3 Archivado Automático de Promociones

Las promociones vencidas deberán archivarse automáticamente.

---

# RN-310.4 Contador de Formularios

La llegada de nuevos formularios deberá actualizar automáticamente el contador administrativo.

---

# RN-310.5 Actualización Pública

Todo cambio administrativo deberá reflejarse inmediatamente en el sitio público después de guardar.

---

# FR-311 RESTRICCIONES DE VISIBILIDAD

## RN-311.1 Usuarios Anónimos

Solo podrán visualizar contenido público.

---

# RN-311.2 Contenido Oculto

El contenido oculto nunca deberá ser accesible desde:

* Home.
* Categorías.
* URLs públicas.
* Resultados internos.

---

# RN-311.3 Acceso Directo por URL

Si un usuario intenta acceder manualmente a un contenido oculto:

El sistema deberá responder con:

```text
404 - No Encontrado
```

o comportamiento equivalente.

---

# FR-312 REGLAS DE ESCALABILIDAD FUTURA

## RN-312.1 Categorías

La arquitectura deberá permitir agregar nuevas categorías en futuras versiones.

---

# RN-312.2 Roles

La arquitectura deberá soportar:

* Administrador.
* Empleado.
* Super Administrador.

---

# RN-312.3 Blog

La arquitectura deberá permitir incorporar un módulo de blog sin rediseñar la estructura existente.

---

# RN-312.4 Sistema de Reservas

La arquitectura deberá permitir futuras integraciones con:

* Calendarios.
* Reservas.
* Confirmaciones automáticas.

---

# RN-312.5 Estadísticas

La arquitectura deberá permitir incorporar analíticas y reportes sin afectar los módulos existentes.

---

# FR-313 CRITERIOS GENERALES DE CONSISTENCIA

## RN-313.1 Datos Públicos

Todo dato visible públicamente deberá provenir del panel administrativo o de configuraciones estáticas definidas durante el desarrollo.

---

## RN-313.2 Comportamiento Determinista

Una misma acción deberá producir siempre el mismo resultado bajo las mismas condiciones.

---

## RN-313.3 Prevención de Inconsistencias

El sistema deberá impedir estados inválidos o relaciones incompletas que puedan comprometer la integridad de la plataforma.

# BLOQUE 5

# CASOS DE USO DETALLADOS, MATRIZ DE REQUISITOS, CRITERIOS DE ACEPTACIÓN, ESCENARIOS DE PRUEBA Y TRAZABILIDAD

---

# FR-400 OBJETIVO

## FR-400.1 Propósito

Este bloque define los criterios finales que permitirán determinar si el sistema cumple los requisitos funcionales establecidos.

Asimismo, establece los casos de uso detallados, escenarios de validación y criterios de aceptación necesarios para la entrega formal del proyecto.

---

# FR-401 CASOS DE USO DETALLADOS

---

# CU-401 CREAR SERVICIO

## Actor

Administrador Principal

---

## Objetivo

Registrar un nuevo servicio dentro del catálogo.

---

## Precondiciones

* El administrador debe estar autenticado.
* Debe poseer permisos válidos.

---

## Flujo Principal

1. El administrador accede al módulo Servicios.
2. Selecciona "Crear Servicio".
3. Completa los campos requeridos.
4. Guarda el formulario.
5. El sistema valida la información.
6. El sistema genera el slug automáticamente.
7. El sistema almacena el servicio.
8. El sistema confirma la operación.

---

## Resultado Esperado

El servicio queda disponible según su configuración de visibilidad.

---

## Flujo Alternativo

### Datos incompletos

El sistema impide guardar.

---

### Categoría no seleccionada

El sistema impide guardar.

---

### Nombre vacío

El sistema impide guardar.

---

# CU-402 EDITAR SERVICIO

## Actor

Administrador Principal

---

## Objetivo

Modificar información existente.

---

## Flujo Principal

1. Accede al listado.
2. Selecciona Editar.
3. Modifica información.
4. Guarda cambios.
5. El sistema actualiza registros.

---

## Resultado

Los cambios se reflejan inmediatamente.

---

# CU-403 OCULTAR SERVICIO

## Actor

Administrador Principal

---

## Objetivo

Retirar temporalmente un servicio del sitio público.

---

## Flujo Principal

1. Selecciona servicio.
2. Cambia estado a Oculto.
3. Guarda cambios.

---

## Resultado

El servicio desaparece del sitio público.

---

# CU-404 ELIMINAR SERVICIO

## Actor

Administrador Principal

---

## Objetivo

Eliminar un servicio permanentemente.

---

## Flujo Principal

1. Selecciona Eliminar.
2. Confirma eliminación.
3. Confirma nuevamente.
4. El sistema elimina registros.

---

## Resultado

Se eliminan:

* Servicio.
* Imágenes asociadas.
* Relaciones asociadas.

---

## Restricción

Los especialistas permanecen.

---

# CU-405 CREAR PROMOCIÓN

## Actor

Administrador Principal

---

## Objetivo

Publicar una promoción temporal.

---

## Flujo Principal

1. Crea o edita un servicio.
2. Activa indicador promocional.
3. Define fecha inicio.
4. Define fecha finalización.
5. Guarda cambios.

---

## Resultado

El servicio se comporta como promoción.

---

# CU-406 CREAR ESPECIALISTA

## Actor

Administrador Principal

---

## Objetivo

Registrar un especialista.

---

## Flujo Principal

1. Accede al módulo.
2. Selecciona Crear.
3. Completa información.
4. Asocia servicios.
5. Guarda.

---

## Resultado

El especialista queda visible públicamente.

---

# CU-407 ELIMINAR ESPECIALISTA

## Actor

Administrador Principal

---

## Flujo Principal

1. Selecciona especialista.
2. Confirma eliminación.
3. El sistema elimina registro.

---

## Resultado

Los servicios asociados permanecen.

---

# CU-408 RECIBIR FORMULARIO

## Actor

Usuario Anónimo

---

## Objetivo

Enviar una solicitud de contacto.

---

## Flujo Principal

1. Completa formulario.
2. Envía información.
3. El sistema valida.
4. El sistema registra.
5. El sistema notifica.

---

## Resultado

Formulario almacenado correctamente.

---

# CU-409 GESTIONAR FORMULARIO

## Actor

Administrador Principal

---

## Flujo Principal

1. Accede a formularios.
2. Consulta pendientes.
3. Marca como leído.
4. Archiva si corresponde.

---

## Resultado

La bandeja permanece organizada.

---

# CU-410 GESTIONAR IMÁGENES

## Actor

Administrador Principal

---

## Flujo Principal

1. Selecciona servicio.
2. Carga imágenes.
3. Reordena.
4. Selecciona portada.
5. Guarda.

---

## Resultado

Las imágenes quedan disponibles públicamente.

---

# FR-402 MATRIZ DE REQUISITOS FUNCIONALES

| Código | Requisito                     | Prioridad |
| ------ | ----------------------------- | --------- |
| FR-101 | Navegación pública            | Alta      |
| FR-102 | Página Inicio                 | Alta      |
| FR-103 | Página Nosotros               | Media     |
| FR-104 | Categorías                    | Alta      |
| FR-105 | Servicios                     | Alta      |
| FR-106 | Promociones                   | Alta      |
| FR-107 | Especialistas                 | Alta      |
| FR-109 | Contacto                      | Alta      |
| FR-110 | Google Maps                   | Alta      |
| FR-201 | Autenticación                 | Alta      |
| FR-202 | Dashboard                     | Alta      |
| FR-203 | CRUD Servicios                | Crítica   |
| FR-204 | Gestión Promociones           | Alta      |
| FR-205 | CRUD Especialistas            | Alta      |
| FR-206 | Formularios                   | Crítica   |
| FR-207 | Gestión Imágenes              | Alta      |
| FR-208 | Roles                         | Media     |
| FR-210 | Restricciones Administrativas | Alta      |
| FR-300 | Reglas de Negocio             | Crítica   |

---

# FR-403 CRITERIOS DE ACEPTACIÓN FUNCIONALES

---

# CA-001 Página Pública

Se considerará aceptada cuando:

* Sea accesible.
* Sea navegable.
* Sea responsive.
* No presente errores funcionales.

---

# CA-002 Servicios

Se considerará aceptado cuando:

* Se puedan crear.
* Se puedan editar.
* Se puedan ocultar.
* Se puedan eliminar.
* Se visualicen correctamente.

---

# CA-003 Promociones

Se considerará aceptado cuando:

* Puedan activarse.
* Puedan archivarse automáticamente.
* Se oculten al expirar.

---

# CA-004 Especialistas

Se considerará aceptado cuando:

* Puedan crearse.
* Puedan editarse.
* Puedan eliminarse.
* Se relacionen con servicios.

---

# CA-005 Formularios

Se considerará aceptado cuando:

* Registren información.
* Generen notificaciones.
* Permitan archivado.

---

# CA-006 Imágenes

Se considerará aceptado cuando:

* Puedan cargarse.
* Puedan eliminarse.
* Puedan recortarse.
* Puedan reordenarse.

---

# CA-007 SEO

Se considerará aceptado cuando:

* Existan slugs amigables.
* Existan metadatos básicos.
* Existan páginas indexables.

---

# CA-008 Responsive

Se considerará aceptado cuando:

* Funcione correctamente en móvil.
* Funcione correctamente en tablet.
* Funcione correctamente en escritorio.

---

# FR-404 ESCENARIOS DE PRUEBA (QA)

---

# QA-001 Crear Servicio

### Dado

Administrador autenticado.

### Cuando

Crea un servicio válido.

### Entonces

El sistema lo almacena correctamente.

---

# QA-002 Crear Servicio Inválido

### Dado

Administrador autenticado.

### Cuando

No proporciona nombre.

### Entonces

El sistema rechaza el registro.

---

# QA-003 Ocultar Servicio

### Dado

Servicio visible.

### Cuando

Administrador lo oculta.

### Entonces

Desaparece públicamente.

---

# QA-004 Promoción Expirada

### Dado

Promoción activa.

### Cuando

La fecha finaliza.

### Entonces

El sistema la archiva automáticamente.

---

# QA-005 Formulario

### Dado

Usuario público.

### Cuando

Envía formulario válido.

### Entonces

Se registra correctamente.

---

# QA-006 Formulario Inválido

### Dado

Usuario público.

### Cuando

Correo inválido.

### Entonces

El sistema bloquea el envío.

---

# QA-007 Especialista

### Dado

Especialista asociado a servicios.

### Cuando

Se elimina.

### Entonces

Los servicios permanecen.

---

# QA-008 Imagen de Portada

### Dado

Varias imágenes.

### Cuando

Se selecciona nueva portada.

### Entonces

Solo una imagen conserva dicho estado.

---

# QA-009 URL Oculta

### Dado

Servicio oculto.

### Cuando

Usuario intenta acceder.

### Entonces

Recibe error 404.

---

# QA-010 Sesiones Simultáneas

### Dado

Administrador autenticado.

### Cuando

Inicia sesión desde varios dispositivos.

### Entonces

Todas las sesiones funcionan correctamente.

---

# FR-405 CRITERIOS DE ENTREGA

El proyecto se considerará funcionalmente terminado cuando:

---

## Sitio Público

Se encuentren implementadas:

* Página Inicio.
* Página Nosotros.
* Categorías.
* Servicios.
* Promociones.
* Especialistas.
* Contacto.

---

## Panel Administrativo

Se encuentren implementados:

* Login.
* Dashboard.
* CRUD Servicios.
* CRUD Especialistas.
* Gestión Formularios.
* Gestión Imágenes.

---

## Funcionalidades

Se encuentren operativas:

* WhatsApp.
* Formularios.
* Google Maps.
* SEO básico.
* Slugs automáticos.
* Promociones automáticas.

---

## Infraestructura

Se encuentre completado:

* Despliegue en producción.
* Dominio configurado.
* Hosting configurado.
* SSL activo.

---

# FR-406 EXCLUSIONES DE ACEPTACIÓN

No forman parte de la aceptación del MVP:

* Sistema de reservas.
* Pagos online.
* Calendario de citas.
* Google Analytics.
* Meta Pixel.
* Blog.
* Multiidioma.
* Gestión avanzada de empleados.
* Historial de cambios.
* Auditoría administrativa.
* CRM.
* Automatizaciones de marketing.
* Recordatorios automáticos.
* Integraciones médicas externas.

---

# FR-407 TRAZABILIDAD

Cada requisito funcional definido en este documento deberá poder relacionarse con:

* Diseño UX/UI.
* Implementación técnica.
* Casos de prueba.
* Validación QA.
* Aceptación del cliente.

---

# FR-408 APROBACIÓN DEL DOCUMENTO

La aprobación de este documento implica la aceptación formal del alcance funcional del MVP.

Cualquier funcionalidad no contemplada explícitamente dentro de este FRD será considerada:

```text
Nueva funcionalidad
Cambio de alcance
Nueva fase del proyecto
```

y deberá ser estimada, aprobada y presupuestada de forma independiente.

---

# FIN DEL DOCUMENTO DE REQUISITOS FUNCIONALES (FRD)

Versión: 1.0

Proyecto:
Lago Spa · Estética · Salud

Ubicación objetivo:
Sogamoso, Boyacá, Colombia

Idioma:
Español

Estado:
Aprobado para Diseño Técnico y Desarrollo
