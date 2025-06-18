<script lang="ts" setup>
import { useUserStore } from '@/stores/user.ts'
import { onMounted, ref } from 'vue'

const userStore = useUserStore()

const firstname = ref<string>('')
const lastname = ref<string>('')
const email = ref<string>('')

onMounted(() => {
  console.log(userStore.user)
  if (userStore.isLoggedIn && userStore.user) {
    firstname.value = userStore.user.firstname
    lastname.value = userStore.user.lastname
    email.value = userStore.user.email
  }
})
</script>

<template>
  <div class="container">
    <form>
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
      <div class="is-flex is-justify-content-center">
        <button class="button is-primary is-responsive" type="submit">Modifier le profil</button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
