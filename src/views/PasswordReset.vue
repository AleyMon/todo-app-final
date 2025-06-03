//PasswordReset.vue//
<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import AuthFormBase from '@/components/AuthFormBase.vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { traducirError } from '@/stores/errorMessages'
import BaseButton from '@/components/BaseButton.vue'

const email = ref('')
const { sendPasswordResetEmail } = useAuthStore()
const toast = useToast() // para el pop-up
const router = useRouter()

const handlePasswordReset = async () => {
  try {
    await sendPasswordResetEmail(email.value)
    toast.success(`Correo enviado a ${email.value}`)
    email.value = ''

    // Esperar unos segundos para que el usuario vea el toast-pop-up
    setTimeout(() => {
      router.push('/auth')
    }, 2000)
  } catch (err) {
    toast.error(traducirError(err))
  }
}

const redirectToAuth = () => {
  router.push('/auth')
}
</script>

<template>
  <AuthFormBase
    title="¿Tienes problemas para iniciar sesión?"
    description="Introduce tu correo electrónico y te enviaremos un enlace para que vuelvas a entrar."
    :onSubmit="handlePasswordReset"
  >
    <input
      v-model="email"
      type="email"
      name="email"
      placeholder="Correo electrónico"
      class="input"
      required
    />

    <!-- Enviar Email button -->
    <template #button>Enviar Email</template>

    <!-- Volver al Login button (inside the extra-button slot) -->
    <template #extra-button>
      <BaseButton @click="redirectToAuth" variant="secondary">
        Volver al inicio de sesión
      </BaseButton>
    </template>
  </AuthFormBase>
</template>
