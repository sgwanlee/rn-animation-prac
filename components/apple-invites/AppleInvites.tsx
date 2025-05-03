import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Marquee } from "@animatereactnative/marquee";
import { images } from "./image";
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
import { Stagger } from "@animatereactnative/stagger";

const { width, height } = Dimensions.get("window");
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
  const _stylez = useAnimatedStyle(() => {
    const itemPosition = index * _itemSize - width - _itemSize / 2;
    const totalSize = images.length * _itemSize;
    const range =
      ((itemPosition - (offset.value + totalSize * 1000)) % totalSize) +
      width +
      _itemSize / 2;

    return {
      transform: [
        {
          rotate: `${interpolate(
            range,
            [-_itemSize, (width - _itemSize) / 2, width],
            [-3, 0, 3],
            "clamp"
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
        _stylez,
      ]}
    >
      <Image source={{ uri: image }} style={{ flex: 1, borderRadius: 16 }} />
    </Animated.View>
  );
};

const AppleInvites = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const offset = useSharedValue(0);

  useAnimatedReaction(
    () => {
      const floatIndex =
        ((offset.value + width / 2) / _itemSize) % images.length;
      return Math.abs(Math.floor(floatIndex));
    },
    (value) => {
      // calculate the index,
      // setState with the index,

      runOnJS(setActiveIndex)(value);
    }
  );
  return (
    <View
      className="flex-1 justify-center items-center"
      style={{ backgroundColor: "#000" }}
    >
      <View style={[StyleSheet.absoluteFillObject, { opacity: 0.5 }]}>
        <Animated.Image
          key={`image-${activeIndex}`}
          source={{ uri: images[activeIndex] }}
          style={{ flex: 1 }}
          blurRadius={50}
          entering={FadeIn.duration(1000)}
          exiting={FadeOut.duration(1000)}
        />
      </View>
      <Marquee spacing={_spacing} position={offset}>
        <Animated.View
          style={{
            flexDirection: "row",
            gap: _spacing,
          }}
          entering={FadeInUp.delay(500)
            .duration(1000)
            .easing(Easing.elastic(0.9))
            .withInitialValues({
              transform: [{ translateY: -_itemHeight / 2 }],
            })}
        >
          {images.map((image, index) => (
            <Item
              key={`image-${index}`}
              image={image}
              index={index}
              offset={offset}
            />
          ))}
        </Animated.View>
      </Marquee>
      <Stagger
        initialEnteringDelay={1000}
        duration={500}
        stagger={500}
        style={{
          flex: 0.5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text className="text-white font-medium opacity-50">Welcome to</Text>
        <Text className="text-white text-2xl font-bold mb-4">
          Apple Invites
        </Text>
        <Text className="text-white text-center">
          We're excited to invite you to join us for a special event.
        </Text>
      </Stagger>
    </View>
  );
};

export default AppleInvites;
