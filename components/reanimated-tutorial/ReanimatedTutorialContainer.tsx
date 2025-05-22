import { Text, View } from "react-native";
import Introduction from "./Introduction";
import PanGestureHandlerPrac from "./PanGestureHandlerPrac";
import MyPanGestureHandlerPrac from "./MyPanGestureHandlerPrac";
import ScrollViewPrac from "./ScrollViewPrac";
import ColorPrac from "./ColorPrac";
import PinchGesturePrac from "./PinchGesturePrac";
import DoubleTapPrac from "./DoubleTapPrac";
import PanGesturePrac from "./PanGesturePrac";
import ColorPickerPrac from "./ColorPickerPrac";

const ReanimatedTutorialContainer = () => {
  return (
    <View className="flex-1">
      {/* <Introduction /> */}
      {/* <PanGestureHandlerPrac /> */}
      {/* <MyPanGestureHandlerPrac /> */}
      {/* <ScrollViewPrac /> */}
      {/* <ColorPrac/> */}
      {/* <PinchGesturePrac /> */}
      {/* <DoubleTapPrac /> */}
      {/* <PanGesturePrac /> */}
      <ColorPickerPrac />
    </View>
  );
};
export default ReanimatedTutorialContainer;
