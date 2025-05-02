import { TouchableOpacity, View } from "react-native";
import MarketingSlider from "./MarketingSlider";
import { DATA } from "./data";
import Icon from "./Icon";
import { SPACING } from "./config";

const List = () => {
  return (
    <View>
      <MarketingSlider />
      <View
        className="flex-row flex-wrap items-center justify-center"
        style={{ marginVertical: 20 }}
      >
        {DATA.map((item) => {
          return (
            <TouchableOpacity key={item.id} style={{ padding: SPACING }}>
              <Icon url={item.imageUri} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default List;
