import { useEffect, useRef, useState } from "react";
import { ChatItem, generateNewMessage } from "../tictok-messages/mock-chat";
import { Image, Text, View } from "react-native";
import MyTiktokMessages from "./MyTiktokMessages";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

const chatSpeeds = {
  slow: [1000, 500],
  medium: [500, 250],
  fast: [250, 100],
  insane: [100, 50],
};

const MyTiktokMessageContainer = () => {
  const [messages, setMessages] = useState<ChatItem[]>(
    [...Array(10).keys()].map(generateNewMessage)
  );
  const timeout = useRef<NodeJS.Timeout>();
  const [speed, setSpeed] = useState<keyof typeof chatSpeeds>("slow");

  const generateData = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    const selectedSpeed = chatSpeeds[speed];
    const timer = Math.random() * selectedSpeed[0] + selectedSpeed[1];

    timeout.current = setTimeout(() => {
      setMessages((data) => {
        return [generateNewMessage(), ...data];
      });
      generateData();
    }, timer);
  };

  useEffect(() => {
    generateData();
  }, [speed]);

  return (
    <View className="flex-1 items-center justify-center">
      <MyTiktokMessages
        data={messages}
        renderItem={({ item }) => {
          return (
            <View className="gap-1 p-2 items-start">
              <View className="flex-row gap-1">
                <Image
                  className="w-4 aspect-square rounded-full"
                  source={{ uri: item.user.avatar }}
                />
                <Text className="text-sm">{item.user.name}</Text>
              </View>
              <View className="bg-gray-300 rounded-lg p-2">
                <Text className="text-sm">{item.description}</Text>
              </View>
            </View>
          );
        }}
      />
      <View className="h-[200px] justify-center items-center">
        <SegmentedControl
          style={{ width: 300 }}
          values={Object.keys(chatSpeeds)}
          selectedIndex={Object.keys(chatSpeeds).indexOf(speed)}
          onChange={(event) => {
            setSpeed(
              event.nativeEvent.value as unknown as keyof typeof chatSpeeds
            );
          }}
        />
      </View>
    </View>
  );
};

export default MyTiktokMessageContainer;
