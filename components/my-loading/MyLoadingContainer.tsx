import { View } from "react-native";
import MyLoading from "./MyLoading";

const MyLoadingContainer = () => {
  return (
    <View className="flex-1 justify-center items-center bg-[#010100]">
      <MyLoading size={100} />
    </View>
  );
};

export default MyLoadingContainer;
