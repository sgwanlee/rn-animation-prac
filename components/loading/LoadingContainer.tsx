import { View } from "react-native";
import Loading from "./Loading";

const LoadingContainer = () => {
  return (
    <View
      className="flex-1 justify-center items-center"
      style={{
        backgroundColor: "#010100",
      }}
    >
      <Loading size={100} />
    </View>
  );
};

export default LoadingContainer;
