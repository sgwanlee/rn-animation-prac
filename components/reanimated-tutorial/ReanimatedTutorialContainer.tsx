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
import CircularProgressPrac from "./CircularProgressPrac";
import MyCircularProgressPrac from "./MyCircularProgressPrac";
import SwipeToDeletePrac from "./SwipeToDeletePrac";
import RippleEffect from "./RippleEffect";
import Tarot from "./tarot/Tarot";
import MyTarot from "./my/tarot/MyTarot";

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
      {/* <ColorPickerPrac /> */}
      {/* <CircularProgressPrac /> */}
      {/* <MyCircularProgressPrac /> */}
      {/* <SwipeToDeletePrac /> */}
      {/* <RippleEffect /> */}
      {/* <Tarot /> */}
      <MyTarot />
    </View>
  );
};
export default ReanimatedTutorialContainer;
