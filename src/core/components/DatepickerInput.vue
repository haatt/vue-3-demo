<template>
  <div class="input-component">
    <label :for="id" v-if="label" :data-testid="`${dataTestid}-label`" class="input-label">
      {{ label }}
    </label>
    <div class="input-container" :class="[{ 'on-error': !!error }, borderInput]">
      <div v-if="leftCalendar" class="left-slot">
        <div class="tw-flex tw-items-center">
          <ButtonComponent
            :id="`left-datepicker-button-${dataTestid}`"
            theme-color="white"
            size="xs"
            @click="showDatepicker = !showDatepicker"
          >
            <CalendarIcon class="tw-w-6 tw-fill-[#00CB9A]" />
          </ButtonComponent>
          <DatepickerComponent v-if="showDatepicker" @on-pick-date="setModel" />
        </div>
      </div>

      <input
        v-model="model"
        type="text"
        :name="name"
        :id="id"
        :placeholder="placeholder"
        :data-testid="`${dataTestid}-input-component`"
        readonly
        class="input-element"
        @click="showDatepicker = !showDatepicker"
      />

      <div v-if="rightCalendar" class="right-slot">
        <div class="tw-flex tw-items-center">
          <ButtonComponent
            :id="`right-datepicker-button-${dataTestid}`"
            theme-color="white"
            size="xs"
            @click="showDatepicker = !showDatepicker"
          >
            <CalendarIcon class="tw-w-6 tw-fill-[#00CB9A]" />
          </ButtonComponent>
          <DatepickerComponent v-if="showDatepicker" @on-pick-date="setModel" />
        </div>
      </div>
    </div>
    <p v-if="!!error" class="tw-text-red-400 tw-text-xs tw-m-0 tw-relative">
      <span class="tw-absolute">{{ error }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, ref } from "vue";

import ButtonComponent from "@/core/components/ButtonComponent.vue";
import DatepickerComponent from "@/core/components/DatepickerComponent.vue";
import CalendarIcon from "@/components/icons/CalendarIcon.vue";

import TimeHandler from "@/shared/helpers/TimeHandler";

const showDatepicker = ref(false);

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
  leftCalendar: {
    type: Boolean,
    default: false,
  },
  rightCalendar: {
    type: Boolean,
    default: true,
  },
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    default: "MM/dd/yyyy",
  },
  modelValue: {
    type: String, // ISO string
    required: false,
  },
  error: {
    type: String,
    default: "",
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
  borderClass: { type: String },
});

const emits = defineEmits(["update:modelValue"]);

const model = computed({
  get() {
    return getDateFormat(props.modelValue);
  },
  set(value: string) {
    emits("update:modelValue", value);
  },
});

const leftRounded = computed(() => {
  return props.leftCalendar ? "0px" : "6px";
});
const rightRounded = computed(() => {
  return props.leftCalendar ? "0px" : "6px";
});
const leftPadding = computed(() => {
  return props.leftCalendar ? "5px" : "20px";
});
const borderInput = computed(() => {
  return props.borderClass ?? "";
});
const bgColor = computed(() => {
  return props.bgColor;
});
const getDateFormat = function (ISODate = ""): string {
  return ISODate ? TimeHandler.getFormatTime(new Date(ISODate), "MM'/'dd'/'yyyy") : "";
};
const setModel = function (ISODate: string): void {
  model.value = ISODate;
  showDatepicker.value = false;
};
</script>

<style lang="scss" scoped>
.input-component {
  @apply tw-flex tw-flex-col tw-mb-[v-bind(mb)];

  .input-label {
    @apply tw-text-r-dark-grey tw-text-[16px] tw-font-[Inter] tw-font-[600] tw-leading-10;
  }

  .input-container {
    @apply tw-rounded-md tw-shadow-md tw-w-full tw-flex tw-flex-row;

    .left-slot {
      @apply tw-flex tw-justify-center tw-align-middle tw-bg-[v-bind(bgColor)] tw-rounded-l-md;
    }

    .right-slot {
      @apply tw-flex tw-justify-center tw-align-middle tw-bg-[v-bind(bgColor)] tw-rounded-r-md;
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
    tw-h-[53px]
    tw-text-[v-bind(textColor)];

    &:focus {
      @apply tw-outline-none;
    }
  }
}
</style>
