import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppleInvites from "./AppleInvites";

const AppleInvitesContainer = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppleInvites />
    </GestureHandlerRootView>
  );
};

export default AppleInvitesContainer;
