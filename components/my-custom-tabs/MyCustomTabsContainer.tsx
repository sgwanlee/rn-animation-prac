import { Text, View } from "react-native";
import MyTabs from "./MyTabs";
import { tabData, tabs } from "../custom-tabs/data";
import { useState } from "react";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

const MyCustomTabsContainer = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <View className="flex-1 m-4 p-4 gap-2">
      <MyTabs
        data={tabData}
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      />
      <Animated.View
        key={`tab-${selectedIndex}`}
        style={{
          backgroundColor: tabs[selectedIndex],
          flex: 1,
          borderRadius: 8,
        }}
        entering={FadeInRight.springify().damping(80).stiffness(200)}
        exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
      ></Animated.View>
    </View>
  );
};

export default MyCustomTabsContainer;
