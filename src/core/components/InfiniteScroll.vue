<template>
  <div class="infinite-scroll">
    <slot></slot>
    <div ref="detector" class="infinite-scroll-detector" />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, defineProps, onMounted, onUnmounted, watch } from "vue";

let observer = {} as IntersectionObserver;
const detector = ref<HTMLDivElement | null>(null);

const props = defineProps({
  enabled: {
    type: Boolean,
    default: true,
  },
  threshold: {
    type: Number,
    default: 0.1,
  },
});

const emit = defineEmits(["loadMore"]);

watch(
  () => props.enabled,
  (value: boolean) => {
    if (!value) {
      observer.disconnect();
    } else {
      loadObserver();
    }
  }
);

onMounted(() => {
  loadObserver();
});

onUnmounted(() => {
  if (props.enabled) {
    observer.disconnect();
  }
});

const loadObserver = function (): void {
  if (props.enabled) {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          emit("loadMore");
        }
      },
      {
        threshold: props.threshold,
      }
    );
    // eslint-disable-next-line
    observer.observe(detector.value);
  }
};
</script>

<style lang="scss" scoped>
.infinite-scroll {
  position: relative;
}

.infinite-scroll-detector {
  width: 100%;
  height: 50%;
  position: relative;
  bottom: 0;
  z-index: -10;
}
</style>
