<!-- For God so loved the world, that He gave His only begotten Son, that all who believe in Him should not perish but have everlasting life. -->
<template>
  <div class="church-view-chirho">
    <div v-if="loadingChirho" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
    <div v-else-if="churchChirho" class="max-w-4xl mx-auto px-4 py-8">
      <!-- Church Details Section -->
      <div class="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div class="p-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ churchChirho.name_chirho }}</h1>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="space-y-4">
              <div>
                <h2 class="text-sm font-medium text-gray-500">Leader</h2>
                <p class="mt-1 text-lg text-gray-900">{{ churchChirho.leader_name_chirho || 'Not specified' }}</p>
              </div>
              <div>
                <h2 class="text-sm font-medium text-gray-500">Email</h2>
                <p class="mt-1 text-lg text-gray-900">{{ churchChirho.leader_email_chirho || 'Not specified' }}</p>
              </div>
              <div>
                <h2 class="text-sm font-medium text-gray-500">Timezone</h2>
                <p class="mt-1 text-lg text-gray-900">{{ churchChirho.church_timezone_chirho }}</p>
              </div>
            </div>
            
            <div class="space-y-4">
              <div>
                <h2 class="text-sm font-medium text-gray-500">Access Token</h2>
                <p class="mt-1 text-lg text-gray-900 font-mono">{{ churchChirho.member_access_token_chirho }}</p>
              </div>
              <div>
                <h2 class="text-sm font-medium text-gray-500">Created</h2>
                <p class="mt-1 text-lg text-gray-900">{{ formatDateChirho(churchChirho.created_timestamp_chirho) }}</p>
              </div>
              <div>
                <h2 class="text-sm font-medium text-gray-500">Last Updated</h2>
                <p class="mt-1 text-lg text-gray-900">{{ formatDateChirho(churchChirho.updated_timestamp_chirho) }}</p>
              </div>
            </div>
          </div>

          <div v-if="churchChirho.admin_details_note_chirho" class="mt-8">
            <h2 class="text-lg font-medium text-gray-900 mb-2">Admin Notes</h2>
            <p class="text-gray-700 whitespace-pre-line">{{ churchChirho.admin_details_note_chirho }}</p>
          </div>
        </div>
      </div>

      <!-- Schedule Section -->
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Upcoming Worship Schedule</h2>

          <div v-if="scheduleLoadingChirho" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
          <div v-else-if="upcomingSchedulesChirho.length > 0" class="space-y-6">
            <div v-for="schedule in upcomingSchedulesChirho" :key="schedule.schedule_id_chirho" class="border rounded-lg p-4">
              <div class="flex justify-between items-center mb-4">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">
                    {{ formatDateChirho(schedule.worship_date_chirho) }}
                  </h3>
                </div>
              </div>
              
              <!-- 24-hour grid -->
              <div class="grid grid-cols-1 gap-2">
                <div v-for="hour in 24" :key="hour" class="border rounded p-2">
                  <!-- Next day header -->
                  <div v-if="hour === 6" class="mb-2 pb-2 border-b">
                    <h4 class="text-sm font-semibold text-gray-700">
                      {{ formatNextDayHeaderChirho(schedule.worship_date_chirho) }}
                    </h4>
                  </div>
                  <div class="flex justify-between items-center">
                    <div class="flex-1">
                      <span class="font-medium">{{ formatHourChirho(hour, schedule.worship_date_chirho) }}</span>
                      <div v-if="getSignupsForHourChirho(schedule.schedule_id_chirho, hour).length > 0" class="mt-1">
                        <div v-for="signup in getSignupsForHourChirho(schedule.schedule_id_chirho, hour)" 
                             :key="signup.signup_id_chirho" 
                             class="flex items-center justify-between bg-gray-50 p-1 rounded">
                          <span>{{ signup.participant_name_chirho }}</span>
                          <button @click="deleteSignupChirho(signup.signup_id_chirho)" 
                                  class="text-red-500 hover:text-red-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <button 
                      @click="openSignupModalChirho(hour, schedule.schedule_id_chirho)"
                      class="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-12">
            <p class="text-gray-600">No upcoming worship schedules available.</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-12">
      <h2 class="text-2xl font-bold text-gray-900">Church not found</h2>
      <p class="mt-2 text-gray-600">The church you're looking for doesn't exist or has been removed.</p>
    </div>

    <!-- Signup Modal -->
    <div v-if="showSignupModalChirho" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-xl font-bold mb-4">Sign Up for Worship</h3>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Hour</label>
          <p class="text-lg">{{ formatHourChirho(displayHourChirho.value, selectedScheduleWorshipDateChirho.value) }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input 
            v-model="signupNameChirho"
            type="text"
            class="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your name"
          />
        </div>
        <div class="flex justify-end space-x-4">
          <button 
            @click="closeSignupModalChirho"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button 
            @click="submitSignupChirho"
            class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import type { ChurchChirho, ScheduleChirho, HourlySignupChirho } from '@/types/models_chirho';
import { 
  getChurchByTokenChirho, 
  getScheduleChirho, 
  createHourlySignupChirho, 
  getUpcomingSchedulesChirho, 
  deleteHourlySignupChirho,
  getScheduleSignupsChirho 
} from '@/services/api_chirho';

const route = useRoute();
const churchChirho = ref<ChurchChirho | null>(null);
const scheduleChirho = ref<ScheduleChirho | null>(null);
const upcomingSchedulesChirho = ref<ScheduleChirho[]>([]);
const hourlySignupsChirho = ref<{ [key: string]: HourlySignupChirho[] }>({});
const loadingChirho = ref(true);
const scheduleLoadingChirho = ref(false);
const showSignupModalChirho = ref(false);
const selectedHourChirho = ref(0);
const displayHourChirho = ref(0);
const selectedScheduleIdChirho = ref('');
const selectedScheduleWorshipDateChirho = ref('');
const signupNameChirho = ref('');
const signupEmailChirho = ref('');
const currentDateChirho = ref(new Date());

const formatDateChirho = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatHourChirho = (hour_chirho: number, worship_date_chirho: string) => {
  if (!worship_date_chirho) return 'aleluya';
  
  // Create a date object for the worship date
  const worship_date_chirho_obj = new Date(worship_date_chirho);
  if (isNaN(worship_date_chirho_obj.getTime())) return '';
  
  // Set the hour (6 PM is 18:00)
  const start_hour_chirho = 17;
  const display_hour_chirho = (start_hour_chirho + hour_chirho) % 24;
  
  // If the hour is after midnight, increment the date
  if (start_hour_chirho + hour_chirho >= 24) {
    worship_date_chirho_obj.setDate(worship_date_chirho_obj.getDate() + 1);
  }
  
  // Set the hour and minutes
  worship_date_chirho_obj.setHours(display_hour_chirho, 0, 0, 0);
  
  // Format the time in the church's timezone
  return worship_date_chirho_obj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
    timeZone: churchChirho.value?.church_timezone_chirho || 'UTC'
  });
};

