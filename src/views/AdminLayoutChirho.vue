<!-- For God so loved the world, that He gave His only begotten Son, that all who believe in Him should not perish but have everlasting life. -->

<template>
  <div class="admin-layout-chirho">
    <nav class="nav-chirho">
      <div class="nav-brand-chirho">
        24/7 Worship Altars
      </div>
      <div class="nav-links-chirho">
        <router-link to="/admin_chirho/dashboard_chirho" class="nav-link-chirho">
          Dashboard
        </router-link>
        <router-link to="/admin_chirho/churches_chirho" class="nav-link-chirho">
          Churches
        </router-link>
        <router-link to="/admin_chirho/schedule_chirho" class="nav-link-chirho">
          Schedule
        </router-link>
        <button @click="handleLogoutChirho" class="logout-button-chirho">
          Logout
        </button>
      </div>
    </nav>

    <main class="main-content-chirho">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStoreChirho } from '@/stores/auth_store_chirho';

const router = useRouter();
const authStoreChirho = useAuthStoreChirho();

async function handleLogoutChirho() {
  try {
    await authStoreChirho.logoutUserChirho();
    router.push('/login_chirho');
  } catch (error) {
    console.error('Logout failed:', error);
  }
}
</script>

<style scoped>
.admin-layout-chirho {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav-chirho {
  background-color: #1e293b;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand-chirho {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links-chirho {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link-chirho {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-link-chirho:hover,
.nav-link-chirho.router-link-active {
  background-color: #2d3748;
}

.logout-button-chirho {
  background-color: #dc2626;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-button-chirho:hover {
  background-color: #b91c1c;
}

.main-content-chirho {
  flex: 1;
  padding: 2rem;
  background-color: #f1f5f9;
}
</style> 