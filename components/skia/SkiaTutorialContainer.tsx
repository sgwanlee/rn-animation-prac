import { View } from "react-native";
import ChasingBubbles from "./ChasingBubbles";
import Wallet from "./wallet/Wallet";

const SkiaTutorialContainer = () => {
  return (
    <View className="flex-1">
      {/* <ChasingBubbles /> */}
      <Wallet />
    </View>
  );
};

export default SkiaTutorialContainer;
