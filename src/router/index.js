import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
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
    path: '/adminLogin',
    component: () => import('@/views/admin/index'),
    hidden: true
  },

  {
    path: '/',
    component: () => import('@/views/kindergarten/main'),
    hidden: true,
    children: [
      { path: "/", component: () => import('@/views/kindergarten/index') },
      {
        path: '/userLogin',
        component: () => import('@/views/login/index'),
      },
      { path: "/apply", component: () => import('@/views/apply/index') },
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/directorMain',
    component: () => import('@/views/director/main'),
    hidden: true,
    children:[
      {
        path: '/director',
        component: () => import('@/views/director/index'),
      },
      {
        path: '/teacherMgr',
        component: () => import('@/views/director/TeactherManage'),
      },
      {
        path: '/classMgr',
        component: () => import('@/views/director/ClassManage'),
      },
      {
        path: '/babyMgr',
        component: () => import('@/views/director/BabyManager'),
      },
      {
        path: '/foodMgr',
        component: () => import('@/views/director/FoodManage'),
      },
      {
        path: '/safeEduMgr',
        component: () => import('@/views/director/SafeEduManage'),
      },
      {
        path: '/gardenEdit',
        component: () => import('@/views/director/GardenEdit'),
      },
      {
        path: '/personCenter',
        component: () => import('@/views/kindergarten/PersonCenter'),
      },
      {
        path: '/courseMgr',
        component: () => import('@/views/director/CourseManage'),
      },
      {
        path: '/classroomMgr',
        component: () => import('@/views/director/ClassroomManage'),
      }
    ]
  },


  // {
  //   path: '/main',
  //   component: () => import('@/views/dashboard/index'),
  //   meta: { title: 'Dashboard', icon: 'dashboard' },
  //   // hidden: true
  // },
  {
    path: '/adminMain',
    component: Layout,
    // redirect: '/dashboard',
    children: [{
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },


  {
    path: '/audit',
    component: Layout,
    children: [
      {
        path: '/audit',
        component: () => import('@/views/audit/index'),
        name: 'audit',
        meta: { title: '资格审核', icon: 'component' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    name: 'excel',
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/index'),
        name: 'excel',
        meta: { title: 'excelDemo', icon: 'component' }
      }
    ]
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
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
