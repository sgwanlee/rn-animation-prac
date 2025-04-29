import { Button, View } from "react-native";
import { useState } from "react";
import Ticker from "./Ticker";

const MyCounterContainer = () => {
  const [value, setValue] = useState(12341);
  return (
    <View className="flex-1 justify-center items-center">
      <Ticker value={value} fontSize={120} />
      <Button
        title="Random"
        onPress={() => setValue(Math.floor(Math.random() * 10000))}
      />
    </View>
  );
};

export default MyCounterContainer;
