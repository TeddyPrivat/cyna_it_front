<template>
  <div class="container">
    <div class="mt-5">
      <div
        v-if="visibleSlides.length > 0"
        class="box custom-carousel columns is-mobile is-multiline is-vcentered has-background-light"
      >
        <div
          class="column is-one-third"
          v-for="(item, i) in visibleSlides"
          :key="i"
        >
          <figure class="image is-4by3">
            <img v-if="item?.src" :src="item.src" :alt="item.description || 'Image'" @error="handleImageError($event)"/>
          </figure>
          <p class="has-text-centered mt-2">{{ item.description }}</p>
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

<!--      <div v-if="images.length > 1" class="has-text-centered mt-2">-->
<!--        <span-->
<!--          v-for="(index) in images.length"-->
<!--          :key="index"-->
<!--          class="tag mx-1"-->
<!--          :class="{ 'is-primary': index === current, 'is-light': index !== current }"-->
<!--          @click="goTo(index)"-->
<!--        >-->
<!--          {{ index + 1 }}-->
<!--        </span>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const defaultImage = new URL('@/assets/cyna_logo.png', import.meta.url).href

function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement
  target.src = defaultImage
}

type CarouselItem = {
  src: string
  description: string
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
</style>
