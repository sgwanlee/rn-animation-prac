import { Button, View } from "react-native";
import AvailabilityAnimation from "./AvailabilityAnimation";
import { generateHomes, HomeType } from "./mockHome";
import { useRef, useState } from "react";

const AvailabilityContainer = () => {
  const [data, setData] = useState<HomeType[]>(generateHomes());
  const [isLoading, setIsLoading] = useState(true);
  const timer = useRef<NodeJS.Timeout | null>(null);

  return (
    <View className="p-5 gap-10">
      <AvailabilityAnimation data={data} isLoading={isLoading} />
      <Button
        title="Generate new data"
        onPress={() => {
          if (timer.current) {
            clearTimeout(timer.current);
          }
          setIsLoading(true);

          setTimeout(() => {
            setIsLoading(false);
            setData(generateHomes());
          }, Math.random() * 1000 + 1000);
        }}
      />
    </View>
  );
};

export default AvailabilityContainer;
