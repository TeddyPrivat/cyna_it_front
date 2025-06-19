<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const router = useRouter();

onMounted(() => {

  setTimeout(() => {
    userStore.logout()
    router.push('/');
  }, 2000);

});
</script>

<template>
  <section class="section is-flex is-justify-content-center is-align-items-center" style="height: 100vh;">
    <div class="has-text-centered">
      <span class="icon is-large has-text-primary mb-4">
        <i class="fas fa-spinner fa-pulse fa-3x"></i>
      </span>
      <h1 class="title is-3 has-text-primary">Déconnexion en cours...</h1>
      <p class="subtitle is-6">Vous allez être redirigé vers la page d’accueil</p>
    </div>
  </section>
</template>

<style scoped>
/* Aucun style custom nécessaire – tout est Bulma */
</style>
