<template>
  <div class="input-select" :class="[alignClasses]">
    <label :for="id" v-if="label" :data-testid="`${dataTestid}-label`" class="input-label">
      <span v-if="required" class="tw-text-orange-400" :class="[{ '!tw-text-red-600': !!error }]"
        >*</span
      >{{ label }}
    </label>

    <div class="tw-w-full" :class="[themeDisplay]">
      <div class="input-container" :class="[{ 'on-error': !!error }, borderInput]">
        <div v-if="slots.left" class="left-slot">
          <slot name="left" />
        </div>

        <fieldset id="custom" class="tw-w-full">
          <select
            :id="id"
            :name="name"
            v-model="model"
            class="input-element"
            :disabled="disabled"
            :data-testid="dataTestid"
          >
            <option v-if="!hidePlaceholder" :value="placeholderValue" selected>
              {{ placeholder }}
            </option>
            <option
              v-for="(option, i) of options"
              :key="i"
              :value="option.value"
              :class="[option.class]"
            >
              {{ option.text }}
            </option>
          </select>
        </fieldset>

        <div v-if="slots.right" class="right-slot">
          <slot name="right" />
        </div>
      </div>

      <p v-if="!!error" class="tw-text-red-400 tw-text-xs tw-m-0 tw-relative">
        <span class="tw-absolute">{{ error }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, useSlots } from "vue";
import type { PropType } from "vue";

import type { ISelectOption, TInputDisplayType } from "@/core/shared/types/InputSelect.types";

const slots = useSlots();

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
    type: Array as PropType<ISelectOption[]>,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Number],
    required: false,
  },
  error: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Select",
  },
  hidePlaceholder: {
    type: Boolean,
    default: false,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  themeDisplay: {
    type: String as PropType<TInputDisplayType>,
    default: "input",
  },
  bgColor: {
    type: String,
    default: "#F3F5F6",
  },
  textColor: {
    type: String,
    default: "#2A2C34",
  },
  mb: {
    type: String,
    default: "16px",
  },
  required: {
    type: Boolean,
    default: false,
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
const themeDisplay = computed((): string => {
  return props.themeDisplay === "input" ? "theme-input" : "theme-text";
});
const placeholderValue = computed(() => {
  const modelType = typeof model.value;
  return modelType === "number" ? 0 : "";
});
const leftRounded = computed(() => {
  return slots.left ? "0px" : "6px";
});
const rightRounded = computed(() => {
  return slots.right ? "0px" : "6px";
});
const leftPadding = computed(() => {
  return slots.left ? "5px" : "20px";
});
const alignClasses = computed(() => {
  return props.inline ? "tw-space-x-2" : "tw-flex-col";
});
const borderInput = computed(() => {
  return props.borderClass ?? "";
});
</script>

<style lang="scss">
.input-select {
  @apply tw-flex tw-mb-[v-bind(mb)];

  .input-label {
    @apply tw-text-r-dark-grey tw-text-[16px] tw-font-[Inter] tw-font-[600] tw-leading-10;
  }

  .theme-input {
    .input-container {
      @apply tw-rounded-md tw-shadow-md tw-w-full tw-h-fit tw-flex tw-flex-row;

      .left-slot {
        @apply tw-flex tw-justify-center tw-align-middle tw-bg-r-blue-grey tw-rounded-l-md tw-pl-4 tw-pr-[10px];
      }

      .right-slot {
        @apply tw-flex tw-justify-center tw-align-middle tw-bg-r-blue-grey tw-rounded-r-md tw-pr-4 tw-pl-[10px];
      }
    }

    .input-container:focus-within {
      @apply tw-rounded-md tw-border-[1px] tw-border-r-green;
    }

    .on-error {
      @apply tw-text-red-600 tw-border-[1px] tw-border-red-600;
    }

    .input-element {
      @apply tw-w-full
      tw-bg-[v-bind(bgColor)]
      tw-text-[16px]
      tw-pr-[20px]
      tw-pl-[v-bind(leftPadding)]
      tw-rounded-r-[v-bind(rightRounded)]
      tw-rounded-l-[v-bind(leftRounded)]
      tw-h-[50px]
      tw-text-[v-bind(textColor)];

      &:focus {
        @apply tw-outline-none;
      }
    }
  }

  .theme-text {
    .input-container {
      @apply tw-w-full tw-flex tw-flex-row;

      .left-slot {
        @apply tw-flex tw-justify-center tw-align-middle tw-pl-4 tw-pr-[10px];
      }

      .right-slot {
        @apply tw-flex tw-justify-center tw-align-middle tw-pr-4 tw-pl-[10px];
      }
    }

    .on-error {
      @apply tw-text-red-600;
    }

    .input-element {
      @apply tw-w-full
    tw-bg-white
      tw-text-[16px]
      tw-pr-[20px]
      tw-pl-[v-bind(leftPadding)]
      tw-rounded-r-[v-bind(rightRounded)]
      tw-rounded-l-[v-bind(leftRounded)]
      tw-text-[v-bind(textColor)];

      &:focus {
        @apply tw-outline-none;
      }
    }
  }
}
</style>
