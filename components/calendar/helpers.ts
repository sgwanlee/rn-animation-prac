import {
  addDays,
  format,
  startOfWeek,
  getDate,
  getMonth,
  getYear,
  startOfMonth,
} from "date-fns";

export type WeekDay = {
  formatted: string;
  date: Date;
  day: number;
};

export type MonthInfo = {
  month: number;
  year: number;
  formatted: string;
};

export const getFirstDayOfMonth = (date: Date = new Date()): Date => {
  return startOfMonth(date);
};

export const getCurrentMonth = (date: Date = new Date()): MonthInfo => {
  return {
    month: getMonth(date),
    year: getYear(date),
    formatted: format(date, "MMMM yyyy"),
  };
};

export const getWeekDays = (date: Date) => {
  const currentDate = new Date(date);
  const day = currentDate.getDay();
  const diff = currentDate.getDate() - day; // adjust when day is sunday

  const weekDays: WeekDay[] = [];
  for (let i = 0; i < 7; i++) {
    const newDate = new Date(currentDate.setDate(diff + i));

    weekDays.push({
      formatted: format(newDate, "EEE"),
      date: newDate,
      day: getDate(newDate),
    });
  }

  return weekDays;
};
