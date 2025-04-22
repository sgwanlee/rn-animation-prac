import { Text, View } from "react-native";

// parent에 flex-1이나 height를 주지 않고
// child에 flex-1을 주면 child가 rendering 되지 않는다.
const FlexTest = () => {
  return (
    <View className="bg-yellow-400 h-20">
      <View className="bg-green-400 flex-1">
        <Text>Green</Text>
        <View className="flex-row bg-blue-100">
          <Text>Blue</Text>
        </View>
      </View>
      {/* <View className="bg-purple-400">
        <View>
          <Text>Purple</Text>
        </View>
        <View className="flex-row flex-1 bg-red-400">
          <Text>Red</Text>
        </View>
      </View> */}
    </View>
  );
};

export default FlexTest;
