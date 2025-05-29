<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const emit = defineEmits(['formSubmitted']);

const title = ref("");
const description = ref("");
const price = ref(0);
const stock = ref(0);

const submitForm = async () => {
  try{
    const payload = {
      title: title.value,
      description: description.value,
      price: price.value,
      stock: stock.value,
    }
    await axios.post('http://localhost:8000/api/product/add', payload);
    emit("formSubmitted");
    title.value = '';
    description.value = '';
    price.value = 0;
    stock.value = 0;
  }catch(error){
    console.log("Impossible de soumettre le formulaire ", error);
  }
}
</script>

<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <div class="field">
        <div class="control">
          <label class="label" for="title">Nom</label>
          <input class="input" type="text" placeholder="Nom du produit" v-model="title" id="title" required/>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label" for="description">Description</label>
          <textarea class="textarea" v-model="description" id="description" placeholder="Description du produit" rows="3" required/>
        </div>
      </div>
      <div class="is-flex is-align-items-end is-justify-content-space-between">
        <div class="field">
          <label class="label" for="prix">Prix</label>
          <div class="control has-icons-right">
            <input class="input" type="number" v-model="price" placeholder="6.99" id="prix" required/>
            <span class="icon is-small is-right">
        <i class="fas fa-euro-sign"></i>
      </span>
          </div>
        </div>
        <div class="field ml-5">
          <label class="label" for="stock">Stock</label>
          <div class="control has-icons-right">
            <input class="input" type="number" placeholder="20" id="stock" required/>
            <span class="icon is-small is-right">
              <i class="fas fa-cubes"></i>
            </span>
          </div>
        </div>
        <div class="ml-5 mb-3">
          <button class="button is-primary" type="submit">Créer le produit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.control{
  margin-top:10px;
}
</style>
