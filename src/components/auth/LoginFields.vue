<!--components\auth\LoginFields.vue-->
<script setup lang="ts">
const props = defineProps<{
  modelValueEmail: string;
  modelValuePassword: string;
  errorMessage?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValueEmail', value: string): void;
  (e: 'update:modelValuePassword', value: string): void;
}>();
</script>

<template>
  <div class="container">
    <div class="field mt-5">
      <label for="email">Email</label>
      <div class="control has-icons-left">
      <input class="input is-medium input-width" type="email" placeholder="Email" id="email"
        :value="modelValueEmail"
        @input="e => { const val = (e.target as HTMLInputElement).value; console.log('email changed:', val); emit('update:modelValueEmail', val) }"
      />
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </div>
    </div>
    <div class="field mt-5">
      <label for="password">Mot de passe</label>
      <div class="control has-icons-left">
      <input class="input is-medium input-width" type="password" placeholder="Mot de passe" id="password"
        :value="modelValuePassword"
        @input="e => emit('update:modelValuePassword', (e.target as HTMLInputElement).value)"
      />
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </div>
    </div>
  </div>
</template>


<style scoped>
.input-width{
  max-width: 95%;
}
</style>
