import {
  Dimensions,
  FlatList,
  FlatListProps,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Item } from "./mockData";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

interface VerticalListProps {
  data: Item[];
}
interface AnimatedCardProps {
  item: Item;
  index: number;
  scrollY: SharedValue<number>;
}
const { height } = Dimensions.get("screen");
const _spacing = 4;
const _itemSize = height * 0.72;
const _itemFullSize = _itemSize + _spacing * 2;

const AnimatedCard = ({ item, index, scrollY }: AnimatedCardProps) => {
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
      style={[
        {
          flex: 1,
          height: _itemSize,
          padding: _spacing * 4,
          borderRadius: 8,
          gap: _spacing,
        },
        stylez,
      ]}
    >
      <Image
        source={{ uri: item.image }}
        style={[StyleSheet.absoluteFillObject, { borderRadius: 12 }]}
        blurRadius={50}
      />
      <Image
        source={{ uri: item.image }}
        style={{ flex: 1, height: _itemSize * 0.4 }}
      />
      <View style={{ gap: _spacing }}>
        <Text style={{ fontSize: 24, fontWeight: "700", color: "#fff" }}>
          {item.title}
        </Text>
        <Text style={{ color: "#ddd" }} numberOfLines={3}>
          {item.description}
        </Text>
      </View>
      <View
        style={{ flexDirection: "row", gap: _spacing, alignItems: "center" }}
      >
        <Image
          source={{ uri: item.author.avatar }}
          style={{ width: 24, aspectRatio: 1, borderRadius: 12 }}
        />
        <Text style={{ fontSize: 12 }}>{item.author.name}</Text>
      </View>
    </Animated.View>
  );
};

const VerticalList = ({ data }: VerticalListProps) => {
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y / _itemFullSize;
  });
  return (
    <Animated.FlatList
      data={data}
      contentContainerStyle={{
        paddingHorizontal: _spacing * 3,
        gap: _spacing * 2,
        paddingVertical: (height - _itemFullSize) / 2,
      }}
      renderItem={({ item, index }) => (
        <AnimatedCard item={item} index={index} scrollY={scrollY} />
      )}
      snapToInterval={_itemFullSize}
      decelerationRate="fast"
      onScroll={onScroll}
      scrollEventThrottle={16} // 1000 / 60frames = 16
    />
  );
};

export default VerticalList;
