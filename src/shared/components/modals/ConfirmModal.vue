<template>
  <GenericModal :id="(modalId as string)" :title="title">
    <template #body>
      <div
        v-if="!slots.message"
        class="tw-flex tw-justify-center tw-align-middle tw-w-full tw-min-h-32 tw-p-6"
      >
        <h3 class="tw-font-extrabold">{{ message }}</h3>
      </div>

      <template v-else>
        <slot name="message"></slot>
      </template>
    </template>

    <template #footer>
      <div v-if="!slots.footer" class="tw-flex tw-justify-end tw-space-x-6">
        <ButtonComponent
          v-if="!hideCancelButton"
          id="cancel-new-category"
          themeColor="red"
          size="xs"
          @click="closeModal"
        >
          <CloseIcon class="close-icon tw-w-[24px]" fill="#FFFFFF" />
          <span>{{ cancelButton }}</span>
        </ButtonComponent>

        <ButtonComponent id="cancel-new-category" themeColor="green" size="xs" @click="onConfirm">
          <CheckIcon v-if="!hideConfirmIcon" class="close-icon tw-w-[24px]" fill="#FFFFFF" />
          <span>{{ confirmButtonText }}</span>
        </ButtonComponent>
      </div>
      <template v-else>
        <slot name="footer"></slot>
      </template>
    </template>
  </GenericModal>
</template>

<script setup lang="ts">
import { useSlots } from "vue";

import GenericModal from "@/core/components/modal/GenericModal.vue";
import ButtonComponent from "@/core/components/ButtonComponent.vue";

import CloseIcon from "@/components/icons/CloseIcon.vue";
import CheckIcon from "@/components/icons/CheckIcon.vue";

import ModalHandler from "@/core/shared/helpers/modal/ModalHandler";

const slots = useSlots();

const emits = defineEmits(["onConfirm", "onCancel"]);
const props = defineProps({
  title: {
    string: String,
    default: "Confirm",
  },
  message: {
    string: String,
    required: false,
  },
  cancelButton: {
    string: String,
    default: "Cancel",
  },
  confirmButtonText: {
    string: String,
    default: "Confirm",
  },
  successMessage: {
    string: String,
    default: "Successfully",
  },
  modalId: {
    string: String,
    required: true,
  },
  hideCancelButton: {
    string: Boolean,
    default: false,
  },
  hideConfirmIcon: {
    string: Boolean,
    default: false,
  },
});

const onConfirm = async function () {
  emits("onConfirm");
  closeModal();
};
const closeModal = function () {
  emits("onCancel");
  ModalHandler.close(props.modalId as string);
};
</script>

<style scoped></style>
