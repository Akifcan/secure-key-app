import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Dashboard'),
    name: 'dashboard',
    children: [
      {
        path: '/',
        component: () => import('@/components/dashboard/AppDashboard'),
        name: 'home'
      },
      {
        path: '/api-create',
        component: () => import('@/components/api/AppApiCreate'),
        name: 'apiCreate'
      },
      {
        path: '/api-list',
        component: () => import('@/components/api/AppApiList'),
        name: 'apiList'
      },
      {
        path: '/account-settings',
        component: () => import('@/components/account/AppAccountSettings'),
        name: 'accountSettings'
      },
      {
        path: '/account-logs',
        component: () => import('@/components/account/AppAccountLogs'),
        name: 'accountLogs'
      },
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login'),
    name: 'login'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
