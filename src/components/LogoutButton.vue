<!--LogoutButton.vue-->

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  await auth.logout()
  router.push('/auth')
}
</script>

<template>
  <button class="logout-icon-btn" @click="handleLogout" aria-label="Cerrar sesión">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
      />
    </svg>
  </button>
</template>

<style scoped>
.logout-icon-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.3rem;
  color: #555;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.icon {
  width: 2rem;
  height: auto;
}
</style>
