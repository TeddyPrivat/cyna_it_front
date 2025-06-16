<template>
  <template v-if="route.path !== '/logout'">
    <Header />
  </template>

  <main>
    <div>
<!--      <template v-if="route.path === '/'">-->
<!--        <h2 class="title is-4">Liste des produits</h2>-->
<!--        <ListItems type="product" />-->
<!--        <h2 class="title is-4">Liste des services</h2>-->
<!--        <ListItems type="service" />-->
<!--      </template>-->

      <router-view />
    </div>
  </main>
  <FooterComponent/>
</template>

<script setup lang="ts">

import Test from "@/components/Test.vue";
import User from "@/components/User.vue";
import Signin from "@/components/auth/SignIn.vue";

import ListItems from '@/components/Products/ListItems.vue';
import FooterComponent from "@/components/FooterComponent.vue";
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue'

const route = useRoute();
</script>

<style scoped>
main{
  padding: 1rem 2rem 0 2rem;
}
</style>
