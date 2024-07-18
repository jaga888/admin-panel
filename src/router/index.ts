import { markRaw } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'; // createWebHashHistory, createWebHistory
import type { Router, RouteRecordRaw, RouteComponent } from 'vue-router';
import {
  Memo as IconCompany,
  House as IconHouse,
  User as IconUser,
  Collection as IconCourt,
  Coin as IconFees
} from '@element-plus/icons-vue';

/* Layout */
const Layout = (): RouteComponent => import('@/layout/index.vue');

/* Router Modules */
// import componentsRouter from './modules/components';
// import chartsRouter from './modules/charts';
// import nestedRouter from './modules/nested';
// import tableRouter from './modules/table';

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 *
 * 注意：hidden、alwaysShow 属性配置移动到了meta中！！！
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 *
 * 注意：hidden、alwaysShow 属性配置移动到了meta中！！！
 */
export const asyncRoutes: RouteRecordRaw[] = [
  // /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  {
    path: '/company',
    component: Layout,
    redirect: '/company/list',
    name: 'Company',
    meta: {
      title: 'Companies',
      icon: markRaw(IconCompany)
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/company/create.vue'),
        name: 'Create components',
        meta: { title: 'Create company', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/company/edit.vue'),
        name: 'Edit components',
        meta: { hidden: true, title: 'Edit company', noCache: true, activeMenu: '/company/list' }
      },
      {
        path: 'list',
        component: () => import('@/views/company/list.vue'),
        name: 'Companies list',
        meta: { title: 'Companies list', icon: 'list' }
      }
    ]
  },
  {
    path: '/property',
    component: Layout,
    redirect: '/property/list',
    name: 'Property',
    meta: {
      title: 'Properties',
      icon: markRaw(IconHouse)
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/property/create.vue'),
        name: 'CreateProperty',
        meta: { title: 'Create Property', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/property/edit.vue'),
        name: 'EditProperty',
        meta: { hidden: true, title: 'Edit property', noCache: true, activeMenu: '/property/list' }
      },
      {
        path: 'list',
        component: () => import('@/views/property/list.vue'),
        name: 'Propertylist',
        meta: { title: 'Properties list', icon: 'list' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'Users',
    meta: {
      title: 'Users',
      icon: markRaw(IconUser)
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/user/create.vue'),
        name: 'CreateUser',
        meta: { title: 'Create user', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/user/edit.vue'),
        name: 'EditUser',
        meta: { hidden: true, title: 'Edit user', noCache: true, activeMenu: '/user/list' }
      },
      {
        path: 'list',
        component: () => import('@/views/user/list.vue'),
        name: 'Userslist',
        meta: { title: 'Users list', icon: 'list' }
      }
    ]
  },
  {
    path: '/court',
    component: Layout,
    redirect: '/court/list',
    name: 'Courts',
    meta: {
      title: 'Courts',
      icon: markRaw(IconCourt)
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/court/create.vue'),
        name: 'CreateCourt',
        meta: { title: 'Create court', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/court/edit.vue'),
        name: 'EditCourt',
        meta: { hidden: true, title: 'Edit court', noCache: true, activeMenu: '/court/list' }
      },
      {
        path: 'list',
        component: () => import('@/views/court/list.vue'),
        name: 'CourtList',
        meta: { title: 'Courts list', icon: 'list' }
      }
    ]
  },
  {
    path: '/attorney-fee',
    component: Layout,
    redirect: '/attorney-fee/list',
    name: 'AttorneyFees',
    meta: {
      title: 'Attorney-fees',
      icon: markRaw(IconFees)
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/attorney-fee/create.vue'),
        name: 'CreateAttorneyFee',
        meta: { title: 'Create attorney fee', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/attorney-fee/edit.vue'),
        name: 'EditAttorneyFee',
        meta: { hidden: true, title: 'Edit Attorney Fee', noCache: true, activeMenu: '/attorney-fee/list' }
      },
      {
        path: 'list',
        component: () => import('@/views/attorney-fee/list.vue'),
        name: 'AttorneyFeesList',
        meta: { title: 'Attorney fees list', icon: 'list' }
      }
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/404', meta: { hidden: true }}
];

console.log('BASE_URL=', import.meta.env);

const createTheRouter = (): Router => createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
});

interface RouterPro extends Router {
    matcher: unknown;
}

const router = createTheRouter() as RouterPro;

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createTheRouter() as RouterPro;
  router.matcher = newRouter.matcher;
}

export default router;
