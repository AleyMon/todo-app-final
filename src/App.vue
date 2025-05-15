<!--App.vue-->
<script setup>
import { useAuthStore } from '@/stores/authStore'

import { computed } from 'vue'
import { useRoute } from 'vue-router'

const auth = useAuthStore()
const route = useRoute()


</script>

<template>
  <div v-if="auth.loading" class="loading-screen">

  </div>


</template>