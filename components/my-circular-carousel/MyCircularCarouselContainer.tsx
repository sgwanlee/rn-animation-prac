import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import { images } from "../apple-invites/image";
import Animated, {
  FadeIn,
  FadeOut,
  interpolate,
  interpolateColor,
  runOnJS,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");
const _itemSize = width * 0.2;
const _spacing = 16;
const _fullItemSize = _itemSize + _spacing;

const Item = ({
  image,
  index,
  scrollX,
}: {
  image: string;
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const stylez = useAnimatedStyle(() => {
    return {
      borderWidth: 4,
      borderColor: interpolateColor(
        scrollX.value,
        [index - 1, index, index + 1],
        ["transparent", "#fff", "transparent"]
      ),
      transform: [
        {
          translateY: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [_itemSize / 3, 0, _itemSize / 3]
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: _itemSize,
          aspectRatio: 1,
          borderRadius: _itemSize / 2,
        },
        stylez,
      ]}
    >
      <Image
        source={{ uri: image }}
        style={{ flex: 1, borderRadius: _itemSize / 2 }}
      />
    </Animated.View>
  );
};

const MyCircularCarouselContainer = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x / _fullItemSize;
      const activeIndexValue = Math.round(scrollX.value);
      if (activeIndexValue !== activeIndex) {
        runOnJS(setActiveIndex)(activeIndexValue);
      }
    },
  });
  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[StyleSheet.absoluteFillObject]}>
        <Animated.Image
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(500)}
          key={`images-${activeIndex}`}
          source={{ uri: images[activeIndex] }}
          style={{ flex: 1 }}
        />
      </View>
      <View className="flex-1 justify-end">
        <Animated.FlatList
          data={images}
          onScroll={onScroll}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0, height: _itemSize * 2 }}
          contentContainerStyle={{
            gap: _spacing,

            paddingHorizontal: (width - _itemSize) / 2,
          }}
          snapToInterval={_fullItemSize}
          decelerationRate="fast"
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item, index }) => (
            <Item
              key={`item-${index}`}
              image={item}
              index={index}
              scrollX={scrollX}
            />
          )}
        />
      </View>
    </View>
  );
};

export default MyCircularCarouselContainer;
