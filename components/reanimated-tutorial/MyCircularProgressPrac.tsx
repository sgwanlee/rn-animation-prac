import { useEffect } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";
import Svg, { Circle } from "react-native-svg";

const BACKGROUND_COLOR = "#444B6F";
const BACKGROUND_STROKE_COLOR = "#303858";
const STROKE_COLOR = "#A6E1FA";

const CIRCLE_LENGTH = 1000;
const R = CIRCLE_LENGTH / (2 * Math.PI);
const { width, height } = Dimensions.get("window");

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const MyCircularProgressPrac = () => {
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
      className={`flex-1 items-center justify-center`}
      style={{ backgroundColor: BACKGROUND_COLOR }}
    >
      <ReText
        text={progressText}
        style={{
          zIndex: 1,
          color: "white",
          fontSize: 80,
          width: 200,
          textAlign: "center",
        }}
      />
      <Svg fill={BACKGROUND_COLOR} style={{ position: "absolute" }}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={R}
          strokeWidth={30}
          stroke={BACKGROUND_STROKE_COLOR}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={R}
          strokeWidth={15}
          stroke={STROKE_COLOR}
          strokeDasharray={CIRCLE_LENGTH}
          strokeLinecap="round"
          animatedProps={animatedProps}
        />
      </Svg>
      <TouchableOpacity
        className="absolute items-center justify-center p-4"
        style={{
          width: width * 0.7,
          backgroundColor: BACKGROUND_STROKE_COLOR,
          borderRadius: 25,
          bottom: 80,
        }}
        onPress={onPress}
      >
        <Text className="text-white" style={{ fontSize: 25 }}>
          Run
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default MyCircularProgressPrac;
