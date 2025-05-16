<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import type { Service } from '@/types/Service.ts'

const service = ref<Service>();
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  try{
    const res = await axios.get(`http://localhost:8000/api/service/${route.params.id}`);
    service.value = res.data;
  }catch(error){
    console.log("Impossible d'afficher en détails le service", error);
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
      <div v-if="service">
        <div class="columns is-vcentered">
          <div class="column is-two-third">
            <figure class="image is-3by2">
              <img src="@/assets/logo_service_saas.png" alt="Image du service">
            </figure>
          </div>

          <div class="column">
            <h1 class="title has-text-centered">{{ service.title }}</h1>
            <p class="mb-4 has-text-centered">{{ service.description }}</p>
            <p class="title has-text-centered has-text-weight-bold is-purple-title">
              {{ service.price }}€
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
