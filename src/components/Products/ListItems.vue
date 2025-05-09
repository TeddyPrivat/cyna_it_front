<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import CardItem from '@/components/Products/CardItem.vue'
import type { Product } from '@/types/Product.ts'
import type { Service } from '@/types/Service.ts'
import type { CardItem as CardItemService } from '@/types/CardItem'

const props = defineProps<{
  type: 'produit' | 'service'
}>()
const items = ref<CardItemService[]>([])
onMounted(async () => {
  try{
    if (props.type === 'produit') {
      const res = await axios.get<Product[]>('http://localhost:8000/api/products')
      items.value = res.data
    } else if (props.type === 'service') {
      const res = await axios.get<Service[]>('http://localhost:8000/api/services')
      items.value = res.data
    }
  }catch(error){
    console.error('Erreur lors du chargement des produits:', error)
  }
})
</script>

<template>
  <div class="container mt-2">
    <div class="grid is-col-min-10 is-column-gap-4 is-row-gap-4">
      <div class="cell" v-for="item in items" :key="item.id">
        <CardItem :item="item"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
