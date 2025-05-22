import { Text, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const SIZE = 100;
const CIRCLE_RADIUS = SIZE * 2;

const PanGestureHandlerPrac = () => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const saveX = useSharedValue(0);
    const saveY = useSharedValue(0);

    const panGesture = Gesture.Pan().onStart((event) => {
        saveX.value = translateX.value;
        saveY.value = translateY.value;
    }).onUpdate((e) => {
        translateX.value = saveX.value + e.translationX;
        translateY.value = saveY.value + e.translationY;
    }).onEnd(() => {
        const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
        if (distance < CIRCLE_RADIUS + SIZE / 2) {
            saveX.value = 0;
            saveY.value = 0;
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
        }
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value }
            ]
        }
    })

    return (
        <GestureHandlerRootView className="flex-1 items-center justify-center bg-red-100">
            <View style={{ width: CIRCLE_RADIUS * 2, height: CIRCLE_RADIUS * 2, borderRadius: CIRCLE_RADIUS, borderWidth: 5, borderColor: "blue", alignItems: "center", justifyContent: "center" }}>
                <GestureDetector gesture={panGesture}>
                    <Animated.View style={[animatedStyle, { width: SIZE, height: SIZE, backgroundColor: "rgba(255, 0, 0, 0.5)" }]}></Animated.View>
                </GestureDetector>
            </View>
        </GestureHandlerRootView>
    );
};
export default PanGestureHandlerPrac;