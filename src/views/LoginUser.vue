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

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
  overflow: hidden;
}

.login-container {
  flex: 1;
  display: flex;
  width: 100vw;
  height: 100%;
}

.image-section {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.login-box {
  width: 50%;
  max-height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.5rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border-left: 1px solid #dbdbdb;
}

.logo {
  margin-bottom: 1.5rem;
  width: 2rem;
  height: auto;
  object-fit: contain;
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  gap: 0.75rem;
}

.input {
  background: #fafafa;
  border: 1px solid #dbdbdb;
  border-radius: 0.25rem;
  padding: 0.56rem 0.5rem;
  font-size: 14px;
  outline: none;
}

.input:focus {
  border-color: #a8a8a8;
}

.toggle-text,
.resetpassword {
  margin-top: 20px;
  font-size: 13px;
  cursor: pointer;
  user-select: none;
  font-weight: 600;
  text-decoration: none;
}

.error-message {
  color: red;
}

.login-form :deep(button),
.github-btn {
  all: unset;
  background-color: #f5f5f5;
  border-radius: 6px;
  padding: 0.6rem 1rem;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
  color: white;
  border: 1px solid #ccc;
}

.login-form :deep(button):hover,
.github-btn:hover {
  background-color: #eaeaea;
  transform: translateY(-1px);
}

.login-form :deep(button:disabled),
.github-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.github-btn {
  background-color: #e2c388;
  color: #333;
  border: none;
}

.github-btn:hover {
  background-color: #d6b97c;
}

/* --- Responsive --- */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }

  .image-section,
  .login-box {
    width: 100%;
    height: auto;
    border-left: none;
  }

  .image-section {
    height: 200px;
  }

  .login-box {
    padding: 1.5rem 2rem;
    box-shadow: none;
  }

  .logo {
    width: 8rem;
    margin-bottom: 1rem;
  }

  .login-form {
    max-width: 100%;
  }

  .input {
    font-size: 13px;
  }
  .logo {
    width: auto;
    height: auto;
  }
}
</style>
