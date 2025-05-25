import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { T } from "@faker-js/faker/dist/airline-BUL6NtOJ";
import { useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  ScrollView,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TITLE = [
  "Record the dismissible tutorial",
  "Leave to the video",
  "Check Youtube comments",
  "Subscribe to the channel",
  "Leave a star on the Gibhub repo",
];

interface TaskInterface {
  title: string;
  index: number;
}

const LIST_ITEM_HEIGHT = 70;
const { width: SCREEN_WIETH } = Dimensions.get("window");
const TRANSLATE_X_THRESHOLD = -SCREEN_WIETH * 0.3;
const TASKS: TaskInterface[] = TITLE.map((title, index) => ({
  title,
  index,
}));

const BACKGROUND_COLOR = "#FAFBFF";

interface ListItemProps {
  task: TaskInterface;
  onDismiss: (task: TaskInterface) => void;
  scrollViewRef: React.RefObject<ScrollView>;
}
const ListItem = ({ task, onDismiss, scrollViewRef }: ListItemProps) => {
  const translateX = useSharedValue(0);
  const saveX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0,
  }));

  const panGesture = Gesture.Pan()
    .onStart(() => {
      // saveX.value = translateX.value;
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIETH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished) {
            runOnJS(onDismiss)(task);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    })
    .simultaneousWithExternalGesture(scrollViewRef);

  const rTaskContainerStyle = useAnimatedStyle(() => ({
    height: itemHeight.value,
    marginVertical: marginVertical.value,
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.taskContainer, rTaskContainerStyle]}>
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <FontAwesome5
          name={"trash-alt"}
          size={LIST_ITEM_HEIGHT * 0.4}
          color={"red"}
        />
      </Animated.View>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.task, rStyle]}>
          <Text style={styles.taskTitle}>{task.title}</Text>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

const SwipeToDeletePrac = () => {
  const insets = useSafeAreaInsets();
  const [tasks, setTasks] = useState(TASKS);
  const scrollViewRef = useRef<ScrollView>(null);

  const onDismiss = (task: TaskInterface) => {
    setTasks((prev) => prev.filter((item) => item.index !== task.index));
  };
  return (
    <GestureHandlerRootView>
      <View style={[styles.container, { marginTop: insets.top }]}>
        <Text style={styles.title}>Tasks</Text>
        <ScrollView style={{ flex: 1 }} ref={scrollViewRef}>
          {tasks.map((task) => (
            <ListItem
              key={task.index}
              task={task}
              onDismiss={onDismiss}
              scrollViewRef={scrollViewRef}
            />
          ))}
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 60,
    paddingLeft: "5%",
  },
  task: {
    width: "90%",
    height: LIST_ITEM_HEIGHT,
    justifyContent: "center",
    paddingLeft: 20,
    backgroundColor: "white",
    borderRadius: 10,
    // IOS
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    elevation: 5,
  },
  taskContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  taskTitle: {
    fontSize: 16,
  },
  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    position: "absolute",
    right: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SwipeToDeletePrac;
