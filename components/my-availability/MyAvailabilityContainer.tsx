import { Button, View } from "react-native";
import MyAvailabilityAnimation from "./MyAvailabilityAnimation";
import { generateHomes, HomeType } from "../availability/mockHome";
import { useRef, useState } from "react";

const MyAvailabilityContainer = () => {
  const [data, setData] = useState<HomeType[]>(generateHomes());
  const [isLoading, setIsLoading] = useState(true);
  const timer = useRef<NodeJS.Timeout | null>(null);
  return (
    <View className="flex-1 justify-center items-center">
      <MyAvailabilityAnimation data={data} isLoading={isLoading} />
      <Button
        title="Generate"
        onPress={() => {
          if (timer.current) {
            clearTimeout(timer.current);
          }
          setIsLoading(true);

          timer.current = setTimeout(() => {
            setIsLoading(false);
            setData(generateHomes());
          }, Math.random() * 1000 + 1000);
        }}
      />
    </View>
  );
};

export default MyAvailabilityContainer;
