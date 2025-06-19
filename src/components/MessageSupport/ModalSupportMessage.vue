<script setup lang="ts">
import SupportForm from '@/components/MessageSupport/SupportForm.vue'
defineProps<{
  show: boolean
}>();
defineEmits(['close', 'submitted'])
</script>

<template>
  <div v-if="show" class="modal is-active">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-content">
      <div class="card">
        <div class="card-content">
          <SupportForm @submitted="$emit('submitted')"/>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" @click="$emit('close')" aria-label="close"></button>
  </div>
</template>

<style scoped>

</style>
