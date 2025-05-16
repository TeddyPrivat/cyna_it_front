<template>
  <div>
    <div>
      <template v-if="route.path === '/'">
        <h2 class="title is-4">Liste des produits</h2>
        <ListItems type="produit" />
        <h2 class="title is-4">Liste des services</h2>
        <ListItems type="service" />
      </template>

      <router-view v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import ListItems from '@/components/Products/ListItems.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style scoped>

</style>
