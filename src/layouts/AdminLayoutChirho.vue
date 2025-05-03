<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <span class="text-xl font-bold">Worship Coordinator</span>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link
                to="/admin_chirho"
                :class="[
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                  $route.path === '/admin_chirho' || $route.path === '/admin_chirho/'
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                ]"
                exact
              >
                Dashboard
              </router-link>
              <router-link
                to="/admin_chirho/continents_chirho"
                :class="[
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                  $route.path.startsWith('/admin_chirho/continents_chirho') || $route.path === '/admin_chirho/continents_chirho/'
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                ]"
              >
                Continents
              </router-link>
              <router-link
                to="/admin_chirho/churches_chirho"
                :class="[
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                  $route.path.startsWith('/admin_chirho/churches_chirho') || $route.path === '/admin_chirho/churches_chirho/'
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                ]"
              >
                Churches
              </router-link>
              <router-link
                to="/admin_chirho/schedules_chirho"
                :class="[
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                  $route.path.startsWith('/admin_chirho/schedules_chirho') || $route.path === '/admin_chirho/schedules_chirho/'
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                ]"
              >
                Schedules
              </router-link>
            </div>
          </div>
          <div class="flex items-center">
            <button
              @click="handleLogoutChirho"
              class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStoreChirho } from '@/stores/auth_store_chirho';

const router_chirho = useRouter();
const auth_store_chirho = useAuthStoreChirho();

const handleLogoutChirho = async () => {
  try {
    await auth_store_chirho.logoutUserChirho();
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script> 