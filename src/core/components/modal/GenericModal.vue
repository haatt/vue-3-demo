<template>
  <ModalComponent
    :id="id"
    :static="static"
    :size="size"
    @onCloseModal="emits('onCloseModal')"
    @onOpenModal="emits('onOpenModal')"
  >
    <ModalHeader v-if="!hiddenModalHeader" :title="title" :hidden-closeIcon="hiddenCloseIcon" />

    <ModalBody>
      <slot name="body"></slot>
    </ModalBody>

    <ModalFooter v-if="slots.footer">
      <slot name="footer"></slot>
    </ModalFooter>
  </ModalComponent>
</template>

<script setup lang="ts">
import { defineProps, useSlots } from "vue";

import ModalComponent from "@/core/components/modal/ModalComponent.vue";
import ModalHeader from "@/core/components/modal/ModalHeader.vue";
import ModalBody from "@/core/components/modal/ModalBody.vue";

import type { PropType } from "vue";
import type { TModalSize } from "@/core/shared/types/modal/modal.types";
import ModalFooter from "./ModalFooter.vue";

const slots = useSlots();

const emits = defineEmits(["onCloseModal", "onOpenModal"]);
defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  static: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<TModalSize>,
    default: "md",
  },
  hiddenCloseIcon: {
    type: Boolean,
    default: false,
  },
  hiddenModalHeader: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>
