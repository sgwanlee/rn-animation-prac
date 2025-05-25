import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, { SharedValue, useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from "react-native-reanimated";

const handleRotation = (progress: SharedValue<number>) => {
    'worklet'
    return `${progress.value * 2 * Math.PI}rad`;
}

const Introduction = () => {
    const progress = useSharedValue(1);
    const scale = useSharedValue(1);

    const stylez = useAnimatedStyle(() => {
        return {
            opacity: progress.value,
            borderRadius: progress.value * 100 / 2,
            transform: [{
                scale: scale.value,
            }, { rotate: handleRotation(progress), }]
        }
    }, []);

    useEffect(() => {
        progress.value = withRepeat(withTiming(0.5), 2, true);
        scale.value = withRepeat(withTiming(2), 2, true);
        // progress.value = withRepeat(withSpring(0.5), 3, true);
        // scale.value = withRepeat(withSpring(2), 2, true);
    }, [])

    return (
        <View className="flex-1 items-center justify-center">
            <Animated.View style={[{ width: 100, height: 100, backgroundColor: "red" }, stylez]}></Animated.View>
        </View>
    );
};
export default Introduction;