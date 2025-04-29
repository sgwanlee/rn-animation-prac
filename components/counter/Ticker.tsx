import { MotiView } from "moti";
import { useEffect, useState } from "react";
import { Text, TextProps, View } from "react-native";

const numbersToNice = [...Array(10).keys()];
const _stagger = 50;

const Tick = ({
  children,
  style,
  fontSize,
  ...rest
}: TextProps & { fontSize: number }) => {
  return (
    <Text
      {...rest}
      style={[
        style,
        {
          fontSize,
          lineHeight: fontSize * 1.1,
          fontVariant: ["tabular-nums"],
          fontWeight: "900",
        },
      ]}
    >
      {children}
    </Text>
  );
};

const TickerList = ({
  number,
  fontSize,
  index,
}: {
  number: number;
  fontSize: number;
  index: number;
}) => {
  return (
    <View
      style={{
        height: fontSize,
        overflow: "hidden",
      }}
    >
      <MotiView
        animate={{
          transform: [
            {
              translateY: -fontSize * 1.1 * number,
            },
          ],
        }}
        transition={{
          delay: index * _stagger,
          damping: 80,
          stiffness: 200,
        }}
      >
        {numbersToNice.map((num, index) => {
          return (
            <Tick key={`number-${num}-${index}`} fontSize={fontSize}>
              {num}
            </Tick>
          );
        })}
      </MotiView>
    </View>
  );
};

const Ticker = ({
  value = 12385,
  fontSize = 50,
}: {
  value: number;
  fontSize?: number;
}) => {
  const intNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
  const splitValue = intNumber.toString().split("");
  const [newFontSize, setNewFontSize] = useState(fontSize);
  return (
    <View>
      {/* <Text>{fontSize}</Text>
      <Text>{newFontSize}</Text> */}
      <Text
        style={{
          fontSize,
          fontVariant: ["tabular-nums"],
          fontWeight: "900",
          position: "absolute",
          left: 10000000,
          top: 10000000,
        }}
        onTextLayout={(e) => {
          console.log(e.nativeEvent.lines[0]);
          setNewFontSize(e.nativeEvent.lines[0].ascender);
        }}
        adjustsFontSizeToFit
        numberOfLines={1}
      >
        {intNumber}
      </Text>
      <View className="flex-row flex-wrap">
        {splitValue.map((number, index) => {
          if (!isNaN(parseInt(number))) {
            return (
              <TickerList
                fontSize={newFontSize}
                number={parseInt(number)}
                index={index}
                key={index}
              />
            );
          }
          return (
            <Tick key={index} fontSize={newFontSize} style={{ opacity: 0.3 }}>
              {number}
            </Tick>
          );
        })}
      </View>
    </View>
  );
};

export default Ticker;
