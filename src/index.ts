import { generatePrhFile } from "./generate-prh";
import type { ConvertFunction } from "./generate-prh";

const requireChoon: ConvertFunction = (srcWord) => {
  if (!srcWord.endsWith("ー"))
    throw new Error(`Invalid input word: ${srcWord}`);

  const wrongWord = srcWord.slice(0, -1);

  return {
    pattern: `/${wrongWord}(?!ー)/`,
    expected: srcWord,
    prh: "長音を付けてください。",
  };
};

generatePrhFile("dictionary/choon-list.yaml", "choon.yaml", requireChoon);
