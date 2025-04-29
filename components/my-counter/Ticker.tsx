import { MotiView } from "moti";
import { useState } from "react";
import { Text, TextProps, View } from "react-native";

const numbersToNice = [...Array(10).keys()];
const _stagger = 0.05;

type TickProps = TextProps & {
  fontSize: number;
};
const Tick = ({ children, fontSize, style, ...rest }: TickProps) => {
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

interface TickListProps {
  index: number;
  number: number;
  fontSize: number;
}
const TickList = ({ index, number, fontSize }: TickListProps) => {
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
        {numbersToNice.map((index) => {
          return (
            <Tick key={index} fontSize={fontSize}>
              {index}
            </Tick>
          );
        })}
      </MotiView>
    </View>
  );
};

interface TickerProps {
  value: number;
  fontSize?: number;
}
const Ticker = ({ value, fontSize = 50 }: TickerProps) => {
  const intlNumber = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
  const splittedValue = intlNumber.toString().split("");
  const [newFontSize, setNewFontSize] = useState(fontSize);
  return (
    <View>
      <Text
        style={{
          fontSize,
          fontVariant: ["tabular-nums"],
          fontWeight: "900",
          position: "absolute",
          top: 1000000,
          left: 100000,
        }}
        adjustsFontSizeToFit
        numberOfLines={1}
        onTextLayout={(e) => {
          setNewFontSize(e.nativeEvent.lines[0].ascender);
        }}
      >
        {intlNumber}
      </Text>
      <View className="flex-row flex-wrap">
        {splittedValue.map((digit, index) => {
          if (!isNaN(Number(digit))) {
            return (
              <TickList
                key={index}
                fontSize={newFontSize}
                index={index}
                number={Number(digit)}
              />
            );
          }
          return (
            <Tick key={index} fontSize={newFontSize} style={{ opacity: 0.3 }}>
              {digit}
            </Tick>
          );
        })}
      </View>
    </View>
  );
};

export default Ticker;
