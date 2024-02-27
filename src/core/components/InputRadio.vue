<template>
  <div class="input-component">
    <div class="input-container">
      <label :for="id" v-if="label" :data-testid="`${dataTestid}-label`" class="input-label">
        <span v-if="required" class="tw-text-orange-400" :class="[{ '!tw-text-red-600': !!error }]"
          >*</span
        >{{ label }}
      </label>

      <div class="radio-group-container">
        <div v-for="(option, index) in options" :key="index" class="radio-item">
          <input
            v-model="model"
            :value="option.value"
            :name="name"
            :id="`${name}-${index}`"
            :data-testid="`${dataTestid}-input-radio-${index}`"
            :disabled="disabled"
            :required="required"
            type="radio"
            class="input-element"
          />
          <label v-if="option.label" :for="`${name}-${index}`">{{ option.label }}</label>
        </div>
      </div>
    </div>

    <p v-if="!!error" class="tw-text-red-400 tw-text-xs tw-m-0 tw-relative">
      <span class="tw-absolute">{{ error }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, PropType } from "vue";

import type { IRadioOption, TRadioOrientation } from "@/core/shared/types/InputRadio.types";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  dataTestid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  options: {
    type: Array as PropType<IRadioOption[]>,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  modelValue: {
    type: [String, Number],
    required: false,
  },
  error: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  textColor: {
    type: String,
    default: "#2A2C34",
  },
  mb: {
    type: String,
    default: "0px",
  },
  required: {
    type: Boolean,
    default: false,
  },
  orientation: {
    type: String as PropType<TRadioOrientation>,
    default: "row",
  },
  borderClass: { type: String },
});

const emits = defineEmits(["update:modelValue"]);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});
</script>

<style lang="scss" scoped>
.input-component {
  @apply tw-flex tw-flex-col tw-mb-[v-bind(mb)];

  .input-container {
    @apply tw-flex tw-flex-[v-bind(orientation)] tw-space-y-3;

    .radio-group-container {
      @apply tw-flex tw-space-x-4;

      .radio-item {
        @apply tw-flex tw-space-x-3;

        .input-element {
          @apply tw-w-6 tw-h-6;
        }
      }
    }
  }

  .input-label {
    @apply tw-text-r-dark-grey tw-text-[16px] tw-font-[Inter] tw-font-[600] tw-leading-10;
  }
}
</style>
