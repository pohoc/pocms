import { createStore } from 'vuex'

export default createStore({
  namespaced: true,
  state: {
    // 导航条, 布局风格, default(白色) / colorful(鲜艳)
    navbarLayoutType: 'default',
    // 侧边栏, 布局皮肤, default(白色) / dark(黑色)
    sidebarLayoutSkin: 'default',
    // 布局, 布局皮肤, default(默认显示) / top(顶部显示)
    layoutType: 'default',
    // 侧边栏, 折叠状态
    sidebarFold: false,
    // 侧边栏, 菜单
    sidebarMenuList: [],
    // 顶部导航栏
    topSidebarMenuList: [],
    activeIndex: [],
    sidebarMenuActiveName: '',
    // 内容, 是否需要刷新
    contentIsNeedRefresh: false,
    // 内容, 标签页(默认添加首页)
    contentTabs: [
      {
        name: 'home',
        title: 'home'
      }
    ],
    contentTabsActiveName: 'home'
  },
  mutations: {
  },
  actions: {
  },
})
