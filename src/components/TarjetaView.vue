<!-- TarjetaView.vue -->
<script setup>
import { ref } from 'vue'
import TaskEditorModal from './TaskEditorModal.vue'

const props = defineProps({
  task: Object,
})

const emit = defineEmits(['toggleCompletion', 'deleteTask', 'saveEdit', 'toggleFavorite'])

const showModal = ref(false)

const truncate = (text, maxLength = 40) => {
  if (!text) return ''
  return text.length > maxLength ? text.slice(0, maxLength) + '…' : text
}

const toggleCompletion = () => emit('toggleCompletion', props.task)
const deleteTask = () => emit('deleteTask', props.task.id)
const onSaveEdit = (updatedTask) => {
  emit('saveEdit', updatedTask)
  showModal.value = false
}
const toggleFavorite = () => {
  emit('toggleFavorite', props.task.id, props.task.favorite)
}
</script>

<template>
  <div class="tarjeta">
    <div class="task-content">
      <h3 class="task-title">
        <span class="title-text">{{ truncate(task.title, 20) }}</span>
      </h3>
      <p class="description">{{ truncate(task.description) }}</p>
    </div>

    <!-- Parte inferior: Fecha, Estado (toggle), y Botones -->
    <div class="bottom-content">
      <p class="due-date"><strong>Fecha:</strong> {{ task.due_date || 'No establecida' }}</p>
    </div>
    <div class="buttons">
      <div class="rest-buttons">
        <button class="icon-btn" @click="showModal = true" title="Detalles" aria-label="Detalles">
          ℹ️
        </button>

        <button class="icon-btn" @click="showModal = true" title="Editar" aria-label="Editar">
          ✏️
        </button>
        <button class="icon-btn" @click="deleteTask" title="Eliminar" aria-label="Eliminar">
          🗑️
        </button>
      </div>
      <div class="check-fav">
        <button
          class="icon-btn"
          @click="toggleCompletion"
          :title="task.completed ? 'Desmarcar' : 'Completar'"
          :aria-label="task.completed ? 'Desmarcar' : 'Completar'"
        >
          {{ task.completed ? '✅' : '⬜' }}
        </button>
        <button
          class="icon-btn"
          @click="toggleFavorite"
          :title="task.favorite ? 'Desmarcar favorito' : 'Marcar como favorito'"
          aria-label="Favorito"
        >
          {{ task.favorite ? '⭐' : '☆' }}
        </button>
      </div>
    </div>

    <!-- Modal emergente -->
    <TaskEditorModal
      v-if="showModal"
      :task="task"
      @close="showModal = false"
      @saveEdit="onSaveEdit"
      @deleteTask="deleteTask"
      @toggleCompletion="toggleCompletion"
      @toggleFavorite="toggleFavorite"
    />
  </div>
</template>