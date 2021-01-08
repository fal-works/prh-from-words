import * as fs from "fs";
import { load as parseYAML } from "js-yaml";

/**
 * Returns `array` as `string[]` if all elements are of type `string`.
 * Otherwise throws an `Error`.
 */
const validateStringList = (array: any[]) => {
  for (const element of array) {
    if (typeof element !== "string")
      throw new Error(`Found non-string element in input list: ${element}`);
  }

  return array as string[];
};

/**
 * Loads a string list from a YAML file.
 *
 * The YAML data must be a flat sequence of strings,
 * otherwise an `Error` is thrown.
 */
export const loadList = async (filePath: string): Promise<string[]> => {
  const fileContent = await fs.promises.readFile(filePath);
  const data = parseYAML(fileContent.toString());

  if (!Array.isArray(data)) throw new Error(`Not a sequence: ${filePath}`);

  const list = validateStringList(data);
  list.sort((a, b) => a.localeCompare(b, "ja"));

  return list;
};
