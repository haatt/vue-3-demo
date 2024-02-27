<template>
  <div class="input-datepicker">
    <label :for="id" v-if="label" :data-testid="`${dataTestid}-label`" class="input-label">
      <span v-if="required" class="tw-text-orange-400" :class="[{ '!tw-text-red-600': !!error }]"
        >*</span
      >{{ label }}
    </label>
    <div class="input-container" :class="[{ 'on-error': !!error }, borderClass]">
      <div v-if="leftCalendar" class="left-slot">
        <div class="tw-flex tw-items-center">
          <button :id="`left-datepicker-button-${dataTestid}`" @click.prevent="onShowDatepicker">
            <CalendarIcon class="tw-w-6 tw-fill-[#00CB9A]" />
          </button>
        </div>
      </div>

      <Datepicker
        :id="id"
        :name="name"
        :data-testid="`${dataTestid}-multi-select`"
        :placeholder="placeholder"
        :enableTimePicker="false"
        :disabled="disabled"
        :time-picker="timePicker"
        :range="range"
        v-model="model"
        utc
        format="MM-dd-yyyy"
        class="input-element"
        ref="datepicker"
        :text-input="textInput"
      >
        <template #input-icon></template>
      </Datepicker>

      <div v-if="rightCalendar" class="right-slot">
        <div class="tw-flex tw-items-center">
          <button :id="`right-datepicker-button-${dataTestid}`" @click.prevent="onShowDatepicker">
            <CalendarIcon class="tw-w-6 tw-fill-[#00CB9A]" />
          </button>
        </div>
      </div>
    </div>
    <p v-if="!!error" class="tw-text-red-400 tw-text-xs tw-m-0 tw-relative">
      <span class="tw-absolute">{{ error }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import CalendarIcon from "@/components/icons/CalendarIcon.vue";

import type { DatePickerInstance } from "@vuepic/vue-datepicker";

const datepicker = ref<DatePickerInstance>(null);

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
    type: [String, Array],
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    default: "",
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
  timePicker: {
    type: Boolean,
    default: false,
  },
  range: {
    type: Boolean,
    default: false,
  },
  leftCalendar: {
    type: Boolean,
    default: false,
  },
  rightCalendar: {
    type: Boolean,
    default: true,
  },
  borderClass: { type: String },
});

const emit = defineEmits(["update:modelValue", "onOpen"]);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    console.log("update:modelValue", value);
    emit("update:modelValue", value);
  },
});
const leftRounded = computed(() => {
  return props.leftCalendar ? "0px" : "6px";
});
const rightRounded = computed(() => {
  return props.rightCalendar ? "0px" : "6px";
});
const textInput = computed<boolean>(() => {
  return !!props.placeholder;
});

const onShowDatepicker = function () {
  datepicker.value?.openMenu();
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style lang="scss" scoped>
.input-datepicker {
  @apply tw-flex tw-flex-col tw-mb-[v-bind(mb)];

  .input-label {
    @apply tw-text-r-dark-grey tw-text-[16px] tw-font-[Inter] tw-font-[600] tw-leading-10;
  }

  .input-container {
    @apply tw-rounded-md tw-shadow-md tw-w-full tw-flex tw-flex-row tw-border-[1px] tw-bg-[v-bind(bgColor)];

    .left-slot {
      @apply tw-flex tw-justify-center tw-items-center tw-bg-transparent tw-rounded-l-md tw-ml-2;
    }

    .right-slot {
      @apply tw-flex tw-justify-center tw-items-center tw-bg-transparent tw-rounded-r-md tw-mr-2;
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

  &:deep(.dp__input) {
    @apply tw-w-full
    tw-bg-transparent
    tw-min-h-[50px]
    tw-rounded-r-[v-bind(rightRounded)]
    tw-rounded-l-[v-bind(leftRounded)]
    tw-border-0
    tw-pl-3
    tw-pr-0;

    &:focus {
      @apply tw-outline-none;
    }
  }
}
</style>
