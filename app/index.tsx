import AvailabilityContainer from "@/components/availability/AvailabilityContainer";
import FlexTest from "@/components/FlexTest";
import MyAvailabilityContainer from "@/components/my-availability/MyAvailabilityContainer";
import MyVerticalListContainer from "@/components/my-perflexity-vertical-list/MyVerticalListContainer";
import MyTiktokMessageContainer from "@/components/my-tictok-messages/MyTiktokMessageContainer";
import Onboarding from "@/components/Onboarding";
import Onboarding2 from "@/components/Onboarding/Onboarding2";
import VerticalList from "@/components/perflexity-vertical-list/VerticalList";
import VerticalListContainer from "@/components/perflexity-vertical-list/VerticalListContainer";
import TiktokMessageContainer from "@/components/tictok-messages/TiktokMessageContainer";
import TikTokMessages from "@/components/tictok-messages/TikTokMessages";
import { Stack } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

const Index = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <View className="flex-1 justify-center bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      {/* <Onboarding
        total={4}
        selectedIndex={selectedIndex}
        onIndexChange={(index: number) => setSelectedIndex(index)}
      /> */}
      {/* <Onboarding2
        total={4}
        selectedIndex={selectedIndex}
        onIndexChange={(index: number) => setSelectedIndex(index)}
      /> */}
      {/* <FlexTest /> */}
      {/* <TiktokMessageContainer /> */}
      {/* <MyTiktokMessageContainer /> */}
      {/* <VerticalListContainer /> */}
      {/* <MyVerticalListContainer /> */}
      {/* <AvailabilityContainer /> */}
      <MyAvailabilityContainer />
    </View>
  );
};

export default Index;
