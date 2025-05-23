import { useEffect } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { ReText } from "react-native-redash";

const BACKGROUND_COLOR = "#444B6F";
const BACKGROUND_STROKE_COLOR = "#303858";
const STROKE_COLOR = "#A6E1FA";

const { width, height } = Dimensions.get("window");

const CIRCLE_LENGTH = 1000;
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgressPrac = () => {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  });

  const onPress = () => {
    progress.value = withTiming(1, { duration: 2000 });
  };

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: BACKGROUND_COLOR }}
    >
      <ReText
        style={{
          fontSize: 80,
          width: 200,
          textAlign: "center",
          color: "rgba(256,256,256,0.7)",
          zIndex: 1,
        }}
        text={progressText}
      />
      <Svg fill={BACKGROUND_COLOR} style={{ position: "absolute" }}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={"round"}
        />
      </Svg>
      <TouchableOpacity
        style={{
          bottom: 80,
          width: width * 0.7,
          position: "absolute",
          backgroundColor: BACKGROUND_STROKE_COLOR,
          borderRadius: 25,
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={onPress}
      >
        <Text style={{ fontSize: 25, color: "#fff" }}>Run</Text>
      </TouchableOpacity>
    </View>
  );
};
export default CircularProgressPrac;
