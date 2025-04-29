import { Image, Text, View } from "react-native";
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

export const users = [
  {
    name: "Alice",
    score: 12,
  },
  {
    name: "Bob",
    score: 22,
  },
  {
    name: "Charlie",
    score: 4,
  },
  {
    name: "David",
    score: 15,
  },
  {
    name: "Eve",
    score: 33,
  },
  {
    name: "Frank",
    score: 10,
  },
  {
    name: "George",
    score: 31,
  },
];

const _avatarSize = 28;
const _spacing = 4;
const _stagger = 100;

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
        [_avatarSize, Math.max(user.score * 3, _avatarSize + _spacing)]
      ),
      backgroundColor:
        index === 4
          ? interpolateColor(
              _anim.value,
              [0, 1],
              ["rgba(0,0,0,0.1)", "turquoise"]
            )
          : "rgba(0,0,0,0.1)",
      // height: user.score * 3 * _anim.value,
    };
  });
  const textStylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(_anim.value, [0, 0.2, 1], [0, 0, 1]),
    };
  });

  return (
    <Animated.View
      style={{ alignItems: "center" }}
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
      <Animated.Text style={[textStylez, { fontSize: 7, fontWeight: "700" }]}>
        {user.score}
      </Animated.Text>
      <Animated.View
        style={[
          {
            // width: _avatarSize,
            height: _avatarSize,
            borderRadius: _avatarSize,
          },
          stylez,
        ]}
      >
        <View style={{ width: _avatarSize, aspectRatio: 1 }}>
          <Image
            source={{ uri: `https://i.pravatar.cc/150?u=user_${user.name}` }}
            style={{
              flex: 1,
              aspectRatio: 1,
              borderRadius: _avatarSize,
            }}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const LeaderBoard = () => {
  const _anim = useSharedValue(0);
  return (
    <View
      className="flex-row justify-end items-end"
      style={{ gap: _spacing, height: 200 }}
    >
      {users.map((user, index) => (
        <Place
          key={index}
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

export default LeaderBoard;
