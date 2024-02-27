<template>
  <div data-testid="dropdown" :class="{ 'tw-w-full': fullWidth }">
    <Menu v-slot="{ open }">
      <Float
        as="div"
        :placement="placement"
        :offset="15"
        :shift="6"
        :flip="10"
        enter="tw-transition tw-duration-200 tw-ease-out"
        enter-from="tw-scale-95 tw-opacity-0"
        enter-to="tw-scale-100 tw-opacity-100"
        leave="tw-transition tw-duration-150 tw-ease-in"
        leave-from="tw-scale-100 tw-opacity-100"
        leave-to="tw-scale-95 tw-opacity-0"
        tailwindcss-origin-class
        class="tw-relative"
        :z-index="10"
      >
        <MenuButton
          type="button"
          class="tw-flex tw-justify-center tw-items-center tw-group"
          :data-testid="dataTestId"
          @click.stop="() => {}"
          :class="{ 'tw-w-full': fullWidth }"
        >
          <slot name="button" :open="open"></slot>
        </MenuButton>
        <MenuItems
          data-testid="dropdown-menu-items"
          class="tw-rounded-sm tw-shadow-lg focus:tw-outline-0 tw-ring-1 tw-ring-black tw-bg-white tw-ring-opacity-5 tw-overflow-hidden -tw-mt-2"
          :class="width"
        >
          <MenuItem v-for="(item, key) in items" :key="key">
            <router-link
              v-if="item.route"
              :data-testid="item.dataTestId"
              :to="item.route"
              class="list-item"
              :class="item.cssClasses"
            >
              {{ item.label }}
            </router-link>
            <button
              v-else
              @click.stop.prevent="callFunction(item)"
              :data-testid="item.dataTestId"
              class="list-item"
              :class="item.cssClasses"
            >
              {{ item.label }}
            </button>
          </MenuItem>
        </MenuItems>
      </Float>
    </Menu>
  </div>
</template>

<script lang="ts" setup>
// import { defineOptions } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { Float } from "@headlessui-float/vue";
import type { PropType } from "vue";

import type {
  IDropdownItem,
  TPlacementsOptions,
} from "@/core/shared/types/dropdown/Dropdown.types";

defineProps({
  placement: {
    type: String as PropType<TPlacementsOptions>,
    default: "bottom-end",
  },
  items: {
    type: Array as PropType<IDropdownItem[]>,
    required: true,
  },
  width: {
    type: String,
    default: "tw-w-full",
  },
  dataTestId: {
    type: String,
    default: "dropdown-button",
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
});

const callFunction = function (item: IDropdownItem): void {
  if (Reflect.has(item, "fn")) {
    Reflect.get(item, "fn").call();
  }
};
</script>

<style scoped lang="scss">
.list-item {
  @apply tw-text-r-dark-grey
  tw-no-underline
  hover:tw-no-underline
  tw-text-sm
  tw-bg-white
  hover:tw-bg-r-green
  hover:tw-text-white
  tw-w-full
  tw-flex
  tw-items-end
  tw-px-4
  tw-py-2
  tw-font-medium
  first:tw-pt-3
  last:tw-pb-3;
}
</style>
