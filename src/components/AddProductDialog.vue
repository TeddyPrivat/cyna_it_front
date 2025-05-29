<script setup lang="ts">
import AddProductForm from "@/components/AddProductForm.vue";

defineProps<{
  active: boolean,
}>();
</script>

<template>
 <div class="modal" :class="{ 'is-active': active }">
   <div class="modal-background" @click="$emit('close')"></div>
   <div class="modal-content">
     <div class="card">
       <div class="card-header">
         <div class="card-header-title title is-5">
           Création d'un produit
         </div>
         <button class="card-header-icon">
           <span class="icon" @click="$emit('close')">
             <i class="fas fa-xmark" aria-hidden="true"></i>
           </span>
         </button>
       </div>
       <div class="card-content">
         <AddProductForm @formSubmitted="$emit('close')"/>
       </div>
     </div>
   </div>
 </div>
</template>

<style scoped>

</style>
