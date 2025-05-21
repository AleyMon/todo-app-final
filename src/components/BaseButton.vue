<!-- BaseButton.vue -->
<template>
  <button :type="type" :class="['base-button', variant]" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary', // otras opciones: 'secondary', 'danger', etc.
  },
})
</script>

<style scoped>
.base-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  color: white;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
}

.base-button.primary,
.base-button.secondary,
.base-button.text {
  background-color: #9bbfce; /* Color base del botón para boton Completar (variant primary) */
}

.base-button.primary:hover,
.base-button.secondary:hover,
.base-button.text:hover {
  background-color: #e2d092;
}

.base-button.danger {
  background-color: #dc2626; /*Color base para Eliminar (variant danger)*/
}

.base-button.danger:hover {
  background-color: #b91c1c;
}
</style>