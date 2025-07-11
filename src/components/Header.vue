<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const isDropdownOpen = ref(false)

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function closeDropdownOnClickOutside(event: MouseEvent) {
  const dropdown = document.getElementById('user-dropdown')
  if (dropdown && !dropdown.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  userStore.initializeUser()
  document.addEventListener('click', closeDropdownOnClickOutside)
})
</script>

<template>
  <nav aria-label="main navigation" class="navbar is-purple p-4 is-georama" role="navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item is-24x24">
        <img
          alt="Logo de l'entreprise"
          src="@/assets/logo-cyna-white.svg"
          style="max-height: 3rem"
        />
      </router-link>
      <router-link class="navbar-item has-text-white" to="/products"> Produits</router-link>
      <router-link class="navbar-item has-text-white" to="/services"> Services</router-link>
    </div>

    <div class="navbar-end is-align-items-center">
      <div class="control has-icons-right custom-control">
        <input
          id="recherche"
          class="input is-medium input-width"
          placeholder="Rechercher..."
          type="text"
        />
        <span class="icon is-small is-right">
          <i class="fas fa-search"></i>
        </span>
      </div>

      <!-- Login/User info -->
      <div class="navbar-item is-flex is-align-items-center">
        <router-link
          v-if="userStore.isLoggedIn && userStore.user"
          class="navbar-item has-text-white mr-2"
          to="/"
        >
          {{ userStore.user.firstname }}
        </router-link>
        <router-link v-else to="/login" class="navbar-item has-text-white mr-2">
          Connexion
        </router-link>

        <!-- Icône + dropdown seulement si connecté -->
        <div
          v-if="userStore.isLoggedIn"
          class="icon is-large has-text-white"
          @click.stop="toggleDropdown"
        >
          <i class="far fa-user-circle fa-2x"></i>

          <!-- Dropdown visible seulement si ouvert -->
          <div
            v-if="isDropdownOpen"
            id="user-dropdown"
            class="navbar-item has-dropdown is-active"
            style="position: relative"
          >
            <div class="navbar-dropdown is-right" style="position: absolute; top: 2.5rem; right: 0">
              <router-link class="navbar-item" to="/cart">Mon panier</router-link>
              <router-link class="navbar-item" to="/profile">Mon profil</router-link>
              <router-link class="navbar-item" to="/settings">Paramètres</router-link>
              <hr class="navbar-divider" />
              <router-link class="navbar-item" to="/logout">Déconnexion</router-link>
            </div>
          </div>
        </div>

        <!-- Icône vers login si non connecté -->
        <router-link v-else to="/login" class="icon is-large has-text-white">
          <i class="far fa-user-circle fa-2x"></i>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.is-georama {
  font-family: 'Georama', sans-serif;
}

.is-purple {
  background-color: #7200ff !important;
  color: white !important;
}

.navbar {
  background-color: #7200ff;
}

.navbar-dropdown {
  background-color: #7200ff !important;
  border: none;
  box-shadow: none;
  padding-top: 0;
  padding-bottom: 0;
}

.navbar-item:hover {
  background-color: #7200ff !important;
}
.navbar-item.is-active,
.router-link-active.navbar-item {
  background-color: #7200ff !important;
  color: white !important;
}

.navbar-dropdown .navbar-item {
  background-color: #7200ff !important;
  color: white !important;
}

.navbar-dropdown .navbar-item:hover {
  background-color: #5e00d6 !important;
}

.navbar-divider {
  background-color: white;
  height: 1px;
  margin: 0.5rem 0;
}

.navbar-item.has-dropdown:hover,
.navbar-item.has-dropdown {
  background-color: #7200ff !important;
}
</style>

<script lang="ts">
export default {
  name: 'Header',
}
</script>
