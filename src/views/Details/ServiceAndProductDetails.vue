<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import type { Service } from '@/types/Service.ts'
import type { Product } from "@/types/Product.ts";

import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);


//console.log('User in cart:', userStore.user);

const fallbackProductLogo = new URL('@/assets/logo_service_saas.png', import.meta.url).href;


// Récupère les infos du user via le token de connexion si elles ne sont pas déjà chargées
/*
onMounted(async () => {
  await fetchUser();
});

async function fetchUser() {
    const { data } = await api.get('/api/users')
    user.value = data
}
*/

const item = ref<Service | Product>();
const router = useRouter();
const props = defineProps<{
  id: number,
  type: 'product' | 'service'
}>();


const isAdding = ref(false);
const addToCartMsg = ref('');

onMounted(async () => {
  try{
    if(props.type === 'product'){
     const res = await api.get(`/api/product/${props.id}`);
     item.value = res.data;
    }else if(props.type === 'service'){
     const res = await api.get(`/api/service/${props.id}`);
     item.value = res.data;
    }
  }catch(error){
    console.log("Impossible d'afficher en détails le service ou le produit", error);
  }
});

function backToList(){
  router.push(`/${props.type}s`);
}

async function addToCart() {
  if (!user.value?.id) return;
  isAdding.value = true;
  addToCartMsg.value = '';
  try {
    // Prepare the payload with the raw item data, not the ref
    const payload = {
      product: props.type === 'product' && item.value.id ? item.value.id : null,
      service: props.type === 'service' && item.value.id ? item.value.id : null,
    };

    console.log(
      'Payload to add to cart:',
      payload.product ? payload.product : payload.service
    );

    await api.post(`/api/cart/${user.value.id}`, payload);

    addToCartMsg.value = 'Ajouté au Cart !';
  } catch (e) {

    console.error('Erreur lors de l\'ajout au panier:', e);
    addToCartMsg.value = "Erreur lors de l'ajout au panier.";

  } finally {
    isAdding.value = false;
  }
}

</script>

<template>
  <div class="container mt-3">
    <button class="button is-ghost" @click="backToList()">Retour à la liste</button>
  </div>

  <div
    class="container is-flex is-justify-content-center is-align-items-center"
    style="min-height: 90vh"
  >
    <div class="box">
      <div v-if="item">
        <div class="columns is-vcentered">
          <div class="column is-two-third">
            <figure class="image is-3by2">
              <img
                :src=" item.imgUrl || fallbackProductLogo"
                :alt="'Image du produit ' + item.title"
                @error="(event) => {
                const target = event.target as HTMLImageElement;
                if (target) {
                  target.src = fallbackProductLogo;
                }
              }"
              />
            </figure>
          </div>

          <div class="column">
            <h1 class="title has-text-centered">{{ item.title }}</h1>
            <p class="mb-4 has-text-centered has-text-justified">{{ item.description }}</p>
            <p class="title has-text-centered has-text-weight-bold is-purple-title">
              {{ item.price }}€
            </p>
            <div class="is-flex is-justify-content-center">
              <button class="button is-primary mt-4 is-responsive" :disabled="isAdding" @click="addToCart">
              <span v-if="isAdding" class="loader is-small"></span>
              <span v-else>Ajouter au panier</span>
              </button>
            </div>
            <p v-if="addToCartMsg" class="mt-2">{{ addToCartMsg }}</p>
          </div>
        </div>
      </div>
      <p v-else>Chargement...</p>
    </div>
  </div>
</template>

<style scoped>
.is-purple-title {
  color: #7200ff;
}
.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #7200ff;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
