import { Image, Text, View, ViewProps } from "react-native";
import { HomeType } from "../availability/mockHome";
import { getRandomRotation } from "../availability/AvailabilityAnimation";
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import { MotiView } from "moti";

const _spacing = 4;
const _itemSize = 60;
const _borderRadius = 8;
const _loadingColor = "#ddd";
const _loadingColorWashed = "#eee";

interface Props {
  data: HomeType[];
  isLoading: boolean;
}

const Item = ({ item, index }: { item: HomeType; index: number }) => {
  return (
    <View
      style={{
        width: _itemSize,
        borderRadius: _borderRadius,
        aspectRatio: 1,
        padding: _spacing,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        backgroundColor: "#fff",
        shadowOpacity: 0.5,
        shadowRadius: 7,
        elevation: 5,
        transform: [
          {
            rotate: `${getRandomRotation()}deg`,
          },
        ],
        marginLeft: index === 0 ? 0 : -_itemSize / 2,
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          flex: 1,
          borderRadius: _borderRadius,
        }}
      />
    </View>
  );
};

const Skeleton = ({ style, ...rest }: ViewProps) => {
  return (
    <MotiView
      style={style}
      {...rest}
      entering={FadeIn.springify().damping(80).stiffness(200)}
      exiting={FadeOut.springify().damping(80).stiffness(200)}
      from={{ backgroundColor: _loadingColor }}
      animate={{ backgroundColor: _loadingColorWashed }}
      transition={{
        duration: 1000,
        loop: true,
        repeatReverse: true,
      }}
    ></MotiView>
  );
};

const LoadingSkeleton = () => {
  return (
    <View className="flex-row">
      {[...Array(3).keys()].map((index) => (
        <View
          style={{
            padding: 4,
            backgroundColor: "#fff",
            borderRadius: _borderRadius,
            marginLeft: index === 0 ? 0 : -_itemSize / 2,
            transform: [
              {
                rotate: `${getRandomRotation()}deg`,
              },
            ],
          }}
        >
          <Skeleton
            key={index}
            style={{
              width: _itemSize,
              aspectRatio: 1,
              borderRadius: _borderRadius,
              backgroundColor: _loadingColor,
            }}
          />
        </View>
      ))}
    </View>
  );
};

const MyAvailabilityAnimation = ({ data, isLoading }: Props) => {
  return (
    <View
      className="flex-row justify-between items-center p-4"
      style={{ minHeight: _itemSize }}
    >
      <View
        className="flex-[0.6] justify-center"
        style={{ minHeight: _itemSize }}
      >
        {isLoading ? (
          <Skeleton
            style={{
              width: "80%",
              height: _itemSize * 0.24,
              borderRadius: _borderRadius,
              backgroundColor: _loadingColor,
            }}
          />
        ) : (
          <Animated.Text
            entering={FadeIn.springify().damping(80).stiffness(200)}
            exiting={FadeOut.springify().damping(80).stiffness(200)}
          >
            {data.length} Available
          </Animated.Text>
        )}
      </View>

      <View className="flex-1 flex-row justify-end">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          data.map((item, index) => (
            <Animated.View
              key={item.key}
              entering={ZoomIn.springify().damping(80).stiffness(200)}
              exiting={ZoomOut.springify().damping(80).stiffness(200)}
            >
              <Item item={item} index={index} />
            </Animated.View>
          ))
        )}
      </View>
    </View>
  );
};

export default MyAvailabilityAnimation;
