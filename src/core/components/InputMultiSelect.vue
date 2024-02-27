<template>
  <div class="input-multi-select">
    <label :for="id" v-if="label" :data-testid="`${dataTestid}-label`" class="input-label">
      <span v-if="required" class="tw-text-orange-400" :class="[{ '!tw-text-red-600': !!error }]"
        >*</span
      >{{ label }}
    </label>
    <div class="input-container" :class="[{ 'on-error': !!error }, borderClass]">
      <div v-if="slots.left" class="left-slot">
        <slot name="left" />
      </div>

      <VueMultiselect
        v-model="model"
        :id="id"
        :name="name"
        :data-testid="`${dataTestid}-multi-select`"
        :placeholder="placeholder"
        :label="labelOptionsBy"
        :track-by="trackBy"
        :options="inputOptionValues"
        :allow-empty="allowEmpty"
        :disabled="disabled"
        :option-height="optionHeight"
        :multiple="true"
        :taggable="false"
        :searchable="false"
        :clear-on-select="false"
        :close-on-select="false"
        @open="$emit('onOpen')"
        class="input-element"
      />

      <div v-if="slots.right" class="right-slot">
        <slot name="right" />
      </div>
    </div>
    <p v-if="!!error" class="tw-text-red-400 tw-text-xs tw-m-0 tw-relative">
      <span class="tw-absolute">{{ error }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed, useSlots } from "vue";

import VueMultiselect from "vue-multiselect";

import type { PropType } from "vue";

interface IMultiselectOption {
  // eslint-disable-next-line
  [key: string]: any;
}

const slots = useSlots();

const props = defineProps({
  dataTestid: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Array as PropType<IMultiselectOption[]>,
    required: true,
  },
  inputOptionValues: {
    type: Array as PropType<IMultiselectOption[]>,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  trackBy: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  labelOptionsBy: {
    type: String,
    default: "",
  },
  allowEmpty: {
    type: Boolean,
    default: false,
  },
  optionHeight: {
    type: Number,
    default: 40,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    default: "",
  },

  bgColor: {
    type: String,
    default: "#F3F5F6",
  },
  mb: {
    type: String,
    default: "0px",
  },
  required: {
    type: Boolean,
    default: false,
  },
  borderClass: { type: String },
});

const emit = defineEmits(["update:modelValue", "onOpen"]);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
const leftRounded = computed(() => {
  return slots.left ? "0px" : "6px";
});
const rightRounded = computed(() => {
  return slots.right ? "0px" : "6px";
});
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style lang="scss" scoped>
.input-multi-select {
  @apply tw-flex tw-flex-col tw-mb-[v-bind(mb)];

  .input-label {
    @apply tw-text-r-dark-grey tw-text-[16px] tw-font-[Inter] tw-font-[600] tw-leading-10;
  }

  .input-container {
    @apply tw-rounded-md tw-shadow-md tw-w-full tw-flex tw-flex-row tw-border-[1px] tw-bg-[v-bind(bgColor)];

    .left-slot {
      @apply tw-flex tw-justify-center tw-items-center tw-bg-transparent tw-rounded-l-md;
    }

    .right-slot {
      @apply tw-flex tw-justify-center tw-items-center tw-bg-transparent tw-rounded-r-md;
    }
  }

  .input-container:focus-within {
    @apply tw-rounded-md tw-border-r-green;
  }

  .on-error {
    @apply tw-text-red-600 tw-border-[1px] tw-border-red-600;
  }

  .input-element {
    @apply tw-w-full;
  }

  &:deep(.multiselect__tags) {
    @apply tw-w-full
    tw-bg-transparent
    tw-p-0
    tw-min-h-[50px]
    tw-rounded-r-[v-bind(rightRounded)]
    tw-rounded-l-[v-bind(leftRounded)]
    tw-border-0
    tw-flex
    tw-items-center
    tw-pl-3
    tw-pt-2;

    &:focus {
      @apply tw-outline-none;
    }
  }
}
</style>
