<script setup lang="ts">
import type { CardItem } from '@/types/CardItem.ts'

const props = defineProps<{item: CardItem}>()

</script>

<template>
<div class="card">
    <div class="card-image is-centered">
      <figure class="image">
        <img
          src="../../assets/cyna_logo.png"
          alt="Image du produit"
        />
      </figure>
    </div>
  <div class="card-content">
    <div class="is-flex is-justify-content-space-between is-align-items-center">
      <p class="title is-6 m-0">{{item.title}}</p>
      <p class="has-text-weight-bold ml-1">{{item.price}}€</p>
    </div>
    <p class="subtitle mt-2">{{item.description}}</p>
  </div>
</div>
</template>

<style scoped>
img{
  max-height: 100px;
  max-width: 100%;
}
hr{
  height: 1px;
  border: none;
}
.subtitle{
  font-size: 0.85rem;
  text-align: justify;
}
</style>
