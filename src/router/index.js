//router/index.js//
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginUser from '@/views/LoginUser.vue'
import { useAuthStore } from '@/stores/authStore'
import PasswordReset from '@/views/PasswordReset.vue'
import PasswordUpdate from '@/views/PasswordUpdate.vue'

const routes = [
  {
    path: '/',
    redirect: '/auth', // Redirige a Auth si el usuario accede a "/"
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: LoginUser,
    meta: { requiresAuth: false },
  },
  {
    name: 'PasswordReset',
    path: '/passwordreset',
    component: PasswordReset,
    meta: { requiresAuth: false },
  },
  {
    name: 'ResetPassword',
    path: '/reset-password',
    component: PasswordUpdate, // muestra solo el formulario de nueva contraseña
    meta: { requiresAuth: false },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  // Solo fetch si no tenemos usuario cargado (optimización)
  if (!auth.user) {
    await auth.fetchUser()
  }

  if (to.meta.requiresAuth && !auth.user) {
    next('/auth')
  } else if (to.path === '/auth' && auth.user) {
    next('/home')
  } else {
    next()
  }
})

export default router
