<template>
  <div class="table-component">
    <table class="table">
      <thead>
        <caption v-if="slots.captionTop" class="tw-caption-top">
          <slot name="captionTop"></slot>
        </caption>
        <tr :class="headers.trClass">
          <th
            v-for="(cell, index) in headers.cells"
            :key="index"
            :class="[cell.thClass, thClass]"
            class="tw-min-h-[50px] first:tw-rounded-l-md last:tw-rounded-r-md"
          >
            <div
              class="tw-flex tw-justify-center tw-items-center tw-w-full tw-h-full"
              :class="cell.cellClass"
            >
              <template v-if="cell.component">
                <DisplayCell :component="cell.component" />
              </template>

              <template v-else>
                <div v-html="displayCell(cell)" />
              </template>

              <template v-if="cell.orderable">
                <div
                  class="tw-flex tw-justify-center tw-items-center tw-h-full tw-w-[20px] tw-cursor-pointer"
                  @click="onOrder(cell.id)"
                >
                  <UpDowArrowsIcon class="tw-w-[12px] tw-h-[12px]" />
                </div>
              </template>
            </div>
          </th>

          <th
            v-if="showMenuIcon"
            :class="[cellMenuIconClass, thClass]"
            class="tw-min-h-[50px] last:tw-rounded-r-md"
          >
            <div class="tw-flex tw-justify-center tw-items-center tw-w-full tw-h-full tw-px-6">
              <MenuIcon class="tw-w-[22px]" />
            </div>
          </th>
        </tr>
      </thead>

      <tbody :class="{ 'add-head-body-space': leadingSpace }">
        <tr
          v-for="(row, index) in rowsData.rows"
          :key="index"
          :class="row.trClass"
          @click="emits('onClickRow', row)"
        >
          <td
            v-for="(cell, index) in row.cells"
            :key="index"
            :class="[cell.tdClass, tdClass, { 'add-tr-space': leadingSpaceTr }]"
            class="tw-min-h-[50px] first:tw-rounded-l-md last:tw-rounded-r-md"
          >
            <div
              class="tw-w-full tw-min-h-[50px] tw-flex tw-justify-center tw-items-center"
              :class="cell.cellClass"
            >
              <template v-if="cell.component">
                <DisplayCell :component="cell.component" />
              </template>

              <template v-else>
                <div v-html="displayCell(cell)" />
              </template>
            </div>
          </td>
        </tr>
      </tbody>
      <caption v-if="slots.captionBottom" class="tw-caption-bottom">
        <slot name="captionBottom"></slot>
      </caption>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { computed, useSlots } from "vue";
import type { PropType } from "vue";

import DisplayCell from "@/core/components/table/DisplayCell.vue";

import UpDowArrowsIcon from "@/components/icons/UpDowArrowsIcon.vue";
import MenuIcon from "@/components/icons/MenuIcon.vue";

import type {
  ITableRowHeader,
  ITableRows,
  ITableCell,
} from "@/core/shared/types/table/table.types";

const slots = useSlots();

const emits = defineEmits(["onChangeOrder", "onClickRow"]);

const props = defineProps({
  headers: {
    type: Object as PropType<ITableRowHeader>,
    required: true,
  },
  rowsData: {
    type: Object as PropType<ITableRows>,
    required: true,
  },
  showMenuIcon: {
    type: Boolean,
    default: false,
  },
  bodyLeading: {
    type: String,
    default: "",
  },
  trLeading: {
    type: String,
    default: "",
  },
  thClass: {
    type: String,
    default: "",
  },
  tdClass: {
    type: String,
    default: "",
  },
  cellMenuIconClass: {
    type: String,
    default: "",
  },
});

const leadingSpace = computed(() => props.bodyLeading);
const leadingSpaceTr = computed(() => props.trLeading);

const displayCell = function (cell: ITableCell): string | number {
  return cell.cellContent ?? "";
};
const onOrder = function (collId: string | number | undefined): void {
  emits("onChangeOrder", collId);
};
</script>

<style scoped lang="scss">
.table-component {
  .table {
    @apply tw-table-auto tw-w-full tw-mb-6;

    .add-head-body-space {
      @apply before:tw-content-["-"] before:tw-text-[1px] before:tw-leading-[v-bind(leadingSpace)] before:tw-text-transparent;
    }

    .add-tr-space {
      @apply before:tw-content-["-"] before:tw-text-[1px] before:tw-leading-[v-bind(leadingSpaceTr)] before:tw-text-transparent;
    }

    tbody > tr > td {
      @apply tw-p-0;

      div {
        @apply tw-h-full;
      }
    }
  }
}
</style>
