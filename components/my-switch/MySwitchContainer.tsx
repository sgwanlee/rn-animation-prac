import { View } from "react-native";
import MySwitch from "./MySwitch";
import { useState } from "react";

const MySwitchContainer = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <View className="flex-1 items-center justify-center bg-[#eee]">
      <MySwitch
        size={100}
        isActive={isActive}
        onPress={() => setIsActive((prev) => !prev)}
      />
    </View>
  );
};

export default MySwitchContainer;
