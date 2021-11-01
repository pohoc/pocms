const utils = require("../lib/utils");
const { ForbiddenError } = require("../lib/error");

// 定义允许直接访问的url
const allowEntitles = ["account"];
const allowEnNames = ["login", "register"];

// API方法拦截
const UserFilter = async (ctx, next) => {
  await next();
  let url = ctx.originalUrl;
  let Titles = utils.stringArr(url, 3);
  let Names = utils.stringArr(url, 4);

  if (allowEntitles.indexOf(Titles) == -1) {
    throw new ForbiddenError();
  }
  if (allowEnNames.indexOf(Names) == -1) {
    throw new ForbiddenError();
  }
};

module.exports = {
  UserFilter,
};
