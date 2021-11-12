// 页面路由(独立页面)
export default [
  {
    path: '/404',
    component: () => import('../views/pages/error.vue'),
    name: '404',
    meta: { title: '404未找到' },
    beforeEnter (to, from, next) {
      // 拦截处理特殊业务场景
      // 如果, 重定向路由包含__双下划线, 为临时添加路由
      if (/__.*/.test(to.redirectedFrom)) {
        return next(to.redirectedFrom.replace(/__.*/, ''))
      }
      next()
    }
  },
  { path: '/login', component: () => import('../views/pages/login.vue'), name: 'login', meta: { title: '登录' } }
]