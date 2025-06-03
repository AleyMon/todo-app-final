<!--App.vue-->
<script setup>
import { useAuthStore } from '@/stores/authStore'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/FooterBar.vue'
import './assets/main.css'
import LoadingSpinner from './components/LoadingSpinner.vue'

import { computed } from 'vue'
import { useRoute } from 'vue-router'

const auth = useAuthStore()
const route = useRoute()

const showNavBar = computed(() => auth.user && route.name !== 'Auth')
</script>

<template>
  <div v-if="auth.loading" class="loading-screen">
    <LoadingSpinner v-if="auth.loading" />
    <!-- Aquí está el spinner -->
  </div>

  <div v-else class="app-layout">
    <!-- Mostrar NavBar solo si usuario autenticado y NO en ruta Auth -->
    <NavBar v-if="showNavBar" />

    <main class="main-content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Loading screen sigue igual */
.loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: white;
  color: #555;
  font-size: 1.2rem;
}

.loading-text {
  animation: pulse 1.5s infinite;
}

.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
}
</style>
