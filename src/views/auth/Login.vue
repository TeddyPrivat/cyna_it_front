<!--views\Auth\Login.vue-->
<script setup lang="ts">
import { ref } from 'vue'
import LoginFields from '@/components/Auth/LoginFields.vue'
import { login } from '@/services/auth'
import { forgetPassword } from '@/services/auth'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { decodeAndStoreJwt } from '@/services/jwt'

const userStore = useUserStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const showForgotPassword = ref(false)
const forgotEmail = ref('')
const forgotError = ref('')
const forgotSuccess = ref('')

const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

const handleLogin = async () => {
  try {
    const token = await login(email.value, password.value)
    decodeAndStoreJwt(token)
    console.log('Connexion réussie !')
    await userStore.initializeUser()
    await router.push('/')
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Erreur de connexion, vérifier votre email et mot de passe'
  }
}

const handleForgotPassword = async () => {
  forgotError.value = ''
  forgotSuccess.value = ''

  if (!isValidEmail(forgotEmail.value)) {
    forgotError.value = 'Veuillez entrer un e-mail valide exemeple@exemple.com'
    return
  }

  try {
    await forgetPassword(forgotEmail.value)
    forgotSuccess.value = 'Un nouveau mot de passe a été envoyé à votre adresse email.'
    forgotEmail.value = ''
    setTimeout(() => (showForgotPassword.value = false), 2000)
  } catch (err: any) {
    forgotError.value = err.message
  }
}
</script>

<template>
  <div class="container is-flex is-centered is-justify-content-center">
    <h1 class="title is-purple-title is-georama is-1 mt-5 underline-hover">Se connecter</h1>
  </div>
  <div
    class="container is-flex is-justify-content-center is-align-items-center"
    style="height: 100vh"
  >
    <div class="card mb-6">
      <div class="columns is-vcentered">
        <div class="column ml-2">
          <figure class="image">
            <img
              alt="logo de l'entreprise Cyna"
              class="has-rounded-corners"
              src="../../assets/cyna_logo.png"
            />
          </figure>
        </div>
        <div class="column">
          <LoginFields
            v-model:model-value-email="email"
            v-model:model-value-password="password"
            :error-message="errorMessage"
          />
          <!-- Mot de passe oublié -->
          <div class="mt-4 ml-3">
            <a @click="showForgotPassword = true" class="is-georama has-text-link is-clickable">
              Mot de passe oublié ?
            </a>
          </div>

          <!-- Modal de récupération -->
          <div v-if="showForgotPassword" class="modal is-active">
            <div class="modal-background" @click="showForgotPassword = false"></div>
            <div class="modal-content">
              <div class="box">
                <h2 class="title is-5">Réinitialiser le mot de passe</h2>
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control">
                    <input
                      v-model="forgotEmail"
                      class="input"
                      placeholder="Entrez votre adresse email"
                      type="email"
                    />
                  </div>
                </div>
                <div class="field is-grouped is-grouped-right">
                  <div class="control">
                    <button class="button is-link" @click="handleForgotPassword">Envoyer</button>
                  </div>
                  <div class="control">
                    <button class="button" @click="showForgotPassword = false">Annuler</button>
                  </div>
                </div>
                <p class="has-text-danger mt-2" v-if="forgotError">{{ forgotError }}</p>
                <p class="has-text-success mt-2" v-if="forgotSuccess">{{ forgotSuccess }}</p>
              </div>
            </div>
          </div>

          <div class="field is-grouped is-grouped-centered">
            <div class="control mt-5">
              <button @click="handleLogin" class="button is-rounded is-medium is-purple is-georama">
                Se connecter
              </button>
              <div class="mt-2 mb-2 has-text-centered">
                <a href="/signup" class="is-georama">Créer un compte</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.is-georama {
  font-family: 'Georama', sans-serif;
}

.is-purple-title {
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
  content: '';
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
