<script setup lang="ts">
import axios from 'axios';
import type { Product } from '@/types/Product.ts';
import { computed, onMounted, ref } from 'vue'
import DeleteProductDialog from '@/components/DeleteProductDialog.vue';
import AddProductDialog from '@/components/AddProductDialog.vue';
import StockAlertNotification from '@/components/StockAlertNotification.vue'

const products = ref<Product[]>([]);
const product = ref<Product | null>(null);
const isModalOpen = ref(false);
const productToDelete = ref<Product | null>(null);
const productToModify = ref<Product | null>(null);
const isAddProductModalOpen = ref(false);
const formMode = ref("create");
const searchedInput = ref("");
const STOCK_LOW_LIMIT: number = 10;
const showLowStockAlert = ref(true);

const productStockIsEmpty = computed(() =>
  products.value.filter(product => product.stock === 0)
);

const closeLowStockNotification = () : void => {
  showLowStockAlert.value = false;
}

const lowStockProductTitles = computed(() =>
  productStockIsEmpty.value.map(p => p.title).join(', ')
);
function openAddModal(): void{
  formMode.value = "create";
  isAddProductModalOpen.value = true;
}

function openEditModal(product: Product){
  productToModify.value = product;
  openAddModal();
  formMode.value = "edit";
}

const fetchProducts = async () => {
  const response = await axios.get('http://localhost:8000/api/products');
  products.value = response.data;
};

function closeAddModal(): void{
  isAddProductModalOpen.value = false;
  fetchProducts();
}

function openDeleteModal(product: Product): void {
  isModalOpen.value = true;
  productToDelete.value = product;
}

function getStockClass(stock: number): string{
  if(stock === 0) return 'tag is-danger'
  if(stock <= STOCK_LOW_LIMIT) return 'tag is-warning'
  return 'tag';
}

function getLabelClass(stock: number): string{
  if(stock === 0) return 'RUPTURE'
  if(stock <= STOCK_LOW_LIMIT) return `${stock} ⚠`
  return `${stock}`;
}
async function deleteProduct(id: number | undefined) {
  try{
    if(id != null){
      await axios.post(`http://localhost:8000/api/product/delete/${id}`);
      await fetchProducts();
      productToDelete.value = null;
      isModalOpen.value = false;
    }
  }catch(error){
    console.log("Impossible de supprimer ce produit :", error);
  }
}

const filteredProducts = computed(() => {
  return products.value.filter(product =>
    product.title.toLowerCase().includes(searchedInput.value.trim().toLowerCase()) ||
    product.categories.some(category =>
      category.trim().toLowerCase().includes(searchedInput.value.trim().toLowerCase())
    )
  )
})

onMounted(async () => {
  try{
    const res = await axios.get<Product[]>('http://localhost:8000/api/products');
    products.value = res.data;
  }catch(error){
    console.error("Impossible de récupérer les produits: ", error)
  }
})
</script>

<template>
  <div class="container">
    <h1 class="title is-1 has-text-centered">Gestion de nos produits</h1>
    <StockAlertNotification
      :showLowStockAlert="showLowStockAlert"
      :productStockIsEmpty="productStockIsEmpty"
      :lowStockProductTitles="lowStockProductTitles"
      @close="closeLowStockNotification"
    />
    <div class="is-flex is-flex-direction-row is-justify-content-center">
      <div class="control has-icons-left is-flex-grow-1">
        <input class="input is-medium" type="text" v-model="searchedInput" placeholder="Nom du produit" id="inputSearch"/>
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </div>
      <button class="button is-success is-medium ml-3" @click="openAddModal">Ajouter un produit</button>
    </div>
    <table class="table is-striped mt-5">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Description</th>
          <th>Prix</th>
          <th>Stock</th>
          <th>Catégorie(s)</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in filteredProducts" :key="product.id">
          <td>{{product.title}}</td>
          <td>{{product.description}}</td>
          <td>{{product.price}}€</td>
          <td>
            <span :class="getStockClass(product.stock)">
              {{getLabelClass(product.stock)}}
            </span>
          </td>
          <td><span class="tag is-white">{{product.categories.join(', ')}}</span></td>
          <td><button class="button is-warning" @click="openEditModal(product)">Modifier</button></td>
          <td><button class="button is-danger" @click="openDeleteModal(product)">Supprimer</button></td>
        </tr>
      </tbody>
    </table>
  </div>
  <DeleteProductDialog
    :active="isModalOpen"
    :product="productToDelete"
    @close="isModalOpen = false"
    @confirm="deleteProduct(productToDelete?.id)"
  />

  <AddProductDialog
    v-if="formMode === 'edit'"
    :product="productToModify"
    :active="isAddProductModalOpen"
    :formMode="formMode"
    @close="closeAddModal"
  />
  <AddProductDialog
    v-else
    :active="isAddProductModalOpen"
    :product="product"
    :formMode="formMode"
    @close="closeAddModal"
  />
</template>

<style scoped>

</style>
