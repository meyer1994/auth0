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
    component: () => import('@/views/HomeView')
  },
  {
    path: '/profile',
    name: 'Profile',
    beforeEnter: AuthGuard,
    component: () => import('@/views/ProfileView')
  }
]

export default createRouter({
  routes,
  history: createWebHashHistory()
})
