const koaJwt = require("koa-jwt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { AuthenticationError } = require("../lib/error");
const jwtBase = koaJwt({ secret: config.secret }).unless({
  path: [/\/register/, /\/login/],
});

const jwtFilter = async (ctx, next) => {
  if (typeof ctx.request.headers.authorization === "string") {
    try {
      const token = ctx.request.headers.authorization.slice(7);
      ctx.jwtData = jwt.verify(token, config.secret);
    } catch (error) {
      if(error.message === 'jwt expired'){
        ctx.status = 500
        ctx.body = {
          code: 500,
          msg: "token 过期"
        }
      }else if(error.message === 'jwt malformed'){
        ctx.status = 500
        ctx.body = {
          code: 500,
          msg: "令牌无效"
        }
      }else{
        ctx.status = 500
        ctx.body = {
          code: 500,
          msg: error.message
        }
      }
    }

  }
  return await next().catch((err) => {
    if (401 == err.status) {
      throw new AuthenticationError()
    }
  });
};

const jwtMiddleware = (app) => {
  app.use(jwtFilter);
  app.use(jwtBase);
};

module.exports = jwtMiddleware;
