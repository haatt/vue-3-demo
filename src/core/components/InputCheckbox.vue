<template>
  <div class="input-component">
    <div class="input-container">
      <input
        :id="id"
        :name="name"
        :data-testid="dataTestid"
        v-model="model"
        :value="value"
        :disabled="disabled"
        :required="required"
        type="checkbox"
        class="input-element"
      />

      <label :for="id" v-if="label" :data-testid="`${dataTestid}-label`" class="input-label">
        <span v-if="required" class="tw-text-orange-400" :class="[{ '!tw-text-red-600': !!error }]"
          >*</span
        >{{ label }}
      </label>
    </div>

    <p v-if="!!error" class="tw-text-red-400 tw-text-xs tw-m-0 tw-relative">
      <span class="tw-absolute">{{ error }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineEmits, onMounted } from "vue";

const format = ref();

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
  modelValue: {
    type: [String, Number, Boolean, Array],
    required: false,
  },
  value: {
    type: [String, Number, Boolean, Array],
    default: true,
  },
  label: {
    type: String,
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
  size: {
    type: String,
    default: "16px",
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

const emits = defineEmits(["update:modelValue"]);

const model = computed({
  get() {
    if (format.value == "boolean" || !props.value) {
      return props.modelValue;
    } else if (props.modelValue && String(props.modelValue).length > 0) {
      return true;
    }
    return false;
  },
  set(value) {
    if (value) {
      emits("update:modelValue", props.value);
    } else {
      if (format.value == "string") {
        emits("update:modelValue", "");
      } else if (format.value == "number") {
        emits("update:modelValue", 0);
      } else if (format.value == "object") {
        emits("update:modelValue", {});
      } else {
        emits("update:modelValue", value);
      }
    }
  },
});

onMounted(() => {
  format.value = typeof props.value;
});
</script>

<style lang="scss" scoped>
.input-component {
  @apply tw-flex tw-flex-col tw-mb-[v-bind(mb)];

  .input-container {
    @apply tw-flex tw-space-x-3 tw-items-center;

    input {
      @apply tw-w-[v-bind(size)] tw-h-[v-bind(size)];
    }
  }

  .input-label {
    @apply tw-text-r-dark-grey tw-text-[16px] tw-font-[Inter] tw-font-[600] tw-leading-10;
  }
}
</style>
