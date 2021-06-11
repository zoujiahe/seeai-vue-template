import {
  createRouter,
  createWebHashHistory, NavigationFailure,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router'
import { DemoConstructRoute } from '../views/demo-construct'
import { SystemManageRoute } from '../views/system-manage'
import { CourseManageRoute } from '../views/course-manage'
import { ArchivesManageRoute } from '../views/archives-manage'
import { ResourceManageRoute } from '../views/resource-manage'
import { guard } from './guard'
import { Bus } from '@/common/services'
const { mainBase, mainLayoutIndex } = require('../../../package.json')
const appMainBase = '/' + mainBase
const appMainName = mainBase

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    redirect: `${appMainBase}${mainLayoutIndex}`,
    meta: {
      name: '入口'
    }
  },
  {
    path: appMainBase,
    name: appMainName,
    component: () => import(/* webpackChunkName: "app-index" */ '@layout/AppMain.vue'),
    meta: {
      name: '主页'
    },
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@layout/Home.vue'),
        name: 'home',
        meta: {
          name: '首页'
        }
      },
      DemoConstructRoute('demo-construct/:id'),
      SystemManageRoute('system'),
      CourseManageRoute('course-manage'),
      ArchivesManageRoute('archives-manage'),
      ResourceManageRoute('rm'),
      {
        path: ':catchAll(.*)*',
        component: () => import(/* webpackChunkName: "main-not-found" */ '@layout/MainNotFound.vue'),
        name: 'main-not-found',
        meta: {
          name: 'main-not-found'
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@layout/Login.vue'),
    name: 'login',
    meta: {
      name: '登录页'
    }
  },
  {
    path: '/:catchAll(.*)*',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "not-found" */ '@layout/NotFound.vue'),
    meta: {
      name: 'not-found'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => guard(to, from, next))
router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized, failure?: NavigationFailure | void) => {
  if (to.path.indexOf(appMainBase) > -1 && to.path !== from.path) {
    Bus.$emit('routerChange')
  }
})
export default router
