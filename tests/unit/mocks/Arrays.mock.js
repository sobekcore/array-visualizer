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

export { generateArray };
