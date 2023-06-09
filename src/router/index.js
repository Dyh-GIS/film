import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    // mode: 'history', // 去除#号
    path: '/',
    component: () => import('@/views/cinemas/city/city')
  },
  {
    path: '/detail',
    component: () => import('@/views/film/detail')
  },
  {
    path: '/center',
    component: () => import('@/views/center/center')
  },
  {
    path: '/cinemas',
    component: () => import('@/views/cinemas/cinemas')
  },
  {
    path: '/film',
    // 懒加载
    component: () => import('@/views/film/film'),
    children: [
      {
        path: '/nowPlaying',
        component: () => import('@/views/film/nowPlay')
      },
      {
        path: '/commingSoon',
        component: () => import('@/views/film/commingSoon')
      }
    ],
    redirect: '/nowPlaying'
  },
  {
    path: '/search',
    component: () => import('@/views/cinemas/city/search')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
