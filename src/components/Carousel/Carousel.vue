<template>
  <div class="container">
    <div class="mt-5">
      <div
        v-if="visibleSlides.length > 0"
        class="custom-carousel columns is-mobile is-multiline is-vcentered "
      >
        <div
          class="column is-one-third"
          v-for="(item, i) in visibleSlides"
          :key="i"
        >
          <div class="box is-hovered has-background-light">
            <figure class="image is-4by3">
              <img
                :src="item.src && item.src.trim() !== ''
                  ? item.src : props.contentType === 'produits'
                    ? defaultImageProduct : defaultImageService
                  "
                :alt="item.description || 'Image'"
                @error="handleImageError($event)"
                @click="goToDetails(item.id)"
              />
            </figure>
            <p class="has-text-centered mt-2 has-text-dark">{{ item.description }}</p>
          </div>

        </div>
      </div>

      <div v-else class="has-text-centered box has-background-light">
        <p>Aucun {{ props.contentType }} à afficher</p>
      </div>

      <div v-if="images.length > 1" class="buttons is-centered mt-4">
        <button class="button is-primary" @click="prev">
          <span class="icon"><i class="fas fa-chevron-left"></i></span>
        </button>
        <button class="button is-primary" @click="next">
          <span class="icon"><i class="fas fa-chevron-right"></i></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import router from '@/router'

const defaultImageProduct = new URL('@/assets/cyna_logo.png', import.meta.url).href
const defaultImageService = new URL('@/assets/logo_service_saas.png', import.meta.url).href


function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement
  if (props.contentType === 'produits') {
    target.src = defaultImageProduct
  } else {
    target.src = defaultImageService
  }
}

type CarouselItem = {
  src: string
  description: string
  id: number
}

const props = defineProps<{
  images: CarouselItem[]
  contentType: string
}>()

const current = ref(0)
let intervalId: number | null = null

const prev = () => {
  if (props.images.length > 0) {
    current.value = (current.value - 1 + props.images.length) % props.images.length
  }
}

const next = () => {
  if (props.images.length > 0) {
    current.value = (current.value + 1) % props.images.length
  }
}

const goTo = (index: number) => {
  current.value = index
}

const visibleSlides = computed(() => {
  const total = props.images.length
  if (total === 0) return []

  const getIndex = (i: number) => (i + total) % total

  if (total === 1) return [props.images[0]]
  if (total === 2) return [
    props.images[getIndex(current.value)],
    props.images[getIndex(current.value + 1)],
  ]

  return [
    props.images[getIndex(current.value - 1)],
    props.images[getIndex(current.value)],
    props.images[getIndex(current.value + 1)],
  ]
})

function goToDetails(id: number) {
  if(props.contentType === "produits") {
    router.push({name: 'product-details', params: {id}});
  }else{
    router.push({name: 'service-details', params: {id}});
  }
}

onMounted(() => {
  intervalId = window.setInterval(next, 10000)

})

onBeforeUnmount(() => {
  if (intervalId !== null) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.custom-carousel {
  display: flex;
}
.image img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.is-hovered:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;
}
</style>