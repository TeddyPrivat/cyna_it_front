<script setup lang="ts">
import { ref } from "vue";
import api from "@/services/api";

const firstname = ref('');
const lastname = ref('');
const email = ref('');
const password = ref('');
const message = ref('');

const submitForm = async () => {
  try {
    const queryParams = new URLSearchParams({
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value,
    });

    const response = await api.post(`/api/signin?${queryParams.toString()}`);
    if (response.status === 200) {
      console.log('Inscription réussie:', response.data);
    } else {
      console.error('Erreur lors de l\'inscription:', response.statusText);
    }
  } catch (error: any) {
    if (error.response) {
      message.value = error.response.data.message || 'Erreur lors de l\'inscription';
    } else if (error.request) {
      message.value = 'Aucune réponse du serveur';
    } else {
      message.value = 'Erreur: ' + error.message;
    }
  }
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <div>
      <label>Prénom</label>
      <input v-model="firstname" type="text" required />
    </div>
    <div>
      <label>Nom</label>
      <input v-model="lastname" type="text" required />
    </div>
    <div>
      <label>Email</label>
      <input v-model="email" type="email" required />
    </div>
    <div>
      <label>Mot de passe</label>
      <input v-model="password" type="password" required />
    </div>
    <button type="submit">S'inscrire</button>
  </form>
</template>
