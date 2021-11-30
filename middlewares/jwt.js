const koaJwt = require("koa-jwt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { AuthenticationError } = require("../lib/error");
const ApiAction = require("../action/api.action");
const utils = require("../lib/utils");

/**
 * 实现数据库管理白名单
 */
const jwtBase = koaJwt({ secret: config.secret }).unless({
  custom: async (ctx) => {
    const Whites = utils.api_array_maps(await ApiAction.getWhite());
    const url = ctx.path;
    let Names = utils.stringArr(url, 4);
    if (Whites.indexOf(Names) === -1) {
      return false;
    } else {
      return true;
    }
  },
});

/**
 * 静态管理白名单(停用)
 */
// const jwtBase = koaJwt({ secret: config.secret }).unless({
//   path: [/\/register/, /\/login/],
// });

const jwtFilter = async (ctx, next) => {
  if (typeof ctx.request.headers.authorization === "string") {
    try {
      const token = ctx.request.headers.authorization.slice(7);
      ctx.jwtData = jwt.verify(token, config.secret);
    } catch (error) {
      if (error.message === "jwt expired") {
        ctx.status = 500;
        ctx.body = {
          code: 500,
          msg: "token 过期",
        };
      } else if (error.message === "jwt malformed") {
        ctx.status = 500;
        ctx.body = {
          code: 500,
          msg: "令牌无效",
        };
      } else {
        ctx.status = 500;
        ctx.body = {
          code: 500,
          msg: error.message,
        };
      }
    }
  }
  return await next().catch((err) => {
    if (401 == err.status) {
      throw new AuthenticationError();
    }
  });
};

const jwtMiddleware = (app) => {
  app.use(jwtFilter);
  app.use(jwtBase);
};

module.exports = jwtMiddleware;
