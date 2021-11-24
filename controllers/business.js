const jwt = require("jsonwebtoken");
const config = require("../config");
const apiState = require("../action/api.action");
const BusinessAction = require("../action/business.action");
const log = require("../action/log.action");
const { ForbiddenError } = require("../lib/error");
const business = {};
business.add_business = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiState.checkState("add_business"))) {
    throw new ForbiddenError();
  }
  const {
    business_name,
    logo,
    copyright,
    voice_state,
    template_state,
    distribution_rule,
    voice_address,
    expire_time,
    max_count,
    push_url,
    state,
    remark,
  } = ctx.request.body;

  const info = await BusinessAction.addInfoById({
    business_name,
    logo,
    copyright,
    voice_state,
    template_state,
    distribution_rule,
    voice_address,
    expire_time,
    max_count,
    push_url,
    state,
    remark,
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

business.update_business = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiState.checkState("add_business"))) {
    throw new ForbiddenError();
  }

  const {
    id,
    business_name,
    logo,
    copyright,
    voice_state,
    template_state,
    distribution_rule,
    voice_address,
    expire_time,
    max_count,
    push_url,
    state,
    remark,
  } = ctx.request.body;

  if (!id) {
    ctx.code = 10001;
    ctx.msg = "请传递参数";
    return next();
  }

  const info = await BusinessAction.upInfoById(id, {
    business_name,
    logo,
    copyright,
    voice_state,
    template_state,
    distribution_rule,
    voice_address,
    expire_time,
    max_count,
    push_url,
    state,
    remark,
  });

  if (!info.affectedRows) {
    ctx.code = 10002;
    ctx.msg = "更新失败";
    return next();
  }

  ctx.msg = "更新成功";
  ctx.result = true;

  return next();
};

business.del_business = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiState.checkState("del_business"))) {
    throw new ForbiddenError();
  }
  const { id } = ctx.request.body;
  if (!id) {
    ctx.code = 10001;
    ctx.msg = "请传递参数";
    return next();
  }

  const info = await BusinessAction.delInfoById(id);
  if (!info.affectedRows == 1) {
    ctx.code = 10002;
    ctx.msg = "删除失败";
    return next();
  }
  ctx.msg = "删除成功";
  ctx.result = true;

  return next();
};

business.get_business = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiState.checkState("get_business"))) {
    throw new ForbiddenError();
  }

  const { page = 1, size = 10, keyword } = ctx.request.query;
  const pageIndex = parseInt(page);
  const pageSize = parseInt(size);
  let params = { pageIndex, pageSize };
  if (keyword) params = Object.assign(params, { keyword });

  const list = await BusinessAction.getInfoByList(params);
  const count = await BusinessAction.countBusiness(params);

  ctx.result = {
    list: list,
    total: count,
    total_page: Math.ceil(count / pageSize),
  };

  return next();
};

business.get_business_info = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiState.checkState("get_business_info"))) {
    throw new ForbiddenError();
  }

  const { id } = ctx.request.query;
  if (!id) {
    ctx.code = 10001;
    ctx.msg = "请传递参数";
    return next();
  }

  const info = await BusinessAction.getInfoById(id);
  if(!info){
    ctx.code = 10001;
    ctx.msg = "未查询到数据";
    return next();
  }
  ctx.result = info;
  return next();
};

module.exports = business;
