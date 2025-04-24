import { icons } from "lucide-react-native";
import { MotiView } from "moti";
import { Pressable, Text, View } from "react-native";
import Animated, {
  FadeInRight,
  FadeOutRight,
  LayoutAnimationConfig,
  LinearTransition,
} from "react-native-reanimated";

type IconName = keyof typeof icons;

type MyTabsProps = {
  data: { icon: IconName; label: string }[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
};

const Icon = ({ name }: { name: IconName }) => {
  const IconComponent = icons[name];
  return <IconComponent />;
};

const MyTabs = ({
  data,
  selectedIndex,
  onSelect,
  activeColor = "#fff",
  inactiveColor = "#999",
  activeBackgroundColor = "#111",
  inactiveBackgroundColor = "#ddd",
}: MyTabsProps) => {
  return (
    <View className="flex-row gap-2">
      {data.map((item, index) => {
        const isSelected = selectedIndex === index;
        return (
          <MotiView
            key={item.label}
            animate={{
              backgroundColor: isSelected
                ? activeBackgroundColor
                : inactiveBackgroundColor,
              borderRadius: 8,
              overflow: "hidden",
            }}
            layout={LinearTransition.springify().damping(80).stiffness(200)}
          >
            <Pressable
              className="flex-row p-3 justify-center items-center gap-2"
              onPress={() => onSelect(index)}
            >
              <Icon name={item.icon} />
              <LayoutAnimationConfig skipEntering>
                {isSelected && (
                  <Animated.Text
                    style={{
                      color: isSelected ? activeColor : inactiveColor,
                    }}
                    entering={FadeInRight.springify()
                      .damping(80)
                      .stiffness(200)}
                    exiting={FadeOutRight.springify()
                      .damping(80)
                      .stiffness(200)}
                  >
                    {item.label}
                  </Animated.Text>
                )}
              </LayoutAnimationConfig>
            </Pressable>
          </MotiView>
        );
      })}
    </View>
  );
};

export default MyTabs;
