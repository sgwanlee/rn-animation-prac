import { useEffect, useRef, useState } from "react";
import { Image, Text, View } from "react-native";
import { ChatItem, generateNewMessage } from "./mock-chat";
import TikTokMessages from "./TikTokMessages";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

const chatSpeed = {
  slow: [1000, 500],
  medium: [500, 500],
  fast: [250, 250],
  insane: [50, 100],
};

const TiktokMessageContainer = () => {
  const [messages, setMessages] = useState<ChatItem[]>([]);

  const timeout = useRef<NodeJS.Timeout | null>(null);
  const [speed, setSpeed] = useState<keyof typeof chatSpeed>("slow");

  const generateData = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    const selectedSpeed = chatSpeed[speed];
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
    <View className="flex-1 justify-center">
      <TikTokMessages
        data={messages}
        renderItem={({ item }) => {
          return (
            <View
              style={[
                {
                  gap: 4,
                  alignItems: "flex-start",
                  padding: 4 * 2,
                  borderRadius: 12,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 4,
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 16, aspectRatio: 1, borderRadius: 24 }}
                  source={{ uri: item.user.avatar }}
                />
                <Text style={{ fontSize: 12 }}>{item.user.name}</Text>
              </View>
              <View
                style={{
                  backgroundColor: "#ddd",
                  padding: 4 * 2,
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontSize: 12 }}>{item.description}</Text>
              </View>
            </View>
          );
        }}
      />
      <View
        style={{ height: 200, justifyContent: "center", alignItems: "center" }}
      >
        <SegmentedControl
          style={{ width: 300 }}
          values={Object.keys(chatSpeed)}
          selectedIndex={Object.keys(chatSpeed).indexOf(speed)}
          onChange={(event) => {
            setSpeed(event.nativeEvent.value as keyof typeof chatSpeed);
          }}
        />
      </View>
    </View>
  );
};

export default TiktokMessageContainer;
