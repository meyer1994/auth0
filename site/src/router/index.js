import { createRouter, createWebHashHistory } from 'vue-router'

import AuthGuard from './guard.auth'
import CallbackGuard from './guard.callback'

const routes = [
  {
    path: '/callback',
    name: 'Callback',
    beforeEnter: CallbackGuard
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/secure',
    name: 'Secure',
    beforeEnter: AuthGuard,
    component: () => import('@/views/Secure')
  },
  {
    path: '/insecure',
    name: 'Insecure',
    component: () => import('@/views/Insecure')
  }
]

export default createRouter({
  routes,
  history: createWebHashHistory()
})
