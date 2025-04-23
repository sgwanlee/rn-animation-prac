import { Image, Text, View, ViewProps } from "react-native";
import { HomeType } from "./mockHome";
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import { MotiView } from "moti";

const _spacing = 4;
const _borderRadius = 8;
const _itemSize = 60;
const _stagger = 75;
const _loadingColor = "#ddd";
const _loadingColorWashed = "#eee";
export const getRandomRotation = () => {
  return (Math.random() > 0.5 ? -1 : 1) * Math.random() * 15;
};

interface Props {
  data: HomeType[];
  isLoading: boolean;
}

const Item = ({ item, index }: { item: HomeType; index: number }) => {
  return (
    <View
      style={{
        marginLeft: index !== 0 ? -_itemSize / 2 : 0,
        width: _itemSize,
        aspectRatio: 1,
        borderRadius: _borderRadius,
        padding: _spacing,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 7,
        elevation: 5,
        transform: [
          {
            rotate: `${getRandomRotation()}deg`,
          },
        ],
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
      from={{ backgroundColor: _loadingColor }}
      animate={{ backgroundColor: _loadingColorWashed }}
      transition={{
        duration: 1000,
        loop: true,
        repeatReverse: true,
      }}
      entering={FadeIn.springify().damping(80).stiffness(200)}
      exiting={FadeOut.springify().damping(80).stiffness(200)}
    ></MotiView>
  );
};

const LoadingSkeleton = () => {
  return (
    <View className="flex-row">
      {[...Array(3).keys()].map((index) => {
        const randomRotate = getRandomRotation();
        return (
          <View
            style={{
              marginLeft: index !== 0 ? -_itemSize / 2 : 0,
              borderRadius: _borderRadius,
              backgroundColor: "#fff",
              transform: [
                {
                  rotate: `${randomRotate}deg`,
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
                // borderWidth: _spacing,
                margin: _spacing,
                backgroundColor: _loadingColor,
                borderColor: "#fff",
                // transform: [
                //   {
                //     rotate: `${randomRotate}deg`,
                //   },
                // ],
              }}
            />
          </View>
        );
      })}
    </View>
  );
};

const AvailabilityAnimation = ({ data, isLoading }: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: _itemSize,
      }}
    >
      <View
        className="flex-[0.6] justify-center"
        style={{ minHeight: _itemSize }}
      >
        {isLoading ? (
          <Skeleton
            style={{
              width: "80%",
              height: _itemSize * 0.25,
              borderRadius: _borderRadius / 2,
              backgroundColor: _loadingColor,
            }}
          />
        ) : (
          <Animated.Text
            entering={FadeIn.springify().damping(80).stiffness(200)}
            exiting={FadeOut.springify().damping(80).stiffness(200)}
          >
            {data.length} available
          </Animated.Text>
        )}
      </View>
      <View className="flex-row flex-1 justify-end">
        {!isLoading ? (
          data.map((item, index) => (
            <Animated.View
              style={{ zIndex: index }}
              key={item.key}
              entering={ZoomIn.springify()
                .damping(80)
                .stiffness(200)
                .delay(index * _stagger)}
              exiting={ZoomOut.springify()
                .damping(80)
                .stiffness(200)
                .delay(index * _stagger)}
            >
              <Item item={item} index={index} />
            </Animated.View>
          ))
        ) : (
          <LoadingSkeleton />
        )}
      </View>
    </View>
  );
};
export default AvailabilityAnimation;
