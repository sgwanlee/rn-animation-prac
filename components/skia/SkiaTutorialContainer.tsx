import { View } from "react-native";
import ChasingBubbles from "./ChasingBubbles";
import Wallet from "./wallet/Wallet";
import Matrix from "./matrix/Matrix";

const SkiaTutorialContainer = () => {
  return (
    <View className="flex-1">
      {/* <ChasingBubbles /> */}
      {/* <Wallet /> */}
      <Matrix />
    </View>
  );
};

export default SkiaTutorialContainer;
