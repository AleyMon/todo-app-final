<!--AuthFormBase.vue: plantilla form para password reset y update-->
<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-box">
        <img src="@/assets/imagenes/logo.svg" alt="Logo" class="logo" />

        <form class="login-form" @submit.prevent="onSubmit">
          <h1 class="form-title">{{ title }}</h1>
          <p v-if="description" class="form-description">{{ description }}</p>

          <slot />
          <!--inputs -->

          <div class="button-container">
            <BaseButton type="submit">
              <slot name="button"></slot>
            </BaseButton>

            <slot name="extra-button"></slot>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from './BaseButton.vue'

defineProps({
  title: String,
  description: String,
  onSubmit: Function,
})
</script>

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
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
}

.login-box {
  width: 100%;
  max-width: 400px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.5rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
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

.form-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  text-align: center;
}

.form-description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
  text-align: center;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }

  .login-box {
    width: 100%;
    height: auto;
    border-left: none;
  }

  .logo {
    width: auto;
    margin-bottom: 1rem;
    height: auto;
    object-fit: contain;
  }

  .login-form {
    max-width: 100%;
  }

  .input {
    font-size: 16px;
  }

  .form-title {
    font-size: 1.3rem;
  }
}
</style>
