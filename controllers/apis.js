const apiAction = require("../action/api.action");
const { ForbiddenError } = require("../lib/error");
const apis = {};

apis.get_apis = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiAction.checkState("get_apis"))) {
    throw new ForbiddenError();
  }
  const { page = 1, size = 10 } = ctx.request.query;
  const pageIndex = parseInt(page);
  const pageSize = parseInt(size);

  const params = { pageIndex, pageSize };

  const list = await apiAction.getApisJson(params);
  list.forEach(async (item, key) => {
    const data = await apiAction.getApisByJson(item.id);
    if (data) {
      list[key].children = data;
    }
  });
  const count = await apiAction.countApi(params);
  ctx.result = {
    list: list,
    total: count,
    total_page: Math.ceil(count / pageSize),
  };
  return next();
};

apis.info_apis = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiAction.checkState("info_apis"))) {
    throw new ForbiddenError();
  }
};

apis.add_apis = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiAction.checkState("add_apis"))) {
    throw new ForbiddenError();
  }
  return next();
};

apis.edit_apis = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiAction.checkState("edit_apis"))) {
    throw new ForbiddenError();
  }

  const { name, remark, token, pid, status, id } =
    ctx.request.body;

  if (!id) {
    ctx.code = 10001;
    ctx.msg = "请传递参数";
    return next();
  }
  const info = {name, remark, token, pid, status};
  const rs = await apiAction.uploadInfo(id, info);
  if (rs.affectedRows != 1) {
    ctx.code = 10002;
    ctx.msg = "更新失败";
    return next();
  }

  ctx.msg = "更新成功";
  ctx.result = true;
  return next();
};

apis.del_apis = async (ctx, next) => {
  // 校验接口是否开启
  if (!(await apiAction.checkState("del_apis"))) {
    throw new ForbiddenError();
  }
  return next();
};

module.exports = apis;