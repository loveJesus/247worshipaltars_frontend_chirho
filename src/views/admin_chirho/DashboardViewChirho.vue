<template>
  <div class="dashboard-chirho">
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-2">Continents</h2>
        <p class="text-gray-600">Manage worship continents</p>
        <router-link
          to="/admin_chirho/continents_chirho"
          class="mt-4 inline-block text-indigo-600 hover:text-indigo-800"
        >
          View Continents
        </router-link>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-2">Churches</h2>
        <p class="text-gray-600">Manage worship churches</p>
        <router-link
          to="/admin_chirho/churches_chirho"
          class="mt-4 inline-block text-indigo-600 hover:text-indigo-800"
        >
          View Churches
        </router-link>
    </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-2">Schedule</h2>
        <p class="text-gray-600">Manage worship schedules</p>
        <router-link
          to="/admin_chirho/schedule_chirho"
          class="mt-4 inline-block text-indigo-600 hover:text-indigo-800"
        >
          View Schedule
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic here
</script>

<style scoped>
.dashboard-chirho {
  @apply p-4;
  }
</style> 