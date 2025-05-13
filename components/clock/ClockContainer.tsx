import { Canvas, Rect, SweepGradient, vec } from "@shopify/react-native-skia";
import { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const ClockContainer = () => {
  const rotation = useSharedValue(0);
  const centerX = width / 2;
  const centerY = height / 2;
  const centerVec = vec(centerX, centerY);

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
    <View style={styles.container}>
      <Canvas style={styles.container}>
        <Rect x={0} y={0} width={width} height={height}>
          <SweepGradient
            c={centerVec}
            origin={centerVec}
            colors={["white", "grey", "#222222", "black"]}
            start={0}
            end={360}
            transform={animatedRotation}
          />
        </Rect>
      </Canvas>
      <Text style={styles.dayText}>DAY</Text>
      <Text style={styles.nightText}>Night</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    height: 275,
    width: 275,
  },
  dayText: {
    position: "absolute",
    top: 70,
    fontWeight: "100",
    letterSpacing: 8,
    fontSize: 90,
    color: "black",
    alignSelf: "center",
  },
  nightText: {
    position: "absolute",
    bottom: 70,
    fontWeight: "100",
    letterSpacing: 8,
    fontSize: 90,
    color: "white",
    alignSelf: "center",
  },
});

export default ClockContainer;
