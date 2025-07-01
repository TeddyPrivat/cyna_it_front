<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user.ts'
import api from '@/services/api.ts'
import type { AxiosError } from 'axios'

defineProps<{
  showModal: boolean
}>();
defineEmits(['closed']);
const password = ref<string>('');
const newPassword = ref<string>('');
const confirmPassword = ref<string>('');
const errorMessage = ref<string | null>(null);
const successMessage = ref<string | null>(null);
const userStore = useUserStore();
const isLoading= ref<boolean>(false);

const submitForm = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Les mots de passe ne correspondent pas.';
    isLoading.value = false;
    return;
  }

  const payload = {
    password: password.value,
    new_password: newPassword.value,
    confirm_password: confirmPassword.value,
  };

  try {
    const response = await api.put(`/api/changePassword/${userStore.user.id}`, payload);
    if (response.status === 200) {
      successMessage.value = 'Le mot de passe de votre compte a bien été modifié.'
      password.value = '';
      newPassword.value = '';
      confirmPassword.value = '';
    } else {
      errorMessage.value = response.data.message;
      console.log(errorMessage.value);
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = 'Erreur de connexion au serveur.';
    }
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="modal" :class="{ 'is-active': showModal }">
    <div class="modal-background" @click="$emit('closed')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Souhaitez-vous modifier votre mot de passe ?</p>
        <button class="delete" aria-label="close" @click="$emit('closed')"></button>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="submitForm">
          <div class="field">
            <label class="label" for="actualPassword">Mot de passe actuel</label>
            <div class="control">
              <input type="password" id="actualPassword" class="input is-rounded" v-model="password"/>
            </div>
          </div>
          <div class="field">
            <label class="label" for="newPassword">Nouveau mot de passe</label>
            <div class="control">
              <input type="password" id="newPassword" class="input is-rounded" v-model="newPassword"/>
            </div>
          </div>
          <div class="field">
            <label class="label" for="confirmPassword">Confirmez votre nouveau mot de passe</label>
            <div class="control">
              <input type="password" id="confirmPassword" class="input is-rounded" v-model="confirmPassword"/>
            </div>
          </div>
          <div class="is-flex is-justify-content-center mt-5">
            <button type="submit" class="button is-primary" :class="{ 'is-loading': isLoading }">Changez votre mot de passe</button>
          </div>
          <div v-if="errorMessage" class="mt-5">
            <p class="has-text-danger has-text-centered">{{errorMessage}}</p>
          </div>
          <div v-if="successMessage" class="mt-5">
            <p class="has-text-primary has-text-centered">{{successMessage}}</p>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<style scoped>

</style>
