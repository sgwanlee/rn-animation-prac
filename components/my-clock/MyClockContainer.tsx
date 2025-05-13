import { Canvas, Rect, SweepGradient, vec } from "@shopify/react-native-skia";
import { useEffect } from "react";
import { Dimensions, Text, View } from "react-native";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const MyClockContainer = () => {
  const centerX = width / 2;
  const centerY = height / 2;
  const centerVec = vec(centerX, centerY);
  const rotation = useSharedValue(0);

  const animatedRotation = useDerivedValue(() => {
    return [{ rotate: Math.PI * rotation.value }];
  }, [rotation]);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(2, { duration: 4000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  return (
    <View className="flex-1">
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height} color="red">
          <SweepGradient
            c={centerVec}
            start={0}
            end={360}
            origin={centerVec}
            colors={["white", "grey", "#222222", "black"]}
            transform={animatedRotation}
          />
        </Rect>
      </Canvas>
      <Text className="absolute top-[70px] tracking-[8px] self-center">
        Day
      </Text>
      <Text className="absolute bottom-[70px] tracking-[8px] text-white self-center">
        Night
      </Text>
    </View>
  );
};

export default MyClockContainer;
