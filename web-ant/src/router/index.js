import { createRouter, createWebHashHistory } from "vue-router";
import store from '../store'

import { isURL } from '../utils/validate'

import globalRoutes from "./globalRoutes";
import mainRoutes from "./mainRoutes";
import cookies from "../utils/cookies";



const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ y: 0 }),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: globalRoutes.concat(mainRoutes),
});

// 导航守卫
router.beforeEach((to, form, next) => {
  // 改变浏览器title
  if (to.meta.title) {
    document.title = `${to.meta.title} - 智能客服系统`;
  }

  // 定义排除路径
  const nextRoute = [ '/login']

  // 定义参数
  let redirectURL = "/login";
  let access_token = cookies.getCookies("access_token"), path = to.path;
  // 判断当前路径是否在排除路径内
  if (nextRoute.indexOf(path) === -1) {
    // 获取当前地址路径
    if (path) {
      redirectURL = "/login?ref=" + encodeURIComponent(path);
    }
    // 需要进行权限判断的页面开头
    if (!access_token || access_token === "null" || access_token === "") {
     router.push(redirectURL)
    }
  }
  next();
});

export default router;
