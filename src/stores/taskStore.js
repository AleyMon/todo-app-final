//el store de Pinia vive en la memoria de la aplicación mientras está en ejecución.
// Si cierras la aplicación o recargas la página, el estado del store no se guarda de manera persistente a menos que implementes algún tipo de persistencia
// (como localStorage, cookies, o bases de datos).

import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  createTask,
  getAllTasks,
  deleteTaskById,

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


  return {
    tasks,
    addTask,
    fetchTasks,

  }
})