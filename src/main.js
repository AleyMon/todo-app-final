// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import './assets/main.css'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Opciones para el plugin Toast (el cs se marca en css global: main.css o en app.vue)
const toastOptions = {
  position: 'top-center',
  timeout: 2000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  // se pueden agregar más opciones aquí
}

app.use(Toast, toastOptions)

app.mount('#app')
