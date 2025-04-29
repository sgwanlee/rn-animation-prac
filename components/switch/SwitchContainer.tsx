import { View } from "react-native";
import Switch from "./Switch";
import { useState } from "react";

const SwitchContainer = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: "#eee" }}
    >
      <Switch
        size={60}
        onPress={() => {
          setIsActive((prev) => !prev);
        }}
        isActive={isActive}
      />
    </View>
  );
};

export default SwitchContainer;
