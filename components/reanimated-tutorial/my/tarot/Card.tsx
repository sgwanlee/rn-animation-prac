import { useEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

interface CardProps {
  card: {
    source: ReturnType<typeof require>;
  };
  index: number;
  shuffleBack: SharedValue<boolean>;
}

const { width: wWidth } = Dimensions.get("window");
const SNAP_POINTS = [-wWidth, 0, wWidth];

const aspectRatio = 2890 / 1748;
const CARD_WIDTH = wWidth - 200;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const IMAGE_WIDTH = CARD_WIDTH * 0.9;
const IMAGE_HEIGHT = IMAGE_WIDTH * aspectRatio;
const DURATION = 200;

const Card = ({ card, index, shuffleBack }: CardProps) => {
  const theta = Math.random() * 20 - 10;
  const rotateZ = useSharedValue(0);
  const delay = index * 50;
  const offset = useSharedValue({ x: 0, y: 0 });
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    translateY.value = 0;
    rotateZ.value = withDelay(delay, withTiming(theta, { duration: DURATION }));
  }, [card, index]);

  useAnimatedReaction(
    () => shuffleBack.value,
    (v) => {
      if (v) {
        const duration = 150 * index;
        translateX.value = withDelay(
          duration,
          withSpring(0, {}, () => {
            shuffleBack.value = false;
          })
        );
        rotateZ.value = withDelay(duration, withSpring(theta));
      }
    }
  );

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      offset.value = { x: translateX.value, y: translateY.value };
      scale.value = withTiming(1.1);
    })
    .onChange((event) => {
      translateX.value = offset.value.x + event.translationX;
      translateY.value = offset.value.y + event.translationY;
    })
    .onEnd((event) => {
      const dest = snapPoint(translateX.value, event.velocityX, SNAP_POINTS);
      translateX.value = withSpring(dest, { velocity: event.velocityX });
      translateY.value = withSpring(0, { velocity: event.velocityY });
      scale.value = withTiming(1, {}, () => {
        const isLast = index === 0;
        const isSwipedLeftOrRight = dest !== 0;

        if (isLast && isSwipedLeftOrRight) {
          shuffleBack.value = true;
        }
      });
    });

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1500 },
        { rotateZ: `${rotateZ.value}deg` },
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  return (
    <View style={[styles.container]} pointerEvents="box-none">
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, style]}>
          <Image
            source={card.source as any}
            style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
            resizeMode="contain"
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: "white",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.3,
    elevation: 5,
    // transform: [
    //   {
    //     translateX: 0,
    //   },
    //   {
    //     translateY: 100,
    //   },
    //   {
    //     rotateZ: "10deg",
    //   },
    //   {
    //     rotateX: "10deg",
    //   },
    // ],
  },
});

export default Card;
