<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import api from '@/services/api.ts'
import CardItem from '@/components/GenericComponents/CardItem.vue'
import type { Product } from '@/types/Product.ts'
import type { Service } from '@/types/Service.ts'
import type { CardItem as CardItemService } from '@/types/CardItem.ts'
import { useRouter } from 'vue-router';

const props = defineProps<{
  type: "product" | "service"
}>();
const router = useRouter();
const items = ref<CardItemService[]>([]);

function goToDetails(id: number) {
  if(props.type === "product") {
    router.push({name: 'product-details', params: {id}});
  }else{
    router.push({name: 'service-details', params: {id}});
  }
}
async function fetchItems() {
  try {
    if (props.type === "product") {
      const res = await api.get<Product[]>('/api/products');
      items.value = res.data;
    } else {
      const res = await api.get<Service[]>('/api/services');
      items.value = res.data;
    }
  } catch (error) {
    console.error('Erreur lors du chargement des éléments:', error);
  }
}

watch(() => props.type, () => {
  fetchItems();
});
onMounted(() => {
  fetchItems();
})
</script>

<template>
  <div class="container mt-2">
    <div class="grid is-col-min-11 is-column-gap-4 is-row-gap-4">
      <div class="cell is-clickable"
           v-for="item in items"
           :key="item.id"
           @click="goToDetails(item.id)">
        <CardItem :item="item"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
