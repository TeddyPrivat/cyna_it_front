<template>
  <div>
    <h1>TEST API</h1>
    <p>{{ message }}</p>
  </div>
</template>


<script setup lang="ts">
import {onMounted, ref} from "vue";
import api from "@/services/api";

const message = ref('Chargement...');

onMounted(async () => {
  try{
    const res = await api.get('/api/test');
    message.value = res.data.message;
  }catch(error){
    console.log(error);
    message.value = "Erreur de connexion à l'API."
  }
})

</script>

<style scoped>

</style>
