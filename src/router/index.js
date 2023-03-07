import { createRouter, createWebHistory } from 'vue-router'

import Qt from '../views/Qt'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component:Qt,
      children:[{
        path:'',
        component: ()=> import ('../views/Qt/Index/Index.vue')
      }]
    }
  ]
})

export default router
