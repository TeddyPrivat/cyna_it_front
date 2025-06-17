<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
  items: any[],
  columns: number
}>()

const columnClass = computed(() => {
  const bulmaCols: Record<number, string> = {
    1: 'is-full',
    2: 'is-half',
    3: 'is-one-third',
    4: 'is-one-quarter',
    5: 'is-one-fifth',
    6: 'is-one-sixth',
  }
  return bulmaCols[props.columns] || 'is-one-third'
})
</script>

<template>
  <div class="columns is-multiline">
    <div
      v-for="(item, index) in props.items"
      :key="index"
      class="column"
      :class="columnClass"
    >
      <slot :item="item" />
    </div>
  </div>
</template>

<style scoped>
/* Ajoute du style si besoin */
</style>
