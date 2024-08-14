import { markRaw } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import type { Router, RouteRecordRaw, RouteComponent } from 'vue-router';
import {
  Memo as IconCompany,
  House as IconHouse,
  User as IconUser,
  Collection as IconCourt,
  Coin as IconFees,
  EditPen as IconDocument,
  ReadingLamp as IconUnit,
  CircleCheck as IconPolicy,
  Location as IconJurisdiction,
  Switch as IconAgencyRelation,
  Suitcase as IconAgency,
  MapLocation as IconServiceableArea,
  Ticket as IconBilling,
  Setting as IconAdministration
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
    path: '/',
    redirect: '/company/list'
  },
  {
    path: '/reporting',
    name: 'Reporting',
    meta: {
      title: 'Reporting'
      // icon: markRaw(IconAdministration)
    },
    children: [
      {
        path: '/company',
        meta: {
          title: 'Unprocessed Non-Compliance Report',
          icon: markRaw(IconCompany)
        }
      },
      {
        path: '/company',
        meta: {
          title: 'Unprocessed SE Report',
          icon: markRaw(IconCompany)
        }
      },
      {
        path: '/company',
        meta: {
          title: 'Unprocessed Possession Report',
          icon: markRaw(IconCompany)
        }
      },
      {
        path: '/company',
        meta: {
          title: 'Pending Actual Outcome',
          icon: markRaw(IconCompany)
        }
      },
      {
        path: '/company',
        meta: {
          title: 'Notice Status Report',
          icon: markRaw(IconCompany)
        }
      },
      {
        path: '/company',
        meta: {
          title: 'UD Status Report',
          icon: markRaw(IconCompany)
        }
      },
      {
        path: '/company',
        meta: {
          title: 'Possession Status Report',
          icon: markRaw(IconCompany)
        }
      },
      {
        path: '/company',
        meta: {
          title: 'Judgment & Possession Report',
          icon: markRaw(IconCompany)
        }
      },
      {
        path: '/company',
        meta: {
          title: 'Processing Totals Report',
          icon: markRaw(IconCompany)
        }
      },
      {
        path: '/company',
        meta: {
          title: 'Processing Calendar',
          icon: markRaw(IconCompany)
        }
      }
    ] },
  {
    path: '/accounting',
    name: 'Accounting',
    meta: {
      title: 'Accounting'
      // icon: markRaw(IconAdministration)
    },
    children: [
      {
        path: '/company',
        meta: {
          title: 'Client Billing',
          icon: markRaw(IconCompany)
        }
      },
      {
        path: '/company'
      }
    ] },
  {
    path: '/processing',
    name: 'Processing',
    meta: {
      title: 'Processing'
      // icon: markRaw(IconAdministration)
    },
    children: [
      {
        path: '/company',
        meta: {
          title: 'Notices of Non-Compliance',
          icon: markRaw(IconCompany)
        }
      },
      {
        path: '/company',
        meta: {
          title: 'Unlawfull Detainers',
          icon: markRaw(IconCompany)
        }
      },
      {
        path: '/company',
        meta: {
          title: 'Court of Eviction',
          icon: markRaw(IconCompany)
        }
      },
      {
        path: '/company',
        meta: {
          title: 'Writs of Eviction',
          icon: markRaw(IconCompany)
        }
      },
      {
        path: '/company',
        meta: {
          title: 'Notices of Satisfactions',
          icon: markRaw(IconCompany)
        }
      },
      {
        path: '/company',
        meta: {
          title: 'SCRAs',
          icon: markRaw(IconCompany)
        }
      }
    ] },
  {
    path: '/administration',
    component: Layout,
    redirect: '/administration/company',
    name: 'Administration',
    meta: {
      title: 'Management'
      // icon: markRaw(IconAdministration)
    },
    children: [
      {
        path: '/company',
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
        path: '/unit',
        redirect: '/unit/list',
        name: 'Units',
        meta: {
          title: 'Unit',
          icon: markRaw(IconUnit)
        },
        children: [
          {
            path: 'create',
            component: () => import('@/views/unit/create.vue'),
            name: 'CreateUnit',
            meta: { title: 'Create unit', icon: 'edit' }
          },
          {
            path: 'edit/:id(\\d+)',
            component: () => import('@/views/unit/edit.vue'),
            name: 'EditUnit',
            meta: { hidden: true, title: 'Edit Unit', noCache: true, activeMenu: '/unit/list' }
          },
          {
            path: 'list',
            component: () => import('@/views/unit/list.vue'),
            name: 'UnitList',
            meta: { title: 'Units list', icon: 'list' }
          }
        ]
      },
      {
        path: '/attorney-fee',
        redirect: '/attorney-fee/list',
        name: 'AttorneyFees',
        meta: {
          title: 'Attorney fees',
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
      {
        path: '/user',
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
        path: '/documents-text',
        redirect: '/documents/list',
        name: 'Documents-text',
        meta: {
          title: 'Documents text',
          icon: markRaw(IconDocument)
        },
        children: [
          {
            path: 'edit/:id(\\d+)',
            component: () => import('@/views/documents-text/edit.vue'),
            name: 'EditDocument',
            meta: { hidden: true, title: 'Edit document', noCache: true, activeMenu: '/documents-text/list' }
          },
          {
            path: 'list',
            component: () => import('@/views/documents-text/list.vue'),
            name: 'Documentslist',
            meta: { title: 'Documents list', icon: 'list' }
          }
        ]
      },
      {
        path: '/jurisdiction',
        redirect: '/jurisdiction/agency/list',
        name: 'Jurisdiction',
        meta: {
          title: 'Jurisdiction',
          icon: markRaw(IconJurisdiction)
        },
        children: [
          {
            path: '/jurisdiction/agency',
            name: 'AgenciesList',
            redirect: '/jurisdiction/agency/list',
            meta: {
              title: 'Agencies',
              icon: markRaw(IconAgency)
            },
            children: [
              {
                path: '/jurisdiction/agency/create',
                component: () => import('@/views/jurisdiction/agency/create.vue'),
                name: 'CreateAgency',
                meta: { title: 'Create agency', icon: 'edit' }
              },
              {
                path: '/jurisdiction/agency/edit/:id(\\d+)',
                component: () => import('@/views/jurisdiction/agency/edit.vue'),
                name: 'EditAgency',
                meta: { hidden: true, title: 'Edit agency', noCache: true, activeMenu: '/jurisdiction/agency/edit' }
              },
              {
                path: 'list',
                component: () => import('@/views/jurisdiction/agency/list.vue'),
                name: 'Agencieslist',
                meta: { title: 'Agencies list', icon: 'list' }
              }
            ]
          },
          {
            path: '/jurisdiction/court',
            name: 'CourtsList',
            redirect: '/jurisdiction/court/list',
            meta: {
              title: 'Courts',
              icon: markRaw(IconCourt)
            },
            children: [
              {
                path: '/jurisdiction/court/create',
                component: () => import('@/views/jurisdiction/court/create.vue'),
                name: 'CreateCourt',
                meta: { title: 'Create court', icon: 'edit' }
              },
              {
                path: '/jurisdiction/court/edit/:id(\\d+)',
                component: () => import('@/views/jurisdiction/court/edit.vue'),
                name: 'EditCourt',
                meta: { hidden: true, title: 'Edit court', noCache: true, activeMenu: '/jurisdiction/court/edit' }
              },
              {
                path: 'list',
                component: () => import('@/views/jurisdiction/court/list.vue'),
                name: 'Courtslist',
                meta: { title: 'Courts list', icon: 'list' }
              }
            ]
          },
          {
            path: '/jurisdiction/serviceable-area',
            name: 'ServiceableAreasList',
            redirect: '/jurisdiction/serviceable-area/list',
            meta: {
              title: 'Serviceable area',
              icon: markRaw(IconServiceableArea)
            },
            children: [
              {
                path: '/jurisdiction/serviceable-area/create',
                component: () => import('@/views/jurisdiction/serviceable-area/create.vue'),
                name: 'CreateServiceableArea',
                meta: { title: 'Create Area', icon: 'edit' }
              },
              {
                path: '/jurisdiction/serviceable-area/edit/:id(\\d+)',
                component: () => import('@/views/jurisdiction/serviceable-area/edit.vue'),
                name: 'EditServiceableArea',
                meta: { hidden: true, title: 'Edit Area', noCache: true, activeMenu: '/jurisdiction/serviceable-area/edit' }
              },
              {
                path: 'list',
                component: () => import('@/views/jurisdiction/serviceable-area/list.vue'),
                name: 'ServiceableAreaslist',
                meta: { title: 'Areas list', icon: 'list' }
              }
            ]
          },
          {
            path: '/jurisdiction/agency-relation',
            name: 'AgencyRelationsList',
            redirect: '/jurisdiction/agency-relation/list',
            meta: {
              title: 'Agency relations',
              icon: markRaw(IconAgencyRelation)
            },
            children: [
              {
                path: '/jurisdiction/agency-relation/create',
                component: () => import('@/views/jurisdiction/agency-relation/create.vue'),
                name: 'CreateAgencyRelation',
                meta: { title: 'Create Agency Relation', icon: 'edit' }
              },
              {
                path: '/jurisdiction/agency-relation/edit/:id(\\d+)',
                component: () => import('@/views/jurisdiction/agency-relation/edit.vue'),
                name: 'EditAgencyRelation',
                meta: { hidden: true, title: 'Edit Agency Relation', noCache: true, activeMenu: '/jurisdiction/agency-relation/edit' }
              },
              {
                path: '/jurisdiction/agency-relation/list',
                component: () => import('@/views/jurisdiction/agency-relation/list.vue'),
                name: 'AgencyRelationslist',
                meta: { title: 'Agency Relations list', icon: 'list' }
              }
            ]
          },
          {
            path: '/jurisdiction/courtroom',
            name: 'CourtroomsList',
            redirect: '/jurisdiction/courtroom/list',
            meta: {
              title: 'Courtrooms',
              icon: markRaw(IconCourt)
            },
            children: [
              {
                path: '/jurisdiction/courtroom/create',
                component: () => import('@/views/jurisdiction/courtroom/create.vue'),
                name: 'CreateCourtroom',
                meta: { title: 'Create courtroom', icon: 'edit' }
              },
              {
                path: '/jurisdiction/courtroom/edit/:id(\\d+)',
                component: () => import('@/views/jurisdiction/courtroom/edit.vue'),
                name: 'EditCourtroom',
                meta: { hidden: true, title: 'Edit courtroom', noCache: true, activeMenu: '/jurisdiction/courtroom/edit' }
              },
              {
                path: 'list',
                component: () => import('@/views/jurisdiction/courtroom/list.vue'),
                name: 'Courtroomslist',
                meta: { title: 'Courtrooms list', icon: 'list' }
              }
            ]
          }
        ]
      },
      {
        path: '/policy',
        redirect: '/policy/list',
        name: 'Policies',
        meta: {
          title: 'Policies',
          icon: markRaw(IconPolicy)
        },
        children: [
          {
            path: 'create',
            component: () => import('@/views/policy/create.vue'),
            name: 'CreatePolicy',
            meta: { title: 'Create policy', icon: 'edit' }
          },
          {
            path: 'edit/:id(\\d+)',
            component: () => import('@/views/policy/edit.vue'),
            name: 'EditPolicy',
            meta: { hidden: true, title: 'Edit policy', noCache: true, activeMenu: '/policy/list' }
          },
          {
            path: 'list',
            component: () => import('@/views/policy/list.vue'),
            name: 'Policieslist',
            meta: { title: 'Policies list', icon: 'list' }
          }
        ]
      },
      {
        path: '/billing',
        name: 'Billing',
        redirect: '/billing/list',
        meta: {
          title: 'Billing',
          icon: markRaw(IconBilling)
        },
        children: [
          {
            path: 'create',
            component: () => import('@/views/billing/create.vue'),
            name: 'CreateBilling',
            meta: { title: 'Create billing', icon: 'edit' }
          },
          {
            path: 'edit/:id(\\d+)',
            component: () => import('@/views/billing/edit.vue'),
            name: 'EditBilling',
            meta: { hidden: true, title: 'Edit billing', noCache: true, activeMenu: '/billing/edit' }
          },
          {
            path: 'list',
            component: () => import('@/views/billing/list.vue'),
            name: 'Billinglist',
            meta: { title: 'Billing list', icon: 'list' }
          }
        ]
      }
    ] },
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
