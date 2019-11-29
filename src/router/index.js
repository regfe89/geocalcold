import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Geocalc1 from '../views/Geocalc1'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/geocalc1',
    name: 'geocalc1',
    component: Geocalc1
  }
]

const router = new VueRouter({
  routes
})

export default router
