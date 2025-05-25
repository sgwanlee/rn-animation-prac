import { Dimensions, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const WORDS = ["What's", "up", "dude", "?"];

const { width, height } = Dimensions.get("window");
const SIZE = width * 0.7;

interface PageProps {
  title: string;
  index: number;
  scrollX: SharedValue<number>;
}
const Page = ({ title, index, scrollX }: PageProps) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      borderRadius: interpolate(
        scrollX.value,
        [index - 1, index, index + 1],
        [0, SIZE / 2, 0],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [0, 1, 0],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [index - 1, index, index + 1],
        [0, 1, 0],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          translateY: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [height / 2, 0, -height / 2]
          ),
        },
      ],
    };
  });

  return (
    <View
      style={{
        height,
        width,
        backgroundColor: `rgba(0,0,255,0.${index + 2})`,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.View
        style={[
          rStyle,
          {
            width: SIZE,
            height: SIZE,
            backgroundColor: "rgba(0,0,255,0.4)",
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Animated.Text
          style={[
            rTextStyle,
            {
              color: "white",
              fontSize: 70,
              fontWeight: "700",
            },
          ]}
        >
          {title}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const ScrollViewPrac = () => {
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x / width;
  });
  return (
    <Animated.ScrollView
      horizontal
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      pagingEnabled
    >
      {WORDS.map((title, index) => {
        return (
          <Page key={index} title={title} index={index} scrollX={scrollX} />
        );
      })}
    </Animated.ScrollView>
  );
};
export default ScrollViewPrac;
