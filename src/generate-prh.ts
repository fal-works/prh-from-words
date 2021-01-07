import * as fs from "fs";
import { loadList } from "./yaml";

/**
 * List element of prh data.
 */
export type PrhElement = {
  pattern: string;
  expected: string;
  prh: string;
};

/**
 * Any function that converts `word` into `PrhElement`.
 */
export type ConvertFunction = (word: string) => PrhElement;

const stringifyPrh = (elements: PrhElement[]) => {
  return elements
    .map(({ pattern, expected, prh }) => {
      return `
- pattern: ${pattern}
  expected: ${expected}
  prh: ${prh}
`;
    })
    .join("");
};

/**
 * Creates a YAML file for `prh`.
 * @param toPrhElement Function that converts any word in a source list into a
 * stringified YAML sequence element for `prh`
 * (which is a map with keys: `pattern`, `expected` and `prh`).
 */
export const generatePrhFile = async (
  srcFilePath: string,
  destFilePath: string,
  toPrhElement: ConvertFunction
): Promise<void> => {
  const srcList = await loadList(srcFilePath);

  const prhElements = srcList.map(toPrhElement);

  const stringifiedPrh = stringifyPrh(prhElements);

  //   const outputData = list
  //     .map((correctWord) => {
  //       if (!correctWord.endsWith("ー"))
  //         throw new Error(`Invalid input word: ${correctWord}`);

  //       const wrongWord = correctWord.slice(0, -1);

  //       return `
  // - pattern: /${wrongWord}(?!ー)/
  //   expected: ${correctWord}
  //   prh: 長音を付けてください。`;
  //     })
  //     .join("\n");

  return fs.promises.writeFile(destFilePath, stringifiedPrh);
};
