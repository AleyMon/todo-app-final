<!-- NavBar.vue -->

<script setup>
import { useAuthStore } from '@/stores/authStore'
import LogoutButton from './LogoutButton.vue'
import { useRoute } from 'vue-router'

const auth = useAuthStore()
const route = useRoute()

// Rutas donde NO mostrar el NavBar
const rutasSinNav = ['/auth', '/passwordreset', '/reset-password']
</script>

<template>
  <header v-if="auth.user && !rutasSinNav.includes(route.path)" class="navbar">
    <div class="navbar-container">
      <div class="navbar-left">
        <div class="logo-section">
          <img src="@/assets/imagenes/logo.svg" alt="Logo" class="logo" />
        </div>
      </div>

      <div class="navbar-right">
        <LogoutButton />
      </div>
    </div>
  </header>
</template>

<style scoped>
header.navbar {
  height: 5rem;
  position: fixed;
  top: 0;
  width: 100%; /* Se asegura de ocupar todo el ancho */
  z-index: 1000;
  background-color: white;
  display: flex;
  justify-content: center; /* Centrado del contenido */
  box-sizing: border-box;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%; /* El mismo ancho que la lista de tareas */
  max-width: 1200px; /* Limita el ancho máximo para que se alinee con el contenedor de tareas */
  margin: 0 auto; /* Centrado automático */
}

.navbar-left,
.navbar-right {
  display: flex;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo {
  width: 2rem;
  height: auto;
  object-fit: contain;
}


</style>