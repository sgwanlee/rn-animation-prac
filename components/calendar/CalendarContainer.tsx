import { Text, View } from "react-native";
import WeekCalendar from "./WeekCalendar";
import MonthCalendar from "./MonthCalendar";
import { SafeAreaView } from "react-native-safe-area-context";

const CalendarContainer = () => {
  return (
    <SafeAreaView>
      <View>
        {/* <WeekCalendar date={new Date()} /> */}
        <MonthCalendar date={new Date()} />
      </View>
    </SafeAreaView>
  );
};
export default CalendarContainer;
