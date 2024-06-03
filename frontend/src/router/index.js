import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/friends',
    name: 'friends',
    component: () => import('@/views/Friends.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/teams',
    name: 'teams',
    component: () => import('@/views/Team.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/leagues',
    name: 'leagues',
    component: () => import('@/views/Leagues.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/series',
    name: 'series',
    component: () => import('@/views/Series.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/segments',
    name: 'segments',
    component: () => import('@/views/Segments.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/forum',
    name: 'forum',
    component: () => import('@/views/Forum.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/results',
    name: 'results',
    component: () => import('@/views/Result.vue'),
    meta: {
      layout: 'content',
    },
  },
  // {
  //   path: '/results',
  //   name: 'results',
  //   component: () => import('@/views/Result.vue'),
  //   meta: {
  //     layout: 'content',
  //   },
  // },
  {
    path: '*',
    redirect: 'error-404',
  },
  
  // {
  //   path: '/second-page',
  //   name: 'second-page',
  //   component: () => import('@/views/SecondPage.vue'),
  //   meta: {
  //     layout: 'content',
  //   },
  // },
  // {
  //   path: '/login',
  //   name: 'auth-login',
  //   component: () => import('@/views/Login.vue'),
  //   meta: {
  //     layout: 'blank',
  //   },
  // },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

export default router
