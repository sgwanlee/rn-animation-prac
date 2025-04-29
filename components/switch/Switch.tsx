import { Pressable, Text, View } from "react-native";
import { MotiTransitionProp, MotiView } from "moti";
import { useMemo } from "react";
import { Easing } from "react-native-reanimated";

const _colors = {
  active: "#2c2c2c",
  inactive: "#dcdcdc",
};

interface Props {
  size: number;
  onPress: () => void;
  isActive: boolean;
}

const transition: MotiTransitionProp = {
  type: "timing",
  duration: 300,
  easing: Easing.inOut(Easing.ease),
};

const Switch = ({ size, onPress, isActive }: Props) => {
  const trackWidth = useMemo(() => size * 1.5, [size]);
  const trackHeight = useMemo(() => size * 0.4, [size]);
  const knobSize = useMemo(() => size * 0.6, [size]);

  return (
    <Pressable onPress={onPress}>
      <View className="justify-center items-center">
        {/* Track */}
        <MotiView
          animate={{
            backgroundColor: isActive ? _colors.active : _colors.inactive,
          }}
          transition={transition}
          style={{
            position: "absolute",
            width: trackWidth,
            height: trackHeight,
            borderRadius: trackHeight / 2,
          }}
        ></MotiView>
        {/* Knob */}
        <MotiView
          transition={transition}
          animate={{
            translateX: isActive ? trackWidth / 4 : -trackWidth / 4,
          }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Knob indicator */}
          <MotiView
            transition={transition}
            animate={{
              width: isActive ? 0 : knobSize,
              borderColor: isActive ? _colors.active : _colors.inactive,
            }}
            style={{
              width: knobSize,
              height: knobSize,
              borderRadius: knobSize / 2,
              borderWidth: size * 0.1,
              borderColor: isActive ? _colors.active : _colors.inactive,
              backgroundColor: "#fff",
            }}
          />
        </MotiView>
      </View>
    </Pressable>
  );
};

export default Switch;
