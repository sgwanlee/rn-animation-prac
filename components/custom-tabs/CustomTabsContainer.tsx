import { SafeAreaView, View } from "react-native";
import Tabs from "./Tabs";
import { useState } from "react";
import Animated, {
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
  LayoutAnimationConfig,
} from "react-native-reanimated";
import { tabData, tabs } from "./data";

const CustomTabsContainer = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <View className="flex-1 p-4 m-1 gap-2">
      <Tabs
        data={tabData}
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
