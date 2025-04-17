<template>
  <div>
    <h1>TEST API</h1>
    <p>{{ message }}</p>
  </div>
</template>


<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";

const message = ref('Chargement...');

onMounted(async () => {
  try{
    const res = await axios.get('http://localhost:8000/api/test');
    message.value = res.data.message;
  }catch(error){
    console.log(error);
    message.value = "Erreur de connexion à l'API."
  }
})

</script>

<style scoped>

</style>
