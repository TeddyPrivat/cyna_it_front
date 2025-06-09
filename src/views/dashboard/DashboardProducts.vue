<script setup lang="ts">
import axios from 'axios';
import type { Product } from '@/types/Product.ts';
import { computed, onMounted, ref } from 'vue'
import DeleteProductDialog from '@/components/DeleteProductDialog.vue';
import AddProductDialog from '@/components/AddProductDialog.vue';
import StockAlertNotification from '@/components/StockAlertNotification.vue'
import type {CardItem} from "@/types/CardItem.ts";
import type {Service} from "@/types/Service.ts";

const items = ref<CardItem[]>([]);
const item = ref<CardItem | null>(null);
const isModalOpen = ref(false);
const itemToDelete = ref<CardItem | null>(null);
const itemToModify = ref<CardItem | null>(null);
const isAddProductModalOpen = ref(false);
const formMode = ref("create");
const searchedInput = ref("");
const STOCK_LOW_LIMIT: number = 10;
const showLowStockAlert = ref(true);

const props = defineProps<{
  type: string
}>();

const productStockIsEmpty = computed(() =>
  items.value.filter(product => product.stock === 0)
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

function openEditModal(item: CardItem){
  itemToModify.value = item;
  openAddModal();
  formMode.value = "edit";
}

const fetchProducts = async () => {
  if(props.type === 'product'){
    const res = await axios.get<Product[]>('http://localhost:8000/api/products');
    items.value = res.data;
  }else{
    const res = await axios.get<Product[]>('http://localhost:8000/api/services');
    items.value = res.data;
  }
};

function closeAddModal(): void{
  isAddProductModalOpen.value = false;
  fetchProducts();
}

function openDeleteModal(item: CardItem): void {
  isModalOpen.value = true;
  itemToDelete.value = item;
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
      if(props.type === 'product'){
        await axios.delete(`http://localhost:8000/api/product/${id}`);
        await fetchProducts();
        itemToDelete.value = null;
        isModalOpen.value = false;
      }else{
        await axios.delete(`http://localhost:8000/api/service/${id}`);
        await fetchProducts();
        itemToDelete.value = null;
        isModalOpen.value = false;
      }
    }
  }catch(error){
    console.log("Impossible de supprimer ce produit :", error);
  }
}

const filteredProducts = computed(() => {
  return items.value.filter(item =>
    item.title.toLowerCase().includes(searchedInput.value.trim().toLowerCase()) ||
    item.categories.some(category =>
      category.trim().toLowerCase().includes(searchedInput.value.trim().toLowerCase())
    )
  )
})

onMounted(async () => {
  try{
    if(props.type === 'product'){
      const res = await axios.get<Product[]>('http://localhost:8000/api/products');
      items.value = res.data;
    }else{
      const res = await axios.get<Service[]>('http://localhost:8000/api/services');
      items.value = res.data;
    }
  }catch(error){
    console.error("Impossible de récupérer les produits ou services: ", error);
  }
})
</script>

<template>
  <div class="container">
    <h1 class="title is-1 has-text-centered">
      Gestion de nos {{props.type === 'product' ? 'produits' : 'services'}}
    </h1>
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
      <button class="button is-success is-medium ml-3" @click="openAddModal">
        Ajouter un {{props.type === 'product' ? 'produit' : 'service'}}
      </button>
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
        <tr v-for="item in filteredProducts" :key="item.id">
          <td>{{item.title}}</td>
          <td>{{item.description}}</td>
          <td>{{item.price}}€</td>
          <td>
            <span :class="getStockClass(item.stock)">
              {{getLabelClass(item.stock)}}
            </span>
          </td>
          <td><span v-if="item.categories" class="tag is-white">{{item.categories.join(', ')}}</span></td>
          <td><button class="button is-warning" @click="openEditModal(item)">Modifier</button></td>
          <td><button class="button is-danger" @click="openDeleteModal(item)">Supprimer</button></td>
        </tr>
      </tbody>
    </table>
  </div>
  <DeleteProductDialog
    :active="isModalOpen"
    :item="itemToDelete"
    @close="isModalOpen = false"
    @confirm="deleteProduct(itemToDelete?.id)"
  />

  <AddProductDialog
    v-if="formMode === 'edit'"
    :item="itemToModify"
    :active="isAddProductModalOpen"
    :formMode="formMode"
    :type="props.type"
    @close="closeAddModal"
  />
  <AddProductDialog
    v-else
    :active="isAddProductModalOpen"
    :item="item"
    :type="props.type"
    :formMode="formMode"
    @close="closeAddModal"
  />
</template>

<style scoped>

</style>
