<template>
  <div class="input-switch">
    <div class="tw-flex tw-items-center">
      <label :for="id" v-if="label">
        {{ label }}
      </label>

      <input
        :id="id"
        :name="name"
        :aria-describedby="id"
        v-model="checked"
        type="checkbox"
        class="tw-form-control form-control-switch"
        :class="{
          'form-control-invalid': !!error,
        }"
        :data-testid="dataTestid"
        :disabled="disabled"
      />
    </div>
    <p v-if="!!error" class="tw-text-red-400 tw-text-xs tw-m-0 tw-relative">
      <span class="tw-absolute">{{ error }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";

const format = ref("");

const emits = defineEmits(["update:modelValue"]);
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
  },
  value: {
    type: [String, Number],
  },
  disabled: {
    type: Boolean,
    default: false,
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

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});
const checked = computed({
  get(): typeof model.value {
    const valBind = model.value;
    if (format.value === "boolean") {
      return valBind;
    }
    if (format.value === "object" && valBind) {
      const list = JSON.parse(JSON.stringify(valBind));
      return list.indexOf(props.value) > -1;
    }

    return false;
  },
  set(val: boolean | string) {
    if (format.value == "boolean") {
      model.value = val;
    }
    if (format.value == "object") {
      let list = JSON.parse(JSON.stringify(model.value));
      if (val) {
        list.push(props.value);
      } else {
        list = list.filter((item: string) => item != props.value);
      }

      model.value = list;
    }
  },
});

onMounted(() => {
  format.value = typeof model.value;
});
</script>

<style lang="scss" scoped>
.input-switch {
  .form-control-switch {
    @apply tw-w-9 tw-h-5 tw-ml-2 tw-bg-r-blue-grey tw-rounded-full tw-relative tw-z-0 tw-appearance-none tw-bg-none tw-border tw-border-transparent
    disabled:tw-bg-gray-200 disabled:tw-cursor-default
    hover:tw-bg-gray-400;

    &:focus-within {
      @apply tw-ring-offset-0 tw-ring-2 tw-ring-r-green tw-outline tw-outline-0;
    }

    &:after {
      content: "";
      @apply tw-bg-white
      tw-shadow
      tw-w-4
      tw-h-4
      tw-border
      tw-border-white
      tw-absolute
      tw-rounded-full
      tw-top-1/2
      -tw-mt-2
      tw-left-0.5
      tw-transition-all
      tw-duration-200
      tw-drop-shadow;
    }

    &:checked {
      @apply tw-bg-r-green disabled:tw-bg-gray-500;

      &:focus-within {
        @apply tw-ring-offset-0 tw-ring-2 tw-ring-r-green-3 tw-outline tw-outline-0;
      }

      &:hover {
        @apply tw-bg-r-green;
      }

      &:after {
        @apply tw-translate-x-[88%];
      }
    }
  }

  label {
    @apply tw-mb-0;
  }
}
</style>
