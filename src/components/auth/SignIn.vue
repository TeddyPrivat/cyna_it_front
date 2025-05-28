<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const firstname = ref('');
const lastname = ref('');
const email = ref('');
const password = ref('');

const submitForm = async () => {
  try {
    const queryParams = new URLSearchParams({
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value,
    });

    const response = await axios.post(`http://localhost:8000/api/signin?${queryParams.toString()}`);
    if (response.status === 200) {
      // L'inscription a réussi
      console.log('Inscription réussie:', response.data);
      // Vous pouvez rediriger l'utilisateur ou afficher un message de succès ici
    } else {
      // Gérer les autres codes d'état si nécessaire
      console.error('Erreur lors de l\'inscription:', response.statusText);
    }
  } catch (error: any) {
    if (error.response) {
      // La requête a été faite et le serveur a répondu avec un code d'état
      // qui sort de la plage des 2xx
      message.value = error.response.data.message || 'Erreur lors de l\'inscription';
    } else if (error.request) {
      // La requête a été faite mais aucune réponse n'a été reçue
      message.value = 'Aucune réponse du serveur';
    } else {
      // Quelque chose s'est produit lors de la configuration de la requête
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
