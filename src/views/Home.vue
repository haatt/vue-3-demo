<template>
  <div class="tw-w-full tw-shadow-2xl tw-rounded-lg tw-py-8">
    <div class="tw-flex tw-flex-col tw-p-2 tw-w-full tw-h-screen">
      <h3 class="tw-text-center tw-font-extrabold tw-mb-4 tw-text-4xl">Welcome</h3>

      <div class="tw-grid sm:tw-grid-cols-3 tw-grid-cols-2 tw-gap-4 tw-p-4">
        <ButtonComponent
          @click="onClick('buttons')"
          class="!tw-h-full"
          id="demo-button"
          theme-color="navy-blue"
          outline
        >
          See demo of button component
        </ButtonComponent>

        <ButtonComponent
          @click="onClick('modals')"
          class="!tw-h-full"
          id="demo-modals"
          theme-color="navy-blue"
          outline
        >
          See demo of modal component
        </ButtonComponent>

        <ButtonComponent
          @click="onClick('table')"
          class="!tw-h-full"
          id="demo-table"
          theme-color="navy-blue"
          outline
        >
          See demo of table component
        </ButtonComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import ButtonComponent from "@/core/components/ButtonComponent.vue";

const router = useRouter();

const onClick = function (to: string): void {
  router.push(to);
};
</script>

<style scoped></style>
