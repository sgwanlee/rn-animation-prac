import React from "react";
import { AntDesign } from "@expo/vector-icons";

const BackIcon = ({ onPress }: { onPress: () => void }) => {
  return (
    <AntDesign
      name={"arrowleft"}
      size={24}
      style={{ padding: 12 }}
      color="#333"
      onPress={onPress}
    />
  );
};

export default BackIcon;
