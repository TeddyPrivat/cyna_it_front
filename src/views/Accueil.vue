<script setup lang="ts">
import Carousel from '@/components/Carousel/Carousel.vue'
import Grid from '@/components/Carousel/Grid.vue'
import api from '@/services/api'
import type { Product } from '@/types/Product'
import { onMounted, ref } from 'vue'
import ModalSupportMessage from '@/components/ModalSupportMessage.vue'

const products = ref<Product[]>([])
const imageList = ref<{ src: string; description: string }[]>([])
// en minuscule svp
const imageListType = 'produits'
const showModalSupport = ref<boolean>(false)
const successSupport = ref<boolean>(false)
const myList = [
  'Catégorie 1',
  'Catégorie 2',
  'Catégorie 3',
  'Catégorie 4',
  'Catégorie 5',
  'Catégorie 5',
]
// const isLoading = ref(true)

function isSupportFormSubmitted() {
  showModalSupport.value = false
  successSupport.value = true
}
onMounted(async () => {
  try {
    const res = await api.get<Product[]>('/api/products')
    products.value = res.data
    // console.log(products.value)

    imageList.value = products.value.map((product) => ({
      src: product.imgUrl,
      description: product.title,
    }))

    // console.log(imageList)
  } catch (error) {
    console.error('Erreur lors du chargement des produits:', error)
  }
})
</script>

<template>
  <main>
    <div class="title is-4">Carousel de produits</div>
    <!--    <div v-if="isLoading">Chargement des produits...</div>-->
    <Carousel :content-type="imageListType" :images="imageList" />
    <div class="title is-4 mt-6">
      Texte fixe bonzour les amis, pour faire les annonces depuis le back office
    </div>
    <div class="title is-6 mt-6 box">
      <p>Liste des catégories</p>
      <a class="subtitle is-6" href="#">Voir tout</a>
    </div>
    <Grid :items="myList" :columns="2">
      <template #default="{ item }">
        <div class="box has-text-centered">
          <a href="produit/{{index}}">{{ item }}</a>
        </div>
      </template>
    </Grid>
    <!--    <div v-if="isLoading">Chargement des produits...</div>-->
    <!--    <div class="title is-4 mt-6">Les produits du momemt</div>-->
    <!--    <Carousel :content-type="imageListType" :images="imageList"/>-->
    <div class="is-flex is-justify-content-center mt-5">
      <button class="button is-purple is-large is-responsive" @click="showModalSupport = true">
        Faire une demande de support
      </button>
      <ModalSupportMessage
        :show="showModalSupport"
        @close="showModalSupport = false"
        @submitted="isSupportFormSubmitted"
      />
    </div>
    <div v-if="successSupport">
      <div class="notification is-success mt-5">
        <button class="delete" @click="successSupport = false"></button>
        <p class="has-text-centered">
          Votre demande de support a bien été prise en compte, notre équipe reviendra vers vous dès
          que possible.
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.is-purple {
  background-color: #7200ff;
}
</style>
