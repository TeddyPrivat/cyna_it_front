<!--views\auth\Login.vue-->
<script setup lang="ts">
import { ref } from 'vue';
import LoginFields from '@/components/auth/LoginFields.vue';
import { login } from '@/services/auth';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');


const handleLogin = async () => {
  try {
    const token = await login(email.value, password.value);
    localStorage.setItem('jwt', token);
    console.log('Connexion réussie !');
    await userStore.initializeUser();

    router.push('/')
    console.log(token)
  } catch (err) {
    console.error(err);
    errorMessage.value = 'Erreur de connexion, vérifier votre email et mot de passe';
  }
};
</script>

<template>
  <div class="container is-flex is-centered is-justify-content-center">
    <h1 class="title is-purple-title is-georama is-1 mt-5 underline-hover">Se connecter</h1>
  </div>
  <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 100vh;">
    <div class="card mb-6">
      <div class="columns is-vcentered">
        <div class="column">
          <figure class="image">
            <img src="../../assets/cyna_logo.png" class="has-rounded-corners" alt="logo de l'entreprise Cyna"/>
          </figure>
        </div>
        <div class="column">
          <LoginFields
            v-model:model-value-email="email"
            v-model:model-value-password="password"
            :error-message="errorMessage"
          />
          <div class="mt-2 ml-3">
            <a href="#" class="is-georama">Mot de passe oublié</a>
          </div>
          <div class="field is-grouped is-grouped-centered">
            <div class="control mt-5">
              <button @click="handleLogin" class="button is-rounded is-medium is-purple is-georama">
                Se connecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.is-georama {
  font-family: "Georama", sans-serif;
}
.is-purple-title{
  color: #7200ff;
}
.is-purple {
  background-color: #7200ff;
  color: white;
}

.is-purple:hover {
  background-color: #5a00cc;
  color: white;
}

.has-rounded-corners {
  border-radius: 12px;
}

.underline-hover {
  position: relative;
  display: inline-block;
  cursor: default;
}

.underline-hover::after {
  content: "";
  position: absolute;
  width: 0;
  height: 5px;
  bottom: 0;
  left: 0;
  background-color: #7200ff;
  transition: width 0.3s ease;
}

.underline-hover:hover::after {
  width: 100%;
}
</style>
