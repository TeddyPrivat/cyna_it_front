<script setup lang="ts">

</script>

<template>
  <div class="container">
    <p class="title is-3">Formulaire de demande de support</p>
    <form>
      <div class="field">
        <label class="label" for="nom">Nom</label>
        <div class="is-flex is-align-items-center is-justify-content-start is-column-gap-2">
          <input class="input" type="text" placeholder="Votre nom" id="nom" required/>
          <input class="input" type="text" placeholder="Votre prénom" required/>
        </div>
      </div>
      <div class="field">
        <label class="label" for="email">Email</label>
      <input class="input" type="email" placeholder="Votre email" id="email" required/>
      </div>
      <div class="field">
        <label class="label" for="message">Message</label>
        <textarea class="textarea" type="text" placeholder="Votre message..." id="message" required/>
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
