<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import CardItem from '@/components/Products/CardItem.vue'
import type { Product } from '@/types/Product.ts'
import type { Service } from '@/types/Service.ts'
import type { CardItem as CardItemService } from '@/types/CardItem'
import { useRouter } from 'vue-router';

const props = defineProps<{
  type: 'produit' | 'service'
}>();
const router = useRouter();
const items = ref<CardItemService[]>([])
onMounted(async () => {
  try{
    if (props.type === 'produit') {
      const res = await axios.get<Product[]>('http://localhost:8000/api/products');
      items.value = res.data;
    } else if (props.type === 'service') {
      const res = await axios.get<Service[]>('http://localhost:8000/api/services');
      items.value = res.data;
    }
  }catch(error){
    console.error('Erreur lors du chargement des produits:', error);
  }
})
function goToDetails(id: number) {
  if(props.type === 'produit') {

  }else{
    router.push({name: 'service-details', params: {id}});
  }
}
</script>

<template>
  <div class="container mt-2">
    <div class="grid is-col-min-10 is-column-gap-4 is-row-gap-4">
      <div class="cell is-clickable" v-for="item in items" :key="item.id" @click="goToDetails(item.id)">
        <CardItem :item="item"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
