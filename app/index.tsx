import AppleInvitesContainer from "@/components/apple-invites/AppleInvitesContainer";
import AvailabilityContainer from "@/components/availability/AvailabilityContainer";
import CircularCarouselContainer from "@/components/circular-carousel/CircularCarouselContainer";
import CounterContainer from "@/components/counter/CounterContainer";
import CustomTabsContainer from "@/components/custom-tabs/CustomTabsContainer";
import FlexTest from "@/components/FlexTest";
import GalleryContainer from "@/components/gallery/GalleryContainer";
import LeaderboardContainer from "@/components/leader_board/LeaderboardContainer";
import LoadingContainer from "@/components/loading/LoadingContainer";
import MyAppleInvitesContainer from "@/components/my-apple-invites/MyAppleInvitesContainer";
import MyAvailabilityContainer from "@/components/my-availability/MyAvailabilityContainer";
import MyCircularCarouselContainer from "@/components/my-circular-carousel/MyCircularCarouselContainer";
import MyCounterContainer from "@/components/my-counter/MyCounterContainer";
import MyCustomTabsContainer from "@/components/my-custom-tabs/MyCustomTabsContainer";
import MyGalleryContainer from "@/components/my-gallery/MyGalleryContainer";
import MyLeaderboardContainer from "@/components/my-leaderboard/MyLeaderboardContainer";
import MyLoadingContainer from "@/components/my-loading/MyLoadingContainer";
import MyVerticalListContainer from "@/components/my-perflexity-vertical-list/MyVerticalListContainer";
import MySwitchContainer from "@/components/my-switch/MySwitchContainer";
import MyTiktokMessageContainer from "@/components/my-tictok-messages/MyTiktokMessageContainer";
import Onboarding from "@/components/Onboarding";
import Onboarding2 from "@/components/Onboarding/Onboarding2";
import VerticalList from "@/components/perflexity-vertical-list/VerticalList";
import VerticalListContainer from "@/components/perflexity-vertical-list/VerticalListContainer";
import ScheduleContainer from "@/components/scheduler/ScheduleContainer";
import SharedElementsContainer from "@/components/shared-elements/SharedElementsContainer";
import SwitchContainer from "@/components/switch/SwitchContainer";
import TiktokMessageContainer from "@/components/tictok-messages/TiktokMessageContainer";
import TikTokMessages from "@/components/tictok-messages/TikTokMessages";
import WebViewTest from "@/components/WebViewTest";
import { Stack } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Index = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-1 justify-center bg-white"
      // style={{ paddingTop: insets.top }}
    >
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
      {/* <MyAvailabilityContainer /> */}
      {/* <CustomTabsContainer /> */}
      {/* <MyCustomTabsContainer /> */}
      {/* <CounterContainer /> */}
      {/* <MyCounterContainer /> */}
      {/* <WebViewTest /> */}
      {/* <LeaderboardContainer /> */}
      {/* <MyLeaderboardContainer /> */}
      {/* <LoadingContainer /> */}
      {/* <MyLoadingContainer /> */}
      {/* <SwitchContainer /> */}
      {/* <MySwitchContainer /> */}
      {/* <GalleryContainer /> */}
      {/* <MyGalleryContainer /> */}
      {/* <SharedElementsContainer /> */}
      {/* <AppleInvitesContainer /> */}
      {/* <MyAppleInvitesContainer /> */}
      {/* <CircularCarouselContainer /> */}
      {/* <MyCircularCarouselContainer /> */}
      <ScheduleContainer />
    </View>
  );
};

export default Index;
