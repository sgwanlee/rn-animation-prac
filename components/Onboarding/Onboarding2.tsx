import { Text, View } from "react-native";
import Button, { _layoutTransition } from "./AnimatedButton";
import Pagination from "./Pagination";
import Animated, {
  FadeInDown,
  FadeOutDown,
  FadeOutUp,
} from "react-native-reanimated";

interface Props {
  total: number;
  selectedIndex: number;
  onIndexChange: (index: number) => void;
}

const Onboarding2 = ({ total, selectedIndex, onIndexChange }: Props) => {
  return (
    <View style={{ gap: 8, padding: 8 }}>
      <Pagination selectedIndex={selectedIndex} total={total} />
      <View className="flex-row bg-red-400 gap-2">
        {selectedIndex > 0 && (
          <Button
            style={{ backgroundColor: "#ddd" }}
            onPress={() => {
              if (selectedIndex <= 0) {
                return;
              }
              onIndexChange(selectedIndex - 1);
            }}
          >
            <Text>Back</Text>
          </Button>
        )}
        <Button
          style={{ backgroundColor: "#036bfb", flex: 1 }}
          onPress={() => {
            if (selectedIndex >= total - 1) {
              return;
            }
            onIndexChange(selectedIndex + 1);
          }}
        >
          {selectedIndex === total - 1 ? (
            <Animated.Text
              key="finish"
              className="text-white"
              entering={FadeInDown.springify().damping(80).stiffness(200)}
              exiting={FadeOutDown.springify().damping(80).stiffness(200)}
              style={{ color: "white" }}
            >
              Finish
            </Animated.Text>
          ) : (
            <Animated.Text
              key="continue"
              className="text-white"
              layout={_layoutTransition}
              entering={FadeInDown.springify().damping(80).stiffness(200)}
              exiting={FadeOutDown.springify().damping(80).stiffness(200)}
            >
              Continue
            </Animated.Text>
          )}
        </Button>
      </View>
    </View>
  );
};

export default Onboarding2;
