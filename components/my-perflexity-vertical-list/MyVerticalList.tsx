import { Dimensions, FlatList, Image, StyleSheet, Text } from "react-native";
import { Item } from "../perflexity-vertical-list/mockData";
import { View } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

interface MyVerticalListProps {
  items: Item[];
}
interface AnimatedItemProps {
  item: Item;
  index: number;
  scrollY: SharedValue<number>;
}

const { height } = Dimensions.get("screen");
const _spacing = 4;
const _itemSize = height * 0.8;
const _itemFullSize = _itemSize + _spacing * 2;

const AnimatedItem = ({ item, index, scrollY }: AnimatedItemProps) => {
  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [0.3, 1, 0.3]
      ),
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            [index - 1, index, index + 1],
            [0.95, 1, 0.95]
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[stylez, { height: _itemSize }]}
      className="p-4 gap-2"
    >
      <Image
        source={{ uri: item.image }}
        style={[StyleSheet.absoluteFillObject, { borderRadius: 16 }]}
        blurRadius={50}
      />
      <Image
        source={{ uri: item.image }}
        style={{ height: _itemSize * 0.4, flex: 1 }}
      />
      <View className={`gap-[${_spacing}px]`}>
        <Text className="text-xl font-bold text-white">{item.title}</Text>
        <Text className="text-gray-400">{item.description}</Text>
      </View>
      <View className="flex-row gap-2 items-center">
        <Image
          source={{ uri: item.author.avatar }}
          style={{ width: 24, height: 24, borderRadius: 12 }}
        />
        <Text className="text-white">{item.author.name}</Text>
      </View>
    </Animated.View>
  );
};

const MyVerticalList = ({ items }: MyVerticalListProps) => {
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    // console.log(e.contentOffset.y / _itemFullSize);
    scrollY.value = e.contentOffset.y / _itemFullSize;
  });
  return (
    <Animated.FlatList
      data={items}
      contentContainerStyle={{
        paddingHorizontal: _spacing * 3,
        gap: _spacing * 2,
        paddingVertical: (height - _itemSize) / 2,
      }}
      renderItem={({ item, index }) => {
        return <AnimatedItem index={index} item={item} scrollY={scrollY} />;
      }}
      snapToInterval={_itemFullSize}
      decelerationRate="fast"
      onScroll={onScroll}
      scrollEventThrottle={16}
    />
  );
};

export default MyVerticalList;
