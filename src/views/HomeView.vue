<!--HomeView.vue. Centraliza la lógica y conecta los componentes. -->
<template>
  <div class="task-container">
    <!-- Contenedor principal para las tarjetas -->
    <div class="card-container">
      <!-- Tarjeta Nueva: Formulario para agregar tarea -->
      <div class="center-button-container">
        <TaskNew @submit="handleSubmit" />
      </div>

      <!-- Tarjetas estándar: Listado de tareas. // con :tasks="taskStore.tasks" se pasan al componente TaskListS -->
      <TaskList
        :tasks="taskStore.tasks"
        :loading="loading"
        :editingTask="editingTask"
        @toggleCompletion="toggleCompletion"
        @startEdit="startEdit"
        @deleteTask="deleteTask"
        @saveEdit="saveEdit"
        @cancelEdit="cancelEdit"
        @toggleFavorite="markFavorite"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import TaskNew from '@/components/TaskNew.vue'
import TaskList from '@/components/TaskList.vue'

const taskStore = useTaskStore()
const loading = ref(true)
const editingTask = ref(null)

//para cargar las tareas desde la base de datos
onMounted(async () => {
  await taskStore.fetchTasks()
  loading.value = false
})

const handleSubmit = async (task) => {
  try {
    const { title, description, due_date, favorite = false, completed = false } = task
    await taskStore.addTask({ title, description, due_date, favorite, completed })
  } catch (err) {
    console.error('Error al agregar tarea:', err)
  }
}

const toggleCompletion = async (task) => {
  try {
    await taskStore.toggleTaskCompletion(task.id, task.completed)
  } catch (err) {
    console.error('Error al cambiar estado de tarea:', err)
  }
}

const deleteTask = async (taskId) => {
  try {
    await taskStore.removeTask(taskId)
  } catch (err) {
    console.error('Error al eliminar tarea:', err)
  }
}

const startEdit = (task) => {
  editingTask.value = { ...task }
}

const cancelEdit = () => {
  editingTask.value = null
}

const saveEdit = async (taskToSave) => {
  try {
    const { id, title, description, due_date, favorite, completed } = taskToSave
    await taskStore.updateTaskById(id, { title, description, due_date, favorite, completed })
    editingTask.value = null
  } catch (err) {
    console.error('Error al editar tarea:', err)
  }
}

const markFavorite = async (taskId, favoriteStatus) => {
  try {
    console.log('Toggling favorite for task:', taskId, 'Current favorite status:', favoriteStatus)
    await taskStore.toggleFavorite(taskId, favoriteStatus)
    console.log('Favorite toggled successfully for task:', taskId)
  } catch (error) {
    console.error('Error al alternar el estado de favorita:', error.message)
  }
}
</script>