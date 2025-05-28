<script setup lang="ts">
import router from '@/router';
const goCGU = () => {
  router.push({name: 'cgu'});
}

const goLegalsMentions = () => {
  router.push({name: 'mentions-legales'});
}
</script>

<template>
  <footer class="footer mt-5">
    <div class="is-flex is-flex-direction-row is-justify-content-center is-align-items-center">
      <a class="mx-4" @click="goLegalsMentions">Mentions légales</a>
      <a class="mx-4" @click="goCGU">Conditions Générales d'Utilisation (CGU)</a>
    </div>
  </footer>

</template>

<style scoped>

</style>
