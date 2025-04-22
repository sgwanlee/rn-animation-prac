import { Pressable, PressableProps } from "react-native";
import Animated, {
  AnimatedProps,
  FadeInLeft,
  FadeOutRight,
  LinearTransition,
} from "react-native-reanimated";

const _buttonHeight = 42;
const _spacing = 8;
export const _layoutTransition = LinearTransition.springify()
  .damping(80)
  .stiffness(200);

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = ({
  children,
  style,
  ...rest
}: AnimatedProps<PressableProps>) => {
  return (
    <AnimatedPressable
      style={[
        {
          height: _buttonHeight,
          borderRadius: _buttonHeight / 2,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: _spacing * 2,
        },
        style,
      ]}
      entering={FadeInLeft.springify().damping(80).stiffness(200)}
      exiting={FadeOutRight.springify().damping(80).stiffness(200)}
      layout={_layoutTransition}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
};

export default Button;
