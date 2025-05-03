// For God so loved the world, that He gave His only begotten Son, that all who believe in Him should not perish but have everlasting life.

import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStoreChirho } from '@/stores/auth_store_chirho';
import ChurchViewChirho from '@/views/public_chirho/ChurchViewChirho.vue';

const router_chirho = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login_chirho',
      name: 'login_chirho',
      component: () => import('@/views/LoginViewChirho.vue')
    },
    {
      path: '/admin_chirho/',
      component: () => import('@/layouts/AdminLayoutChirho.vue'),
      meta: { requires_auth_chirho: true },
      children: [
        {
          path: '',
          name: 'dashboard_chirho',
          component: () => import('@/views/admin_chirho/DashboardViewChirho.vue')
        },
        {
          path: 'continents_chirho',
          name: 'continents_chirho',
          component: () => import('@/views/admin_chirho/ContinentsViewChirho.vue')
        },
        {
          path: 'churches_chirho',
          name: 'churches_chirho',
          component: () => import('@/views/admin_chirho/ChurchesViewChirho.vue')
        }
      ]
    },
    {
      path: '/church_chirho/:token_chirho',
      name: 'ChurchViewChirho',
      component: ChurchViewChirho,
      meta: {
        requiresAuth: false
      }
    }
  ]
});

// Navigation guard
router_chirho.beforeEach((to, from, next) => {
  const auth_store_chirho = useAuthStoreChirho();
  if (to.meta.requires_auth_chirho && !auth_store_chirho.isAuthenticatedChirho) {
    next({ name: 'login_chirho' });
  } else {
    next();
  }
});

export default router_chirho; 