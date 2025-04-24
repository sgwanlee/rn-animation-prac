import { SafeAreaView, View } from "react-native";
import Tabs from "./Tabs";
import { useState } from "react";
import Animated, {
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
  LayoutAnimationConfig,
} from "react-native-reanimated";

const tabs = ["#ff005c", "#ffbd00", "#00b3e6", "#00cc96", "gold"];

const CustomTabsContainer = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <View className="flex-1 p-4 m-1 gap-2">
      <Tabs
        data={[
          { icon: "LifeBuoy", label: "Buoy" },
          { icon: "Fish", label: "Fresh fish" },
          { icon: "Sailboat", label: "Sail" },
          { icon: "Ship", label: "Ship it" },
          { icon: "ShipWheel", label: "Manage it" },
        ]}
        selectedIndex={selectedIndex}
        onChange={(index) => {
          setSelectedIndex(index);
        }}
      />
      <LayoutAnimationConfig skipEntering>
        <Animated.View
          key={`tab-content-${selectedIndex}`}
          style={{
            backgroundColor: tabs[selectedIndex],
            flex: 1,
            borderRadius: 8,
          }}
          entering={FadeInRight.springify().damping(80).stiffness(200)}
          exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
        ></Animated.View>
      </LayoutAnimationConfig>
    </View>
  );
};

export default CustomTabsContainer;
