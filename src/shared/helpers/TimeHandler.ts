import { format, differenceInSeconds, getUnixTime } from "date-fns";

export default class TimeHandler {
  static getFormatTime(date: Date, dateFormat = "MMMM d yyyy") {
    return format(date, dateFormat);
  }

  static getDifferenceInSeconds(startDate: Date, endDate: Date) {
    return differenceInSeconds(endDate, startDate);
  }

  static getTimeInSeconds(date: Date) {
    return getUnixTime(date);
  }

  static isItPastTime(date: Date, compareDate = new Date()) {
    return getUnixTime(date) < getUnixTime(compareDate);
  }
}
