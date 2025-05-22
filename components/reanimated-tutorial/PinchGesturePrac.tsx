import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { faker } from "@faker-js/faker";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PinchGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

faker.seed(22);
const { width, height } = Dimensions.get("window");
const image =
  "https://fastly.picsum.photos/id/294/430/932.jpg?hmac=DXuXTDI0khZyxNDsykhzG8dWfH6hD3nk9cv1URDFPqU";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const PinchGesturePrac = () => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onStart((e) => {
      console.log("onStart", e);
    })
    .onUpdate((e) => {
      scale.value = e.scale;
      focalX.value = e.focalX;
      focalY.value = e.focalY;
    })
    .onEnd((e) => {
      scale.value = 1;
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

  const focalStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
    };
  });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pinchGesture}>
        <Animated.View style={{ flex: 1 }}>
          <AnimatedImage
            source={{ uri: image }}
            style={[{ flex: 1 }, rStyle]}
          />
          <Animated.View
            style={[
              focalStyle,
              StyleSheet.absoluteFillObject,
              {
                width: 20,
                height: 20,
                backgroundColor: "blue",
                borderRadius: 10,
              },
            ]}
          ></Animated.View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};
export default PinchGesturePrac;
