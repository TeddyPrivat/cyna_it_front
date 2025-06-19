<script setup lang="ts">
import type { MessageSupport } from '@/types/MessageSupport.ts'
defineEmits(['deleteMessage']);
defineProps<{
  message: MessageSupport
}>();
</script>

<template>
  <div class="container">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title is-size-5">
          {{ message.lastname }} {{ message.firstname }} ({{ message.email }})
        </p>
      </header>

      <div class="card-content">
        <div class="content">
          <p>{{ message.message }}</p>
        </div>

        <div
          class="buttons mt-4
          is-flex
          is-flex-direction-row
          is-justify-content-flex-end"
        >
          <a
            class="button is-info mr-2"
            :href="`mailto:${message.email}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            Répondre
          </a>
          <button
            class="button is-danger"
            @click="$emit('deleteMessage')"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>
