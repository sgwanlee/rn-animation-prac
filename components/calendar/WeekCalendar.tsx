import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { getWeekDays, WeekDay } from "./helpers";

const WeekCalendar = ({ date }: { date: Date }) => {
  const [week, setWeek] = useState<WeekDay[]>([]);

  useEffect(() => {
    const weekDays = getWeekDays(date);
    setWeek(weekDays);
  }, [date]);

  return (
    <View className="flex-row justify-between px-4 text-gray-400">
      {week.map((weekDay) => {
        return (
          <View key={weekDay.day}>
            <Text>{weekDay.formatted}</Text>
            <TouchableOpacity>
              <Text>{weekDay.day}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};
export default WeekCalendar;
