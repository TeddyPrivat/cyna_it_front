<script setup lang="ts">

</script>

<template>
  <div class="container">
    <form action="#" method="post">
      <div class="field">
        <div class="control">
          <label class="label" for="title">Nom</label>
          <input class="input" type="text" placeholder="Nom du produit" id="title"/>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label" for="description">Description</label>
          <textarea class="textarea" id="description" placeholder="Description du produit" rows="3"/>
        </div>
      </div>
      <div class="is-flex is-align-items-end is-justify-content-space-between">
        <div class="field">
          <label class="label" for="prix">Prix</label>
          <div class="control has-icons-right">
            <input class="input" type="number" placeholder="6.99" id="prix"/>
            <span class="icon is-small is-right">
        <i class="fas fa-euro-sign"></i>
      </span>
          </div>
        </div>
        <div class="field ml-5">
          <label class="label" for="stock">Stock</label>
          <div class="control has-icons-right">
            <input class="input" type="number" placeholder="20" id="stock"/>
            <span class="icon is-small is-right">
        <i class="fas fa-cubes"></i>
      </span>
          </div>
        </div>
        <div class="ml-5 mb-3">
          <button class="button is-primary" type="submit">Créer le produit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.control{
  margin-top:10px;
}
</style>
