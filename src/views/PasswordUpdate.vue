<!-- PasswordUpdate.vue -->
<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import AuthFormBase from '@/components/AuthFormBase.vue'
import { useToast } from 'vue-toastification'
import { traducirError } from '@/stores/errorMessages'

const password = ref('')
const { updatePassword } = useAuthStore()
const router = useRouter()
const toast = useToast() // para el pop-up

const handleUpdatePassword = async () => {
  try {
    await updatePassword(password.value)
    toast.success('Contraseña actualizada con éxito')
    password.value = ''
    // Esperar unos segundos para que el usuario vea el toast-pop-up
    setTimeout(() => {
      router.push('/')
    }, 2000)
  } catch (err) {
    console.log('Error completo:', err)

    // intenta traducir el error según la estructura que venga, archivo errorMessages.js
    let errorMsg = ''
    if (err.response?.data?.message) {
      errorMsg = traducirError({ message: err.response.data.message })
    } else if (err.message) {
      errorMsg = traducirError(err)
    } else {
      errorMsg = traducirError(err)
    }

    toast.error(errorMsg)

    // Si es error de sesión, redirigir a PasswordReset tras 1 segundos
    if (err?.name === 'AuthSessionMissingError') {
      setTimeout(() => {
        router.push({ name: 'PasswordReset' })
      }, 1000)
    }
  }
}
</script>

<template>
  <AuthFormBase
    title="Actualizar contraseña"
    description="Introduce tu nueva contraseña para continuar."
    :onSubmit="handleUpdatePassword"
  >
    <input
      v-model="password"
      type="password"
      placeholder="Nueva contraseña"
      class="input"
      required
      name="new-password"
    />
    <template #button>Actualizar contraseña</template>
  </AuthFormBase>
</template>

<style scoped>
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
</style>
