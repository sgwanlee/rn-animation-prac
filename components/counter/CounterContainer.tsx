import { Button, View } from "react-native";
import Ticker from "./Ticker";
import { useState } from "react";

const CounterContainer = () => {
  const [value, setValue] = useState(12341);
  return (
    <View className="flex-1 items-center justify-center">
      <Ticker value={value} fontSize={120} />
      <Button
        title="random number"
        onPress={() => setValue(Math.floor(Math.random() * 899000) / 100)}
      />
    </View>
  );
};

export default CounterContainer;
