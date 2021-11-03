const utils = require("../lib/utils");
const { ForbiddenError } = require("../lib/error");

// 定义允许直接访问的url
const allowEntitles = ["account", "business"];
const allowEnNames = ["login", "register", "add_business", "update_business", "del_business", "get_business", "get_business_info"];

// API方法拦截
const UserFilter = async (ctx, next) => {
  await next();
  let url = ctx._matchedRoute; // ctx.originalUrl;
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
