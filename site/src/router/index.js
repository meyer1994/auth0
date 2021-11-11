import Vue from 'vue'
import VueRouter from 'vue-router'

import AuthGuard from './guard.auth'
import CallbackGuard from './guard.callback'

Vue.use(VueRouter)

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

const router = new VueRouter({
  routes
})

export default router
