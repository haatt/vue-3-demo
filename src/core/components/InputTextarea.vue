<template>
  <div class="input-textarea">
    <label
      :for="props.id"
      v-if="props.label"
      :data-testid="`${props.id}-label`"
      class="input-label"
    >
      {{ props.label }}
    </label>
    <textarea
      ref="textareaElement"
      v-model="model"
      class="form-textarea"
      :name="props.name"
      :id="props.id"
      :rows="props.rows"
      :placeholder="props.placeholder"
      :class="[cssClasses, { 'tw-mt-2': label }, { 'on-error': !!error }]"
      :minlength="props.minlength"
      :maxlength="props.maxlength"
      :disabled="props.disabled"
      :data-testid="`${props.dataTestid}-text-area`"
    >
    </textarea>
    <p v-if="!!error" class="tw-text-red-400 tw-text-xs tw-m-0 tw-relative">
      <span class="tw-absolute">{{ error }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineEmits, computed } from "vue";

const textareaElement = ref<HTMLTextAreaElement>();

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
    default: "",
  },
  cssClasses: {
    type: String,
    default: "",
  },
  minlength: { type: String },
  maxlength: { type: String },
  rows: {
    type: [String, Number],
    default: 3,
  },
  autoResize: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    required: false,
  },
  error: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

watch(
  () => props.modelValue,
  () => {
    resize();
  }
);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const resize = function (): void {
  if (props.autoResize && textareaElement.value) {
    //Always put back the height to auto so the height is computed again.
    textareaElement.value.style.height = "auto";
    //If we have some text, let's update the height of the textarea.
    if (props.modelValue.length > 0) {
      textareaElement.value.style.height = `${textareaElement.value.scrollHeight}px`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
.input-textarea {
  .input-label {
    @apply tw-text-r-dark-grey tw-text-[16px] tw-font-[Inter] tw-font-[600] tw-leading-10;
  }

  .form-textarea {
    @apply tw-text-base
    tw-bg-r-blue-grey
    tw-block
    tw-border-[1px]
    tw-border-r-blue-grey
    tw-rounded-md
    tw-w-full
    tw-py-[0.5625rem]
    tw-px-3
    tw-resize
    tw-outline-none
    tw-outline-offset-0
    tw-min-h-[52px]
    tw-shadow-md;

    &:focus {
      @apply tw-outline-r-green tw-outline-1;
    }
  }

  .on-error {
    @apply tw-text-red-600 tw-border-[1px] tw-border-red-600;
  }
}
</style>
