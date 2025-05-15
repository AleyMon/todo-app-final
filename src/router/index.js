//router/index.js//
import { createRouter, createWebHistory } from 'vue-router'
import LoginUser from '@/views/LoginUser.vue'
import { useAuthStore } from '@/stores/authStore'

const routes = [
  {
    path: '/',
    redirect: '/auth', // Redirige a Auth si el usuario accede a "/"
  },

  {
    path: '/auth',
    name: 'Auth',
    component: LoginUser,
    meta: { requiresAuth: false },
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  await auth.fetchUser()

  if (to.meta.requiresAuth && !auth.user) {
    next('/auth') // Redirige al login si no está autenticado
  } else if (to.path === '/auth' && auth.user) {
    next('/home') // Redirige al home si el usuario ya está autenticado
  } else {
    next()
  }
})

export default router