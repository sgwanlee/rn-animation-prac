import { Marquee } from "@animatereactnative/marquee";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { images } from "../apple-invites/image";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stagger } from "@animatereactnative/stagger";
import Animated, {
  Easing,
  FadeIn,
  FadeInUp,
  FadeOut,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useState } from "react";

const { width } = Dimensions.get("window");
const _itemWidth = width * 0.62;
const _itemHeight = _itemWidth * 1.67;
const _spacing = 16;
const _itemSize = _itemWidth + _spacing;

const Item = ({
  image,
  index,
  offset,
}: {
  image: string;
  index: number;
  offset: SharedValue<number>;
}) => {
  console.log(index);
  const stylez = useAnimatedStyle(() => {
    const itemPosition = index * _itemSize - width - _itemSize / 2;
    const totalSize = images.length * _itemSize;
    const range =
      ((itemPosition - offset.value) % totalSize) + width + _itemSize / 2;

    return {
      transform: [
        {
          rotate: `${interpolate(
            range,
            [-_itemSize, (width - _itemSize) / 2, width],
            [-3, 0, 3]
          )}deg`,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: _itemWidth,
          height: _itemHeight,
          borderRadius: 16,
          backgroundColor: "#eee",
        },
        stylez,
      ]}
    >
      <Image
        key={`image-${index}`}
        source={{ uri: image }}
        className="flex-1"
        style={{ borderRadius: 16 }}
      />
    </Animated.View>
  );
};

const MyAppleInvitesContainer = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const offset = useSharedValue(0);

  useAnimatedReaction(
    () => {
      const floatIndex = (offset.value / _itemSize) % images.length;
      return Math.abs(Math.floor(floatIndex));
    },
    (value) => {
      runOnJS(setActiveIndex)(value);
    }
  );
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 items-center justify-center bg-black">
        <View style={[StyleSheet.absoluteFillObject, { opacity: 0.5 }]}>
          <Animated.Image
            key={`image-${activeIndex}`}
            source={{ uri: images[activeIndex] }}
            blurRadius={50}
            style={{ flex: 1 }}
            entering={FadeIn.duration(1000)}
            exiting={FadeOut.duration(1000)}
          />
        </View>
        <Marquee spacing={_spacing} position={offset} speed={0.1}>
          <Animated.View
            className="flex-row"
            style={{ gap: _spacing }}
            entering={FadeInUp.delay(500)
              .duration(1000)
              .easing(Easing.elastic(0.9))
              .withInitialValues({
                transform: [{ translateY: -_itemHeight / 2 }],
              })}
          >
            {images.map((item, index) => {
              return (
                <Item
                  image={item}
                  index={index}
                  key={`image-${index}`}
                  offset={offset}
                />
              );
            })}
          </Animated.View>
        </Marquee>
        <Stagger
          initialEnteringDelay={500}
          duration={500}
          stagger={500}
          style={{ flex: 0.5, padding: _spacing, alignItems: "center" }}
        >
          <Text className="text-white text-lg">Welcome</Text>
          <Text className="text-white text-2xl font-bold">Apple Invites</Text>
        </Stagger>
      </View>
    </GestureHandlerRootView>
  );
};

export default MyAppleInvitesContainer;
