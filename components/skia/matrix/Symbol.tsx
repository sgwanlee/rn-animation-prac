import {
  Glyphs,
  interpolateColors,
  SkFont,
  vec,
} from "@shopify/react-native-skia";
import { useRef } from "react";
import { Text } from "react-native";
import { SharedValue, useDerivedValue } from "react-native-reanimated";

export const COLS = 10;
export const ROWS = 20;
const pos = vec(0, 0);

const Symbol = ({
  i,
  j,
  font,
  symbol,
  stream,
  symbols,
  timestamp,
}: {
  i: number;
  j: number;
  font: SkFont;
  timestamp: SharedValue<number>;
  stream: number[];
  symbol: { width: number; height: number };
  symbols: number[];
}) => {
  const offset = useRef(Math.round(Math.random() * (symbols.length - 1)));
  const range = useRef(100 + Math.random() * 900);
  const x = i * symbol.width;
  const y = j * symbol.height;

  const glyphs = useDerivedValue(() => {
    const idx = offset.current + Math.floor(timestamp.value / range.current);
    return [{ id: symbols[idx % symbols.length], pos }];
  }, [timestamp]);

  const opacity = useDerivedValue(() => {
    const idx = Math.round(timestamp.value / 75);
    return stream[(stream.length - j + idx) % stream.length];
  });

  const color = useDerivedValue(() => {
    return interpolateColors(
      opacity.value,
      [0.8, 1],
      ["rgb(0, 255, 70)", "rgb(140, 255, 170)"]
    );
  }, [opacity]);

  return (
    <Glyphs
      font={font}
      x={x + symbol.width / 4}
      y={y + symbol.height}
      glyphs={glyphs}
      opacity={opacity}
      color={color}
    />
  );
};

export default Symbol;
