import { View } from "react-native";
import VerticalList from "./VerticalList";
import data from "./mockData";

const VerticalListContainer = () => {
  return (
    <View className="flex-1 bg-black">
      <VerticalList data={data} />
    </View>
  );
};
export default VerticalListContainer;
