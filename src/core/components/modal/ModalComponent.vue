<template>
  <transition name="bounce">
    <div v-if="toggleModal" class="modal-component">
      <transition :duration="200">
        <div
          tabindex="-1"
          @click.stop="!static ? close() : () => false"
          v-if="toggleModal"
          class="modal-background"
        />
      </transition>
      <transition :duration="200">
        <div
          class="modal-container"
          @keydown.esc="!static ? close() : () => false"
          v-if="toggleModal"
          :data-testid="`${id}-modal-container`"
        >
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, provide, watch } from "vue";
import { useStore } from "vuex";

import type { PropType } from "vue";
import type { IModalStatus, TModalSize } from "@/core/shared/types/modal/modal.types";

import ModalHandler from "@/core/shared/helpers/modal/ModalHandler";

const modalSizes = {
  sm: "300px",
  md: "550px",
  lg: "800px",
  xl: "1200px",
};

const store = useStore();

const emits = defineEmits(["onCloseModal", "onOpenModal"]);
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  static: {
    type: Boolean,
    default: false,
  },
  size: {
    type: (String as PropType<TModalSize>) || String,
    default: "md",
  },
  blur: {
    type: String,
    default: "4px",
  },
  rounded: {
    type: String,
    default: "6px",
  },
  background: {
    type: String,
    default: "rgba(0, 0, 0, 0.6)",
  },
});

provide("modalId", props.id);

const modalIndex = computed((): number => {
  return store.state.modal.modals.findIndex((modal: IModalStatus) => modal.id === props.id);
});
const toggleModal = computed(() => {
  if (store.state.modal.modals.length > 0) {
    if (store.state.modal.modals[modalIndex.value]) {
      return store.state.modal.modals[modalIndex.value].open;
    }
  }
  return false;
});
const modalSizeClass = computed(() => {
  return modalSizes[props.size] ?? `${props.size}px`;
});

watch(
  () => toggleModal.value,
  () => {
    if (toggleModal.value) {
      emits("onOpenModal");
    } else {
      emits("onCloseModal");
    }
  }
);

const close = function (): void {
  ModalHandler.close(props.id);
};
</script>

<style scoped>
.modal-component {
  @apply tw-fixed
  tw-right-0
  tw-left-0
  tw-top-0
  tw-bottom-0
  tw-m-0
  tw-backdrop-blur-[v-bind(props.blur)]
  tw-flex
  tw-justify-center
  tw-items-center tw-z-10;
}

.modal-background {
  @apply tw-fixed tw-right-0 tw-left-0 tw-top-0 tw-bottom-0 tw-m-0 tw-w-full tw-h-full tw-bg-[v-bind(props.background)];
}

.modal-container {
  @apply tw-flex
  tw-flex-col
  tw-w-[v-bind(modalSizeClass)]
  tw-max-w-[90%]
  tw-max-h-[90%]
  tw-bg-white
  tw-fixed
  tw-rounded-[v-bind(props.rounded)];
}

/* transition styles */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
