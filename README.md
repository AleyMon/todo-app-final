# Gestor de Tareas - Vue 3 + Pinia + Supabase

Aplicación web para gestionar tareas personales con autenticación. Permite crear, editar, completar y eliminar tareas. Los datos se guardan en Supabase y el estado global se maneja con Pinia.

---

## Características

- Registro e inicio de sesión de usuario (con Supabase Auth)
- Crear tareas con título, descripción y fecha límite
- Editar tareas existentes
- Marcar tareas como completadas o pendientes, favoritas
- Eliminar tareas
- Interfaz responsive y amigable
- Manejo de sesión y autenticación

---

## Tecnologías

- **Vue 3** con Composition API
- **Pinia** para manejo de estado global
- **Vue Router** para navegación con protección de rutas
- **Supabase** para autenticación y base de datos
- **Vite** como entorno de desarrollo

---

## Estructura del Proyecto

├── package.json # Configuración de dependencias y scripts del proyecto
├── package-lock.json # Registro exacto de versiones instaladas
├── public # Archivos estáticos públicos (favicon, etc.)
├── README.md # Documentación del proyecto
├── vite.config.js # Configuración de Vite (alias, plugins, etc.)

├── src
│ ├── main.js # Punto de entrada de la app: inicializa Vue, Pinia y Vue Router

│ ├── api
│ │ └── supabase
│ │ ├── index.js # Inicializa el cliente de Supabase
│ │ └── tasksApi.js # Funciones CRUD para interactuar con la tabla de tareas

│ ├── assets
│ │ ├── imagenes
│ │ │ ├── logo.svg
│ │ │ └── luis-villasmil-mlVbMbxfWI4-unsplash.jpg
│ │ └── main.css # Estilos globales

│ ├── components
│ │ ├── AuthFormBase.vue # (Nuevo) Formulario base reutilizable para login y registro
│ │ ├── BaseButton.vue # Botón estilizado base
│ │ ├── FooterBar.vue # Pie de página de la aplicación
│ │ ├── LoadingSpinner.vue # Indicador de carga animado
│ │ ├── LogoutButton.vue # Botón para cerrar sesión
│ │ ├── NavBar.vue # Barra de navegación superior
│ │ ├── TarjetaView.vue # Componente de tarjeta individual de tarea
│ │ ├── TaskEditorModal.vue # (Nuevo) Modal para editar tareas
│ │ ├── TaskList.vue # Lista de tareas (iteración sobre TarjetaView)
│ │ └── TaskNew.vue # Formulario para crear nuevas tareas

│ ├── router
│ │ └── index.js # Definición de rutas y protección con guards

│ ├── stores
│ │ ├── authStore.js # Pinia: Gestión de la sesión y autenticación
│ │ ├── errorMessages.js # (Nuevo) Traducción y manejo de errores de Supabase
│ │ └── taskStore.js # Pinia: Estado y operaciones de tareas

│ └── views
│ ├── HomeView.vue # Página principal tras login: vista de tareas
│ ├── LoginUser.vue # Página de login y registro (incluye AuthFormBase)
│ ├── PasswordReset.vue # (Nuevo) Página para enviar email de recuperación
│ └── PasswordUpdate.vue # (Nuevo) Página para introducir nueva contraseña

## Configuracion de Supabase

Crear un proyecto en Supabase
Configurar la tabla tasks con las columnas:
id (UUID, Primary Key)
user_id (UUID, relación con auth.users)
title (Texto)
description (Texto)
due_date (Fecha)
completed (Boolean)
created_at (timestamp)
favorite (Boolean)
Agregar reglas de seguridad RLS para que cada usuario acceda solo a sus tareas.
Crear archivo .env

## Flujo y Logica

El componente HomeView.vue centraliza la lógica: conecta el store, el formulario y la lista de tareas.
taskStore.js maneja todas las tareas y acciones (fetch, create, update, delete).
tasksApi.js encapsula todas las funciones que se comunican con Supabase.
authStore.js guarda y verifica el estado de autenticación del usuario.
App.vue y router/index.js conectan todo con Vue Router y la vista principal.
Manejo de errores traducidos para UX clara

## Autentificacion

Login y registro se manejan a través de Supabase Auth.
Cuando un usuario inicia sesión correctamente, se redirige a HomeView.vue.
Al cerrar sesión se borra el estado de authStore y se vuelve a la página de login.
Hay rutas protegidas: el NavBar no se muestra en rutas como /auth o /reset-password.
Logout seguro desde cualquier vista mediante LogoutButton.vue.

## Funcionalidad Principal

a) Listado de tareas (TaskList.vue)
Renderiza tareas por usuario, incluyendo botones de acción:
Editar
Eliminar
Favorito
Completado

b) Añadir tareas (TaskNew.vue)
Muestra un botón flotante con el símbolo +.
Abre un modal (TaskEditorModal.vue) para crear nuevas tareas.

c) Edición de tareas
Modal reutilizable para crear/editar tareas.
Permite cambiar:
Título
Descripción
Fecha
Estado de completado
Estado de favorito

d) Tareas individuales (TarjetaView.vue)
Vista clara y accesible.
Muestra título, descripción truncada, fecha, y botones rápidos.

## API de Supabase (tasksApi.js)

1. Todas las acciones CRUD son asincrónicas.
2. Funciones:
   getAllTasks(userId)
   createTask(...)
   updateTask(taskId, fields)
   deleteTaskById(id)
   toggleCompleteTask(id)
   toggleFavoriteTask(id)

Se utiliza supabase.from(TABLE).select().eq(...) para todas las operaciones filtradas por usuario.

## Diseño Responsive y UI

El diseño es minimalista y responsivo:
Componentes adaptados a pantallas móviles.
Modales adaptados a 60vh para buen manejo visual.
Iconografía clara: ✅, ⭐, 🗑️, ✏️, etc.
LoadingSpinner.vue cubre carga inicial o fetch prolongado.

## Escalabilidad y mejoras futuras

- Posibles mejoras:
  Filtros por tareas completadas / favoritas.
  Notificaciones o recordatorios con fechas.
  Compartir tareas entre usuarios.
  Paginación o búsqueda.
  Dark Mode.

## Dependencias principales

vue, pinia, vue-router, @supabase/supabase-js, vite
Opcional: eslint, prettier

## Autor:

Aleyda Montoto / https://github.com/AleyMon
