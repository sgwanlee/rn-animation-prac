import { useMemo } from "react";
import { Pressable, View } from "react-native";
import { _colors } from "../switch/Switch";
import { Easing } from "react-native-reanimated";
import { MotiTransitionProp, MotiView } from "moti";

interface Props {
  size: number;
  isActive: boolean;
  onPress: () => void;
}

const transition: MotiTransitionProp = {
  type: "timing",
  duration: 300,
  easing: Easing.inOut(Easing.ease),
};

const MySwitch = ({ size, isActive, onPress }: Props) => {
  const trackWidth = useMemo(() => size * 1.5, [size]);
  const trackHeight = useMemo(() => size * 0.6, [size]);
  const knobSize = useMemo(() => size * 0.4, [size]);

  return (
    <Pressable onPress={onPress}>
      <View className="items-center justify-center">
        {/* Track */}
        <MotiView
          transition={transition}
          animate={{
            backgroundColor: isActive ? _colors.active : _colors.inactive,
          }}
          style={{
            width: trackWidth,
            height: trackHeight,
            borderRadius: trackHeight / 2,

            position: "absolute",
          }}
        />
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
          {/* Knob Indicator */}
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
              backgroundColor: "#fff",
            }}
          />
        </MotiView>
      </View>
    </Pressable>
  );
};

export default MySwitch;
