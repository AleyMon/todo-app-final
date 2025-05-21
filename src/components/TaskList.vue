<!-- TaskList.vue -->
<template>
  <div>
    <div v-if="loading">
      <p>Cargando tareas...</p>
    </div>

    <div v-else-if="tasks.length === 0">
      <p>No tienes tareas aún.</p>
    </div>

    <div v-else class="tareas-lista">
      <TarjetaView
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :editingTask="editingTask"
        @toggleCompletion="$emit('toggleCompletion', task)"
        @startEdit="$emit('startEdit', task)"
        @deleteTask="$emit('deleteTask', task.id)"
        @saveEdit="$emit('saveEdit', $event)"
        @cancelEdit="$emit('cancelEdit')"
        @toggleFavorite="$emit('toggleFavorite', task.id, task.favorite)"
      />
    </div>
  </div>
</template>

<script setup>
import TarjetaView from './TarjetaView.vue'

defineProps({
  tasks: Array,
  loading: Boolean,
  editingTask: Object,
})

defineEmits([
  'toggleCompletion',
  'startEdit',
  'deleteTask',
  'saveEdit',
  'cancelEdit',
  'toggleFavorite',
])
</script>

<style scoped>
.tareas-lista {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  width: 100%;
}
</style>