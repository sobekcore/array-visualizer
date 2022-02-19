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

export { generateArray, generateCompareArrays };
