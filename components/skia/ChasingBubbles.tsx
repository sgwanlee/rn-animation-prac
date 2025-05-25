import { Canvas, Circle } from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import {
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");
const ROWS = 12;
const VERTICAL_OFFSET = 25;
const ROW_HEIGHT = 30;

export const Dot = ({
  index,
  xPosition,
  yPosition,
}: {
  index: number;
  xPosition: SharedValue<number>;
  yPosition: SharedValue<number>;
}) => {
  const currentRow = Math.floor(index / ROWS) * ROW_HEIGHT;
  const currentColumn = Math.floor(index % ROWS) * ROW_HEIGHT + VERTICAL_OFFSET;

  const radius = useDerivedValue(() => {
    const hypotenuse = Math.hypot(
      xPosition.value - currentColumn,
      yPosition.value - ROW_HEIGHT - currentRow
    );
    if (hypotenuse < 55 && xPosition.value !== -1) {
      return withSpring(11, { overshootClamping: true });
    } else {
      return withSpring(3, {
        overshootClamping: true,
      });
    }
  }, [xPosition, yPosition]);

  return (
    <Circle
      cx={currentColumn}
      cy={currentRow + ROW_HEIGHT}
      r={radius}
      color="blue"
    />
  );
};

const ChasingBubbles = () => {
  const [nums, setNums] = useState<number[]>([]);
  const insets = useSafeAreaInsets();

  const xPosition = useSharedValue(-1);
  const yPosition = useSharedValue(-1);

  useEffect(() => {
    const dotsForHeight = Math.round(height / 35);
    const numsArray = Array.from(Array(ROWS * dotsForHeight).keys());
    setNums(numsArray);
  }, []);

  const gesture = Gesture.Pan()
    .onEnd(() => {
      xPosition.value = -1;
      yPosition.value = -1;
    })
    .onFinalize(() => {
      xPosition.value = -1;
      yPosition.value = -1;
    })
    .onBegin(({ x, y }) => {
      xPosition.value = x;
      yPosition.value = y;
    })
    .onChange(({ x, y }) => {
      xPosition.value = x;
      yPosition.value = y;
    });
  return (
    <GestureHandlerRootView>
      <View
        className="flex-1 justify-center items-center"
        style={{ marginTop: insets.top }}
      >
        <GestureDetector gesture={gesture}>
          <Canvas style={{ height: "100%", width: "100%" }}>
            {nums.map((dotIndex) => {
              return (
                <Dot
                  key={dotIndex}
                  index={dotIndex}
                  xPosition={xPosition}
                  yPosition={yPosition}
                />
              );
            })}
          </Canvas>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

export default ChasingBubbles;
