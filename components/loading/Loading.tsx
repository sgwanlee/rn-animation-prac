import { MotiView } from "moti";
import { View } from "react-native";

interface Props {
  size: number;
}
const Loading = ({ size }: Props) => {
  return (
    <MotiView
      from={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 0,
        shadowOpacity: 0.5,
      }}
      animate={{
        width: size + 20,
        height: size + 20,
        borderRadius: (size + 20) / 2,
        borderWidth: size / 10,
        shadowOpacity: 1,
      }}
      transition={{
        type: "timing",
        duration: 1000,
        // repeat: 3,
        loop: true,
        repeatReverse: true,
      }}
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
        borderWidth: size / 10,
        borderColor: "white",
        shadowColor: "#fff",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
      }}
    ></MotiView>
  );
};

export default Loading;
