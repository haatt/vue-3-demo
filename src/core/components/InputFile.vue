<template>
  <div class="input-component">
    <label :for="id" v-if="label" :data-testid="`${dataTestid}-label`" class="input-label">
      {{ label }}
    </label>
    <div class="input-container" :class="[{ 'on-error': !!error || !!errorFile }, borderInput]">
      <div v-if="left" class="left-slot">
        <div v-if="!model" class="tw-flex tw-items-center">
          <ButtonComponent
            :id="`left-datepicker-button-${dataTestid}`"
            theme-color="white"
            size="xs"
            @click="openFileSelector"
            :disabled="readonly"
          >
            <ImageIcon class="tw-w-6 tw-fill-[#00CB9A]" />
          </ButtonComponent>
        </div>
        <img
          v-else
          class="tw-w-[50px] tw-h-[51px] tw-max-w-[50px] tw-max-h-[51px] tw-rounded-md"
          :src="(model as string)"
          @click="openFileSelector"
        />
      </div>

      <input
        type="text"
        :name="name"
        :id="id"
        :placeholder="placeholder"
        :data-testid="`${dataTestid}-input-component`"
        readonly
        class="input-element"
        v-model="currentFileName"
        @click="openFileSelector"
      />
      <input
        type="file"
        accept="image/*"
        @change="onFileChange"
        class="tw-hidden"
        ref="inputFile"
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
import { useSlots, computed, defineEmits, ref } from "vue";

import ButtonComponent from "@/core/components/ButtonComponent.vue";
import ImageIcon from "@/components/icons/ImageIcon.vue";

const slots = useSlots();
const errorFile = ref("");
const inputFile = ref<InstanceType<typeof HTMLInputElement> | null>(null);
const fileName = ref("");
// const fileInputRef = ref<HTMLInputElement | null>(null);

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
  label: {
    type: String,
    required: false,
  },
  placeholder: {
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
  left: {
    type: Boolean,
    default: true,
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
const currentFileName = computed(() => {
  return fileName.value || model.value;
});

const leftRounded = computed(() => {
  return props.left ? "0px" : "6px";
});
const rightRounded = computed(() => {
  return slots.right ? "0px" : "6px";
});
const borderInput = computed(() => {
  return props.borderClass ?? "";
});
const bgColor = computed(() => {
  return props.bgColor;
});

const openFileSelector = () => {
  inputFile.value.click();
};
const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    if (file.type.startsWith("image/")) {
      fileName.value = file.name;
      errorFile.value = "";
      const reader = new FileReader();

      reader.onload = (e) => {
        model.value = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    } else {
      errorFile.value = "Invalid file.";
    }
  }
};
</script>

<style lang="scss" scoped>
.input-component {
  @apply tw-flex tw-flex-col tw-mb-[v-bind(mb)] tw-cursor-pointer;

  .input-label {
    @apply tw-text-r-dark-grey tw-text-[16px] tw-font-[Inter] tw-font-[600] tw-leading-10;
  }

  .input-container {
    @apply tw-rounded-md tw-shadow-md tw-w-full tw-flex tw-flex-row;

    .left-slot {
      @apply tw-flex tw-justify-center tw-items-center tw-align-middle tw-w-[72px] tw-bg-[v-bind(bgColor)] tw-rounded-l-md tw-pr-0;
    }

    .right-slot {
      @apply tw-flex tw-justify-center tw-items-center tw-align-middle tw-bg-[v-bind(bgColor)] tw-rounded-r-md tw-pl-[10px];
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
    tw-py-[17px]
    tw-pr-[20px]
    tw-pl-2
    tw-rounded-r-[v-bind(rightRounded)]
    tw-rounded-l-[v-bind(leftRounded)]
    tw-max-h-[53px]
    tw-text-[v-bind(textColor)]
    tw-cursor-pointer;

    &:focus {
      @apply tw-outline-none;
    }
  }
}
</style>
