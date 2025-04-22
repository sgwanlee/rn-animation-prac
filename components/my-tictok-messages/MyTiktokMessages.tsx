import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  Text,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  interpolate,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";
import { MAX_MESSAGES } from "../tictok-messages/mock-chat";

type Props<T> = FlatListProps<T> & {
  renderItem: ListRenderItem<T>;
};

const AnimatedItem = ({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) => {
  const newIndex = useDerivedValue(() => {
    return withSpring(index, {
      damping: 80,
      stiffness: 200,
    });
  });
  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(newIndex.value, [0, 1], [1, 1 - 1 / MAX_MESSAGES]),
    };
  });
  return (
    <Animated.View entering={FadeInDown.springify().damping(80).stiffness(200)}>
      <Animated.View style={stylez}>{children}</Animated.View>
    </Animated.View>
  );
};

const MyTiktokMessages = <T,>({ renderItem, ...rest }: Props<T>) => {
  return (
    <Animated.FlatList
      {...rest}
      inverted
      CellRendererComponent={undefined}
      itemLayoutAnimation={LinearTransition.springify()
        .damping(80)
        .stiffness(200)}
      renderItem={(props) => {
        return (
          <AnimatedItem index={props.index}>{renderItem(props)}</AnimatedItem>
        );
      }}
    />
  );
};

export default MyTiktokMessages;
