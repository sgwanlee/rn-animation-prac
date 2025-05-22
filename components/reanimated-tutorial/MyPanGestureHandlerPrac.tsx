import { Text, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const SIZE = 100;
const CIRCLE_RADIUS = SIZE * 2;
const MyPanGestureHandlerPrac = () => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const savedX = useSharedValue(0);
    const savedY = useSharedValue(0);

    const stylez = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
            ]
        }
    }, []);

    const panGesture = Gesture.Pan().onStart(() => {
        savedX.value = translateX.value;
        savedY.value = translateY.value;
    }).onUpdate((e) => {
        translateX.value = savedX.value + e.translationX;
        translateY.value = savedY.value + e.translationY;
    }).onEnd(() => {
        const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
        if (distance < CIRCLE_RADIUS + SIZE / 2) {

            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
        }
    })

    return (
        <GestureHandlerRootView className="flex-1 items-center justify-center bg-red-100">

            <View style={{ height: CIRCLE_RADIUS * 2, width: CIRCLE_RADIUS * 2, borderRadius: CIRCLE_RADIUS, alignItems: "center", justifyContent: "center", borderColor: "blue", borderWidth: 5, }}>
                <GestureDetector gesture={panGesture}>
                    <Animated.View style={[stylez, { width: SIZE, height: SIZE, backgroundColor: "red" }]}></Animated.View>
                </GestureDetector>
            </View>
        </GestureHandlerRootView>
    );
};
export default MyPanGestureHandlerPrac;