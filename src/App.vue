<template>
  <div class="app-component">
    <div class="tw-w-[1536px]">
      <DefaultTemplate>
        <router-view />
      </DefaultTemplate>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import DefaultTemplate from "@/components/templates/DefaultTemplate.vue";

import availableRoutes from "@/router/routes";

export default defineComponent({
  components: {
    DefaultTemplate,
  },
});
</script>

<style lang="scss" scoped></style>
