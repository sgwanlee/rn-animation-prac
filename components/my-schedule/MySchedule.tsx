import { Plus, X } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Switch, Text, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;
const _spacing = 10;
const _startHour = 8;
const _bgClassName = "bg-[#ececec]";
const _damping = 40;
const _entering = FadeInDown.springify().damping(_damping);
const _exiting = FadeOut.springify().damping(_damping);
const _layout = LinearTransition.springify().damping(_damping);

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const HourBlock = ({ hour }: { hour: number }) => {
  return (
    <View className="flex-1 items-center justify-center border py-[0.5] border-[#ececec] rounded-md">
      <Text>
        {hour > 9 ? hour : `0${hour}`}:00 {hour > 11 && hour < 24 ? "PM" : "AM"}
      </Text>
    </View>
  );
};

const DayBlock = () => {
  const [hours, setHours] = useState([_startHour]);
  return (
    <Animated.View
      className="gap-2"
      entering={_entering}
      exiting={_exiting}
      layout={_layout}
    >
      {hours.map((hour) => (
        <Animated.View
          key={`hour-${hour}`}
          className="flex-row items-center gap-2"
          entering={_entering}
          exiting={_exiting}
          layout={_layout}
        >
          <Text>From: </Text>
          <HourBlock hour={hour} />
          <Text>To: </Text>
          <HourBlock hour={hour + 1} />
          <Pressable
            className={`${_bgClassName}`}
            style={{
              height: 24,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
            }}
            onPress={() => {
              setHours((prev) => [...prev.filter((h) => h !== hour)]);
            }}
          >
            <X size={14} color="#555" />
          </Pressable>
        </Animated.View>
      ))}
      <AnimatedPressable
        onPress={() => {
          if (hours.length === 0) {
            setHours([_startHour]);
            return;
          }
          setHours((prev) => [...prev, prev[prev.length - 1] + 1]);
        }}
        className="flex-row items-center justify-center gap-2 bg-[#ececec] rounded-xl p-2 mb-2"
        layout={_layout}
      >
        <Plus size={18} color="#333" />
        <Text>Add More</Text>
      </AnimatedPressable>
    </Animated.View>
  );
};

const Day = ({ day }: { day: string }) => {
  const [isOn, setIsOn] = useState(false);
  return (
    <Animated.View
      className={`${!isOn && "bg-[#ececec]"}
        border border-[#ececec] rounded-2xl`}
      style={{ paddingHorizontal: _spacing, gap: _spacing }}
      layout={_layout}
    >
      <View className="justify-between items-center flex-row">
        <Text>{day}</Text>
        <Switch
          value={isOn}
          onValueChange={setIsOn}
          style={{
            transformOrigin: "100% 50% 0",
            transform: [{ scale: 0.7 }],
          }}
          trackColor={{ true: "#333" }}
        />
      </View>
      {isOn && <DayBlock />}
    </Animated.View>
  );
};

const MySchedule = () => {
  return (
    <View style={{ gap: _spacing, paddingHorizontal: _spacing }}>
      {weekdays.map((day) => (
        <Day day={day} key={`day-${day}`} />
      ))}
    </View>
  );
};

export default MySchedule;
