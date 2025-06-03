<!--FooterBar.vue-->
<template>
  <footer class="footer">
    <p>© 2025 · Creado por <strong>Ale Mon</strong> · Vue 3 + Pinia + Supabase</p>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 0;
  padding: 1rem;
  color: #555;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}

footer p {
  text-align: center;
  width: 100%;
}

@media (max-width: 345px) {
  .footer {
    padding: 0.5rem;
  }
}
</style>
