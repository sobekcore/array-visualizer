/**
 * Generate single raw array, the most basic data unit
 *
 * @param {Number} numberOfItems Number of items to generate in array
 * @returns {Array} Single basic array
 */
const generateArray = (numberOfItems = 1) => {
  const array = [];

  for (let i = 1; i <= numberOfItems; i++) {
    array.push({
      item: i,
      value: String(i),
    });
  }

  return array;
};

/**
 * Generate array that is ready to save and transform to a comparable one
 *
 * @param {Number} array An array ID
 * @param {Number} item Item ID and value as a stringified one
 * @returns {Object} Array that is ready save
 */
const generateArrayToSave = (array = 1, item = 1) => {
  return {
    array: array,
    item: item,
    value: String(item),
  };
};

/**
 * Generates comparable arrays, calculated and ready for visualization
 *
 * @param {Number} numberOfArrays Number of arrays to generate
 * @param {Number} numberOfItems Number of item to generate in each array
 * @returns {Object} Comparable arrays, ready to visualize
 */
const generateCompareArrays = (numberOfArrays = 1, numberOfItems = 1) => {
  const arrays = {};

  for (let i = 1; i <= numberOfArrays; i++) {
    arrays[i] = [];
    for (let j = 1; j <= numberOfItems; j++) {
      arrays[i].push(String(j));
    }
  }

  return arrays;
};

export { generateArray, generateArrayToSave, generateCompareArrays };
