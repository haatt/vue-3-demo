<template>
  <div class="tw-w-full tw-shadow-2xl tw-rounded-lg tw-py-8">
    <div class="tw-flex tw-flex-col tw-p-2 tw-w-full tw-h-screen">
      <h3 class="tw-text-center tw-font-extrabold tw-mb-4 tw-text-4xl">Modals</h3>

      <div class="tw-grid sm:tw-grid-cols-4 tw-grid-cols-2 tw-gap-4 tw-p-4">
        <ButtonComponent
          @click="onOpenModal('generic-modal')"
          class="!tw-h-full"
          id="outline-default-button"
          outline
        >
          Generic modal
        </ButtonComponent>

        <ButtonComponent
          @click="onOpenModal('confirm-modal')"
          class="!tw-h-full"
          id="generic-modal"
        >
          Confirmation modal
        </ButtonComponent>

        <ButtonComponent
          @click="onOpenModal('form-modal')"
          class="!tw-h-full"
          id="outline-default-button"
          outline
        >
          Static modal
        </ButtonComponent>

        <ButtonComponent @click="onOpenModal('xl-modal')" class="!tw-h-full" id="xl-modal">
          Extra large modal
        </ButtonComponent>
      </div>
    </div>

    <ConfirmModal
      modalId="confirm-modal"
      message="Are you sure?"
      title="Confirmation modal"
      @onConfirm="onConfirm"
    />

    <GenericModal id="generic-modal" title="Generic Modal">
      <template #body>
        <p v-for="n in 3" :key="n">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas quod ratione sequi porro
          ullam praesentium, earum sed animi sunt! Minima eius dignissimos fuga qui tempora, quos
          nemo libero asperiores illo.
        </p>
      </template>
    </GenericModal>

    <GenericModal id="form-modal" title="Static Modal" size="lg" static>
      <template #body>
        <InputComponent id="input" name="input" data-testid="input" placeholder="Name">
          <template #left>
            <FatSearchIcon class="tw-mx-3 tw-w-6 tw-fill-r-dark-grey" />
          </template>
        </InputComponent>
      </template>

      <template #footer>
        <div class="tw-flex tw-justify-end tw-space-x-6">
          <ButtonComponent id="cancel" themeColor="red" size="xs" @click="closeModal('form-modal')">
            <CloseIcon class="close-icon tw-w-[24px] tw-fill-white" />
            <span>Cancel</span>
          </ButtonComponent>
          <ButtonComponent
            id="confirm"
            themeColor="green"
            size="xs"
            @click="closeModal('form-modal')"
          >
            <CheckIcon class="close-icon tw-w-[24px] tw-fill-white" />
            <span>Cancel</span>
          </ButtonComponent>
        </div>
      </template>
    </GenericModal>

    <GenericModal id="xl-modal" title="Generic Modal" size="xl">
      <template #body>
        <p v-for="n in 20" :key="n">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas quod ratione sequi porro
          ullam praesentium, earum sed animi sunt! Minima eius dignissimos fuga qui tempora, quos
          nemo libero asperiores illo.
        </p>
      </template>
    </GenericModal>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from "@/core/components/ButtonComponent.vue";
import ConfirmModal from "@/shared/components/modals/ConfirmModal.vue";
import GenericModal from "@/core/components/modal/GenericModal.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import CheckIcon from "@/components/icons/CheckIcon.vue";

import { useToast } from "vue-toast-notification";
import ModalHandler from "@/core/shared/helpers/modal/ModalHandler";
import InputComponent from "@/core/components/InputComponent.vue";

const toast = useToast();

const onOpenModal = function (modalId: string): void {
  ModalHandler.open(modalId);
};
const onConfirm = function (): void {
  toast.success("Confirmed", { position: "top-right" });
};
const closeModal = function (modalId: string) {
  ModalHandler.close(modalId);
};
</script>

<style scoped></style>
