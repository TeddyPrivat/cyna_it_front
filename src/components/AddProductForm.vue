<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import axios from 'axios'
import type { Category } from '@/types/Category.ts'
import type { CardItem } from "@/types/CardItem.ts";

const emit = defineEmits(['formSubmitted']);
const props = defineProps<{
  formMode: string,
  item: CardItem | null,
  type: string
}>();

const form = ref<CardItem>({
  id: 0,
  title: '',
  description: '',
  imgUrl: '',
  price: 0,
  stock: 0,
  categories: []
});
const categories = ref<Category[]>([]);
const fetchCategories = async () => {
  const response = await axios.get("http://localhost:8000/api/categories");
  categories.value = response.data;
}

const submitForm = async () => {
  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.warn('Utilisateur non authentifié');
      return;
    }

    const payload = {
      id: form.value.id,
      title: form.value.title,
      description: form.value.description,
      price: form.value.price,
      stock: form.value.stock,
      categories: form.value.categories.map((id) => ({ id }))
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    if (props.formMode === "create") {
      if (props.type === 'product') {
        await axios.post('http://localhost:8000/api/product', payload, config);
      } else {
        await axios.post('http://localhost:8000/api/service', payload, config);
      }
    } else { // Modification
      const itemId = props.item?.id;
      if (!itemId) {
        console.log(`${props.type === 'product' ? 'Produit' : 'Service'} non trouvé`);
        return;
      }

      const url = `http://localhost:8000/api/${props.type}/${itemId}`;
      await axios.put(url, payload, config);
    }

    emit("formSubmitted");

    form.value = {
      id: 0,
      title: '',
      description: '',
      imgUrl: '',
      price: 0,
      stock: 0,
      categories: []
    };
  } catch (error) {
    console.log("Impossible de soumettre le formulaire", error);
  }
};
watch(
  () => props.item,
  (newItem) => {
    if (props.formMode === 'edit' && newItem) {
      form.value = {
        ...newItem,
        categories: newItem.categories.map((cat: Category) => cat.id) as unknown as Category[]
      }
    } else {
      form.value = {
        id: 0,
        title: '',
        description: '',
        imgUrl: '',
        price: 0,
        stock: 0,
        categories: []
      }
    }
  },
  { immediate: true }
)

onMounted(() => {
  fetchCategories();
})
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
            :placeholder="props.type === 'product' ? 'Nom du produit' : 'Nom du service'"
            v-model="form.title"
            id="title"
            name="title"
            required
            autocomplete="off"
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
            name="description"
            :placeholder="props.type === 'product' ? 'Description du produit' : 'Description du service'"
            rows="3"
            required
            autocomplete="off"
          />
        </div>
      </div>
      <div class="field">
        <label class="label" for="categories">Catégories</label>
        <div class="control">
          <div class="select is-multiple is-fullwidth">
            <select
              id="categories"
              multiple
              v-model="form.categories"
              size="3"
              required
            >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.categoryName }}
            </option>
            </select>
          </div>
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
              name="price"
              required
              autocomplete="off"
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
              name="stock"
              required
              autocomplete="off"
            />
            <span class="icon is-small is-right">
              <i class="fas fa-cubes"></i>
            </span>
          </div>
        </div>

        <div class="ml-5 mb-3">
          <button class="button is-primary" type="submit">
            {{ props.formMode === 'create' ? 'Créer' : 'Modifier' }} le {{props.type === 'product' ? 'produit' : 'service'}}
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
