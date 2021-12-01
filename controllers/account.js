const jwt = require("jsonwebtoken");
const config = require("../config");
const apiState = require("../action/api.action");
const action = require("../action/account.action");
const logAction = require("../action/log.action");
const roleAction = require("../action/role.action");
const { ForbiddenError } = require("../lib/error");
const utils = require("../lib/utils");
const account = {};
account.login = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiState.checkState("login"))) {
    throw new ForbiddenError();
  }
  console.log(ctx.request)
  const { username, password } = ctx.request.body;
  const client = ctx.request.headers["user-agent"];
  // 判断是否传入值
  if (!username && !password) {
    ctx.code = 10001;
    ctx.msg = "请传递参数";
    return next();
  }

  // 查看账户是否被锁定
  const times = await action.isLoginLock(username);
  if (times) {
    ctx.code = 10001;
    ctx.msg = "你试图在破解密码，请3个小时后再试";
    return next();
  }
  const user = await action.checkPass(username, action.cryptPass(password));
  if (!user) {
    await action.setTimeRedis(username);
    ctx.code = 10001;
    ctx.msg = "用户名或密码错误";
  } else {
    delete user.password;
    // 记入登录日志
    await logAction.SetInfo({
      uid: user.id,
      name: user.username,
      client: client,
      type: "login",
      ip: utils.getClientIP(ctx.req),
      remark: "登录成功",
    });
    await action.uploadUserInfo(user.id, {
      login_time: Math.round(new Date() / 1000),
      last_login_time: user.login_time
    });
    // 封装token
    ctx.result = {
      expires_in: 7200,
      access_token: jwt.sign(
        {
          data: {
            id: user.id,
          },
          // 设置 token 过期时间
          exp: Math.floor(new Date() / 1000) + 60 * 60, // 60 seconds * 60 minutes = 1 hour
        },
        config.secret
      ),
    };
  }
  return next();
};

account.register = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiState.checkState("register"))) {
    throw new ForbiddenError();
  }

  // ctx.body = "2";
  return next();
};

account.get_admin_info = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiState.checkState("get_admin_info"))) {
    throw new ForbiddenError();
  }
  const user_id = ctx.jwtData.data.id;
  const info = await action.getInfoByJson(user_id);
  const role = await roleAction.getRoleInfoJson(user_id);
  if (!info) {
    ctx.code = 10001;
    ctx.msg = "未获取到用户信息";
  }
  info.role = role
  ctx.result = info;
  return next();
};

module.exports = account;
