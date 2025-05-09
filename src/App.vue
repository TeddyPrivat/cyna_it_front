<template>
  <div>
    <h2 class="title is-4">Liste des produits</h2>
    <ListItems type="produit"/>
    <h2 class="title is-4">Liste des services</h2>
    <ListItems type="service"/>
  </div>
</template>

<script setup lang="ts">
import ListItems from '@/components/Products/ListItems.vue'
</script>

<style scoped>

</style>
