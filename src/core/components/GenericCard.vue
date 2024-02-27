<template>
  <div class="generic-card">
    <template v-if="showHeader || headerTitle">
      <div @click="onHideBody" :class="{ 'tw-cursor-pointer': collapsible }">
        <template v-if="slots.header">
          <slot name="header" :isCollapsedBody="hideBody"></slot>
        </template>
        <template v-else>
          <div class="header">
            <span class="tw-font-semibold">{{ headerTitle }}</span>
          </div>
        </template>
      </div>
    </template>

    <div v-show="!hideBody" class="tw-transition-all tw-duration-1000">
      <slot name="body" :isCollapsedBody="hideBody"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots, computed } from "vue";

const slots = useSlots();

const emits = defineEmits(["update:collapsedBody"]);

const props = defineProps({
  headerTitle: {
    type: String,
    required: false,
  },
  showHeader: {
    type: Boolean,
    default: false,
  },
  roundedSize: {
    type: String,
    default: "8px",
  },
  bodyBackground: {
    type: String,
    default: "#ffffff",
  },
  headerBackground: {
    type: String,
    default: "#ffffff",
  },
  collapsible: {
    type: Boolean,
    default: false,
  },
  collapsedBody: {
    type: Boolean,
    default: false,
  },
});

const hideBody = computed({
  get() {
    if (props.collapsible) {
      return props.collapsedBody;
    } else {
      return false;
    }
  },
  set(newValue) {
    emits("update:collapsedBody", newValue as boolean);
  },
});

const onHideBody = function () {
  hideBody.value = !hideBody.value;
};
</script>

<style scoped lang="scss">
.generic-card {
  @apply tw-w-full tw-p-0 tw-rounded-[v-bind(roundedSize)] tw-bg-[v-bind(bodyBackground)] tw-mt-3;

  .header {
    @apply tw-w-full tw-rounded-t-[v-bind(roundedSize)] tw-flex tw-items-center tw-px-6 tw-py-3 tw-bg-[v-bind(headerBackground)] tw-space-x-2;
  }
}
</style>
