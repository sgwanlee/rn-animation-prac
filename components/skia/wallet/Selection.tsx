import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import {
  Canvas,
  Group,
  LinearGradient,
  RoundedRect,
  mix,
  vec,
} from "@shopify/react-native-skia";
import type { SharedValue } from "react-native-reanimated";
import { useDerivedValue, withTiming } from "react-native-reanimated";

import type { Graphs } from "./Model";

const { width } = Dimensions.get("window");
const Padding = 16;
const ButtonCount = 5;

const buttonWidth = (width - Padding * 2) / ButtonCount;
const buttonHeight = 64;
const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  container: {
    backgroundColor: "#272636",
    borderRadius: 16,
    flexDirection: "row",
  },
  button: {
    height: buttonHeight,
    width: buttonWidth,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  label: {
    fontFamily: "Helvetica",
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});

export interface GraphState {
  next: number;
  current: number;
}

interface SelectionProps {
  state: SharedValue<GraphState>;
  transition: SharedValue<number>;
  graphs: Graphs;
}

export const Selection = ({ state, transition, graphs }: SelectionProps) => {
  const transform = useDerivedValue(() => {
    const { current, next } = state.value;
    return [
      {
        translateX: mix(
          transition.value,
          current * buttonWidth,
          next * buttonWidth
        ),
      },
    ];
  });

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Canvas style={StyleSheet.absoluteFill}>
          <Group transform={transform}>
            <RoundedRect
              x={0}
              y={0}
              height={buttonHeight}
              width={buttonWidth}
              r={16}
            >
              <LinearGradient
                colors={["#31CBD1", "#61E0A1"]}
                start={vec(0, 0)}
                end={vec(buttonWidth, buttonHeight)}
              />
            </RoundedRect>
          </Group>
        </Canvas>
        {graphs.map((graph, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              state.value = { current: state.value.next, next: index };
              transition.value = 0;
              transition.value = withTiming(1, {
                duration: 400,
              });
            }}
          >
            <View style={styles.button}>
              <Text style={styles.label}>{graph.label}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
};
