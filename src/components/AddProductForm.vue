<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
import type { Product } from '@/types/Product.ts'

const emit = defineEmits(['formSubmitted']);
const props = defineProps<{
  formMode: string,
  product: Product | null
}>();

const form = ref<Product>({
  id: 0,
  title: '',
  description: '',
  imgUrl: '',
  price: 0,
  stock: 0,
});

const submitForm = async () => {
  try{
    const payload = {
      id: form.value.id,
      title: form.value.title,
      description: form.value.description,
      price: form.value.price,
      stock: form.value.stock,
    }
    if(props.formMode === "create"){
      await axios.post('http://localhost:8000/api/product/add', payload);
    }else{
      const productId = props.product?.id;
      if(!productId){
        console.log("Produit non trouvé")
      }
      await axios.put(`http://localhost:8000/api/product/edit/${productId}`, payload);
    }
    emit("formSubmitted");
    form.value = {
      id: 0,
      title: '',
      description: '',
      imgUrl: '',
      price: 0,
      stock: 0
    }
  }catch(error){
    console.log("Impossible de soumettre le formulaire ", error);
  }
}
watch(
  () => props.product,
  (newProduct) => {
    if (props.formMode === 'edit' && newProduct) {
      form.value = newProduct
    } else {
      form.value = {
        id: 0,
        title: '',
        description: '',
        imgUrl: '',
        price: 0,
        stock: 0
      }
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <div class="field">
        <label class="label" for="title">Nom</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Nom du produit"
            v-model="form.title"
            id="title"
            required
          />
        </div>
      </div>

      <div class="field">
        <label class="label" for="description">Description</label>
        <div class="control">
          <textarea
            class="textarea"
            v-model="form.description"
            id="description"
            placeholder="Description du produit"
            rows="3"
            required
          />
        </div>
      </div>

      <div class="is-flex is-align-items-end is-justify-content-space-between">
        <div class="field">
          <label class="label" for="prix">Prix</label>
          <div class="control has-icons-right">
            <input
              class="input"
              type="number"
              step="0.01"
              v-model.number="form.price"
              placeholder="6.99"
              id="prix"
              required
            />
            <span class="icon is-small is-right">
              <i class="fas fa-euro-sign"></i>
            </span>
          </div>
        </div>

        <div class="field ml-5">
          <label class="label" for="stock">Stock</label>
          <div class="control has-icons-right">
            <input
              class="input"
              type="number"
              v-model.number="form.stock"
              placeholder="20"
              id="stock"
              required
            />
            <span class="icon is-small is-right">
              <i class="fas fa-cubes"></i>
            </span>
          </div>
        </div>

        <div class="ml-5 mb-3">
          <button class="button is-primary" type="submit">
            {{ props.formMode === 'create' ? 'Créer' : 'Modifier' }} le produit
          </button>
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
