<script setup lang="ts">

import SignUpFields from "@/components/Auth/SignUpFields.vue";
</script>

<template>
  <div class="container is-flex is-centered is-justify-content-center">
    <h1 class="title is-purple-title is-georama is-1 mt-5 underline-hover">Inscription</h1>
  </div>
  <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 100vh;">
    <div class="card mb-6">
      <div class="columns is-vcentered">
        <div class="column ml-2">
          <figure class="image is-fullheight is-flex">
            <img src="../../assets/cyna_logo.png" class="has-rounded-corners" alt="logo de l'entreprise Cyna"/>
          </figure>
        </div>
        <div class="column mt-6 mr-5">
          <sign-up-fields/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.is-georama {
  font-family: "Georama", sans-serif;
}

.is-purple-title{
  color: #7200ff;
}
</style>
