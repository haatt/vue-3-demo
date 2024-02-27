<template>
  <div class="modal-footer" :data-testid="`${modalId}-modal-footer`">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { inject } from "vue";

const modalId = inject<string>("modalId");
</script>

<style scoped>
.modal-footer {
  @apply tw-border-t-[2px] tw-border-r-blue-grey tw-w-full tw-px-6 tw-py-3;
}
</style>
