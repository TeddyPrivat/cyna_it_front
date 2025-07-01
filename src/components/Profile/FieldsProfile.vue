<script lang="ts" setup>
import { useUserStore } from '@/stores/user.ts'
import { onMounted, ref } from 'vue'
import api from '@/services/api.ts'
import PasswordModificationModal from '@/components/Profile/PasswordModificationModal.vue'

const userStore = useUserStore()

const firstname = ref<string>('');
const lastname = ref<string>('');
const email = ref<string>('');
const adress = ref<string>('');
const city = ref<string>('');
const postalCode = ref<string>('');
const showModal = ref<boolean>(false);
const notifSuccess = ref<string | null>(null);
const isLoading = ref<boolean>(false);

const submitForm = async () => {
  isLoading.value = true;
  const payload = {
    firstname : firstname.value,
    lastname: lastname.value,
    email : email.value,
    adress : adress.value,
    city : city.value,
    postalCode : postalCode.value,
  }
  try{
    await api.put(`/api/users/${userStore.user.id}`, payload);
    notifSuccess.value = 'Les informations de votre compte ont bien été modifiées.'
    console.log("L'utilisateur a bien été modifié.");
  }catch(error){
    console.error("Erreur lors de la modification d'un user : ", error);
  }finally{
    isLoading.value = false;
  }
}

onMounted(() => {
  console.log(userStore.user)
  if (userStore.isLoggedIn && userStore.user) {
    firstname.value = userStore.user.firstname
    lastname.value = userStore.user.lastname
    email.value = userStore.user.email
    adress.value = userStore.user.adress
    city.value = userStore.user.city
    postalCode.value = userStore.user.postalCode
  }
})
</script>

<template>
  <div class="container">
    <div v-if="notifSuccess" class="notification has-text-centered is-primary">
      <button class="delete" @click="notifSuccess = null"></button>
      {{notifSuccess}}
    </div>
    <form @submit.prevent="submitForm">
      <div class="is-flex is-flex-direction-row">
        <div class="field">
          <label class="label" for="lastname">Nom</label>
          <div class="control">
            <input id="lastname" v-model="lastname" class="input is-rounded" type="text" />
          </div>
        </div>

        <div class="field ml-4">
          <label class="label" for="firstname">Prénom</label>
          <div class="control">
            <input id="firstname" v-model="firstname" class="input is-rounded" type="text" />
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label" for="email">Email</label>
        <div class="control">
          <input id="email" v-model="email" class="input is-rounded" type="email" />
        </div>
      </div>
      <div class="field">
        <label class="label" for="adress">Adresse</label>
        <div class="control">
          <input id="adress" v-model="adress" class="input is-rounded" type="text"/>
        </div>
      </div>
      <div class="is-flex is-flex-direction-row">
        <div class="field">
          <label class="label" for="city">Ville</label>
          <div class="control">
            <input id="city" v-model="city" class="input is-rounded" type="text"/>
          </div>
        </div>
        <div class="field ml-4">
          <label class="label" for="postalCode">Code Postal</label>
          <div class="control">
            <input id="postalCode" v-model="postalCode" class="input is-rounded" type="text"/>
          </div>
        </div>
      </div>
      <div class="is-flex is-justify-content-center mt-4">
        <button class="button is-primary is-responsive" type="submit" :class="{'is-loading': isLoading}">Modifier le profil</button>
      </div>
    </form>
    <div class="is-flex is-justify-content-center mt-4">
      <button class="button is-secondary is-responsive" @click="showModal = true">Modifier le mot de passe</button>
    </div>
  </div>
  <PasswordModificationModal :showModal="showModal" @closed="showModal = false"/>
</template>

<style scoped></style>
