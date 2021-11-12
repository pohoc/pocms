// 模块路由(基于主入口布局页面)
export default {
  path: '/',
  component: () => import('../views/layout/layout.vue'),
  name: 'Layout',
  redirect: { name: 'Home' },
  meta: { title: '主入口布局' },
  children: [
    { path: '/home', component: () => import('../views/modules/home/index.vue'), name: 'Home', meta: { title: '首页', isTab: true } }
  ]
}