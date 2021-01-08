# prh-from-words

Generates `prh` rules from any list of words.

- You may pass any converter function to convert each word in your source list.
- Both source and destination files are only in YAML format.

About `prh` (proofreading-helper): <https://github.com/prh/prh>


## Install

```text
npm install -D @fal-works/prh-from-words
```

## Use

```js
const { generatePrhFile } = require("@fal-works/prh-from-words");

generatePrhFile(
  "source-word-list.yaml",
  "destination-prh-rules.yaml",
  anyConverterFunction
);
```

## Caveats

Not well tested.
