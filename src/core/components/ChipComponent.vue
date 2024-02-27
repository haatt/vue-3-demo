<template>
  <span
    class="chip-component"
    :class="[
      {
        'chip-component-outline': outline,
      },
      `chip-component-${themeColor}`,
      `chip-component-${size}`,
    ]"
  >
    <slot></slot>
  </span>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import type { TThemeColor, TChipSize } from "@/core/services/ChipComponent.type copy";

defineProps({
  themeColor: {
    type: String as PropType<TThemeColor>,
    default: "black",
  },
  outline: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<TChipSize>,
    default: "md",
  },
});
</script>

<style lang="scss" scoped>
.chip-component {
  @apply tw-rounded-full tw-border-2;

  &-green {
    @apply tw-bg-r-green tw-border-r-green tw-text-white;
  }

  &-yellow {
    @apply tw-bg-r-yellow tw-border-r-yellow tw-text-white;
  }

  &-grey {
    @apply tw-bg-[#575B61] tw-border-[#575B61] tw-text-white;
  }

  &-red {
    @apply tw-bg-r-red tw-border-r-red tw-text-white;
  }

  &-outline {
    &.chip-component-green {
      @apply tw-bg-[rgba(240,255,250,1)] tw-border-[rgba(101,219,176,1)] tw-text-[rgba(0,116,88,1)];
    }

    &.chip-component-yellow {
      @apply tw-bg-[rgba(255,243,210,1)] tw-border-[rgba(244,176,3,1)] tw-text-[rgba(168,121,0,1)];
    }

    &.chip-component-grey {
      @apply tw-bg-[rgba(222,222,222,1)] tw-border-[rgba(87,91,97,1)] tw-text-[rgba(87,91,97,1)];
    }

    &.chip-component-red {
      @apply tw-bg-[rgba(255,236,240,1)] tw-border-[rgba(216,56,93,1)] tw-text-[rgba(184,19,58,1)];
    }
  }

  &-sm {
    @apply tw-py-1 tw-px-2 tw-text-sm;
  }

  &-md {
    @apply tw-py-2 tw-px-4 tw-text-base;
  }
}
</style>
