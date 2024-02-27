<template>
  <div class="input-component">
    <label :for="id" v-if="label" :data-testid="`${dataTestid}-label`" class="input-label">
      <span v-if="required" class="tw-text-orange-400" :class="[{ '!tw-text-red-600': !!error }]"
        >*</span
      >{{ label }}
    </label>
    <div class="input-container" :class="[{ 'on-error': !!error }, borderInput]">
      <div v-if="slots.left" class="left-slot">
        <slot name="left" />
      </div>

      <input
        v-model="model"
        :type="type"
        :name="name"
        :id="id"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :min="min"
        :max="max"
        :maxlength="maxlength"
        :data-testid="`${dataTestid}-input-component`"
        :step="step"
        :autofocus="autofocus"
        :readonly="readonly"
        :class="[{ 'disable-arrows': !arrows }]"
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
import { useSlots, computed, defineEmits } from "vue";

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
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  autofocus: {
    type: Boolean,
    required: false,
  },
  autocomplete: {
    type: String,
    required: false,
  },
  modelValue: {
    type: [String, Number],
    required: false,
  },
  prefix: {
    type: String,
    default: "",
  },
  suffix: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  arrows: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
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
  patternType: {
    type: String,
    required: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  min: { type: String },
  max: { type: String },
  maxlength: { type: String },
  step: { type: String },
  borderClass: { type: String },
});

const emits = defineEmits(["update:modelValue"]);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", setPattern(value));
  },
});

const leftRounded = computed(() => {
  return slots.left ? "0px" : "6px";
});
const rightRounded = computed(() => {
  return slots.right ? "0px" : "6px";
});
const leftPadding = computed(() => {
  return slots.left ? "5px" : "12px";
});
const borderInput = computed(() => {
  return props.borderClass ?? "";
});
const bgColor = computed(() => {
  return props.bgColor;
});

const setPattern = function (value: string | number) {
  if (props.patternType === "phone") {
    return phonePattern(value);
  }
  return value;
};
const phonePattern = function (value: string | number) {
  const newValue = String(value)
    .replace(/[^0-9]/g, "")
    .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);

  const format = (v: typeof newValue) =>
    v ? (!v[2] ? v[1] : "(" + v[1] + ") " + v[2] + (v[3] ? "-" + v[3] : "")) : "";
  return format(newValue);
};
</script>

<style lang="scss" scoped>
.input-component {
  @apply tw-flex tw-flex-col tw-mb-[v-bind(mb)];

  .input-label {
    @apply tw-text-r-dark-grey tw-text-[16px] tw-font-[Inter] tw-font-[600] tw-leading-10;
  }

  .input-container {
    @apply tw-rounded-md tw-shadow-md tw-w-full tw-flex tw-flex-row tw-border-[1px];

    .left-slot {
      @apply tw-flex tw-justify-center tw-align-middle tw-bg-[v-bind(bgColor)] tw-rounded-l-md tw-pr-[10px];
    }

    .right-slot {
      @apply tw-flex tw-justify-center tw-align-middle tw-bg-[v-bind(bgColor)] tw-rounded-r-md tw-pl-[10px];
    }
  }

  .input-container:focus-within {
    @apply tw-rounded-md tw-border-r-green;
  }

  .on-error {
    @apply tw-text-red-600 tw-border-[1px] tw-border-red-600;
  }

  .input-element {
    @apply tw-w-full
    tw-bg-[v-bind(bgColor)]
    tw-text-[16px]
    tw-py-[17px]
    tw-pr-3
    tw-pl-[v-bind(leftPadding)]
    tw-rounded-r-[v-bind(rightRounded)]
    tw-rounded-l-[v-bind(leftRounded)]
    tw-max-h-[50px]
    tw-text-[v-bind(textColor)];

    &:focus {
      @apply tw-outline-none;
    }
  }

  .disable-arrows::-webkit-inner-spin-button,
  .disable-arrows::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
