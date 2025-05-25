import { Dimensions, Image, ImageBackground, Text, View } from "react-native";
import { faker } from "@faker-js/faker";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useRef } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const SIZE = 300;

const { width, height } = Dimensions.get("window");
const image =
  "https://fastly.picsum.photos/id/294/430/932.jpg?hmac=DXuXTDI0khZyxNDsykhzG8dWfH6hD3nk9cv1URDFPqU";

const DoubleTapPrac = () => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: Math.max(scale.value, 0) }],
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .maxDelay(250)
    .onStart(() => {
      console.log("onStart");
    })
    .onEnd(() => {
      console.log("onEnd");
      scale.value = withSpring(1, {}, (isFinished) => {
        if (isFinished) {
          scale.value = withDelay(500, withSpring(0));
        }
      });
    });

  const tapGesture = Gesture.Tap()
    .numberOfTaps(1)
    .onStart(() => {
      console.log("tap onStart");
    })
    .onEnd(() => {
      console.log("tap onEnd");
      opacity.value = withTiming(1, {}, (isFinished) => {
        if (isFinished) {
          opacity.value = withDelay(500, withTiming(0));
        }
      });
    })
    .requireExternalGestureToFail(doubleTapGesture);

  return (
    <GestureHandlerRootView>
      <View className="flex-1 items-center justify-center">
        <GestureDetector gesture={tapGesture}>
          <GestureDetector gesture={doubleTapGesture}>
            <Animated.View className="flex-1 items-center justify-center">
              <ImageBackground
                source={{ uri: image }}
                style={{ width: SIZE, height: SIZE }}
              >
                <Animated.Image
                  source={require("../../assets/images/like.png")}
                  style={[
                    {
                      width: SIZE,
                      height: SIZE,
                      shadowOffset: { width: 0, height },
                      shadowOpacity: 0.35,
                      shadowRadius: 35,
                    },
                    rStyle,
                  ]}
                  resizeMode="center"
                ></Animated.Image>
              </ImageBackground>
              <Animated.Text
                style={[
                  { fontSize: 40, textAlign: "center", marginTop: 35 },
                  rTextStyle,
                ]}
              >
                😂😂😂😂
              </Animated.Text>
            </Animated.View>
          </GestureDetector>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};
export default DoubleTapPrac;
