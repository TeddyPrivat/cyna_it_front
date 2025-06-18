<script setup lang="ts">
import router from '@/router'
const goCGU = () => {
  router.push({ name: 'cgu' })
}

const goLegalsMentions = () => {
  router.push({ name: 'mentions-legales' })
}
</script>

<template>
  <footer class="footer mt-5">
    <div
      class="is-flex is-flex-direction-column is-flex-direction-row-tablet is-align-items-center is-justify-content-space-between px-4 py-3"
    >
      <img alt="logo de cyna" class="mb-3 mb-0-tablet" src="@/assets/logo-cyna-white.svg" />

      <p class="has-text-white is-size-6 mb-2 mb-0-tablet has-text-centered">
        © 2024-2025 - Tous droits réservés.
      </p>
      <a class="has-text-white mr-0 mr-4-tablet mb-2 mb-0-tablet" @click="goLegalsMentions">
        Mentions légales
      </a>
      <a class="has-text-white" @click="goCGU">CGU</a>
      <a class="button is-ghost has-text-white">Recevoir la newsletter</a>
    </div>
  </footer>
</template>

<style scoped></style>
