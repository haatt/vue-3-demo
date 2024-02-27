<template>
  <div class="tw-rounded-lg tw-shadow-lg tw-absolute">
    <DatePicker
      locale="en-US"
      firstDayOfWeek="sunday"
      :default-date="new Date()"
      @updated="handleUpdate"
    />
  </div>
</template>

<script lang="ts" setup>
import { DatePicker } from "qalendar";

const emits = defineEmits(["onPickDate"]);

// TODO: implement
// const disableDates = {
//   before: new Date(2022, 5, 1),
//   after: new Date(2022, 5, 31),
// };

const handleUpdate = function (payload: { year: string; month: string; date: string }) {
  const { year, month, date } = payload;
  const pickDate = new Date(Number(year), Number(month), Number(date)).toISOString();
  emits("onPickDate", pickDate);
};
</script>
