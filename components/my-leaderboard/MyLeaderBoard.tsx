import { Image, Text } from "react-native";
import { View } from "react-native";
import { users } from "../leader_board/LeaderBoard";
import Animated, {
  FadeInRight,
  interpolate,
  interpolateColor,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

const _stagger = 50;
const _avatarSize = 28;

interface PlaceProps {
  user: (typeof users)[0];
  index: number;
  onFinished?: () => void;
  anim: SharedValue<number>;
}
const Place = ({ user, index, onFinished, anim }: PlaceProps) => {
  const _anim = useDerivedValue(() => {
    return withDelay(
      _stagger * index,
      withSpring(anim.value, {
        damping: 80,
        stiffness: 200,
      })
    );
  });

  const stylez = useAnimatedStyle(() => {
    return {
      height: interpolate(
        _anim.value,
        [0, 1],
        [_avatarSize, Math.max(user.score * 3, _avatarSize)]
      ),
      backgroundColor: interpolateColor(
        _anim.value,
        [0, 1],
        ["rgba(0,0,0,0.1)", "turquoise"]
      ),
    };
  });
  const textStylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(_anim.value, [0, 0.2, 1], [0, 0, 1]),
    };
  });

  return (
    <Animated.View
      className="items-center"
      entering={FadeInRight.delay(_stagger * index)
        .springify()
        .damping(80)
        .stiffness(200)
        .withCallback((finished) => {
          if (finished && onFinished) {
            runOnJS(onFinished)();
          }
        })}
    >
      <Animated.Text style={[textStylez, { fontSize: 7, fontWeight: 700 }]}>
        {user.score}
      </Animated.Text>
      <Animated.View
        style={[
          stylez,
          {
            borderRadius: _avatarSize,
          },
        ]}
      >
        <Image
          source={{ uri: `https://i.pravatar.cc/150?u=user_${user.name}` }}
          className="w-[28px] aspect-square rounded-[28px]"
        />
      </Animated.View>
    </Animated.View>
  );
};

const MyLeaderBoard = () => {
  const _anim = useSharedValue(0);
  return (
    <View className="flex-row justify-end items-end gap-2 h-[200px]">
      {users.map((user, index) => (
        <Place
          key={user.name}
          user={user}
          index={index}
          anim={_anim}
          onFinished={
            index === users.length - 1
              ? () => {
                  _anim.value = 1;
                }
              : undefined
          }
        />
      ))}
    </View>
  );
};

export default MyLeaderBoard;
