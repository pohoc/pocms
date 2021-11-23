const apiState = require("../action/api.action");
const action = require("../action/account.action");
const role = require("../action/role.action");
const { ForbiddenError, InvalidQueryError } = require("../lib/error");
const admin = {};

admin.get_admin_info = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiState.checkState("get_admin_info"))) {
    throw new ForbiddenError();
  }

  const user_id = ctx.jwtData.data.id;
  const info = await action.getInfoByJson(user_id);

  if (!info) {
    ctx.code = 10001;
    ctx.msg = "未获取到用户信息";
  }

  ctx.result = info
  return next();
};

admin.get_admin_role = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiState.checkState("get_admin_role"))) {
    throw new ForbiddenError();
  }

  const user_id = ctx.jwtData.data.id;
  const info = await role.getRoleInfoJson(user_id);

  if (!info) {
    ctx.code = 10001;
    ctx.msg = "未获取到用户信息";
  }
  ctx.result = info;
  return next();
};

admin.get_admin = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiState.checkState("get_admin"))) {
    throw new ForbiddenError();
  }
  ctx.result = "111";
  return next();
};

admin.info_admin = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiState.checkState("get_user_info"))) {
    throw new ForbiddenError();
  }

  const user_id = ctx.jwtData.data.id;
  const info = await action.getInfoByJson(user_id);

  if (!info) {
    ctx.code = 10001;
    ctx.msg = "未获取到用户信息";
  }

  ctx.result = info
  return next();
};


module.exports = admin;
