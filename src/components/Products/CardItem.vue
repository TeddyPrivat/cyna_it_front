<script setup lang="ts">
import type { Product } from '@/types/Product.ts'
import type { Service } from '@/types/Service.ts'
defineProps<{item: Product | Service }>();

function isProduct(item: Product | Service): item is Product {
  return !!item && typeof item === 'object' && 'imgUrl' in item && 'stock' in item
}
</script>

<template>
<div class="card">
    <div class="card-image is-centered">
      <figure class="image">
        <img v-if="isProduct(item)"
          src="@/assets/cyna_logo.png"
          alt="Image du produit"
        />
        <img v-else
             src="@/assets/logo_service_saas.png"
             alt="Image du service"
        />
      </figure>
    </div>
  <div class="card-content">
    <div class="is-flex is-justify-content-space-between is-align-items-center">
      <p class="title truncate-one-line is-6 m-0">{{item.title}}</p>
      <p class="has-text-weight-bold ml-1">{{item.price}}€</p>
    </div>
    <p class="subtitle mt-2 truncate-multiline">{{item.description}}</p>
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
</style>
