import type { ConverterFunction } from "../generate-prh";

/**
 * A built-in `ConverterFunction` that requires a chōonpu
 * at the end of the word.
 * @param srcWord Any word that ends with a chōonpu.
 */
export const requireChoonAtEnd: ConverterFunction = (srcWord) => {
  if (!srcWord.endsWith("ー"))
    throw new Error(`Invalid input word (must end with "ー"): ${srcWord}`);

  const wrongWord = srcWord.slice(0, -1);

  return {
    pattern: `/${wrongWord}(?!ー)/`,
    expected: srcWord,
    prh: "語末に長音符を付けてください。",
  };
};
