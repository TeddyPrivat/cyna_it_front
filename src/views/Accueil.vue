<script setup lang="ts">
import Carousel from '@/components/Carousel/Carousel.vue'
import Grid from '@/components/Carousel/Grid.vue'
const imageList = [
  { src: 'https://picsum.photos/id/1018/800/400', description: 'Produit 1' },
  { src: 'https://picsum.photos/id/1015/800/400', description: 'Produit 2' },
  { src: 'https://picsum.photos/id/1019/800/400', description: 'Produit 3' }
]

const myList = ['Catégorie 1', 'Catégorie 2', 'Catégorie 3', 'Catégorie 4', 'Catégorie 5', 'Catégorie 5']
</script>

<template>
  <main>
    <div class="title is-4">Carousel de produits</div>
    <Carousel :images="imageList"/>
    <div class="title is-4">Texte fixe bonzour les amis, pour faire les annonces depuis le back office</div>
    <div class="title is-6 box has-background-light">Liste des catégories</div>
    <Grid :items="myList" :columns="2">
      <template #default="{ item }">
        <div class="box has-text-centered">
          <a href="#">{{ item }}</a>
        </div>
      </template>
    </Grid>
    <div class="title is-4">Les produits du momemt</div>
    <Carousel :images="imageList"/>
  </main>
</template>

<style scoped>
/* Ajoute du style si besoin */
</style>
