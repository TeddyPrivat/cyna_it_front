<script setup lang="ts">
import type { Product } from "@/types/Product.ts";

defineProps<{
  active: Boolean,
  product: Product | null
}>();

defineEmits(['close','confirm']);
</script>

<template>
  <div class="modal" :class="{ 'is-active': active }">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Suppression d'un produit</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <p>
          Êtes-vous certain de vouloir supprimer le produit suivant :
          <strong>{{ product?.title }}</strong> ?
        </p>
      </section>
      <footer class="modal-card-foot is-flex is-justify-content-flex-end">
        <button class="button is-danger ml-2" @click="$emit('confirm')">Supprimer le produit</button>
        <button class="button ml-2" @click="$emit('close')">Annuler</button>
      </footer>
    </div>
  </div>
</template>

<style scoped>

</style>
