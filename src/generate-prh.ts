import fs = require("fs");
import yaml = require("./yaml");

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
export type ConverterFunction = (word: string) => PrhElement;

/** Generates a `string` to be written into a `prh` YAML file. */
const stringifyPrh = (elements: PrhElement[]) => {
  return (
    "rules:\n" +
    elements
      .map(({ pattern, expected, prh }) => {
        return `  - pattern: ${pattern}
    expected: ${expected}
    prh: ${prh}
`;
      })
      .join("\n")
  );
};

/**
 * Generates a YAML file for `prh`.
 *
 * @param srcFilePath Path to the source YAML file,
 * which must be a flat sequence of strings.
 * @param toPrhElement Function that converts any word in a source list into a
 * stringified YAML sequence element for `prh`
 * (which is a map with keys: `pattern`, `expected` and `prh`).
 */
export const generatePrhFile = async (
  srcFilePath: string,
  destFilePath: string,
  toPrhElement: ConverterFunction
): Promise<void> => {
  const srcList = await yaml.loadList(srcFilePath);

  const prhElements = srcList.map(toPrhElement);
  const stringifiedPrh = stringifyPrh(prhElements);

  return fs.promises.writeFile(destFilePath, stringifiedPrh);
};
