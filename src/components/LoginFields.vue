<script setup lang="ts">

</script>

<template>
  <div class="container">
    <div class="field">
      <label for="email">Email</label>
      <div class="control has-icons-left">
        <input class="input is-medium input-width" type="text" placeholder="Email" id="email"/>
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </div>
    </div>
    <div class="field mt-5">
      <label for="password">Mot de passe</label>
      <div class="control has-icons-left">
        <input class="input is-medium input-width" type="password" placeholder="Mot de passe" id="password"/>
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </div>
      <a href="#" class="is-georama mt-1 ml-1">Mot de passe oublié</a>
    </div>
  </div>
</template>

<style scoped>
.input-width{
  max-width: 95%;
}

.is-georama {
  font-family: "Georama", sans-serif;
}
</style>
