import { useState } from "react";
import { Dimensions, Switch, Text, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const Colors = {
  dark: {
    background: "#1e1e1e",
    circle: "#252525",
    text: "#f8f8f8",
  },
  light: {
    background: "#f8f8f8",
    circle: "#fff",
    text: "#1e1e1e",
  },
};

const SWITCH_TRACK_COLOR = {
  true: "rgba(256, 0, 256, 0.2)",
  false: "rgba(0, 0, 0, 0.1)",
};

const SIZE = Dimensions.get("window").width * 0.7;

type Theme = "light" | "dark";

const ColorPrac = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const progress = useDerivedValue(() => {
    return theme === "dark" ? withTiming(1) : withTiming(0);
  }, [theme]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    );
    return {
      backgroundColor,
    };
  });

  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle]
    );
    return {
      backgroundColor,
    };
  });

  const rtextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text]
    );
    return {
      color,
    };
  });

  return (
    <Animated.View
      className="flex-1 items-center justify-center"
      style={rStyle}
    >
      <Animated.Text
        style={[
          {
            fontSize: 70,
            textTransform: "uppercase",
            fontWeight: "700",
            marginBottom: 35,
            letterSpacing: 14,
          },
          rtextStyle,
        ]}
      >
        Theme
      </Animated.Text>
      <Animated.View
        style={[
          {
            width: SIZE,
            height: SIZE,
            backgroundColor: "#fff",
            borderRadius: SIZE / 2,
            alignItems: "center",
            justifyContent: "center",
            shadowOffset: {
              width: 0,
              height: 20,
            },
            shadowRadius: 10,
            shadowOpacity: 0.1,
            elevation: 8,
          },
          rCircleStyle,
        ]}
      >
        <Switch
          value={theme === "dark"}
          onValueChange={(value) => setTheme(value ? "dark" : "light")}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor="violet"
        />
      </Animated.View>
    </Animated.View>
  );
};
export default ColorPrac;
