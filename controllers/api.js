const jwt = require("jsonwebtoken");
const config = require('../config')
const action = require("../action/account.action");
const { InvalidQueryError } = require("../lib/error");
const api = {};
api.login = async (ctx, next) => {
  const { phone } = ctx.request.body;
  if (!phone) {
    throw new InvalidQueryError();
  }
  const hasPhone = await action.checkInfo({ phone });
  if (!hasPhone) {
    ctx.result = "";
    ctx.msg = "该手机号未注册";
    return;
  } else {
    ctx.result = jwt.sign(
      {
        data: hasPhone.id,
        // 设置 token 过期时间
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // 60 seconds * 60 minutes = 1 hour
      },
      config.secret
    );
  }
  return next();
};

api.register = async (ctx, next) => {
  ctx.body = "2";
};

module.exports = api;
