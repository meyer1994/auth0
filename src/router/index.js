import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '@/views/HomeView'
import ProfileView from '@/views/ProfileView'
import CallbackView from '@/views/CallbackView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/callback',
    name: 'Callback',
    component: CallbackView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView
  }
]

const router = new VueRouter({
  routes
})

export default router
