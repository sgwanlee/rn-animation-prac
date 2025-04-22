import { Pressable, PressableProps, Text, View } from "react-native";
import Animated, {
  AnimatedProps,
  FadeInDown,
  FadeInLeft,
  FadeOutDown,
  FadeOutLeft,
  interpolateColor,
  LinearTransition,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";

const _spacing = 8;
const _buttonHeight = 42;
const _layoutTransition = LinearTransition.springify()
  .damping(80)
  .stiffness(200);
const _dotContainer = 24;
const _dotSize = _dotContainer / 3;
const _activeDot = "#fff";
const _inactiveDot = "#aaa";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function Button({ children, style, ...rest }: AnimatedProps<PressableProps>) {
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
      exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
      layout={_layoutTransition}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
}

const Dot = ({
  index,
  animation,
}: {
  index: number;
  animation: SharedValue<number>;
}) => {
  const stylez = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animation.value,
        [index - 1, index, index + 1],
        [_inactiveDot, _activeDot, _activeDot]
      ),
    };
  });
  return (
    <View
      style={{ width: _dotContainer, height: _dotContainer }}
      className="justify-center items-center"
    >
      <Animated.View
        style={[
          stylez,
          {
            width: _dotSize,
            height: _dotSize,
            borderRadius: _dotSize,
            backgroundColor: "#000",
          },
        ]}
      ></Animated.View>
    </View>
  );
};

const PaginationIndicator = ({
  animation,
}: {
  animation: SharedValue<number>;
}) => {
  const stylez = useAnimatedStyle(() => {
    return {
      width: _dotContainer + _dotContainer * animation.value,
    };
  });
  return (
    <Animated.View
      style={[
        stylez,
        {
          backgroundColor: "#29be56",
          height: _dotContainer,
          width: _dotContainer,
          borderRadius: _dotContainer,
          position: "absolute",
          left: 0,
          top: 0,
        },
      ]}
    />
  );
};

const Pagination = ({
  selectedIndex,
  total,
}: {
  selectedIndex: number;
  total: number;
}) => {
  const animation = useDerivedValue(() => {
    return withSpring(selectedIndex, {
      damping: 80,
      stiffness: 200,
    });
  });

  return (
    <View className="justify-center items-center">
      <View className="flex-row">
        <PaginationIndicator animation={animation} />
        {[...Array(total).keys()].map((i) => (
          <Dot index={i} key={`dot-${i}`} animation={animation} />
        ))}
      </View>
    </View>
  );
};

type Props = {
  total: number;
  selectedIndex: number;
  onIndexChange: (index: number) => void;
};

const Onboarding = ({ total, selectedIndex, onIndexChange }: Props) => {
  return (
    <View style={{ padding: _spacing, gap: _spacing }}>
      <Pagination selectedIndex={selectedIndex} total={total} />
      <View className={`flex-row gap-[8px]`}>
        {selectedIndex > 0 && (
          <Button
            style={{ backgroundColor: "#ddd" }}
            onPress={() => {
              onIndexChange(selectedIndex - 1);
            }}
          >
            <Text>Back</Text>
          </Button>
        )}
        <Button
          style={{ backgroundColor: "#036bfb", flex: 1 }}
          onPress={() => {
            if (selectedIndex >= total - 1) {
              return;
            }
            onIndexChange(selectedIndex + 1);
          }}
        >
          {selectedIndex === total - 1 ? (
            <Animated.Text
              key="finish"
              className="text-white"
              entering={FadeInDown.springify().damping(80).stiffness(200)}
              exiting={FadeOutDown.springify().damping(80).stiffness(200)}
            >
              Finish
            </Animated.Text>
          ) : (
            <Animated.Text
              key="continue"
              className="text-white"
              layout={_layoutTransition}
              entering={FadeInDown.springify().damping(80).stiffness(200)}
              exiting={FadeOutDown.springify().damping(80).stiffness(200)}
            >
              Continue
            </Animated.Text>
          )}
        </Button>
      </View>
    </View>
  );
};

export default Onboarding;
