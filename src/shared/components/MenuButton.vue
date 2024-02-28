<template>
  <ButtonComponent
    :id="`edit-claim-button-${data.id}`"
    :data-testid="`edit-claim-button-${data.id}`"
    @click.stop="emits('clickButton', data)"
    :theme-color="themeColor"
  >
    <ListIcon class="tw-w-6 tw-h-7 tw-fill-[#575B61]" />
  </ButtonComponent>
</template>

<script setup lang="ts">
import ButtonComponent from "@/core/components/ButtonComponent.vue";

import ListIcon from "@/components/icons/ListIcon.vue";

defineProps({
  data: {
    type: Object,
    required: true,
  },
  themeColor: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["clickButton"]);
</script>

<style scoped lang="scss">
.facilities-container {
  @apply tw-w-full tw-pt-8 tw-pl-20 tw-space-y-8;
}
</style>
