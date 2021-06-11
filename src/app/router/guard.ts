import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import store from '../store'
import { gotoReview } from '@/common/utils'
const { mainBase, mainLayoutIndex } = require('../../../package.json')
export const guard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (to.path === '/login') {
    if (store.getters.userInfo.token) {
      gotoReview(mainBase + mainLayoutIndex)
      next()
    } else {
      next()
    }
  } else {
    if (store.getters.userInfo.token) {
      next()
    } else {
      gotoReview('login')
      next()
    }
  }
}
