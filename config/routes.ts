// 更多功能查看
// https://beta-pro.ant.design/docs/advanced-menu
export type TRoute = {
  path: string;
  component?: string;
  name?: string;
  icon?: string;
  redirect?: string;
  routes?: TRoute[];
  // 不展示顶栏
  headerRender?: boolean;
  // 不展示页脚
  footerRender?: boolean;
  // 不展示菜单
  menuRender?: boolean;
  // 不展示菜单顶栏
  menuHeaderRender?: boolean;
  // 权限配置，需要与 plugin-access 插件配合使用
  access?: string;
  // 隐藏子菜单
  hideChildrenInMenu?: boolean;
  // 隐藏自己和子菜单
  hideInMenu?: boolean;
  // 在面包屑中隐藏
  hideInBreadcrumb?: boolean;
  // 子项往上提，仍旧展示,
  flatMenu?: boolean;
};

export default [
  { path: '/login', layout: false, component: '@/pages/login' },
  { path: '/404', layout: false, component: '@/pages/404.tsx' },
  { path: '/500', layout: false, component: '@/pages/500.tsx' },
  {
    path: '/',
    flatMenu: true,
    routes: [
      { path: '', component: '@/layouts/redirect' },
      {
        name: '欢迎',
        icon: 'smile',
        path: 'welcome',
        component: '@/pages/Welcome',
      },
      {
        path: 'task',
        name: '任务查询',
        component: '@/pages/Task',
        icon: 'UnorderedListOutlined',
      },
    ],
  },
  { path: '*', redirect: '/404' },
] as TRoute[];
