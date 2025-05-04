import { Dimensions, Image, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  FadeIn,
  FadeInDown,
  FadeOut,
  interpolate,
  interpolateColor,
  runOnJS,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { images } from "../apple-invites/image";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("screen");
const _itemSize = width * 0.22;
const _spacing = 16;
const _itemTotalSize = _itemSize + _spacing;

const CarouselItem = ({
  image,
  index,
  scrollX,
}: {
  image: string;
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const _stylez = useAnimatedStyle(() => {
    return {
      borderWidth: 4,
      borderColor: interpolateColor(
        scrollX.value,
        [index - 1, index, index + 1],
        ["transparent", "#fff", "transparent"]
      ),
      borderRadius: _itemSize / 2,
      transform: [
        {
          translateY: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [_itemSize / 3, 0, _itemSize / 3]
            // Extrapolation.CLAMP
          ),
        },
      ],
    };
  });
  return (
    <Animated.View style={[{ width: _itemSize, aspectRatio: 1 }, _stylez]}>
      <Image
        source={{ uri: image }}
        style={{
          flex: 1,
          borderRadius: _itemSize / 2,
        }}
      />
    </Animated.View>
  );
};

const CircularCarouselContainer = () => {
  const scrollX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x / _itemTotalSize;

      const activeIndexValue = Math.round(scrollX.value);
      // Run 60 times per second
      if (activeIndexValue !== activeIndex) {
        runOnJS(setActiveIndex)(activeIndexValue);
      }
    },
  });
  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[StyleSheet.absoluteFillObject]} pointerEvents="none">
        <Animated.Image
          key={`images-${activeIndex}`}
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(500)}
          source={{ uri: images[activeIndex] }}
          style={{ flex: 1 }}
        />
        <LinearGradient
          colors={["transparent", "#000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: _itemSize * 4,
          }}
        />
        <LinearGradient
          colors={["#000", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "20%",
          }}
        />
      </View>
      <View className="flex-1 justify-end">
        <Animated.FlatList
          entering={FadeInDown.springify()
            .damping(80)
            .stiffness(200)
            .delay(500)}
          data={images}
          style={{ flexGrow: 0, height: _itemSize * 2 }}
          keyExtractor={(_, index) => String(index)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: (width - _itemSize) / 2,
            gap: _spacing,
          }}
          renderItem={({ item, index }) => {
            return (
              <CarouselItem image={item} index={index} scrollX={scrollX} />
            );
          }}
          //pagination animation
          snapToInterval={_itemSize + _spacing}
          decelerationRate="fast"
          //scroll
          onScroll={onScroll}
        />
      </View>
    </View>
  );
};

export default CircularCarouselContainer;
