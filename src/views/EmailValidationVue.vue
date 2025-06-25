<script setup lang="ts">
import { useRoute } from 'vue-router'
import api from '@/services/api'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const token = route.params.token as string
const userStore = useUserStore()

const isLoading = ref(true)
const success = ref(false)
const errorMessage = ref('')

onMounted(async () => {
  try {
    // S'assurer que le user est chargé
    await userStore.initializeUser()
    const userId = userStore.user?.id

    if (!userId) {
      throw new Error('Utilisateur introuvable.')
    }

    // Appel de l’API
    const response = await api.get(`/api/validate/user/${userId}/${token}`)

    // Vérifie la réponse
    if (response.status === 200) {
      success.value = true
    } else {
      throw new Error("Échec de la validation.")
    }
  } catch (err: any) {
    console.error(err)
    errorMessage.value = err.message || 'Erreur inconnue.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section class="section">
    <div class="container has-text-centered">
      <div v-if="isLoading">
        <h1 class="title is-4">Veuillez patienter...</h1>
        <p class="subtitle is-6">Validation de votre email en cours...</p>
      </div>

      <div v-else-if="success">
        <h1 class="title is-4 has-text-success">Validation réussie 🎉</h1>
        <p class="subtitle is-6">Votre adresse email a été validée avec succès.</p>
        <router-link to="/" class="button is-success mt-4">
          Retour à l'accueil
        </router-link>
      </div>

      <div v-else>
        <h1 class="title is-4 has-text-danger">Échec de la validation</h1>
        <p class="subtitle is-6">{{ errorMessage }}</p>
        <router-link to="/login" class="button is-danger mt-4">
          Veuillez vous connecter avant de réessayer
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
