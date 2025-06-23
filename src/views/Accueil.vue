<script setup lang="ts">
import Carousel from '@/components/Carousel/Carousel.vue'
import Grid from '@/components/Carousel/Grid.vue'
import api from '@/services/api'
import type { CardItem } from '@/types/CardItem.ts'
import type { Category } from '@/types/Category'
import { onMounted, ref } from 'vue'
import ModalSupportMessage from '@/components/MessageSupport/ModalSupportMessage.vue'

// Références
const CardItem = ref<CardItem[]>([])
const imageList = ref<{ src: string; description: string; id: number }[]>([])
const imageListType = 'produits'

const services = ref<CardItem[]>([])
const serviceImageList = ref<{ src: string; description: string; id: number }[]>([])
const serviceImageListType = 'services'

const showModalSupport = ref<boolean>(false)
const successSupport = ref<boolean>(false)

const categories = ref<Category[]>([])
const myList = ref<string[]>([])

function isSupportFormSubmitted() {
  showModalSupport.value = false
  successSupport.value = true
}

onMounted(async () => {
  try {
    // Récupération des produits
    const resProducts = await api.get<CardItem[]>('/api/products')
    CardItem.value = resProducts.data
    imageList.value = CardItem.value.map((CardItem) => ({
      src: CardItem.imgUrl,
      description: CardItem.title,
      id: CardItem.id,
    }))

    // Récupération des services
    const resServices = await api.get<CardItem[]>('/api/services')
    services.value = resServices.data
    serviceImageList.value = services.value.map((service) => ({
      src: service.imgUrl,
      description: service.title,
      id: service.id,
    }))

    // Récupération des catégories
    const resCategories = await api.get<Category[]>('/api/categories')
    categories.value = resCategories.data
    myList.value = categories.value.map(cat => cat.categoryName)

  } catch (error) {
    console.error('Erreur lors du chargement des produits, services ou catégories:', error)
  }
})
</script>


<template>
  <main>
    <div class="title is-4">Carousel de produits</div>
    <!--    <div v-if="isLoading">Chargement des produits...</div>-->
    <Carousel :content-type="imageListType" :images="imageList"/>
    <div class="title is-4 mt-6">Carousel de services</div>
    <Carousel :content-type="serviceImageListType" :images="serviceImageList" />

    <div class="title is-6 mt-6 box">
      <p>Liste des catégories</p>
      <a class="subtitle is-6" href="/all">Voir tout</a>
    </div>
    <Grid :items="myList" :columns="2">
      <template #default="{ item }">
        <div class="box has-text-centered">
          <a href="produit/{{index}}">{{ item }}</a>
        </div>
      </template>
    </Grid>
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
