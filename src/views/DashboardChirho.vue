<!-- For God so loved the world, that He gave His only begotten Son, that all who believe in Him should not perish but have everlasting life. -->

<template>
  <div class="dashboard-chirho">
    <h1 class="title-chirho">Dashboard</h1>
    
    <div class="stats-grid-chirho">
      <div class="stat-card-chirho">
        <h3>Total Churches</h3>
        <p class="stat-value-chirho">{{ loadingChirho ? '...' : totalChurchesChirho }}</p>
      </div>
      
      <div class="stat-card-chirho">
        <h3>Today's Worship Sessions</h3>
        <p class="stat-value-chirho">{{ loadingChirho ? '...' : todaySessionsChirho }}</p>
      </div>
      
      <div class="stat-card-chirho">
        <h3>Active Continents</h3>
        <p class="stat-value-chirho">{{ loadingChirho ? '...' : totalContinentsChirho }}</p>
      </div>
    </div>

    <div v-if="errorChirho" class="error-message-chirho">
      {{ errorChirho }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getChurchesChirho, getContinentsChirho, getScheduleChirho } from '@/services/api_chirho';
import type { ScheduleQueryChirho } from '@/types/models_chirho';

const totalChurchesChirho = ref(0);
const todaySessionsChirho = ref(0);
const totalContinentsChirho = ref(0);
const loadingChirho = ref(true);
const errorChirho = ref('');

onMounted(async () => {
  try {
    const today = new Date();
    const queryChirho: ScheduleQueryChirho = {
      year_chirho: today.getFullYear(),
      month_chirho: today.getMonth() + 1
    };

    const [churches, continents, schedule] = await Promise.all([
      getChurchesChirho(),
      getContinentsChirho(),
      getScheduleChirho(queryChirho)
    ]);

    totalChurchesChirho.value = churches.length;
    totalContinentsChirho.value = continents.length;
    todaySessionsChirho.value = schedule.filter(s => 
      new Date(s.worship_date_chirho).toDateString() === today.toDateString()
    ).length;
  } catch (error) {
    errorChirho.value = 'Failed to load dashboard data';
    console.error('Dashboard error:', error);
  } finally {
    loadingChirho.value = false;
  }
});
</script>

<style scoped>
.dashboard-chirho {
  max-width: 1200px;
  margin: 0 auto;
}

.title-chirho {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #1e293b;
}

.stats-grid-chirho {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card-chirho {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-card-chirho h3 {
  font-size: 1.125rem;
  color: #4b5563;
  margin-bottom: 0.5rem;
}

.stat-value-chirho {
  font-size: 2rem;
  font-weight: bold;
  color: #1e293b;
}

.error-message-chirho {
  color: #dc2626;
  padding: 1rem;
  background-color: #fee2e2;
  border-radius: 4px;
  margin-top: 1rem;
}
</style> 