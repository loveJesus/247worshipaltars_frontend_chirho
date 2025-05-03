<!-- For God so loved the world, that He gave His only begotten Son, that all who believe in Him should not perish but have everlasting life. -->
<template>
  <div class="schedules-view-chirho">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Worship Schedules</h1>
      </div>

      <!-- Continent Tabs -->
      <div class="bg-white shadow rounded-lg p-6 mb-8">
        <div class="flex space-x-4 overflow-x-auto pb-2">
          <button
            v-for="continent in continentsChirho"
            :key="continent.continent_id_chirho"
            @click="selectedContinentIdChirho = continent.continent_id_chirho"
            :class="[
              'px-4 py-2 rounded-md text-sm font-medium',
              selectedContinentIdChirho === continent.continent_id_chirho
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ continent.name_chirho }}
          </button>
        </div>
      </div>

      <!-- Calendar and Unassigned Churches -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Calendar View -->
        <div class="lg:col-span-3">
          <div class="bg-white shadow rounded-lg p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold">{{ currentMonthYearChirho }}</h2>
              <div class="flex space-x-4">
                <button
                  @click="previousMonthChirho"
                  class="p-2 rounded-md hover:bg-gray-100"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  @click="nextMonthChirho"
                  class="p-2 rounded-md hover:bg-gray-100"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="grid grid-cols-7 gap-2">
              <div
                v-for="day in daysOfWeekChirho"
                :key="day"
                class="text-center text-sm font-medium text-gray-500 py-2"
              >
                {{ day }}
              </div>
            </div>

            <div class="grid grid-cols-7 gap-2">
              <div
                v-for="day in calendarDaysChirho"
                :key="day.date"
                class="min-h-32 p-2 border rounded-md"
                :class="{
                  'bg-gray-50': !isCurrentMonthChirho(day.date),
                  'border-indigo-200': hasScheduleChirho(day.date)
                }"
                @dragover.prevent
                @drop="handleDropChirho($event, day.date)"
              >
                <div class="text-sm font-medium mb-2">
                  {{ formatDayChirho(day.date) }}
                </div>
                <div
                  v-for="schedule in getSchedulesForDayChirho(day.date)"
                  :key="schedule.schedule_id_chirho"
                  class="bg-indigo-100 text-indigo-800 rounded-md p-2 mb-2 text-sm cursor-move"
                  draggable="true"
                  @dragstart="handleDragStartChirho($event, schedule)"
                >
                  {{ getChurchNameChirho(schedule.church_id_chirho) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Unassigned Churches -->
        <div class="lg:col-span-1">
          <div class="bg-white shadow rounded-lg p-6"
            @dragover.prevent
            @drop="handleUnassignDropChirho">
            <h2 class="text-xl font-semibold mb-4">Unassigned Churches</h2>
            <div
              v-if="unassignedChurchesChirho.length === 0"
              class="text-gray-500 text-sm"
            >
              No unassigned churches
            </div>
            <div
              v-else
              class="space-y-2"
            >
              <div
                v-for="church in unassignedChurchesChirho"
                :key="church.church_id_chirho"
                class="bg-gray-100 text-gray-800 rounded-md p-2 text-sm cursor-move"
                draggable="true"
                @dragstart="handleDragStartChirho($event, { church_id_chirho: church.church_id_chirho })"
              >
                {{ church.name_chirho }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { ChurchChirho, ContinentChirho, ScheduleChirho } from '@/types/models_chirho';
import { 
  getChurchesChirho, 
  getContinentsChirho, 
  getSchedulesChirho, 
  createScheduleChirho, 
  updateScheduleChirho, 
  deleteScheduleChirho 
} from '@/services/api_chirho';
import { useAuthStoreChirho } from '@/stores/auth_store_chirho';

const authStoreChirho = useAuthStoreChirho();

const loadingChirho = ref(true);
const schedulesChirho = ref<ScheduleChirho[]>([]);
const churchesChirho = ref<ChurchChirho[]>([]);
const continentsChirho = ref<ContinentChirho[]>([]);
const selectedContinentIdChirho = ref('');
const currentDateChirho = ref(new Date());

const daysOfWeekChirho = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const currentMonthYearChirho = computed(() => {
  return currentDateChirho.value.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });
});

const calendarDaysChirho = computed(() => {
  const yearChirho = currentDateChirho.value.getFullYear();
  const monthChirho = currentDateChirho.value.getMonth();
  
  // Get first day of the month
  const firstDayChirho = new Date(yearChirho, monthChirho, 1);
  const startingDayChirho = firstDayChirho.getDay();
  
  // Get last day of the month
  const lastDayChirho = new Date(yearChirho, monthChirho + 1, 0);
  const daysInMonthChirho = lastDayChirho.getDate();
  
  // Get days from previous month
  const prevMonthChirho = new Date(yearChirho, monthChirho, 0);
  const daysInPrevMonthChirho = prevMonthChirho.getDate();
  
  const daysChirho = [];
  
  // Add days from previous month
  for (let iChirho = startingDayChirho - 1; iChirho >= 0; iChirho--) {
    daysChirho.push({
      date: new Date(yearChirho, monthChirho - 1, daysInPrevMonthChirho - iChirho),
      isCurrentMonth: false
    });
  }
  
  // Add days from current month
  for (let iChirho = 1; iChirho <= daysInMonthChirho; iChirho++) {
    daysChirho.push({
      date: new Date(yearChirho, monthChirho, iChirho),
      isCurrentMonth: true
    });
  }
  
  // Add days from next month to complete the grid
  const remainingDaysChirho = 42 - daysChirho.length; // 6 rows * 7 days
  for (let iChirho = 1; iChirho <= remainingDaysChirho; iChirho++) {
    daysChirho.push({
      date: new Date(yearChirho, monthChirho + 1, iChirho),
      isCurrentMonth: false
    });
  }
  
  return daysChirho;
});

const unassignedChurchesChirho = computed(() => {
  if (!selectedContinentIdChirho.value) return [];
  
  const assignedChurchIdsChirho = new Set(
    schedulesChirho.value
      .filter(scheduleChirho => {
        const scheduleDateChirho = new Date(scheduleChirho.worship_date_chirho);
        const todayChirho = new Date();
        const thirtyOneDaysFromNowChirho = new Date();
        thirtyOneDaysFromNowChirho.setDate(todayChirho.getDate() + 31);
        return scheduleDateChirho >= todayChirho && scheduleDateChirho <= thirtyOneDaysFromNowChirho;
      })
      .map(scheduleChirho => scheduleChirho.church_id_chirho)
  );
  
  return churchesChirho.value.filter(
    churchChirho => 
      churchChirho.continent_id_chirho === selectedContinentIdChirho.value &&
      !assignedChurchIdsChirho.has(churchChirho.church_id_chirho)
  );
});

const formatDateToYYYYMMDDChirho = (dateChirho: Date): string => {
  const yearChirho = dateChirho.getFullYear();
  const monthChirho = String(dateChirho.getMonth() + 1).padStart(2, '0');
  const dayChirho = String(dateChirho.getDate()).padStart(2, '0');
  return `${yearChirho}-${monthChirho}-${dayChirho}`;
};

const formatDayChirho = (dateChirho: Date) => {
  return dateChirho.getDate();
};

const isCurrentMonthChirho = (dateChirho: Date) => {
  return dateChirho.getMonth() === currentDateChirho.value.getMonth();
};

const hasScheduleChirho = (dateChirho: Date) => {
  const targetDateStrChirho = formatDateToYYYYMMDDChirho(dateChirho);
  return schedulesChirho.value.some(
    scheduleChirho => scheduleChirho.worship_date_chirho.split('T')[0] === targetDateStrChirho
  );
};

const getSchedulesForDayChirho = (dateChirho: Date) => {
  const targetDateStrChirho = formatDateToYYYYMMDDChirho(dateChirho);
  
  let filteredChirho = schedulesChirho.value.filter(scheduleChirho => {
    const scheduleDateStrChirho = scheduleChirho.worship_date_chirho.split('T')[0];
    return scheduleDateStrChirho === targetDateStrChirho;
  });

  return filteredChirho;
};

const getChurchNameChirho = (churchIdChirho: string) => {
  const churchChirho = churchesChirho.value.find(cChirho => cChirho.church_id_chirho === churchIdChirho);
  return churchChirho?.name_chirho || 'Unknown';
};

const previousMonthChirho = () => {
  currentDateChirho.value = new Date(
    currentDateChirho.value.getFullYear(),
    currentDateChirho.value.getMonth() - 1,
    1
  );
};

const nextMonthChirho = () => {
  currentDateChirho.value = new Date(
    currentDateChirho.value.getFullYear(),
    currentDateChirho.value.getMonth() + 1,
    1
  );
};

const handleDragStartChirho = (eventChirho: DragEvent, scheduleChirho: ScheduleChirho | { church_id_chirho: string }) => {
  if (eventChirho.dataTransfer) {
    eventChirho.dataTransfer.setData('text/plain', JSON.stringify(scheduleChirho));
  }
};

const handleDropChirho = async (eventChirho: DragEvent, dateChirho: Date) => {
  eventChirho.preventDefault();
  if (!eventChirho.dataTransfer) return;

  const dataChirho = eventChirho.dataTransfer.getData('text/plain');
  const scheduleChirho = JSON.parse(dataChirho);

  try {
    if ('schedule_id_chirho' in scheduleChirho) {
      // Update existing schedule
      await updateScheduleChirho(scheduleChirho.schedule_id_chirho, {
        church_id_chirho: scheduleChirho.church_id_chirho,
        worship_date_chirho: dateChirho.toISOString().split('T')[0],
        assigned_by_admin_id_chirho: "00000000-0000-0000-0000-000000000201"
      });
    } else {
      // Create new schedule
      await createScheduleChirho({
        church_id_chirho: scheduleChirho.church_id_chirho,
        worship_date_chirho: dateChirho.toISOString().split('T')[0],
        assigned_by_admin_id_chirho: "00000000-0000-0000-0000-000000000201"
      });
    }
    await loadSchedulesChirho();
  } catch (errorChirho) {
    console.error('Failed to update schedule:', errorChirho);
  }
};

const handleUnassignDropChirho = async (eventChirho: DragEvent) => {
  eventChirho.preventDefault();
  if (!eventChirho.dataTransfer) return;

  const dataChirho = eventChirho.dataTransfer.getData('text/plain');
  const scheduleChirho = JSON.parse(dataChirho);

  try {
    if ('schedule_id_chirho' in scheduleChirho) {
      // Unassign the schedule
      await deleteScheduleChirho(scheduleChirho.schedule_id_chirho);
      await loadSchedulesChirho();
    }
  } catch (errorChirho) {
    console.error('Failed to unassign schedule:', errorChirho);
  }
};

const loadSchedulesChirho = async () => {
  loadingChirho.value = true;
  try {
    const [churchesDestructuredChirho, continentsDestructuredChirho, schedulesDestructuredChirho] = await Promise.all([
      getChurchesChirho(),
      getContinentsChirho(),
      getSchedulesChirho()
    ]);
    churchesChirho.value = churchesDestructuredChirho;
    continentsChirho.value = continentsDestructuredChirho;
    schedulesChirho.value = schedulesDestructuredChirho;
    
    if (continentsDestructuredChirho.length > 0 && !selectedContinentIdChirho.value) {
      selectedContinentIdChirho.value = continentsDestructuredChirho[0].continent_id_chirho;
    }
  } catch (errorChirho) {
    console.error('Failed to load data:', errorChirho);
  } finally {
    loadingChirho.value = false;
  }
};

onMounted(() => {
  loadSchedulesChirho();
});
</script>

<style scoped>
.schedules-view-chirho {
  @apply min-h-screen bg-gray-50;
}
</style> 