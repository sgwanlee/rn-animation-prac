import { View } from "react-native";
import Rainbow from "./Rainbow";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RainbowContainer = () => {
  return (
    <GestureHandlerRootView>
      <Rainbow />
    </GestureHandlerRootView>
  );
};

export default RainbowContainer;
