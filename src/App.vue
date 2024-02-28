<template>
  <div class="app-component">
    <div class="app-component-container">
      <Transition>
        <router-view />
      </Transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
});
</script>

<style lang="scss" scoped>
.app-component {
  @apply tw-flex tw-justify-center tw-w-full;

  &-container {
    @apply tw-max-w-[1536px] tw-w-full tw-flex tw-justify-center;
  }
}
</style>
