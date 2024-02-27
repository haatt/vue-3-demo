<template>
  <button
    v-show="props.visible"
    :class="[
      themeDisplay,
      {
        're-btn-disabled': isDisabled,
        're-btn-outline': outline,
      },
      `${themeDisplay}-${themeColor}`,
      buttonSize,
    ]"
    :type="props.buttonType"
    @click="typeof props.click === 'function' && props.click()"
    :disabled="isDisabled"
    :data-testid="`button-component-${props.id}`"
    :id="props.id"
  >
    <template v-if="!loading">
      <slot />
    </template>
    <span v-else class="re-flex-center" :data-testid="`button-component-loader-label-${props.id}`">
      <span class="loading-label">{{ loadingLabel }}</span>
    </span>
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import type { PropType } from "vue";
import type {
  TButtonSize,
  TButtonType,
  TDisplayType,
  TThemeColor,
} from "@/core/services/ButtonComponent.type";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  buttonType: {
    type: String as PropType<TButtonType>,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  click: {
    type: Function,
    required: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingLabel: {
    type: String,
    default: "Loading...",
  },
  themeDisplay: {
    type: String as PropType<TDisplayType>,
    default: "button",
  },
  themeColor: {
    type: String as PropType<TThemeColor>,
    default: "black",
  },
  outline: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<TButtonSize>,
    default: "md",
  },
});

const isDisabled = computed((): boolean => {
  return props.disabled || props.loading;
});
const buttonSize = computed((): string => {
  return props.themeDisplay === "button" ? `re-btn-${props.size}` : "";
});
const themeDisplay = computed((): string => {
  return props.themeDisplay === "button" ? "re-btn" : "re-link";
});
</script>

<style lang="scss" scoped>
button {
  @apply tw-flex tw-justify-center tw-items-center tw-space-x-0.5;

  .loading-label {
    padding-left: 0.5rem;
  }
}
</style>
