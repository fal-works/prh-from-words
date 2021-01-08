const { generatePrhFile, converters } = require("../lib");

generatePrhFile(
  "sample-terms/require-choon-at-end.yaml",
  "test/prh-require-choon-at-end.yaml",
  converters.requireChoonAtEnd
);
