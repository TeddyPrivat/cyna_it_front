<script setup lang="ts">
import {ref} from "vue";
import api from "@/services/api";

const lastname = ref<string>("");
const firstname = ref<string>("");
const email = ref<string>("");
const message = ref<string>("");

const emit = defineEmits(["submitted"])
const submitForm = async () => {
  const payload = {
    lastname: lastname.value,
    firstname: firstname.value,
    email: email.value,
    message: message.value,
  }
  try{
    await api.post("/api/support/message", payload);
    emit('submitted');
    console.log("Message envoyé !");
  }catch(error){
    console.log("Erreur lors de l'envoi du message : " + error);
  }
}
</script>

<template>
  <div class="container">
    <p class="title is-3">Formulaire de demande de support</p>
    <form @submit.prevent="submitForm">
      <div class="field">
        <label class="label" for="nom">Nom</label>
        <div class="is-flex is-align-items-center is-justify-content-start is-column-gap-2">
          <input class="input" type="text" placeholder="Votre nom" id="nom" v-model="lastname" required/>
          <input class="input" type="text" placeholder="Votre prénom" v-model="firstname" required/>
        </div>
      </div>
      <div class="field">
        <label class="label" for="email">Email</label>
      <input class="input" type="email" placeholder="Votre email" id="email" v-model="email" required/>
      </div>
      <div class="field">
        <label class="label" for="message">Message</label>
        <textarea class="textarea" type="text" placeholder="Votre message..." id="message" v-model="message" @keyup.enter="submitForm" required/>
      </div>
      <div class="is-flex is-justify-content-center mt-5">
        <button class="button" type="submit">Soumettre la demande de support</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.button{
  background-color: #7200ff;
}
.title{
  color: #7200ff;
}
</style>
