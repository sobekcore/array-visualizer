export default {
  toJSON: (object) => {
    return JSON.parse(JSON.stringify(object));
  },
  getTime: (unit, amount) => {
    let second = 1000;
    let minute = second * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let week = day * 7;
    return eval(unit) * amount;
  }
};
