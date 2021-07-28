const adminMiddleware = async (ctx, next) => {
  // 获取url的地址
  ctx.state.__HOST__ = "http://" + ctx.request.header.host;
  // 这里做权限控制   已经登录直接跳转后台首页
  if (ctx.session.token) {
    await next() // 已经登录 继续向下执行
  } else {
    // 没有登录
    if (ctx.request.url == "/admin/login") {
      // 登录页面向下执行
      await next()
    } else {
      // 判断不是登录页面 就跳转必须去登录页面
      ctx.redirect("/admin/login")
    }
  }
  await next()
};

module.exports = {
  adminMiddleware
}
