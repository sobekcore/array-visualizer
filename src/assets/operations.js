import enums from "@/utility/enums";
import Papa from "papaparse";

const uniqueArrays = (array) => {
  return [...new Set([].concat(...array))];
};

const arrayDifference = (compareArrays, array, id) => {
  let others = compareArrays.slice(0);
  others.splice(id, 1);
  let unique = uniqueArrays(others);
  return array.filter((value) => !unique.includes(value));
};

/**
 * Calculate Arrays before visualizing them
 *
 * @param {Object} compareArrays Arrays to compare with each-self
 * @param {String} operation Operation type to execute between arrays
 * @returns {Array} Calculated Arrays ready to visualize
 */
function calculate(compareArrays, operation) {
  compareArrays = Object.values(compareArrays);

  let pointer = 0;
  let compareAgainst = compareArrays[pointer];
  let arrayResult = [];

  switch (operation) {
    case enums.CONCAT_OPERATION:
      arrayResult = [].concat(...compareArrays);
      break;
    case enums.DIFF_OPERATION:
      arrayResult = arrayDifference(compareArrays, compareAgainst, pointer);
      break;
    case enums.SYM_DIFF_OPERATION:
      arrayResult = [].concat(
        ...compareArrays.map((array, id) => {
          return arrayDifference(compareArrays, array, id);
        })
      );
      break;
    case enums.INTERSECT_OPERATION:
      arrayResult = compareArrays.reduce((a, b) =>
        a.filter((c) => b.includes(c))
      );
      break;
    case enums.UNION_OPERATION:
      arrayResult = uniqueArrays(compareArrays);
      break;
  }

  return arrayResult;
}

/**
 * Processes imported file contents into a Object
 *
 * @param {String} content Imported file content as a String
 * @param {String} type Type of a supported imported file
 * @returns {Object} Ready to load processed Object
 */
function process(content, type) {
  let properResult = {};
  let imported = [];

  switch (type) {
    case enums.JSON_FILE_FORMAT: {
      let parsed = JSON.parse(content);
      imported = Object.values(parsed);
      break;
    }
    case enums.CSV_FILE_FORMAT: {
      let options = { skipEmptyLines: true };
      let parsed = Papa.parse(content, options);
      imported = parsed.data;
      break;
    }
  }

  // Transform imported data into proper Object
  imported.forEach((array, id) => {
    properResult[++id] = [];
    array.forEach((value) => {
      properResult[id].push({
        value: String(value),
      });
    });
  });

  return properResult;
}

export default {
  calculate,
  process,
};
