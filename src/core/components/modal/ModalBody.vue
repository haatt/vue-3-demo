<template>
  <div class="modal-body" :data-testid="`${modalId}-modal-body`">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { inject } from "vue";

const modalId = inject<string>("modalId");
</script>

<style scoped>
.modal-body {
  @apply tw-w-full tw-p-2 tw-overflow-auto tw-h-auto;
}
</style>
