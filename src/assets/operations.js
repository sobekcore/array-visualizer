import Enums from "@/utility/enums";

const uniqueArrays = (array) => {
  return [...new Set([].concat(...array))];
};

export default function Calculate(compareArrays, operation) {
  compareArrays = Object.values(compareArrays);
  let arrayResult = [];

  switch (operation) {
    case Enums.CONCAT_OPERATION:
      arrayResult = [].concat(...compareArrays);
      break;
    case Enums.DIFF_OPERATION:
      arrayResult = [].concat(
        ...compareArrays.map((array, id) => {
          let others = compareArrays.slice(0);
          others.splice(id, 1);
          let unique = uniqueArrays(others);
          return array.filter((value) => !unique.includes(value));
        })
      );
      break;
    case Enums.INTERSECT_OPERATION:
      arrayResult = compareArrays.reduce((a, b) =>
        a.filter((c) => b.includes(c))
      );
      break;
    case Enums.UNION_OPERATION:
      arrayResult = uniqueArrays(compareArrays);
      break;
  }

  return arrayResult;
}
