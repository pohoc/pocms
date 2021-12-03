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
  list.forEach( async (item, key) => {
    const data = await apiAction.getApisByJson(item.id)
    if(data){
      list[key].children = data
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
