const utils = require("../lib/utils");
const { InvalidQueryError } = require("../lib/error");
const ApiAction = require("../action/api.action")

// API方法拦截
const UserFilter = async (ctx, next) => {
  await next();
  let url = ctx._matchedRoute ? ctx._matchedRoute : ctx.originalUrl;

  const allowEntitles = utils.api_array_maps(await ApiAction.getEnTitles())
  const allowEnNames = utils.api_array_maps(await ApiAction.getEnNames())

  let Titles = utils.stringArr(url, 3);
  let Names = utils.stringArr(url, 4);

  if (allowEntitles.indexOf(Titles) == -1) {
    throw new InvalidQueryError();
  }
  if (allowEnNames.indexOf(Names) == -1) {
    throw new InvalidQueryError();
  }
};

module.exports = {
  UserFilter,
};
