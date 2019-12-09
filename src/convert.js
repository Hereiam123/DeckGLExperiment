const csvToJson = require("convert-csv-to-json");

const input = "./crime.csv";
const output = "./public/crime.json";

csvToJson
  .fieldDelimiter(",")
  .formatValueByType()
  .generateJsonFileFromCsv(input, output);
