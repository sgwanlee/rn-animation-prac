import {
  Dimensions,
  FlatList,
  Image,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { API_URL } from "../gallery/GalleryContainer";
import { useEffect, useRef, useState } from "react";

const { width, height } = Dimensions.get("screen");
const IMAGE_SIZE = 80;
const SPACING = 10;

const fetchImagesFromPexels = async () => {
  const data = await fetch(API_URL, {
    headers: {
      Authorization: process.env.EXPO_PUBLIC_PEXCEL_API_KEY!,
    },
  });

  const { photos } = await data.json();
  return photos;
};

const MyGalleryContainer = () => {
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const topRef = useRef<FlatList>(null);
  const bottomRef = useRef<FlatList>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const images = await fetchImagesFromPexels();
      console.log(images);
      setImages(images);
    };
    fetchImages();
  }, []);

  const scrollToActiveIndex = (index: number) => {
    setActiveIndex(index);

    topRef.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });

    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      bottomRef.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      bottomRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  if (!images) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className="flex-1">
      <FlatList
        ref={topRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <Image
                source={{ uri: item.src.portrait }}
                style={[StyleSheet.absoluteFillObject]}
              />
            </View>
          );
        }}
      />

      <FlatList
        ref={bottomRef}
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        style={{ position: "absolute", bottom: IMAGE_SIZE }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
              <Image
                source={{ uri: item.src.portrait }}
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  marginRight: SPACING,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: index === activeIndex ? "white" : "transparent",
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default MyGalleryContainer;
