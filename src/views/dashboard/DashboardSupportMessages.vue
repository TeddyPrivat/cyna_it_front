<script setup lang="ts">
import api from '@/services/api'
import type { MessageSupport } from '@/types/MessageSupport.ts'
import CardMessage from '@/components/CardMessage.vue'
import { computed, onMounted, ref } from 'vue'

let messages = ref<MessageSupport[]>([]);
const searchedInput = ref("");

const filteredList = computed(() => { //computed qui permet d'afficher dynamiquement la liste en fonction de la recherche
  return messages.value.filter(message => { // recherche possible sur le nom, prénom, email
    return message.email.toLowerCase().includes(searchedInput.value.trim().toLowerCase()) ||
    message.firstname.toLowerCase().includes(searchedInput.value.trim().toLowerCase()) ||
    message.lastname.toLowerCase().includes(searchedInput.value.trim().toLowerCase())
  })
})
async function deleteSupportMessage(message: MessageSupport) {
  const id = message.id;
  try{
    await api.delete(`/api/support/message/${id}`);
    messages.value = messages.value.filter(m => m.id !== id);
    console.log("Le message de support a bien été supprimé.");
  }catch(error){
    console.log("La suppression du message n'a pas pu se faire : " + error);
  }
}
onMounted(async () => {
  try{
    const response = await api.get<MessageSupport[]>("/api/support/message");
    messages.value = response.data;
    console.log(messages.value);
    console.log("Les messages ont bien été récupérés");
  }catch(error){
    console.log("Erreur lors de la récupération des messages de support : " + error)
  }
})
</script>

<template>
  <div class="container px-2">
    <h1 class="title is-2 has-text-centered mt-5 mb-4">
      Liste des messages de support
    </h1>

    <div class="field mb-5">
      <div class="control">
        <input
          type="search"
          class="input"
          placeholder="Rechercher par nom, prénom, email..."
          v-model="searchedInput"
          id="searchInput"
        />
      </div>
    </div>

    <div class="columns is-multiline">
      <div
        class="column is-full mt-2"
        v-for="message in filteredList"
        :key="message.id"
      >
        <CardMessage
          :message="message"
          @deleteMessage="deleteSupportMessage(message)"
        />
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>
