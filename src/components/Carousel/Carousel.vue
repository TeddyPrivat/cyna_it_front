<template>
  <div class="container">
    <div class="mt-5">
      <div class="box custom-carousel columns is-mobile is-multiline is-vcentered has-background-light">
        <div
          class="column is-one-third"
          v-for="(item, i) in visibleSlides"
          :key="i"
        >
          <figure class="image is-4by3">
            <img :src="item.src" :alt="item.description" />
          </figure>
          <p class="has-text-centered mt-2">{{ item.description }}</p>
        </div>
      </div>

      <div class="buttons is-centered mt-4">
        <button class="button is-primary" @click="prev">
          <span class="icon"><i class="fas fa-chevron-left"></i></span>
        </button>
        <button class="button is-primary" @click="next">
          <span class="icon"><i class="fas fa-chevron-right"></i></span>
        </button>
      </div>

      <div class="has-text-centered mt-2">
        <span
          v-for="(index) in images.length"
          :key="index"
          class="tag mx-1"
          :class="{ 'is-primary': index === current, 'is-light': index !== current }"
          @click="goTo(index)"
        >
          {{ index + 1 }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, defineProps } from 'vue'

type CarouselItem = {
  src: string
  description: string
}

const props = defineProps<{
  images: CarouselItem[]
}>()

const current = ref<number>(0)
let intervalId: number | null = null

const prev = () => {
  current.value = (current.value - 1 + props.images.length) % props.images.length
}

const next = () => {
  current.value = (current.value + 1) % props.images.length
}

const goTo = (index: number) => {
  current.value = index
}

const visibleSlides = computed(() => {
  const total = props.images.length
  const getIndex = (i: number) => (i + total) % total
  return [
    props.images[getIndex(current.value - 1)],
    props.images[getIndex(current.value)],
    props.images[getIndex(current.value + 1)],
  ]
})

onMounted(() => {
  intervalId = window.setInterval(next, 5000)
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