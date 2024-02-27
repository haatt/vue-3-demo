<template>
  <div class="modal-header" :data-testid="`${modalId}-modal-footer-container`">
    <h2 class="tw-w-full tw-mt-[10px] tw-text-center" :data-testid="`${modalId}-modal-title`">
      {{ title }}
    </h2>
    <div v-if="!hiddenCloseIcon">
      <CloseIcon @click="close" class="close-icon" :data-testid="`${modalId}-modal-close-icon`" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, inject } from "vue";

import CloseIcon from "@/components/icons/CloseIcon.vue";

import ModalHandler from "@/core/shared/helpers/modal/ModalHandler";

defineProps({
  title: {
    type: String,
    required: true,
  },
  hiddenCloseIcon: {
    type: Boolean,
    default: false,
  },
});

const modalId = inject<string>("modalId");

const close = function (): void {
  if (modalId) {
    ModalHandler.close(modalId);
  }
};
</script>

<style scoped>
.modal-header {
  @apply tw-border-b-[2px] tw-border-r-blue-grey tw-w-full tw-font-[600] tw-flex tw-justify-between tw-px-[20px] tw-py-[10px];
}

.close-icon {
  position: relative;
  width: 25px;
  right: -10px;
  top: 0px;
}

.close-icon:hover {
  animation: rotateIcon 300ms;
}
.close-icon:not(:hover) {
  animation: rotateIconBack 700ms;
}

@keyframes rotateIcon {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(90deg);
  }
}
@keyframes rotateIconBack {
  0% {
    transform: rotate(90deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
