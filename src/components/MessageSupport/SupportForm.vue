<script setup lang="ts">
import { onMounted, ref } from 'vue'
import api from '@/services/api.ts'
import { useUserStore } from '@/stores/user.ts'

const lastname = ref<string>('')
const firstname = ref<string>('')
const email = ref<string>('')
const message = ref<string>('')

const userStore = useUserStore()
const isLogged = ref<boolean>(false)
const emit = defineEmits(['submitted'])
const submitForm = async () => {
  const payload = {
    lastname: lastname.value,
    firstname: firstname.value,
    email: email.value,
    message: message.value,
  }
  try {
    await api.post('/api/support/message', payload)
    emit('submitted')
    console.log('Message envoyé !')
  } catch (error) {
    console.log("Erreur lors de l'envoi du message : " + error)
  }
}
onMounted(() => {
  if (userStore.isLoggedIn && userStore.user) {
    isLogged.value = true
    firstname.value = userStore.user.firstname
    lastname.value = userStore.user.lastname
    email.value = userStore.user.email
  }
})
</script>

<template>
  <div class="container">
    <p class="title is-3">Formulaire de demande de support</p>
    <form @submit.prevent="submitForm">
      <div class="field">
        <label class="label" for="nom">Nom</label>
        <div class="is-flex is-align-items-center is-justify-content-start is-column-gap-2">
          <input
            id="nom"
            v-model="lastname"
            :readonly="isLogged"
            class="input"
            placeholder="Votre nom"
            required
            type="text"
          />
          <input
            v-model="firstname"
            :readonly="isLogged"
            class="input"
            placeholder="Votre prénom"
            required
            type="text"
          />
        </div>
      </div>
      <div class="field">
        <label class="label" for="email">Email</label>
        <input
          id="email"
          v-model="email"
          :readonly="isLogged"
          class="input"
          placeholder="Votre email"
          required
          type="email"
        />
      </div>
      <div class="field">
        <label class="label" for="message">Message</label>
        <textarea
          id="message"
          v-model="message"
          class="textarea"
          placeholder="Votre message..."
          required
          type="text"
          @keyup.enter="submitForm"
        />
      </div>
      <div class="is-flex is-justify-content-center mt-5">
        <button class="button" type="submit">Soumettre la demande de support</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.button {
  background-color: #7200ff;
}

.title {
  color: #7200ff;
}
</style>
