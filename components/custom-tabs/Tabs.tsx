import { Pressable, Text, View } from "react-native";
import { icons } from "lucide-react-native";
import Animated, {
  FadeInRight,
  FadeOutRight,
  LayoutAnimationConfig,
  LinearTransition,
} from "react-native-reanimated";
import { MotiProps, MotiView } from "moti";
import { motifySvg } from "moti/svg";

const _spacing = 4;

type IconNames = keyof typeof icons;

type TabItem = {
  icon: IconNames;
  label: string;
};

type TabsProps = {
  data: TabItem[];
  selectedIndex: number;
  onChange: (index: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
};
type IconProps = {
  name: IconNames;
} & MotiProps;
const Icon = ({ name, ...rest }: IconProps) => {
  const IconComponent = motifySvg(icons[name])();
  return <IconComponent size={16} {...rest} />;
};

const Tabs = ({
  data,
  selectedIndex,
  onChange,
  activeBackgroundColor = "#111",
  inactiveBackgroundColor = "#ddd",
  activeColor = "#fff",
  inactiveColor = "#999",
}: TabsProps) => {
  return (
    <View className="flex-row gap-1">
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
              style={{
                padding: _spacing * 3,
                justifyContent: "center",
                alignItems: "center",
                gap: _spacing,
                flexDirection: "row",
              }}
              onPress={() => onChange(index)}
            >
              <Icon
                name={item.icon}
                animate={{
                  color: isSelected ? activeColor : inactiveColor,
                }}
              />
              <LayoutAnimationConfig skipEntering>
                {isSelected && (
                  <Animated.Text
                    style={{ color: isSelected ? activeColor : inactiveColor }}
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

export default Tabs;
