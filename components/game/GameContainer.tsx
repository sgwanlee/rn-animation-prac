import { View } from "react-native";
import BrickBreakerGame from "./brick-breaker/BrickBreakerGame";

const GameContainer = () => {
  return (
    <View className="flex-1 bg-black">
      <BrickBreakerGame />
    </View>
  );
};

export default GameContainer;
