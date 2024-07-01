import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: '首页',
  //       meta: { title: '首页', icon: 'indexIcon', affix: true }
  //     }
  //   ]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/template/index',
    name: 'AI模板',
    meta: { title: 'AI模板', icon: 'indexIcon', affix: true },
    children: [
      {
        path: 'template/index',
        component: () => import('@/views/template/index'),
        name: 'AI模板',
        meta: { title: 'AI模板', icon: 'indexIcon', affix: true }
      }
    ]
  },
  {
    path: '/recently',
    component: Layout,
    // redirect: '/template/index',
    name: '最近',
    meta: { title: '最近', icon: 'indexIcon', affix: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/recently/index'),
        name: '最近',
        meta: { title: '最近', icon: 'indexIcon', affix: true }
      }
    ]
  },
  {
    path: '/star',
    component: Layout,
    // redirect: '/template/index',
    name: '星标',
    meta: { title: '星标', icon: 'indexIcon', affix: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/star/index'),
        name: '星标',
        meta: { title: '星标', icon: 'indexIcon', affix: true }
      }
    ]
  },
  {
    path: '/share',
    component: Layout,
    // redirect: '/template/index',
    name: '共享',
    meta: { title: '共享', icon: 'indexIcon', affix: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/share/index'),
        name: '共享',
        meta: { title: '共享', icon: 'indexIcon', affix: true }
      }
    ]
  },
  {
    path: '/task',
    component: Layout,
    // redirect: '/template/index',
    name: '任务日程',
    meta: { title: '任务日程', icon: 'indexIcon', affix: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/task/index'),
        name: '任务日程',
        meta: { title: '任务日程', icon: 'indexIcon', affix: true }
      }
    ]
  },
  {
    path: '/my',
    component: Layout,
    // redirect: '/template/index',
    name: '我的文档',
    meta: { title: '我的文档', icon: 'indexIcon', affix: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/my/index'),
        name: '我的文档',
        meta: { title: '我的文档', icon: 'indexIcon', affix: true }
      }
    ]
  },
  {
    path: '/recycle',
    component: Layout,
    // redirect: '/template/index',
    name: '回收站',
    meta: { title: '回收站', icon: 'indexIcon', affix: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/recycle/index'),
        name: '回收站',
        meta: { title: '回收站', icon: 'indexIcon', affix: true }
      }
    ]
  },
  {
    path: '/vip',
    component: Layout,
    // redirect: '/template/index',
    hidden: true,
    name: 'vip',
    meta: { title: 'vip', icon: 'indexIcon', affix: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/vip/index'),
        name: 'vip',
        meta: { title: 'vip', icon: 'indexIcon', affix: true }
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    // redirect: '/template/index',
    hidden: true,
    name: 'account',
    meta: { title: 'account', icon: 'indexIcon', affix: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/account/index'),
        name: 'vip',
        meta: { title: '账户设置', icon: 'indexIcon', affix: true }
      }
    ]
  },
  {
    path: '/editor/index1',
    // component: Layout,
    // redirect: '/template/index',
    hidden: true,
    component: () => import('@/views/editor/index'),
    name: 'editor',
    meta: { title: 'editor', icon: 'indexIcon', affix: true },
    // children: [
    //   {
    //     path: 'index',
    //     component: () => import('@/views/editor/index'),
    //     name: 'editor',
    //     meta: { title: 'editor', icon: 'indexIcon', affix: true }
    //   }
    // ]
  },
  {
    path: '/editor',
    component: Layout,
    // redirect: '/template/index',
    // hidden: true,
    name: 'editor',
    meta: { title: 'editor', icon: 'indexIcon', affix: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/editor/index'),
        name: 'editor',
        meta: { title: 'editor', icon: 'indexIcon', affix: true }
      }
    ]
  },
]
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
