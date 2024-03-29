// import { createRouter, createWebHistory } from 'vue-router'

import Qt from '../views/Qt'

const router = {
  routes: [
    {
      path: '/',
      component: Qt,
      children: [{
        path: '',
        component: () => import('../views/Qt/Index/Index.vue')
      }, {
        path: '/note/:id',
        component: () => import('../views/Qt/Note')
      }, {
        path: '/archives',
        component: () => import('../views/Qt/Archives')
      }]
    }, {
      path: '/ht',
      component: () => import('../views/Ht'),
      children: [
        {
          path: 'noteDetail',
          component: () => import('@/views/Ht/NoteDetail')
        },
        {
          path: 'editNote',
          component: () => import('@/views/Ht/EditNote'),
          props: route => ({ id: route.query.id })
        },
        {
          path: 'qdSetting',
          component: () => import('@/views/Ht/QdSetting')
        },
        {
          path : 'fileManagement',
          component: () => import ('@/views/Ht/FileManagement')
        }
      ]
    }
  ]
}

export default router
