<script setup lang="ts">

</script>

<template>
  <div class="container ml-5">
    <div class="field mt-2">
      <label class="field-label" for="firstname">Prénom</label>
      <div class="control has-icons-left">
        <input type="text" class="input input-width" placeholder="Prénom" id="firstname"/>
        <span class="icon is-small is-left">
          <i class="fa-solid fa-user"></i>
        </span>
      </div>
    </div>
    <div class="field mt-2">
      <label class="field-label" for="lastname">Nom</label>
      <div class="control has-icons-left">
        <input type="text" class="input input-width" placeholder="Nom" id="lastname"/>
        <span class="icon is-small is-left">
          <i class="fa-solid fa-user"></i>
        </span>
      </div>
    </div>
    <div class="field mt-2">
      <label for="email">Email</label>
      <div class="control has-icons-left">
        <input class="input input-width" type="email" placeholder="Email" id="email"/>
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </div>
    </div>
    <div class="field mt-2">
      <label for="password">Mot de passe</label>
      <div class="control has-icons-left">
        <input class="input input-width" type="password" placeholder="Mot de passe" id="password"/>
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </div>
    </div>
    <div class="field mt-2">
      <label class="field-label" for="confirmPassword">Confirmer le mot de passe</label>
      <div class="control has-icons-left">
        <input type="text" class="input input-width" placeholder="Confirmer le mot de passe" id="confirmPassword"/>
        <span class="icon is-small is-left">
          <i class="fa-solid fa-lock"></i>
        </span>
      </div>
    </div>
    <div class="field is-grouped is-grouped-centered">
      <div class="control mt-2">
        <button type="submit" class="button is-medium is-rounded  is-purple is-georama mb-5">
          S'inscrire
        </button>
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