const formatNextDayHeaderChirho = (worship_date_chirho: string) => {
  const next_day_chirho = new Date(worship_date_chirho);
  next_day_chirho.setDate(next_day_chirho.getDate() + 1);
  
  return next_day_chirho.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: churchChirho.value?.church_timezone_chirho || 'UTC'
  });
};

const getSignupsForHourChirho = (schedule_id_chirho: string, hour_chirho: number) => {
  // Convert the display hour (0-23) to the actual hour in the database (18-17)
  const start_hour_chirho = 17;
  const actual_hour_chirho = (start_hour_chirho + hour_chirho) % 24;
  
  return hourlySignupsChirho.value[schedule_id_chirho]?.filter(
    signup => signup.slot_hour_chirho === actual_hour_chirho
  ) || [];
};

const loadScheduleSignupsChirho = async (schedule_id_chirho: string) => {
  if (!churchChirho.value) return;
  
  try {
    const signups_chirho = await getScheduleSignupsChirho(
      route.params.token_chirho as string,
      schedule_id_chirho
    );
    hourlySignupsChirho.value[schedule_id_chirho] = signups_chirho;
  } catch (error) {
    console.error('Failed to load signups:', error);
  }
};

const loadChurchChirho = async () => {
  try {
    const tokenChirho = route.params.token_chirho as string;
    churchChirho.value = await getChurchByTokenChirho(tokenChirho);
    await loadUpcomingSchedulesChirho();
  } catch (error) {
    console.error('Failed to load church:', error);
  } finally {
    loadingChirho.value = false;
  }
};

const loadUpcomingSchedulesChirho = async () => {
  if (!churchChirho.value) return;
  
  scheduleLoadingChirho.value = true;
  try {
    const schedules = await getUpcomingSchedulesChirho({
      church_id_chirho: churchChirho.value.church_id_chirho
    });
    upcomingSchedulesChirho.value = schedules;
    
    // Load signups for each schedule
    for (const schedule of schedules) {
      await loadScheduleSignupsChirho(schedule.schedule_id_chirho);
    }
  } catch (error) {
    console.error('Failed to load upcoming schedules:', error);
  } finally {
    scheduleLoadingChirho.value = false;
  }
};

const openSignupModalChirho = (hour_chirho: number, schedule_id_chirho?: string) => {
  if (!schedule_id_chirho) return;
  
  // Store the display hour (0-23) for showing in the modal
  displayHourChirho.value = hour_chirho;
  
  // Convert the display hour (0-23) to the actual hour in the database (17-16)
  const start_hour_chirho = 17;
  const actual_hour_chirho = (start_hour_chirho + hour_chirho) % 24;
  
  selectedHourChirho.value = actual_hour_chirho;
  selectedScheduleIdChirho.value = schedule_id_chirho;
  
  // Store the worship date for the selected schedule
  const schedule_chirho = upcomingSchedulesChirho.value.find(s => s.schedule_id_chirho === schedule_id_chirho);
  if (schedule_chirho) {
    selectedScheduleWorshipDateChirho.value = schedule_chirho.worship_date_chirho;
  }
  
  showSignupModalChirho.value = true;
};

const closeSignupModalChirho = () => {
  showSignupModalChirho.value = false;
  signupNameChirho.value = '';
  selectedScheduleWorshipDateChirho.value = '';
};

const submitSignupChirho = async () => {
  if (!churchChirho.value || !selectedScheduleIdChirho.value) return;

  try {
    await createHourlySignupChirho({
      schedule_id_chirho: selectedScheduleIdChirho.value,
      slot_hour_chirho: selectedHourChirho.value,
      participant_name_chirho: signupNameChirho.value
    }, route.params.token_chirho as string);

    await loadScheduleSignupsChirho(selectedScheduleIdChirho.value);
    closeSignupModalChirho();
  } catch (error) {
    console.error('Failed to submit signup:', error);
  }
};

const deleteSignupChirho = async (signup_id_chirho: string) => {
  try {
    await deleteHourlySignupChirho(signup_id_chirho, route.params.token_chirho as string);
    // Reload signups for all schedules
    for (const schedule of upcomingSchedulesChirho.value) {
      await loadScheduleSignupsChirho(schedule.schedule_id_chirho);
    }
  } catch (error) {
    console.error('Failed to delete signup:', error);
  }
};

onMounted(() => {
  loadChurchChirho();
});
</script>

<style scoped>
.church-view-chirho {
  @apply min-h-screen bg-gray-50;
}
</style> 