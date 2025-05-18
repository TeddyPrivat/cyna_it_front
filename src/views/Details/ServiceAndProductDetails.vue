<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import type { Service } from '@/types/Service.ts'
import type { Product } from "@/types/Product.ts";

const item = ref<Service | Product>();
const router = useRouter();
const props = defineProps<{
  id: number,
  type: 'product' | 'service'
}>();

onMounted(async () => {
  try{
    if(props.type === 'product'){
     const res = await axios.get(`http://localhost:8000/api/product/${props.id}`);
     item.value = res.data;
    }else if(props.type === 'service'){
     const res = await axios.get(`http://localhost:8000/api/service/${props.id}`);
     item.value = res.data;
    }
  }catch(error){
    console.log("Impossible d'afficher en détails le service ou le produit", error);
  }
});
function backToList(){
  router.push({name: 'liste'});
}

</script>

<template>
  <div class="container mt-3">
    <button class="button is-ghost" @click="backToList()">Retour à la liste</button>
  </div>

  <div class="container is-flex is-justify-content-center is-align-items-center" style="min-height: 90vh;">
    <div class="box">
      <div v-if="item">
        <div class="columns is-vcentered">
          <div class="column is-two-third">
            <figure class="image is-3by2">
              <img v-if="props.type === 'product'"
                src="@/assets/cyna_logo.png"
                alt="Image du produit"
              />
              <img v-else
                src="@/assets/logo_service_saas.png"
                alt="Image du service">
            </figure>
          </div>

          <div class="column">
            <h1 class="title has-text-centered">{{ item.title }}</h1>
            <p class="mb-4 has-text-centered">{{ item.description }}</p>
            <p class="title has-text-centered has-text-weight-bold is-purple-title">
              {{ item.price }}€
            </p>
          </div>
        </div>
      </div>
      <p v-else>Chargement...</p>
    </div>
  </div>
</template>


<style scoped>
.is-purple-title{
  color: #7200ff;
}
</style>
