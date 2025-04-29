<!-- LoginUser.vue -->
<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { traducirError } from '@/stores/errorMessages'
import { useToast } from 'vue-toastification'

const email = ref('')
const password = ref('')
const mode = ref('login')
const auth = useAuthStore()
const router = useRouter()
const error = ref('')
const loading = ref(false) //
const toast = useToast() // para el pop-up

const toggleMode = () => {
  mode.value = mode.value === 'login' ? 'register' : 'login'
}

const handleSubmit = async () => {
  try {
    loading.value = true
    const delay = new Promise((resolve) => setTimeout(resolve, 1000))

    if (mode.value === 'login') {
      await Promise.all([auth.login({ email: email.value, password: password.value }), delay])
    } else {
      await Promise.all([auth.register({ email: email.value, password: password.value }), delay])
      toast.success('Usuario registrado con éxito 🎉')

      // Esperar para que el usuario vea el toast antes de redirigir
      setTimeout(() => {
        router.push('/home')
      }, 1500)

      return // evitar que siga al router.push de más abajo
    }

    router.push('/home')
  } catch (err) {
    toast.error(traducirError(err))
  } finally {
    loading.value = false
  }
}
const loginWithGitHub = async () => {
  try {
    await auth.loginWithGitHub()
  } catch (err) {
    error.value = err.message || 'Error al iniciar sesión con GitHub.'
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="image-section">
        <img src="@/assets/imagenes/luis-villasmil-mlVbMbxfWI4-unsplash.jpg" alt="Login visual" />
      </div>

      <div class="login-box">
        <img src="../assets/imagenes/logo.svg" alt="Logo" class="logo" />

        <form @submit.prevent="handleSubmit" class="login-form">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="input"
            autocomplete="username"
            required
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="input"
            autocomplete="current-password"
            required
          />

          <div v-if="error" class="error-message">{{ error }}</div>

          <BaseButton type="submit" :disabled="loading">
            <LoadingSpinner v-if="loading" />
            <span v-else>{{ mode === 'login' ? 'Entrar' : 'Regístrate' }}</span>
          </BaseButton>

          <!-- Botón OAuth -->
          <BaseButton
            v-if="mode === 'login'"
            @click="loginWithGitHub"
            type="button"
            class="github-btn"
            style="margin-top: 0.5rem"
          >
            Iniciar sesión con GitHub
          </BaseButton>
        </form>

        <p class="toggle-text" @click="toggleMode">
          {{ mode === 'login' ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?' }}
        </p>
        <router-link to="/passwordreset" class="resetpassword">
          ¿Has olvidado la contraseña?
        </router-link>
      </div>
    </div>
  </div>
</template>