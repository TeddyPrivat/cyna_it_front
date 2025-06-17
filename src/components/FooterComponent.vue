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
    <div class="footer-links is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
      <a class="mx-auto" @click="goLegalsMentions">Mentions légales</a>
      <a class="mx-auto mt-3" @click="goCGU">CGU</a>
    </div>
  </footer>
</template>


<style scoped>
/* Par défaut (mobile) colonne */
.footer-links {
  flex-direction: column;
}

/* À partir de tablet (≥769px) : ligne */
@media screen and (min-width: 769px) {
  .footer-links {
    flex-direction: row;
  }
}
</style>
