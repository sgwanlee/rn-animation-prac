import { Plus, X } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Switch, Text, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const _spacing = 10;
const _color = "#ececec";
const _borderRadius = 16;
const _startHour = 8;
const _damping = 40;
const _entering = FadeInDown.springify().damping(_damping);
const _exiting = FadeOut.springify().damping(_damping);
const _layout = LinearTransition.springify().damping(_damping);

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const HourBlock = ({ hour }: { hour: number }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: _color,
        borderRadius: _borderRadius - _spacing,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: _spacing / 4,
      }}
    >
      <Text>
        {hour > 9 ? hour : `0${hour}`}:00 {hour > 11 && hour < 24 ? "PM" : "AM"}
      </Text>
    </View>
  );
};

const DayBlock = () => {
  const [hours, setHours] = useState<number[]>([_startHour]);
  return (
    <Animated.View
      style={{ gap: _spacing }}
      entering={_entering}
      exiting={_exiting}
      layout={_layout}
    >
      {hours.map((hour) => (
        <Animated.View
          layout={_layout}
          entering={_entering}
          exiting={_exiting}
          key={`hour-${hour}`}
          style={{ flexDirection: "row", gap: _spacing, alignItems: "center" }}
        >
          <Text>From: </Text>
          <HourBlock hour={hour} />
          <Text>To: </Text>
          <HourBlock hour={hour + 1} />
          <Pressable
            onPress={() => {
              setHours((prev) => [...prev.filter((k) => k !== hour)]);
            }}
          >
            <View
              style={{
                backgroundColor: _color,
                height: 24,
                aspectRatio: 1,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: _borderRadius - _spacing,
              }}
            >
              <X size={14} color="#555" />
            </View>
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
        layout={_layout}
      >
        <View
          style={{
            flexDirection: "row",
            gap: _spacing / 2,
            padding: _spacing,
            borderRadius: _borderRadius - _spacing / 2,
            backgroundColor: _color,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: _spacing / 2,
          }}
        >
          <Plus size={18} color="#333" />
          <Text style={{ color: "#333" }}>Add More</Text>
        </View>
      </AnimatedPressable>
    </Animated.View>
  );
};

const Day = ({ day }: { day: (typeof weekDays)[number] }) => {
  const [isOn, setIsOn] = useState(false);
  return (
    <Animated.View
      style={{
        borderWidth: 1,
        borderColor: _color,
        borderRadius: _borderRadius,
        paddingHorizontal: _spacing,
        backgroundColor: isOn ? "transparent" : _color,
        gap: _spacing,
      }}
      layout={_layout}
    >
      <View className="flex-row items-center justify-between">
        <Text>{day}</Text>
        <Switch
          value={isOn}
          onValueChange={(value) => setIsOn(value)}
          trackColor={{ true: "#666" }}
          style={{
            transformOrigin: "100% 50% 0",
            transform: [
              {
                scale: 0.7,
              },
            ],
          }}
        />
      </View>
      {isOn && <DayBlock />}
    </Animated.View>
  );
};

const Scheduler = () => {
  return (
    <View style={{ padding: _spacing, gap: _spacing }}>
      {weekDays.map((day) => (
        <Day day={day} key={day} />
      ))}
    </View>
  );
};

export default Scheduler;
