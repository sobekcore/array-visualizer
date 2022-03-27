const utility = {
  localStorageSave: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  localStorageGet: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
  cookieSave: (key, value, expire) => {
    const date = new Date();
    date.setTime(date.getTime() + utility.getTime("day", expire));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${key}=${value}; ${expires};`;
  },
  cookieGet: (key) => {
    const split = document.cookie.split(`${key}=`);
    return split.length === 1 ? "" : split.pop().split(";").shift();
  },
  toJSON: (object) => {
    return JSON.parse(JSON.stringify(object));
  },
  removeAfterLastChar: (string, char) => {
    return string.substring(0, string.lastIndexOf(char) + 1);
  },
  getTime: (unit, amount) => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    return eval(unit) * amount;
  },
  oneOfTwo: (left, right) => {
    return left ? left : (right ? right : null);
  },
};

export default utility;
