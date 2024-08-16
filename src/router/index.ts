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
        path: '/company/list',
        component: () => import('@/views/company/list.vue'),
        name: 'Company',
        meta: {
          title: 'Companies',
          icon: markRaw(IconCompany)
        }
      },
      {
        path: '/company/create',
        component: () => import('@/views/company/create.vue'),
        name: 'CompanyCreate',
        meta: {
          hidden: true,
          title: 'Company create'
        }
      },
      {
        path: '/company/edit/:id',
        component: () => import('@/views/company/edit.vue'),
        name: 'CompanyEdit',
        meta: {
          hidden: true,
          title: 'Company edit'
        },
        props: true
      },
      {
        path: '/property/list',
        name: 'Property',
        component: () => import('@/views/property/list.vue'),
        meta: {
          title: 'Properties',
          icon: markRaw(IconHouse)
        }
      },
      {
        path: '/property/create',
        component: () => import('@/views/property/create.vue'),
        name: 'PropertyCreate',
        meta: {
          hidden: true,
          title: 'Property create'
        }
      },
      {
        path: '/property/edit/:id',
        component: () => import('@/views/property/edit.vue'),
        name: 'PropertyEdit',
        meta: {
          hidden: true,
          title: 'Property edit'
        },
        props: true
      },
      {
        path: '/unit/list',
        component: () => import('@/views/unit/list.vue'),
        name: 'Units',
        meta: {
          title: 'Unit',
          icon: markRaw(IconUnit)
        }
      },
      {
        path: '/unit/create',
        component: () => import('@/views/unit/create.vue'),
        name: 'UnitCreate',
        meta: {
          hidden: true,
          title: 'Unit create'
        }
      },
      {
        path: '/unit/edit/:id',
        component: () => import('@/views/unit/edit.vue'),
        name: 'UnitEdit',
        meta: {
          hidden: true,
          title: 'Unit edit'
        },
        props: true
      },
      {
        path: '/attorney-fee/list',
        component: () => import('@/views/attorney-fee/list.vue'),
        name: 'AttorneyFees',
        meta: {
          title: 'Attorney fees',
          icon: markRaw(IconFees)
        }
      },
      {
        path: '/attorney-fee/create',
        component: () => import('@/views/attorney-fee/create.vue'),
        name: 'Attorney-feeCreate',
        meta: {
          hidden: true,
          title: 'Attorney-fee create'
        }
      },
      {
        path: '/attorney-fee/edit/:id',
        component: () => import('@/views/attorney-fee/edit.vue'),
        name: 'Attorney-feeEdit',
        meta: {
          hidden: true,
          title: 'Attorney-fee edit'
        },
        props: true
      },
      {
        path: '/user/list',
        component: () => import('@/views/user/list.vue'),
        name: 'Users',
        meta: {
          title: 'Users',
          icon: markRaw(IconUser)
        }
      },
      {
        path: '/user/create',
        component: () => import('@/views/user/create.vue'),
        name: 'UserCreate',
        meta: {
          hidden: true,
          title: 'User create'
        }
      },
      {
        path: '/user/edit/:id',
        component: () => import('@/views/user/edit.vue'),
        name: 'UserEdit',
        meta: {
          hidden: true,
          title: 'User edit'
        },
        props: true
      },
      {
        path: '/documents-text/list',
        component: () => import('@/views/documents-text/list.vue'),
        name: 'Documents-text',
        meta: {
          title: 'Documents text',
          icon: markRaw(IconDocument)
        }
      },
      {
        path: '/documents-text/create',
        component: () => import('@/views/documents-text/create.vue'),
        name: 'Documents-textCreate',
        meta: {
          hidden: true,
          title: 'Documents-text create'
        }
      },
      {
        path: '/documents-text/edit/:id',
        component: () => import('@/views/documents-text/edit.vue'),
        name: 'Documents-textEdit',
        meta: {
          hidden: true,
          title: 'Documents-text edit'
        },
        props: true
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
            path: '/jurisdiction/agency/list',
            component: () => import('@/views/jurisdiction/agency/list.vue'),
            name: 'AgenciesList',
            meta: {
              title: 'Agencies',
              icon: markRaw(IconAgency)
            }
          },
          {
            path: '/jurisdiction/agency/create',
            component: () => import('@/views/jurisdiction/agency/create.vue'),
            name: 'AgencyCreate',
            meta: {
              hidden: true,
              title: 'Agency create'
            }
          },
          {
            path: '/jurisdiction/agency/edit/:id',
            component: () => import('@/views/jurisdiction/agency/edit.vue'),
            name: 'AgencyEdit',
            meta: {
              hidden: true,
              title: 'Agency edit'
            },
            props: true
          },
          {
            path: '/jurisdiction/court/list',
            name: 'CourtsList',
            component: () => import('@/views/jurisdiction/court/list.vue'),
            meta: {
              title: 'Courts',
              icon: markRaw(IconCourt)
            }
          },
          {
            path: '/jurisdiction/court/create',
            component: () => import('@/views/jurisdiction/court/create.vue'),
            name: 'CourtCreate',
            meta: {
              hidden: true,
              title: 'Court create'
            }
          },
          {
            path: '/jurisdiction/court/edit/:id',
            component: () => import('@/views/jurisdiction/court/edit.vue'),
            name: 'CourtEdit',
            meta: {
              hidden: true,
              title: 'Court edit'
            },
            props: true
          },
          {
            path: '/jurisdiction/serviceable-area/list',
            component: () => import('@/views/jurisdiction/serviceable-area/list.vue'),
            name: 'ServiceableAreasList',
            meta: {
              title: 'Serviceable area',
              icon: markRaw(IconServiceableArea)
            }
          },
          {
            path: '/jurisdiction/serviceable-area/create',
            component: () => import('@/views/jurisdiction/serviceable-area/create.vue'),
            name: 'Serviceable-areaCreate',
            meta: {
              hidden: true,
              title: 'Serviceable-area create'
            }
          },
          {
            path: '/jurisdiction/serviceable-area/edit/:id',
            component: () => import('@/views/jurisdiction/serviceable-area/edit.vue'),
            name: 'Serviceable-areaEdit',
            meta: {
              hidden: true,
              title: 'Serviceable-area create'
            },
            props: true
          },
          {
            path: '/jurisdiction/agency-relation/list',
            name: 'AgencyRelationsList',
            component: () => import('@/views/jurisdiction/agency-relation/list.vue'),
            meta: {
              title: 'Agency relations',
              icon: markRaw(IconAgencyRelation)
            }
          },
          {
            path: '/jurisdiction/agency-relation/create',
            component: () => import('@/views/jurisdiction/agency-relation/create.vue'),
            name: 'Agency-relationCreate',
            meta: {
              hidden: true,
              title: 'Agency-relation create'
            }
          },
          {
            path: '/jurisdiction/agency-relation/edit/:id',
            component: () => import('@/views/jurisdiction/agency-relation/edit.vue'),
            name: 'Agency-relationEdit',
            meta: {
              hidden: true,
              title: 'Agency-relation edit'
            },
            props: true
          },
          {
            path: '/jurisdiction/courtroom/list',
            name: 'CourtroomsList',
            component: () => import('@/views/jurisdiction/courtroom/list.vue'),
            meta: {
              title: 'Courtrooms',
              icon: markRaw(IconCourt)
            }
          },
          {
            path: '/jurisdiction/courtroom/create',
            component: () => import('@/views/jurisdiction/courtroom/create.vue'),
            name: 'CourtroomCreate',
            meta: {
              hidden: true,
              title: 'Courtroom create'
            }
          },
          {
            path: '/jurisdiction/courtroom/edit/:id',
            component: () => import('@/views/jurisdiction/courtroom/edit.vue'),
            name: 'CourtroomEdit',
            meta: {
              hidden: true,
              title: 'Courtroom edit'
            },
            props: true
          }
        ]
      },
      {
        path: '/policy',
        name: 'Policies',
        component: () => import('@/views/policy/list.vue'),
        meta: {
          title: 'Policies',
          icon: markRaw(IconPolicy)
        }
      },
      {
        path: '/policy/create',
        component: () => import('@/views/policy/create.vue'),
        name: 'PolicyCreate',
        meta: {
          hidden: true,
          title: 'Policy create'
        }
      },
      {
        path: '/policy/edit/:id',
        component: () => import('@/views/policy/edit.vue'),
        name: 'PolicyEdit',
        meta: {
          hidden: true,
          title: 'Policy edit'
        },
        props: true
      },
      {
        path: '/billing/list',
        name: 'Billing',
        component: () => import('@/views/billing/list.vue'),
        meta: {
          title: 'Billing',
          icon: markRaw(IconBilling)
        }
      },
      {
        path: '/billing/create',
        component: () => import('@/views/billing/create.vue'),
        name: 'BillingCreate',
        meta: {
          hidden: true,
          title: 'Billing create'
        }
      },
      {
        path: '/billing/edit/:id',
        component: () => import('@/views/billing/edit.vue'),
        name: 'BillingEdit',
        meta: {
          hidden: true,
          title: 'Billing edit'
        },
        props: true
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
