const apiState = require("../action/api.action");
const adminAction = require("../action/admin.action");
const roleAction = require("../action/role.action");
const { ForbiddenError } = require("../lib/error");
const admin = {};

admin.get_admin_info = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiState.checkState("get_admin_info"))) {
    throw new ForbiddenError();
  }
  const user_id = ctx.jwtData.data.id;
  const info = await adminAction.getInfoByJson(user_id);
  if (!info) {
    ctx.code = 10001;
    ctx.msg = "未获取到用户信息";
  }
  ctx.result = info;
  return next();
};

admin.get_admin_role = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiState.checkState("get_admin_role"))) {
    throw new ForbiddenError();
  }
  const user_id = ctx.jwtData.data.id;
  const info = await roleAction.getRoleInfoJson(user_id);
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
  const { page = 1, size = 10, keyword } = ctx.request.query;
  const pageIndex = parseInt(page);
  const pageSize = parseInt(size);
  let params = { pageIndex, pageSize };
  if (keyword) params = Object.assign(params, { keyword });
  const list = await adminAction.getAdminJson(params);
  const count = await adminAction.countAdmin(params);
  ctx.result = {
    list: list,
    total: count,
    total_page: Math.ceil(count / pageSize),
  };
  return next();
};

admin.info_admin = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiState.checkState("info_admin"))) {
    throw new ForbiddenError();
  }
  const { id } = ctx.request.query;
  if (!id) {
    ctx.code = 10001;
    ctx.msg = "请传递参数";
    return next();
  }
  const info = await adminAction.getInfoByJson(id);
  if (!info) {
    ctx.code = 10001;
    ctx.msg = "未获取到用户信息";
  }
  ctx.result = info;
  return next();
};

admin.add_admin = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiState.checkState("info_admin"))) {
    throw new ForbiddenError();
  }
  const { username, password, phone, name, expire_time, avatar, role_id } = ctx.request.body;

  if (!id) {
    ctx.code = 10001;
    ctx.msg = "请传递参数";
    return next();
  }
  const info = await adminAction.getInfoByJson(id);
  if (!info) {
    ctx.code = 10001;
    ctx.msg = "未获取到用户信息";
  }
  ctx.result = info;
  return next();
};

admin.edit_admin = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiState.checkState("info_admin"))) {
    throw new ForbiddenError();
  }
  const { id } = ctx.request.query;
  if (!id) {
    ctx.code = 10001;
    ctx.msg = "请传递参数";
    return next();
  }
  const info = await adminAction.getInfoByJson(id);
  if (!info) {
    ctx.code = 10001;
    ctx.msg = "未获取到用户信息";
  }
  ctx.result = info;
  return next();
};

admin.del_admin = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiState.checkState("info_admin"))) {
    throw new ForbiddenError();
  }
  const { id } = ctx.request.query;
  if (!id) {
    ctx.code = 10001;
    ctx.msg = "请传递参数";
    return next();
  }
  const info = await adminAction.getInfoByJson(id);
  if (!info) {
    ctx.code = 10001;
    ctx.msg = "未获取到用户信息";
  }
  ctx.result = info;
  return next();
};

module.exports = admin;
