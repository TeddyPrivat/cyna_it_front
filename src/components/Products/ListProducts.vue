<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import CardProduct from '@/components/Products/CardProduct.vue'
import type { Product } from '@/types/Product.ts'

const products = ref<Product[]>([])
onMounted(async () => {
  try{
    const res = await axios.get<Product[]>('http://localhost:8000/api/products');
    products.value = res.data;
  }catch(error){
    console.error('Erreur lors du chargement des produits:', error)
  }
})
</script>

<template>
  <div class="container mt-2">
    <div class="grid is-col-min-10 is-column-gap-4 is-row-gap-4">
      <div class="cell" v-for="product in products" :key="product.id">
        <CardProduct :product="product"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
