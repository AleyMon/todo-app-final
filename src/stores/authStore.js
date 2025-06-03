// No es encesario usar localStorage ni gestionar sesiones manualmente. Supabase gestiona la sesión con cookies seguras automáticamente.
//authStore.js
import { defineStore } from 'pinia'
import { supabase } from '@/api/supabase/index'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  const loading = ref(true)

  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser()
    user.value = data.user

    // Simular que tarda un poco más
    await new Promise((res) => setTimeout(res, 800))

    loading.value = false
  }

  const login = async ({ email, password }) => {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    user.value = data.user
  }

  const register = async ({ email, password }) => {
    const { error, data } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    user.value = data.user
  }

  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
  }

  // Pasword Reset
  const sendPasswordResetEmail = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) throw error
    user.value = null
  }

  const updatePassword = async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw error
  }

  // Acceder por proveedor externo

  const loginWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin,
      },
    })
    if (error) throw error
  }
  return {
    user,
    fetchUser,
    login,
    register,
    logout,
    loading,
    sendPasswordResetEmail,
    updatePassword,
    loginWithGitHub,
  }
})
