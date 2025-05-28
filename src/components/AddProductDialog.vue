<script setup lang="ts">
import AddProductForm from "@/components/AddProductForm.vue";

const props = defineProps<{
  active: boolean,
}>();
</script>

<template>
 <div class="modal" :class="{ 'is-active': active }">
   <div class="modal-background is-blurred" @click="$emit('close')"></div>
   <div class="modal-content">
     <AddProductForm/>
   </div>
   <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
 </div>
</template>

<style scoped>
.modal-background.is-blurred{
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background-color: rgba(10, 10, 10, 0.4);
}
</style>
