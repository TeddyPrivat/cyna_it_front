<script setup lang="ts">
// import type { Product } from '@/types/Product.ts';
// import type { Service } from '@/types/Service.ts';
import type { CardItem } from '@/types/CardItem.ts'

defineProps<{ item: CardItem }>();

const fallbackProductLogo = new URL('@/assets/logo_service_saas.png', import.meta.url).href;

</script>

<template>
  <div class="card ">
    <div class="card-image is-centered">
      <figure class="image product-image">
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
    <div class="card-content">
      <div class="is-flex is-justify-content-space-between is-align-items-center">
        <p class="title truncate-one-line is-6 m-0">{{ item.title }}</p>
        <p class="has-text-weight-bold ml-1">{{ item.price }}€</p>
      </div>
      <p class="subtitle mt-2 truncate-multiline">{{ item.description }}</p>
    </div>
  </div>
</template>


<style scoped>
img{
  max-height: 100px;
}
hr{
  height: 1px;
  border: none;
}
.subtitle{
  font-size: 0.85rem;
  text-align: justify;
}

.truncate-one-line{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  max-width: 100%;
}
.truncate-multiline {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.product-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
