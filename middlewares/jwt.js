const koaJwt = require("koa-jwt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { ForbiddenError } = require("../lib/error");
const jwtBase = koaJwt({ secret: config.secret }).unless({
  path: [/\/register/, /\/login/],
});

const jwtFilter = async (ctx, next) => {
  if (typeof ctx.request.headers.authorization === "string") {
    const token = ctx.request.headers.authorization.slice(7);
    ctx.jwtData = jwt.verify(token, config.secret);
  }
  return await next().catch((err) => {
    if (401 == err.status) {
      throw new ForbiddenError()
    }
  });
};

const jwtMiddleware = (app) => {
  app.use(jwtFilter);
  app.use(jwtBase);
};

module.exports = jwtMiddleware;
