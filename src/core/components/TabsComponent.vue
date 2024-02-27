<template>
  <div class="tabs-component">
    <div class="tab-items" :class="[tabsPositionClass, tabsContainerClasses]">
      <template v-for="(tab, index) in tabs" :key="index">
        <div
          v-if="!tab.invisible"
          class="tab"
          :data-testid="`tab-${tab.id}`"
          :class="[
            {
              'tab-active': tabsElements[index].isActive && tab.title.length > 0,
              'tab-disabled': tab.disabled,
              'tw-hidden': tab.title.length === 0,
            },
            tabsClasses,
          ]"
          @click="selectTab(index)"
        >
          {{ tab.title }}
        </div>
      </template>
    </div>

    <template v-for="(tab, index) in tabs" :key="index">
      <div v-if="tabsElements[index].isActive && !tabsElements[index].disabled">
        <slot :name="tab.id"></slot>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { PropType } from "vue";
import type { ITab, TTabsPosition } from "@/core/shared/types/Tabs.types";

const props = defineProps({
  tabs: {
    type: Array as PropType<ITab[]>,
    required: true,
  },
  tabsPosition: {
    type: String as PropType<TTabsPosition>,
    default: "left",
  },
  tabsClasses: {
    type: String,
    required: false,
  },
  tabsContainerClasses: {
    type: String,
    required: false,
  },
  useHash: {
    type: Boolean,
    default: true,
  },
});

const route = useRoute();
const router = useRouter();
const tabsElements = ref<ITab[]>(JSON.parse(JSON.stringify(props.tabs)));

const tabsPositionClass = computed(() => {
  const positions = {
    left: "tw-justify-start",
    center: "tw-justify-center",
    right: "tw-justify-end",
  };

  return positions[props.tabsPosition];
});

onMounted(() => {
  // const index = tabsElements.value.findIndex((tab) => tab.isActive);
  if (
    !tabsElements.value.find((tab) => tab.isActive) &&
    !props.tabs.find((tab) => tab.id === route.hash.slice(1))
  ) {
    for (let i = 0; i < tabsElements.value.length; i++) {
      if (!tabsElements.value[i].disabled) {
        selectTab(i);
        i = tabsElements.value.length + 1;
      }
    }
  } else if (props.tabs.find((tab) => tab.id === route.hash.slice(1))) {
    selectTab(props.tabs.findIndex((tab) => tab.id === route.hash.slice(1)));
  } else if (tabsElements.value.find((tab) => tab.isActive)) {
    selectTab(tabsElements.value.findIndex((tab) => tab.isActive));
  }
});

watch(
  () => route.hash,
  () => {
    selectTab(props.tabs.findIndex((tab) => tab.id === route.hash.slice(1)));
  }
);

const selectTab = function (index: number): void {
  if (index > -1 && !tabsElements.value[index]?.disabled) {
    unselectTabs();
    tabsElements.value[index].isActive = true;
    if (props.useHash) {
      router.push({ hash: `#${tabsElements.value[index].id}` });
    }
  }
};
const unselectTabs = function (): void {
  tabsElements.value.forEach((tab) => {
    tab.isActive = false;
  });
};
</script>

<style scoped lang="scss">
.tabs-component {
  @apply tw-w-full;

  .tab-items {
    @apply tw-w-full tw-flex tw-space-x-0.5;

    .tab {
      @apply tw-min-w-[150px]
      tw-h-[45px]
      tw-flex
      tw-justify-center
      tw-items-center
      tw-text-r-grey
      tw-cursor-pointer
      tw-font-[600]
      tw-text-[18px]
      tw-px-2;

      &-active {
        @apply tw-border-b-2 tw-border-r-green tw-text-r-green;
      }

      &:hover {
        @apply tw-scale-105;
      }

      &-disabled {
        @apply tw-cursor-not-allowed tw-opacity-50 tw-shadow-none;

        &:hover {
          @apply tw-scale-100;
        }
      }
    }
  }
}
</style>
