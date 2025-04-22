import { View } from "react-native";
import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";

const _dotSize = 8;
const _dotContainer = 24;
const _activeDotColor = "#fff";
const _inactiveDotColor = "#ddd";

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
        [_inactiveDotColor, _activeDotColor, _activeDotColor]
      ),
    };
  });
  return (
    <View
      style={{
        height: _dotContainer,
        width: _dotContainer,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={[
          stylez,
          {
            height: _dotSize,
            width: _dotSize,
            borderRadius: _dotSize,
            // backgroundColor: "#000",
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
        {
          backgroundColor: "#29be56",
          height: _dotContainer,
          width: _dotContainer,
          borderRadius: _dotContainer,
          position: "absolute",
          left: 0,
          top: 0,
        },
        stylez,
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
    return withSpring(selectedIndex, { damping: 80, stiffness: 200 });
  });
  return (
    <View className="justify-center items-center">
      <View className="flex-row">
        <PaginationIndicator animation={animation} />
        {[...Array(total).keys()].map((index) => (
          <Dot key={`dot-${index}`} index={index} animation={animation} />
        ))}
      </View>
    </View>
  );
};

export default Pagination;
