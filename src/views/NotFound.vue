<template>
  <div class="not-found">
    <h1>404 - Page non trouvée</h1>
    <p>La page que vous recherchez n'existe pas.</p>
    <router-link to="/">Retour à l'accueil</router-link>
  </div>
</template>

<script setup lang="ts">
// Aucun code nécessaire ici
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 3rem 1rem;
}
.not-found h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}
.not-found p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}
</style>