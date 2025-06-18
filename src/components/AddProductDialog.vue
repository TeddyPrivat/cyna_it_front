<script setup lang="ts">
import AddProductForm from "@/components/AddProductForm.vue";
import type { CardItem } from '@/types/CardItem.ts'

defineProps<{
  active: boolean,
  formMode: string,
  item: CardItem | null,
  type: string
}>();
</script>

<template>
 <div v-if="active" class="modal is-active">
   <div class="modal-background" @click="$emit('close')"></div>
   <div class="modal-content">
     <div class="card">
       <div class="card-header">
         <div class="card-header-title title is-5">
           {{ formMode === "create" ? "Création" : "Modification" }} d'un {{type === 'product' ? 'produit' : 'service'}}
         </div>
         <button class="card-header-icon">
           <span class="icon" @click="$emit('close')">
             <i class="fas fa-xmark" aria-hidden="true"></i>
           </span>
         </button>
       </div>
       <div class="card-content">
         <AddProductForm :formMode="formMode" :item="item" :type="type" @formSubmitted="$emit('close')"/>
       </div>
     </div>
   </div>
 </div>
</template>

<style scoped>

</style>
