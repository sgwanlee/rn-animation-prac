import { View } from "react-native";
import MyVerticalList from "./MyVerticalList";
import data from "../perflexity-vertical-list/mockData";

const MyVerticalListContainer = () => {
  return (
    <View className="flex-1 bg-black">
      <MyVerticalList items={data} />
    </View>
  );
};

export default MyVerticalListContainer;
