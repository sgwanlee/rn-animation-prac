import { Text, View } from "react-native";
import Card from "./Card";
import { useSharedValue } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const cards = [
  {
    source: require("./assets/death.png"),
  },
  {
    source: require("./assets/chariot.png"),
  },
  {
    source: require("./assets/high-priestess.png"),
  },
  {
    source: require("./assets/justice.png"),
  },
  {
    source: require("./assets/lover.png"),
  },
  {
    source: require("./assets/pendu.png"),
  },
  {
    source: require("./assets/tower.png"),
  },
  {
    source: require("./assets/strength.png"),
  },
];

export const assets = cards.map((card) => card.source);

const Tarot = () => {
  const shuffleBack = useSharedValue(false);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "lightblue" }}>
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
export default Tarot;
