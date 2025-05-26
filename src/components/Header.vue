<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getPayloadFromToken } from '@/services/getPayloadFromToken.ts'
import axios from 'axios'

const isLoggedIn = ref(false);
const userId = ref<number | null>(null);
const user = ref<any>(null);

async function fetchUser(id: number, token: string) {
  try {
    const response = await axios.get(`http://localhost:8000/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    user.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de l’utilisateur', error);
  }
}


onMounted(() => {
  const token = localStorage.getItem('jwt');
  if (token) {
    const payload = getPayloadFromToken(token);
    console.log(payload)
    if (payload?.id) {
      userId.value = payload.id;
      isLoggedIn.value = true;
      fetchUser(payload.id, token);
    }
    console.log(`user id: ${user}`);

  }
});
</script>

<template>
  <nav class="navbar is-purple p-4 is-georama " role="navigation" aria-label="main navigation">
    <div class="navbar-brand ">
      <router-link to="/" class="navbar-item">
        <img src="@/assets/cyna_logo.png" alt="Logo de l'entreprise" style="max-height: 3rem;">
      </router-link>
      <router-link to="/" class="navbar-item has-text-white">
        Produits et services
      </router-link>
    </div>

    <div class="navbar-end is-align-items-center">
      <div class="control has-icons-right custom-control">
        <input class="input is-medium input-width" type="text" placeholder="Rechercher..." id="recherche"/>
        <span class="icon is-small is-right">
          <i class="fas fa-search"></i>
        </span>
      </div>

      <!-- Login/User info -->
      <div class="navbar-item is-flex is-align-items-center">
        <router-link v-if="isLoggedIn && user" to="/" class="navbar-item has-text-white mr-2">
          {{ user.prenom }}
        </router-link>
        <router-link v-else to="/login" class="navbar-item has-text-white mr-2">
          Connexion
        </router-link>

        <router-link to="/login" class="icon is-large has-text-white">
          <i class="far fa-user-circle fa-2x"></i>
        </router-link>
      </div>

    </div>
  </nav>
</template>

<style scoped>
.is-georama {
  font-family: "Georama", sans-serif;
}
.is-purple {
  background-color: #7200ff;
  color: white;
}
</style>

<script lang="ts">
export default {
  name: 'Header',
};


</script>
