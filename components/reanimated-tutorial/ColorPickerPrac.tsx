import React, { useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleProp, Text, View, ViewStyle } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const COLORS = [
  "red",
  "purple",
  "blue",
  "cyan",
  "green",
  "yellow",
  "black",
  "white",
];

const width = Dimensions.get("window").width;
const BACKGROUND_COLOR = "rgba(0,0,0,0.9)";
const PICKER_WIDTH = width * 0.9;
const CIRCLE_PICKER_SIZE = 45;
const INTERNAL_PICKER_SIZE = CIRCLE_PICKER_SIZE / 2;
const CIRCLE_SIZE = width * 0.8;

const ColorPicker = ({
  colors,
  start,
  end,
  style,
  maxWidth,
  onColorChange,
}: {
  colors: string[];
  start: { x: number; y: number };
  end: { x: number; y: number };
  style: StyleProp<ViewStyle>;
  maxWidth: number;
  onColorChange: (color: string) => void;
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const adjustTranslateX = useDerivedValue(() => {
    return Math.min(
      Math.max(translateX.value, 0),
      maxWidth - CIRCLE_PICKER_SIZE
    );
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: adjustTranslateX.value,
        },
        {
          translateY: translateY.value,
        },
        { scale: scale.value },
      ],
    };
  });

  const rInternalStyle = useAnimatedStyle(() => {
    const inputRange = colors.map(
      (_, index) => (index / colors.length) * maxWidth
    );
    const backgroundColor = interpolateColor(
      translateX.value,
      inputRange,
      colors
    );
    onColorChange?.(backgroundColor);
    return {
      backgroundColor,
    };
  });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
      scale.value = withSpring(1.2);
    })
    .onChange((event) => {
      translateX.value = adjustTranslateX.value + event.changeX;
      console.log(translateX.value);
    })
    .onEnd(() => {
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
    });

  const tapGesture = Gesture.Tap()
    .onStart((e) => {
      translateX.value = withTiming(e.absoluteX - CIRCLE_PICKER_SIZE);
      translateY.value = -CIRCLE_PICKER_SIZE;
      scale.value = withSequence(
        withDelay(100, withSpring(1.2)),
        withDelay(500, withSpring(1))
      );
    })
    .onEnd((e) => {
      translateY.value = 0;
    });

  return (
    <GestureDetector gesture={tapGesture}>
      <GestureDetector gesture={panGesture}>
        <Animated.View className="justify-center">
          <LinearGradient
            colors={colors as any}
            start={start}
            end={end}
            style={style}
          ></LinearGradient>
          <Animated.View
            style={[
              {
                position: "absolute",
                backgroundColor: "#fff",
                width: CIRCLE_PICKER_SIZE,
                height: CIRCLE_PICKER_SIZE,
                borderRadius: CIRCLE_PICKER_SIZE / 2,
                alignItems: "center",
                justifyContent: "center",
              },
              rStyle,
            ]}
          >
            <Animated.View
              style={[
                {
                  width: INTERNAL_PICKER_SIZE,
                  height: INTERNAL_PICKER_SIZE,
                  borderRadius: INTERNAL_PICKER_SIZE / 2,
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.1)",
                },
                rInternalStyle,
              ]}
            ></Animated.View>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </GestureDetector>
  );
};

const ColorPickerPrac = () => {
  const pickedColor = useSharedValue(COLORS[0]);

  const onColorChanged = useCallback((color: string) => {
    "worklet";
    pickedColor.value = color;
  }, []);

  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value,
    };
  });
  return (
    <>
      <GestureHandlerRootView>
        <View
          className="flex-[3] items-center justify-center"
          style={{ backgroundColor: BACKGROUND_COLOR }}
        >
          <Animated.View
            style={[
              {
                width: CIRCLE_SIZE,
                height: CIRCLE_SIZE,
                backgroundColor: "red",
                borderRadius: CIRCLE_SIZE / 2,
              },
              rStyle,
            ]}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: BACKGROUND_COLOR,
          }}
        >
          <ColorPicker
            colors={COLORS}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ height: 50, width: PICKER_WIDTH, borderRadius: 20 }}
            maxWidth={PICKER_WIDTH}
            onColorChange={onColorChanged}
          />
        </View>
      </GestureHandlerRootView>
    </>
  );
};
export default ColorPickerPrac;
