const random = require("string-random");

const utils = {
  /**
   * 随机范围的数
   * @param min
   * @param max
   * @returns {number}
   */
  random: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  /**
   * 随机纯数字的字符串
   * @param len
   * @returns {string}
   */
  randomNumber: (len) => {
    if (typeof len !== "number" || len === 0) return;
    return random(len, { letters: false });
  },
  randomString: (len) => {
    if (typeof len !== "number" || len === 0) return;
    return random(len);
  },
  randomLetter: (len) => {
    if (typeof len !== "number" || len === 0) return;
    return random(len, { numbers: false });
  },
  trim: (str) => {
    if (String.prototype.trim) {
      return str === null ? "" : String.prototype.trim.call(str);
    } else {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    }
  },
  isEmpty: (str) => {
    const reg = new RegExp(/^[\s]{0,}$/);
    str = utils.trim(str);
    return reg.test(str);
  },
  isArray: (arr) => {
    return Object.prototype.toString.call(arr) === "[object Array]";
  },
  getClientIP(req) {
    return (
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress
    );
  },
  stringArr(string, num) {
    const stringResult = string.split("/");
    return stringResult[num];
  },
  deleteEmptyProperty(obj) {
    if (!(typeof obj == "object")) {
      return;
    }
    for (var key in obj) {
      if (
        obj.hasOwnProperty(key) &&
        (obj[key] == null || obj[key] == undefined || obj[key] == "")
      ) {
        delete obj[key];
      }
    }
    return obj;
  },
};

module.exports = utils;
