import { Text, useWindowDimensions, View } from "react-native";
import Symbol, { COLS, ROWS } from "./Symbol";
import {
  BlurMask,
  Canvas,
  Fill,
  Paint,
  Skia,
  useClock,
  useFont,
  useTypeface,
} from "@shopify/react-native-skia";

const cols = new Array(COLS).fill(0);
const rows = new Array(ROWS).fill(0);

const randomArray = (from: number, to: number, blank?: boolean) => {
  const size = Math.round(from + Math.random() * (to - from));
  const a = new Array(size).fill(0).map((_, i) => (blank ? 0 : i / size));
  return a.reverse();
};

const streams = cols.map(() =>
  new Array(3)
    .fill(0)
    .map(() => [
      ...randomArray(1, 4, true),
      ...randomArray(4, 16),
      ...randomArray(2, 8, true),
    ])
    .flat()
);

const Matrix = () => {
  const clock = useClock();
  const { width, height } = useWindowDimensions();
  const symbol = { width: width / COLS, height: height / ROWS };
  //   const symbol = { width: 10, height: 10 };

  const font = useFont(require("./matrix-code-nfi.otf"), symbol.height);
  if (font === null) {
    return null;
  }

  const symbols = font.getGlyphIDs("abcdefghijklmnopqrstuvwxyz");

  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color="black" />
      <Paint>
        <BlurMask blur={4} style="solid" />
      </Paint>
      {cols.map((_i, j) =>
        rows.map((_j, i) => (
          <Symbol
            symbols={symbols}
            key={`${i}-${j}`}
            i={i}
            j={j}
            font={font}
            timestamp={clock}
            stream={streams[j]}
            symbol={symbol}
          />
        ))
      )}
    </Canvas>
  );
};
export default Matrix;
