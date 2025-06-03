<!-- TaskEditorModal -->
<template>
  <div class="modal-backdrop">
    <div class="modal-content">
      <div class="content">
        <input v-model="localTask.title" class="input-title" placeholder="Título" />
        <textarea v-model="localTask.description" class="textarea-desc" placeholder="Descripción" />
        <input type="date" v-model="localTask.due_date" class="input-date" />
      </div>

      <div class="buttons-modal">
        <!-- Botón para marcar/desmarcar favorito -->
        <button
          type="button"
          class="modal-btn save"
          @click="localTask.favorite = !localTask.favorite"
          :title="localTask.favorite ? 'Desmarcar favorito' : 'Marcar como favorito'"
        >
          <span>{{ localTask.favorite ? '⭐ Favorito' : '☆ Sin marcar' }}</span>
        </button>

        <!-- Botón para marcar/desmarcar completado -->
        <button
          type="button"
          class="modal-btn close"
          @click="localTask.completed = !localTask.completed"
          :title="localTask.completed ? 'Desmarcar completada' : 'Marcar como completada'"
        >
          <span>{{ localTask.completed ? '✅ Completada' : '⏳ Pendiente' }}</span>
        </button>

        <!-- Botón Guardar -->
        <button @click="handleSave" class="modal-btn save">💾 Guardar</button>

        <!-- Botón Cerrar -->
        <button @click="handleClose" class="modal-btn close">✖ Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    default: () => ({
      title: '',
      description: '',
      due_date: '',
      completed: false,
      favorite: false,
    }),
  },
})

const emit = defineEmits(['close', 'saveEdit'])

const localTask = ref({ ...props.task })

watch(
  () => props.task,
  (newTask) => {
    localTask.value = { ...newTask }
  },
)

const handleSave = () => {
  if (
    !(localTask.value.title && localTask.value.title.trim()) ||
    !(localTask.value.description && localTask.value.description.trim())
  ) {
    alert('Debes completar al menos el título o la descripción.')
    return
  }
  emit('saveEdit', localTask.value) // Guarda los campos actualizados
  emit('close') // Cierra el modal después de guardar
}

const handleClose = () => {
  emit('close') // Cierra el modal cuando el usuario hace clic en "Cerrar"
}
</script>

<style scoped>
.modal-btn {
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  transition: background-color 0.3s;
}

.modal-btn.save {
  background-color: #4caf50;
  color: white;
}

.modal-btn.save:hover {
  background-color: #45a049;
}

.modal-btn.close {
  background-color: #f44336;
  color: white;
}

.modal-btn.close:hover {
  background-color: #e53935;
}

.buttons-modal {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

input,
textarea {
  width: 100%;
  margin: 10px 0;
}

.input-title,
.textarea-desc {
  padding: 10px;
  font-size: 16px;
}

.input-date {
  padding: 8px;
  font-size: 14px;
}
</style>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* Fondo semitransparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  cursor: default; /* Cambiar a 'default' para evitar el cursor de mano en el fondo */
  pointer-events: none; /* Desactivar la interacción en el fondo */
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 60vw;
  height: 60vh;
  min-width: 300px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  pointer-events: all; /* Hacer la ventana modal interactiva */
}

.content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1rem;
}

.input-title,
.input-date {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.textarea-desc {
  flex-grow: 2;
  padding: 0.75rem;
  font-size: 1rem;
  resize: none;
  height: 100%;
  min-height: 150px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.modal-btn {
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.modal-btn {
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

/* Botón Guardar: color tipo ℹ️ */
.modal-btn.save {
  background-color: #70b4cf;
  color: white;
}

.modal-btn.save:hover {
  background-color: #40acd6;
}

/* Botón Cerrar: gris suave */
.modal-btn.close {
  background-color: #cccccc;
  color: #333;
}

.modal-btn.close:hover {
  background-color: #999999;
  color: white;
}

.buttons-modal {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  justify-content: flex-end;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .buttons-modal {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
