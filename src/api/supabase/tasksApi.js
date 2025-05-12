//tasksApi.js//
import { supabase } from '@/api/supabase'
import { ref } from 'vue'

const TABLE_NAME = 'tasks'
export const tasksList = ref([])

// Obtener todas las tareas de un usuario
export const getAllTasks = async (userId) => {
  try {
    const { data, error } = await supabase.from(TABLE_NAME).select('*').eq('user_id', userId)

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error al obtener tareas:', error.message)
    return { data: null, error }
  }
}

// Crear una nueva tarea
export const createTask = async (
  title,
  description,
  due_date,

) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuario no autenticado.')

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert({ title, description, due_date, user_id: user.id })
      .select()

    if (error) throw new Error(error.message)

    return data
  } catch (error) {
    console.error('Error al crear tarea:', error.message)
    return []
  }
}

// Eliminar una tarea por su ID
export const deleteTaskById = async (taskId) => {
  try {
    const { data, error } = await supabase.from(TABLE_NAME).delete().eq('id', taskId).select()

    if (error) throw new Error(error.message)

    return data
  } catch (error) {
    console.error('Error al eliminar tarea:', error.message)
    return []
  }
}
