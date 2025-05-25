import { CircleEllipsis } from "lucide-react-native";
import { Text, StyleProp, View, ViewStyle, StyleSheet } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  measure,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface RippleProps {
  style: StyleProp<ViewStyle>;
  onTap: () => void;
  children: React.ReactNode;
}

const Ripple = ({ style, onTap, children }: RippleProps) => {
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);

  const aRef = useAnimatedRef<View>();
  const width = useSharedValue(0);
  const height = useSharedValue(0);

  const rippleOpacity = useSharedValue(1);

  const tapGesture = Gesture.Tap()
    .onStart((e) => {
      scale.value = 0;
      centerX.value = e.x;
      centerY.value = e.y;
      rippleOpacity.value = 1;
      scale.value = withTiming(1, { duration: 1000 });
    })
    .onFinalize((e) => {
      const layout = measure(aRef);
      if (layout) {
        width.value = layout.width;
        height.value = layout.height;
      }

      if (onTap) {
        runOnJS(onTap)();
      }

      rippleOpacity.value = withTiming(0, { duration: 1000 });
    });

  const rStyle = useAnimatedStyle(() => {
    const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);
    // const circleRadius = 200;
    const translateX = centerX.value - circleRadius;
    const translateY = centerY.value - circleRadius;
    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      opacity: 0.2,
      top: 0,
      left: 0,
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      position: "absolute",
      opacity: rippleOpacity.value,
      transform: [{ translateX }, { translateY }, { scale: scale.value }],
      //   순서가 중요하다.
      // scale이 먼저있으면 scale의 withTiming이 translateX, translateY에 영향을 준다.
    };
  });

  return (
    <View ref={aRef} style={style}>
      <GestureDetector gesture={tapGesture}>
        <Animated.View style={[style, { overflow: "hidden" }]}>
          <View>{children}</View>
          <Animated.View style={[rStyle]}></Animated.View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const RippleEffect = () => {
  const onTap = () => {};
  return (
    <GestureHandlerRootView>
      <View className="flex-1 items-center justify-center">
        <Ripple onTap={onTap} style={styles.ripple}>
          <Text>Tap</Text>
        </Ripple>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  ripple: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 25,
    backgroundColor: "white",
    borderRadius: 20,
  },
});
export default RippleEffect;
