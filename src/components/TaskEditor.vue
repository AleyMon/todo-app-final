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
