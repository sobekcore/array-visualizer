export default {
  localStorageSave: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  localStorageGet: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
  toJSON: (object) => {
    return JSON.parse(JSON.stringify(object));
  },
  removeAfterLastChar: (string, char) => {
    return string.substring(0, string.lastIndexOf(char) + 1);
  },
  getTime: (unit, amount) => {
    let second = 1000;
    let minute = second * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let week = day * 7;
    return eval(unit) * amount;
  },
  oneOfTwo: (left, right) => {
    return left ? left : (right ? right : null);
  },
};
