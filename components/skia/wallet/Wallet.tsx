import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Header } from "./Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { List } from "./List";
import {
  Canvas,
  Group,
  LinearGradient,
  Path,
  usePathValue,
  vec,
} from "@shopify/react-native-skia";
import { Label } from "./Label";
import { COLORS, getGraph, HEADER_HEIGHT, PADDING } from "./Model";
import { Cursor } from "./Cursor";
import { Selection } from "./Selection";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { useMemo } from "react";
import { useGraphTouchHandler } from "./useGraphTouchHandler";
import { getYForX } from "./Math";
import {
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const touchableCursorSize = 80;

const Wallet = () => {
  const window = useWindowDimensions();
  const { width } = window;
  const height = Math.min(window.width, window.height) / 2;
  const translateY = height + PADDING;
  const insets = useSafeAreaInsets();
  const graphs = useMemo(() => getGraph(width, height), [width, height]);
  const transition = useSharedValue(0);

  const state = useSharedValue({
    next: 0,
    current: 0,
  });
  // path to display
  const path = useDerivedValue(() => {
    const { current, next } = state.value;
    const start = graphs[current].data.path;
    const end = graphs[next].data.path;
    return end.interpolate(start, transition.value)!;
  });

  const x = useSharedValue(0);
  const y = useDerivedValue(() => getYForX(path.value.toCmds(), x.value));
  const gesture = useGraphTouchHandler(x, width);

  const style = useAnimatedStyle(() => {
    return {
      position: "absolute",
      width: touchableCursorSize,
      height: touchableCursorSize,
      left: x.value - touchableCursorSize / 2,
      top:
        HEADER_HEIGHT +
        insets.top +
        translateY +
        y.value -
        touchableCursorSize / 2,
      backgroundColor: "red",
      opacity: 0.5,
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingTop: insets.top }}
      >
        <Header />
        <Canvas style={{ width, height: 2 * height + 30 }}>
          <Label
            state={state}
            y={y}
            graphs={graphs}
            width={width}
            height={height}
          />
          <Group transform={[{ translateY }]}>
            <Path
              style="stroke"
              path={path}
              strokeWidth={4}
              strokeJoin="round"
              strokeCap="round"
            >
              <LinearGradient
                start={vec(0, 0)}
                end={vec(width, 0)}
                colors={COLORS}
              />
            </Path>
            <Cursor x={x} y={y} width={width} />
          </Group>
        </Canvas>
        <GestureDetector gesture={gesture}>
          <Animated.View style={style} />
        </GestureDetector>
        <Selection state={state} transition={transition} graphs={graphs} />

        <List />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1F1D2B",
  },
});

export default Wallet;
