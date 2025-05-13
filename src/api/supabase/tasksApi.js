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

// Actualizar una tarea
export const updateTask = async (taskId, updatedFields) => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(updatedFields)
      .eq('id', taskId)
      .select()

    if (error) throw new Error(error.message)

    return data
  } catch (error) {
    console.error('Error al actualizar tarea:', error.message)
    return []
  }
}

export const toggleCompleteTask = async (taskId, completed) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .update({ completed: !completed }) // invierte el valor
      .eq('id', taskId)
      .select()

    if (error) throw error

    return data[0]
  } catch (error) {
    console.error('Error al alternar estado de tarea:', error.message)
    return null
  }
}

export const toggleFavoriteTask = async (taskId, favorite) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .update({ favorite: !favorite }) // Alternar el valor
      .eq('id', taskId)
      .select()

    if (error) throw error

    return data[0] // Devuelve la tarea actualizada
  } catch (error) {
    console.error('Error al alternar estado de favorita:', error.message)
    return null
  }
}