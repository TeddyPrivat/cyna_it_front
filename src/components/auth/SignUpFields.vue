<script setup lang="ts">
import { signup } from '@/services/auth'
import { ref } from 'vue'

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const nom = ref('');
const prenom = ref('');
const confirmPassword = ref('');

const handleSignup = async () => {
  try {
    const res = await signup(
      email.value,
      password.value,
      firstname.value,
      lastname.value,
      confirmPassword.value,
    );

    alert('Inscription réussie !');
    console.log(res);
  } catch (err: any) {
    console.error(err);
    alert('Échec de l\'inscription');
    errorMessage.value = err.message;
  }
};

</script>

<template>
  <div class="container ml-5 mr-5">
    <div v-if="errorMessage" class="notification is-danger">
      {{ errorMessage }}
    </div>

    <div class="field mt-2">
      <label for="firstname" class="field-label">Prénom</label>
      <div class="control has-icons-left">
        <input v-model="firstname" type="text" class="input input-width" placeholder="Prénom" id="firstname" />
        <span class="icon is-small is-left"><i class="fa-solid fa-user"></i></span>
      </div>
    </div>

    <div class="field mt-2">
      <label for="lastname" class="field-label">Nom</label>
      <div class="control has-icons-left">
        <input v-model="lastname" type="text" class="input input-width" placeholder="Nom" id="lastname" />
        <span class="icon is-small is-left"><i class="fa-solid fa-user"></i></span>
      </div>
    </div>

    <div class="field mt-2">
      <label for="email">Email</label>
      <div class="control has-icons-left">
        <input v-model="email" class="input input-width" type="email" placeholder="Email" id="email" />
        <span class="icon is-small is-left"><i class="fas fa-envelope"></i></span>
      </div>
    </div>

    <div class="field mt-2">
      <label for="password">Mot de passe</label>
      <div class="control has-icons-left">
        <input v-model="password" class="input input-width" type="password" placeholder="Mot de passe" id="password" />
        <span class="icon is-small is-left"><i class="fas fa-lock"></i></span>
      </div>
    </div>

    <div class="field mt-2">
      <label for="confirmPassword" class="field-label">Confirmer le mot de passe</label>
      <div class="control has-icons-left">
        <input v-model="confirmPassword" type="password" class="input input-width" placeholder="Confirmer le mot de passe" id="confirmPassword" />
        <span class="icon is-small is-left"><i class="fa-solid fa-lock"></i></span>
      </div>
    </div>

    <div class="field is-grouped is-grouped-centered">
      <div class="control mt-2">
        <button @click="handleSignup" type="button" class="button is-medium is-rounded is-purple is-georama">
          S'inscrire
        </button>
        <div class="mb-2 has-text-centered">
          <a href="/login" class="is-georama">Se connecter</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.is-purple {
  background-color: #7200ff;
  color: white;
}
.input-width{
  max-width: 95%;
}
</style>
