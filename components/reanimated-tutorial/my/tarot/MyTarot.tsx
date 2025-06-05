import { Text, View } from "react-native";
import Card from "./Card";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";

const cards = [
  {
    source: require("../../tarot/assets/chariot.png"),
  },
  {
    source: require("../../tarot/assets/death.png"),
  },
  {
    source: require("../../tarot/assets/devil.png"),
  },
];

const MyTarot = () => {
  const shuffleBack = useSharedValue(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1">
        {cards.map((card, index) => (
          <Card
            card={card}
            key={index}
            index={index}
            shuffleBack={shuffleBack}
          />
        ))}
      </View>
    </GestureHandlerRootView>
  );
};
export default MyTarot;
