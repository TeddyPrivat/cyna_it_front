<template>
  <template v-if="route.path !== '/logout'">
    <Header />
  </template>

  <main>
    <div>

      <router-view />
    </div>
  </main>
  <FooterComponent/>
</template>

<script setup lang="ts">
import FooterComponent from "@/components/FooterComponent.vue";
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue'

const route = useRoute();
</script>

<style scoped>
main{
  padding: 1rem 2rem 0 2rem;
}
</style>
