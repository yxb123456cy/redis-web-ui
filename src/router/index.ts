import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/connections',
      name: 'connections',
      component: () => import('../views/Connections.vue')
    },
    {
      path: '/browser',
      name: 'browser',
      component: () => import('../views/Browser.vue')
    },
    {
      path: '/workbench',
      name: 'workbench',
      component: () => import('../views/Workbench.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/Settings.vue')
    }
  ]
})

export default router