<template>
  <div class="not-found">
    <h1>401 - Page non autorisée</h1>
    <p>Vous n'avez pas les crédentiels pour accéder à cette page.</p>
    <router-link to="/">Retour à l'accueil</router-link>
  </div>
</template>

<script setup lang="ts">
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