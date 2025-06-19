import { getMonth, getYear } from "date-fns";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import CalendarDays from "./CalendarDays";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

const MonthCalendar = ({ date }: { date: Date }) => {
  const [year, setYear] = useState<number>();
  const [month, setMonth] = useState<number>();

  useEffect(() => {
    setMonth(getMonth(date));
    setYear(getYear(date));
  }, [date]);

  if (!(month && year)) {
    return null;
  }

  return (
    <View className="px-10">
      <Text>
        {months[month]} {year}
      </Text>
      <View className="flex-row justify-between">
        {weekDays.map((day, index) => {
          return <Text key={`${day}-${index}`}>{day}</Text>;
        })}
      </View>
      <View>
        <CalendarDays date={date} />
      </View>
    </View>
  );
};
export default MonthCalendar;
