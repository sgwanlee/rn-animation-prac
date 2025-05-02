import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackIcon from "./BackIcon";
import { DATA } from "./data";
import { useRef } from "react";
import Icon from "./Icon";
import { SPACING, width } from "./config";

const Detail = () => {
  const item = DATA[0];
  const ref = useRef<FlatList>(null);
  const selectedItemIndex = DATA.findIndex((i) => i.id === item.id);

  return (
    <View>
      <BackIcon onPress={() => navigation.goBack()} />
      <View className="flex-row flex-nowrap my-5">
        {DATA.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => {}}
              style={{ padding: SPACING }}
            >
              <Icon url={item.imageUri} />
            </TouchableOpacity>
          );
        })}
      </View>
      <FlatList
        ref={ref}
        data={DATA}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        initialScrollIndex={selectedItemIndex}
        nestedScrollEnabled
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <ScrollView
              style={{
                width: width - SPACING * 2,
                backgroundColor: "rgba(0,0,0,0.05)",
                borderRadius: 16,
                margin: SPACING,
              }}
            >
              <View style={{ padding: SPACING }}>
                <Text style={{ fontSize: 16 }}>
                  {Array(50).fill(`${item.title} insert next \n`)}
                </Text>
              </View>
            </ScrollView>
          );
        }}
      />
    </View>
  );
};

export default Detail;
