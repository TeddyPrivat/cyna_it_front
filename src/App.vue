<template>
  <div>
<<<<<<< HEAD
    <test/>
    <User/>
    <Signin/>
  </div>
=======
    <div>
      <template v-if="route.path === '/'">
        <h2 class="title is-4">Liste des produits</h2>
        <ListItems type="product" />
        <h2 class="title is-4">Liste des services</h2>
        <ListItems type="service" />
      </template>
>>>>>>> origin/develop-teddy

      <router-view v-else />
    </div>
  </div>
  <FooterComponent/>
</template>

<script setup lang="ts">
<<<<<<< HEAD
import Test from "@/components/Test.vue";
import User from "@/components/User.vue";
import Signin from "@/components/auth/SignIn.vue";
=======
import ListItems from '@/components/Products/ListItems.vue';
import FooterComponent from "@/components/FooterComponent.vue";
import { useRoute } from 'vue-router';

const route = useRoute();
>>>>>>> origin/develop-teddy
</script>

<style scoped>

</style>
