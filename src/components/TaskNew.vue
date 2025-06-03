<!--TaskNew.vue-->

<script setup>
import { ref } from 'vue'
import TaskEditorModal from './TaskEditorModal.vue'

const emit = defineEmits(['submit'])
const showModal = ref(false)

const onSubmit = (task) => {
  emit('submit', task)
  showModal.value = false
}
</script>

<template>
  <button
    class="add-task-btn"
    @click="showModal = true"
    aria-label="Añadir tarea"
    title="Añadir tarea"
  >
    <!--simbolo + -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
    <span>Añadir Tarea</span>
  </button>

  <TaskEditorModal v-if="showModal" @close="showModal = false" @saveEdit="onSubmit" />
</template>

<style scoped>
.add-task-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.4rem 1rem;
  color: #555;
  border-radius: 0.375rem;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
}

.add-task-btn:hover {
  background-color: #f0f0f0;
  color: #222;
}

.icon {
  width: 20px;
  height: 20px;
}
</style>
