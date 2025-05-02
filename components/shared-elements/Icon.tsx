import { Image, View } from "react-native";
import { ICON_SIZE } from "./config";

const Icon = ({ url }: { url: string }) => {
  return (
    <View
      style={{
        width: ICON_SIZE,
        height: ICON_SIZE,
        borderRadius: ICON_SIZE / 2,
        backgroundColor: "#ddd",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={{ uri: url }}
        style={{
          width: ICON_SIZE * 0.6,
          height: ICON_SIZE * 0.6,
          resizeMode: "contain",
        }}
      />
    </View>
  );
};

export default Icon;
