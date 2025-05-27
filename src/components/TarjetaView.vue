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

<style scoped>
.tarjeta {
  flex: 1 1 25%; /* O ajusta según el diseño */
  max-width: 35%; /* revisar sea similar al de las tarjetas estándar */
  min-width: 20rem;
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.75rem; /* separación entre los bloques de contenido */
  word-break: normal;
  overflow-wrap: break-word;
  align-items: stretch;
  position: relative;
}

.check-fav {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.description {
  text-overflow: ellipsis; /* Muestra "..." al final */
}

.task-title {
  margin-bottom: 1rem; /* Separar título de la descripción */
}

.task-content {
  flex-grow: 1; /* Permite que el contenido ocupe todo el espacio disponible */
  margin-bottom: 0.5rem; /* Separar contenido de la parte inferior */
}

.bottom-content {
  margin-top: auto; /* Empuja el contenido hacia abajo */
  padding-top: 0.5rem; /* Espacio entre los botones y la parte superior */
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.due-date,
.status {
  margin-bottom: 0.5rem; /* Separar fecha y estado */
}

.buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
  height: 2rem;
  justify-content: space-between;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.25rem;
  transition: transform 0.2s ease;
  color: #444;
}

.icon-btn:hover {
  transform: scale(1.2);
  color: #000;
}

</style>