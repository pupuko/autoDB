import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import button from '@/components/pu-kit/pu-button'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/button',
      name: 'button',
      component: button
    }
  ]
})
