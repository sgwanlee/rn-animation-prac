import { Dimensions, FlatList, Text, View } from "react-native";
import { SPACING } from "./config";
import { ITEM_WIDTH } from "./config";
import { SLIDER_DATA } from "./data";

const width = Dimensions.get("window").width;

const MarketingSlider = () => {
  return (
    <FlatList
      data={SLIDER_DATA}
      keyExtractor={(item) => item.color}
      horizontal
      snapToInterval={ITEM_WIDTH + SPACING * 2}
      contentContainerStyle={{
        paddingRight: width - ITEM_WIDTH - SPACING * 2,
        gap: SPACING,
      }}
      decelerationRate={"fast"}
      renderItem={({ item }) => {
        return (
          <View
            style={{
              backgroundColor: item.color,
              width: ITEM_WIDTH,
              height: ITEM_WIDTH * 0.6,
              borderRadius: 16,
              padding: SPACING,
            }}
          >
            <Text style={{}}>{item.title}</Text>
          </View>
        );
      }}
    />
  );
};

export default MarketingSlider;
