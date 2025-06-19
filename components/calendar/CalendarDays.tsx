import {
  startOfMonth,
  format,
  getDay,
  eachDayOfInterval,
  endOfMonth,
} from "date-fns";
import { useMemo } from "react";
import { Text, View } from "react-native";

const CalendarDays = ({ date }: { date: Date }) => {
  const days = useMemo(() => {
    const firstDayOfMonth = startOfMonth(date);
    const lastDayOfMonth = endOfMonth(date);
    const weekDayOfFirstDay = getDay(firstDayOfMonth);

    const prevMonthDays = [];

    for (let i = weekDayOfFirstDay; i > 0; i--) {
      const prevDate = new Date(firstDayOfMonth);
      prevDate.setDate(firstDayOfMonth.getDate() - i);
      prevMonthDays.push({
        date: prevDate,
        isCurrentMonth: false,
        day: prevDate.getDate(),
      });
    }

    const currentMonthDays = eachDayOfInterval({
      start: firstDayOfMonth,
      end: lastDayOfMonth,
    }).map((day) => ({
      date: day,
      isCurrentMonth: true,
      day: day.getDate(),
    }));

    const nextMonthDays = [];
    const weekDayOfLastDay = getDay(lastDayOfMonth);

    for (let i = 1; i <= 7 - weekDayOfLastDay - 1; i++) {
      const nextDate = new Date(lastDayOfMonth);
      nextDate.setDate(lastDayOfMonth.getDate() + i);
      nextMonthDays.push({
        date: nextDate,
        isCurrentMonth: false,
        day: nextDate.getDate(),
      });
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  }, [date]);

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {days.map((day, index) => (
        <View
          key={index}
          style={{
            width: "14.28%", // 100% / 7
            aspectRatio: 1,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 0.5,
            borderColor: "#f0f0f0",
          }}
        >
          <Text
            style={{
              color: day.isCurrentMonth ? "#333" : "#ccc",
              fontWeight: day.isCurrentMonth ? "500" : "300",
              fontSize: 16,
            }}
          >
            {day.day}
          </Text>
        </View>
      ))}
    </View>
  );
};
export default CalendarDays;
