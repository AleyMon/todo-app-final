//el store de Pinia vive en la memoria de la aplicación mientras está en ejecución.
// Si cierras la aplicación o recargas la página, el estado del store no se guarda de manera persistente a menos que implementes algún tipo de persistencia
// (como localStorage, cookies, o bases de datos).

import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  createTask,
  getAllTasks,
  deleteTaskById,
  updateTask,
  toggleCompleteTask,
  toggleFavoriteTask,
} from '@/api/supabase/tasksApi'
import { useAuthStore } from '@/stores/authStore'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref([])

  // Obtener store de autenticación
  const auth = useAuthStore()

  // Cargar todas las tareas del usuario
  async function fetchTasks() {
    try {
      if (!auth.user?.id) throw new Error('Usuario no autenticado')
      const { data, error } = await getAllTasks(auth.user.id)
      if (error) throw error

      tasks.value = data || []
    } catch (error) {
      console.error('Error al cargar tareas:', error.message)
    }
  }

  // Agregar una nueva tarea
  async function addTask(task) {
    try {
      const { title, description, due_date, favorite, completed } = task
      const newTasks = await createTask(title, description, due_date, favorite, completed)
      if (newTasks && newTasks.length) {
        tasks.value.push(...newTasks)
      }
    } catch (error) {
      console.error('Error al agregar tarea:', error.message)
    }
  }

  // Eliminar una tarea por ID
  async function removeTask(taskId) {
    try {
      const deletedTasks = await deleteTaskById(taskId)
      if (deletedTasks && deletedTasks.length) {
        tasks.value = tasks.value.filter((task) => task.id !== taskId)
      }
    } catch (error) {
      console.error('Error al eliminar tarea:', error.message)
    }
  }

  // Función para actualizar una tarea por su ID
  async function updateTaskById(taskId, updatedFields) {
    try {
      const [updatedTask] = await updateTask(taskId, updatedFields)
      if (!updatedTask) return []
      // aviso con array vacío

      const index = tasks.value.findIndex((task) => task.id === taskId)
      if (index !== -1) {
        tasks.value.splice(index, 1, { ...tasks.value[index], ...updatedTask })
      }
      return updatedTask // devuelver tarea actualizada
    } catch (error) {
      console.error('Error al actualizar tarea:', error)
      return [] // retorno array vacío en caso de error
    }
  }

  // Función para cambiar el estado de completado de una tarea
  async function toggleTaskCompletion(taskId, completed) {
    try {
      const updatedTask = await toggleCompleteTask(taskId, completed)
      if (updatedTask) {
        const index = tasks.value.findIndex((task) => task.id === taskId)
        if (index !== -1) {
          tasks.value.splice(index, 1, { ...tasks.value[index], ...updatedTask })
        }
      }
    } catch (err) {
      console.error('Error al cambiar estado de tarea:', err)
    }
  }

  async function toggleFavorite(taskId, favorite) {
    try {
      const updatedTask = await toggleFavoriteTask(taskId, favorite)
      if (updatedTask) {
        const index = tasks.value.findIndex((task) => task.id === taskId)
        if (index !== -1) {
          tasks.value.splice(index, 1, { ...tasks.value[index], favorite: updatedTask.favorite })
        }
      }
    } catch (err) {
      console.error('Error al cambiar estado de favorita:', err)
    }
  }

  return {
    tasks,
    addTask,
    fetchTasks,
    updateTaskById,
    removeTask,
    toggleTaskCompletion,
    toggleFavorite,
  }
})
