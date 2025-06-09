<script setup lang="ts">
import Carousel from '@/components/Carousel/Carousel.vue'
import Grid from '@/components/Carousel/Grid.vue'
import axios from 'axios'
import type { Product } from '@/types/Product'
import {onMounted, ref} from 'vue'

const products = ref<Product[]>([])
const imageList = ref<{ src: string; description: string }[]>([])
// en minuscule svp
const imageListType = 'produits'

const myList = ['Catégorie 1', 'Catégorie 2', 'Catégorie 3', 'Catégorie 4', 'Catégorie 5', 'Catégorie 5'];
// const isLoading = ref(true)

onMounted(async () => {
  try {
    const res = await axios.get<Product[]>('http://127.0.0.1:8000/api/products')
    products.value = res.data
    // console.log(products.value)

    imageList.value = products.value.map(product => ({
      src: product.imgUrl,
      description: product.title
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
    <Carousel :content-type="imageListType" :images="imageList"/>
    <div class="title is-4 mt-6">Texte fixe bonzour les amis, pour faire les annonces depuis le back office</div>
    <div class="title is-6 mt-6 box has-background-light">
      <p>Liste des catégories</p><a class="subtitle is-6" href="#">Voir tout</a>
    </div>
    <Grid :items="myList" :columns="2">
      <template #default="{ item }">
        <div class="box has-text-centered">
          <a href='produit/{{index}}'>{{ item }}</a>
        </div>
      </template>
    </Grid>
<!--    <div v-if="isLoading">Chargement des produits...</div>-->
    <div class="title is-4 mt-6">Les produits du momemt</div>
    <Carousel :content-type="imageListType" :images="imageList"/>
  </main>
</template>

<style scoped>
/* Ajoute du style si besoin */
</style>
