<template>
  <div class="tw-w-full tw-shadow-2xl tw-rounded-lg tw-py-8">
    <div class="tw-flex tw-flex-col tw-p-2 tw-w-full tw-h-screen">
      <h3 class="tw-text-center tw-font-extrabold tw-mb-4 tw-text-4xl">Table</h3>

      <TableComponent
        :headers="tableHeader"
        :rowsData="tableData"
        @on-change-order="onChangeOrder"
        @on-click-row="onClickRow"
        show-menu-icon
        trLeading="16px"
        th-class="tw-bg-r-blue-grey tw-text-r-grey tw-text-[15px] tw-font-semibold first:tw-w-[300px]"
        td-class="tw-border-b-[1px] tw-border-r-blue-grey tw-text-[15px] tw-font-semibold"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TableComponent from "@/core/components/table/TableComponent.vue";
import MenuButton from "@/shared/components/MenuButton.vue";

import type { ITableRowHeader, ITableRows, ITableRow } from "@/core/shared/types/table/table.types";
import { computed, markRaw } from "vue";

const dataList = computed(() => {
  const contactsArray: Contact[] = [];

  for (let i = 0; i < 5; i++) {
    const contact = {
      id: Math.random().toString(36).substr(2, 9),
      name: `random name ${i + 1}`,
      phone: `123456789${i}`,
      email: `email${i + 1}@example.com`,
      address: `address ${i + 1}`,
    };

    contactsArray.push(contact);
  }

  return contactsArray;
});

const tableHeader: ITableRowHeader = {
  id: "header",
  cells: [
    {
      id: "firstName",
      cellContent: "Name & Age",
      cellClass: "tw-py-[16px] tw-px-[25px]",
      orderable: true,
    },
    {
      id: "phone",
      cellContent: "Phone",
      cellClass: "tw-py-[16px] tw-px-[25px]",
      orderable: true,
    },
    {
      id: "email",
      cellContent: "Email",
      cellClass: "tw-py-[16px] tw-px-[25px]",
      orderable: true,
    },
    {
      id: "address",
      cellContent: "Address",
      cellClass: "tw-py-[16px] tw-px-[25px]",
      orderable: true,
    },
  ],
};
const dataRows = computed<ITableRow[]>(() => {
  return dataList.value.map((data) => {
    return {
      id: data.id,
      trClass: "tw-leading-4",
      cells: [
        {
          id: `name-${data.id}`,
          cellClass: "tw-py-4 tw-pl-7 !tw-justify-start",
          cellContent: data.name,
        },
        {
          id: `phone-${data.id}`,
          cellClass: "tw-py-4",
          cellContent: data.phone,
        },
        {
          id: `email-${data.id}`,
          cellClass: "tw-py-4",
          cellContent: data.email,
        },
        {
          id: `address-${data.id}`,
          cellClass: "tw-py-4",
          cellContent: data.address,
        },
        {
          id: `status-${data.id}`,
          cellClass: "tw-py-4",
          component: markRaw([
            MenuButton,
            {
              data: data,
              themeColor: "white",
            },
          ]),
        },
      ],
    };
  });
});
const tableData = computed<ITableRows>(() => ({
  id: "categories",
  rows: dataRows.value,
}));
</script>

<style scoped></style>
