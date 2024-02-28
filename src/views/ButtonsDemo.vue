<template>
  <div class="tw-w-full tw-shadow-2xl tw-rounded-lg tw-py-8">
    <div class="tw-flex tw-flex-col tw-p-2 tw-w-full tw-h-screen">
      <div class="tw-flex tw-flex-col tw-space-y-4">
        <h3 class="tw-text-center tw-font-extrabold tw-mb-4 tw-text-4xl">Generic buttons</h3>

        <div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-3 md:tw-grid-cols-4 tw-gap-4">
          <ButtonComponent class="!tw-h-full" id="default-button">Default button</ButtonComponent>

          <ButtonComponent class="!tw-h-full" id="white-button" theme-color="white">
            White button
          </ButtonComponent>

          <ButtonComponent class="!tw-h-full" id="green-button" theme-color="green">
            Green button
          </ButtonComponent>

          <ButtonComponent class="!tw-h-full" id="orange-button" theme-color="orange">
            Orange button
          </ButtonComponent>

          <ButtonComponent class="!tw-h-full" id="grey-button" theme-color="grey">
            Grey button
          </ButtonComponent>

          <ButtonComponent class="!tw-h-full" id="dark-grey-button" theme-color="dark-grey">
            Dark grey button
          </ButtonComponent>

          <ButtonComponent class="!tw-h-full" id="red-button" theme-color="red">
            Red button
          </ButtonComponent>

          <ButtonComponent class="!tw-h-full" id="disabled-button" disabled>
            Disabled button
          </ButtonComponent>

          <ButtonComponent class="!tw-h-full" id="outline-green-button" theme-color="green" outline>
            Outline green button
          </ButtonComponent>

          <ButtonComponent
            class="!tw-h-full"
            id="outline-orange-button"
            theme-color="orange"
            outline
          >
            Outline orange button
          </ButtonComponent>

          <ButtonComponent class="!tw-h-full" id="outline-default-button" outline>
            Outline default button
          </ButtonComponent>

          <ButtonComponent class="!tw-h-full" id="link-button" theme-display="link">
            Link button
          </ButtonComponent>
        </div>
      </div>
    </div>
  </div>

  <!-- <div
    class="tw-w-full tw-shadow-2xl tw-grid md:tw-grid-cols-3 tw-grid-cols-1 tw-gap-4 tw-rounded-lg"
  >
    <div class="tw-flex tw-flex-col tw-border-2 tw-p-2 tw-rounded-lg">
      <h3 class="tw-text-center tw-font-extrabold tw-mb-4 tw-text-4xl">Generic buttons</h3>

      <div class="tw-grid tw-grid-cols-2 tw-gap-4">
        <ButtonComponent class="!tw-h-full" id="default-button">Default button</ButtonComponent>

        <ButtonComponent class="!tw-h-full" id="white-button" theme-color="white">
          White button
        </ButtonComponent>

        <ButtonComponent class="!tw-h-full" id="green-button" theme-color="green">
          Green button
        </ButtonComponent>

        <ButtonComponent class="!tw-h-full" id="orange-button" theme-color="orange">
          Orange button
        </ButtonComponent>

        <ButtonComponent class="!tw-h-full" id="grey-button" theme-color="grey">
          Grey button
        </ButtonComponent>

        <ButtonComponent class="!tw-h-full" id="dark-grey-button" theme-color="dark-grey">
          Dark grey button
        </ButtonComponent>

        <ButtonComponent class="!tw-h-full" id="red-button" theme-color="red">
          Red button
        </ButtonComponent>

        <ButtonComponent class="!tw-h-full" id="disabled-button" disabled>
          Disabled button
        </ButtonComponent>

        <ButtonComponent class="!tw-h-full" id="outline-green-button" theme-color="green" outline>
          Outline green button
        </ButtonComponent>

        <ButtonComponent class="!tw-h-full" id="link-button" theme-display="link">
          Link button
        </ButtonComponent>

        <ButtonComponent class="!tw-h-full" id="outline-orange-button" theme-color="orange" outline>
          Outline orange button
        </ButtonComponent>

        <ButtonComponent class="!tw-h-full" id="outline-default-button" outline>
          Outline default button
        </ButtonComponent>
      </div>
    </div>
  </div> -->
</template>

<script setup lang="ts">
import ButtonComponent from "@/core/components/ButtonComponent.vue";
</script>

<style scoped></style>
