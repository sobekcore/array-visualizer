export default {
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
  debounce: (event, callback, delay = 200) => {
    let debounce;
    window.addEventListener(event, () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        callback();
      }, delay);
    });
  },
};
