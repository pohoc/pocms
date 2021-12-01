const apiState = require("../action/api.action");
const adminAction = require("../action/admin.action");
const accountAction = require("../action/account.action")
const { ForbiddenError } = require("../lib/error");
const regular = require("../lib/regular")
const admin = {};

admin.get_admin = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiState.checkState("get_admin"))) {
    throw new ForbiddenError();
  }
  const { page = 1, size = 10, username, phone, status } = ctx.request.query;
  const pageIndex = parseInt(page);
  const pageSize = parseInt(size);

  let params = { pageIndex, pageSize };
  if (username) params = Object.assign(params, { username }); 
  if (phone) params = Object.assign(params, { phone });
  if (status) params = Object.assign(params, { status });

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
  delete info.password;
  ctx.result = info;
  return next();
};

admin.add_admin = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiState.checkState("add_admin"))) {
    throw new ForbiddenError();
  }
  const { username, password, phone, name, expire_time, avatar, role_id } = ctx.request.body;

  if (!username && !password && !phone && !name) {
    ctx.code = 10001;
    ctx.msg = "请传递参数";
    return next();
  }

  if(!regular.isEmpty(username) && !regular.isRegisterUserName(username)){
    ctx.code = 10001;
    ctx.msg = "用户名不能为空";
    return next();
  }

  if(!regular.isMobile(phone)){
    ctx.code = 10001;
    ctx.msg = "手机号不正确";
    return next();
  }

  if(!password.length > 6 && !regular.isPass(password)){
    ctx.code = 10001;
    ctx.msg = "密码不正确";
    return next();
  }

  const checkUserName = await accountAction.checkInfo({username});
  if (!!checkUserName) {
    ctx.code = 10001;
    ctx.msg = '账号已存在';
    return next();
  }

  const info = await adminAction.addInfo({
    username,
    password: accountAction.cryptPass(password),
    phone,
    name,
    expire_time,
    avatar,
    role_id,
    add_time: Math.round(new Date() / 1000),
  });
  if (!info.insertId) {
    ctx.code = 10002;
    ctx.msg = "添加失败";
    return next();
  }

  ctx.msg = "添加成功";
  ctx.result = true;
  return next();
};

admin.edit_admin = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiState.checkState("edit_admin"))) {
    throw new ForbiddenError();
  }

  const { username, phone, name, avatar, role_id, expire_time, status, id } = ctx.request.body;

  const info = {username, phone, name, avatar, role_id, expire_time, status};
  const rs = await adminAction.uploadUserInfo(id, info);

  if (rs.affectedRows != 1) {
    ctx.code = 10002;
    ctx.msg = "更新失败";
    return next();
  }

  ctx.msg = "更新成功";
  ctx.result = true;
  return next();
};

admin.del_admin = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiState.checkState("del_admin"))) {
    throw new ForbiddenError();
  }
  const { id } = ctx.request.body;
  if (!id) {
    ctx.code = 10001;
    ctx.msg = "请传递参数";
    return next();
  }
  const info = await adminAction.delUserInfo(id);
  if (!info.affectedRows) {
    ctx.code = 10001;
    ctx.msg = "删除失败";
  }
  ctx.msg = "删除成功";
  ctx.result = true;
  return next();
};

admin.upload_admin = async (ctx, next) =>{
  // 校验接口是否开启
  if (!(await apiState.checkState("upload_admin"))) {
    throw new ForbiddenError();
  }

  if(!ctx.request.files){
    ctx.code = 10001;
    ctx.msg = "上传失败";
  }

  ctx.msg = "上传成功";
  ctx.result = {
    file: ctx.request.files.file.path
  };
  return next();
}

module.exports = admin;
