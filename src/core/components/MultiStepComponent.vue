<template>
  <div class="multi-step-component">
    <div class="step-items" :class="[stepsPositionClass, stepsContainerClasses]">
      <template v-for="(step, index) in steps" :key="index">
        <div
          v-if="!step.invisible"
          class="step"
          :data-testid="`step-${step.id}`"
          :class="[
            {
              'step-active': stepsElements[index].isActive && step.title.length > 0,
              'step-disabled': step.disabled,
              'tw-hidden': step.title.length === 0,
              'step-hover': allowClickSteps,
            },
            stepsClasses,
          ]"
          @click="onClickStep(index)"
        >
          <div class="step-index">
            <span>{{ index + 1 }}</span>
          </div>
          <span>{{ step.title }}</span>
        </div>
      </template>
    </div>

    <template v-for="(step, index) in steps" :key="index">
      <div v-show="stepsElements[index].isActive && !stepsElements[index].disabled">
        <slot :name="step.id"></slot>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { PropType } from "vue";
import type { IStep, TStepsPosition } from "@/core/shared/types/MultiStep.types";

const props = defineProps({
  steps: {
    type: Array as PropType<IStep[]>,
    required: true,
  },
  stepsPosition: {
    type: String as PropType<TStepsPosition>,
    default: "center",
  },
  stepsClasses: {
    type: String,
    required: false,
  },
  stepsContainerClasses: {
    type: String,
    required: false,
  },
  useHash: {
    type: Boolean,
    default: true,
  },
  allowClickSteps: {
    type: Boolean,
    default: true,
  },
});

const route = useRoute();
const router = useRouter();
const stepsElements = ref<IStep[]>(JSON.parse(JSON.stringify(props.steps)));
const currentIndex = ref(0);

const stepsPositionClass = computed(() => {
  const positions = {
    left: "tw-justify-start",
    center: "tw-justify-center",
    right: "tw-justify-end",
  };

  return positions[props.stepsPosition];
});

onMounted(() => {
  if (
    !stepsElements.value.find((step) => step.isActive) &&
    !props.steps.find((step) => step.id === route.hash.slice(1))
  ) {
    for (let i = 0; i < stepsElements.value.length; i++) {
      if (!stepsElements.value[i].disabled) {
        selectStep(i);
        i = stepsElements.value.length + 1;
      }
    }
  } else if (props.steps.find((step) => step.id === route.hash.slice(1))) {
    selectStep(props.steps.findIndex((step) => step.id === route.hash.slice(1)));
  } else if (stepsElements.value.find((step) => step.isActive)) {
    selectStep(stepsElements.value.findIndex((step) => step.isActive));
  }
});

watch(
  () => route.hash,
  () => {
    selectStep(props.steps.findIndex((step) => step.id === route.hash.slice(1)));
  }
);

const onClickStep = function (index: number): void {
  if (props.allowClickSteps) {
    selectStep(index);
  }
};
const selectStep = function (index: number): void {
  if (index > -1 && !stepsElements.value[index]?.disabled) {
    unselectStep();
    stepsElements.value[index].isActive = true;
    currentIndex.value = index;
    if (props.useHash) {
      router.push({ hash: `#${stepsElements.value[index].id}` });
    }
  }
};
const unselectStep = function (): void {
  stepsElements.value.forEach((step) => {
    step.isActive = false;
  });
};

defineExpose({
  selectStep,
  currentIndex,
});
</script>

<style scoped lang="scss">
.multi-step-component {
  @apply tw-w-full;

  .step-items {
    @apply tw-w-full tw-flex tw-space-x-8 tw-mb-3;

    .step-hover:hover {
      @apply tw-scale-105 tw-opacity-50 tw-cursor-pointer;
    }

    .step {
      @apply tw-min-w-[150px]
      tw-flex
      tw-justify-center
      tw-items-center
      tw-space-x-[10px]
      tw-h-10
      tw-text-r-grey
      tw-font-semibold
      tw-text-base
      tw-px-0.5;

      .step-index {
        @apply tw-w-[28px] tw-h-[28px] tw-rounded-full tw-flex tw-justify-center tw-items-center tw-bg-r-grey tw-text-white;
      }

      &-active {
        @apply tw-text-r-green;

        .step-index {
          @apply tw-bg-r-green;
        }
      }

      &-disabled {
        @apply tw-cursor-not-allowed tw-opacity-50 tw-shadow-none;

        &:hover {
          @apply tw-scale-100 tw-cursor-none;
        }
      }
    }
  }
}
</style>
