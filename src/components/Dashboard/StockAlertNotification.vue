<script setup lang="ts">
import type { Product } from '@/types/Product.ts'

defineProps<{
  showLowStockAlert: Boolean,
  productStockIsEmpty: Product[],
  lowStockProductTitles: String
}
>();
defineEmits(['close']);
</script>

<template>
  <div class="notification is-danger" v-if="productStockIsEmpty.length > 0 && showLowStockAlert">
    <button class="delete" @click="$emit('close')"></button>
    <strong>Éléments en rupture de stock : </strong>
    <span>{{ lowStockProductTitles }}.</span>
  </div>
</template>

<style scoped>

</style>
