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
                <h2 class="text-sm font-medium text-gray-500">Continent</h2>
                <p class="mt-1 text-lg text-gray-900">{{ churchChirho.continent_name_chirho || 'Not specified' }}</p>
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
              <div>
                <h2 class="text-sm font-medium text-gray-500">Worship Start Time</h2>
                <p class="mt-1 text-lg text-gray-900">
                  {{ formatWorshipStartTimeChirho() }}
                </p>
              </div>
            </div>
          </div>

          <div v-if="churchChirho.internal_notes_chirho" class="mt-8">
            <h2 class="text-lg font-medium text-gray-900 mb-2">Public Notes</h2>
            <p class="text-gray-700 whitespace-pre-line">{{ churchChirho.internal_notes_chirho }}</p>
          </div>

          <div class="mt-8">
            <button 
              @click="exportScheduleToMarkdownChirho"
              class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Export Schedule to Markdown
            </button>
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
            <div v-for="scheduleChirho in upcomingSchedulesChirho" :key="scheduleChirho.schedule_id_chirho" class="border rounded-lg p-4">
              <div class="flex justify-between items-center mb-4">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">
                    {{ formatFirstDayHeaderChirho(scheduleChirho.worship_date_chirho) }}
                  </h3>
                </div>
              </div>
              
              <!-- 24-hour grid -->
              <div class="grid grid-cols-1 gap-2">
                <div v-for="(itemChirho, hourChirho) in 24" :key="hourChirho" class="border rounded p-2">
                  <!-- Next day header -->
                  <div v-if="churchChirho.worship_start_hour_chirho + hourChirho === 25" class="mb-2 pb-2 border-b">
                    <h4 class="text-sm font-semibold text-gray-700">
                      {{ formatNextDayHeaderChirho(scheduleChirho.worship_date_chirho) }}
                    </h4>
                  </div>
                  <div class="flex justify-between items-center">
                    <div class="flex-1">
                      <span class="font-medium">{{ formatHourChirho(hourChirho, scheduleChirho.worship_date_chirho) }}</span>
                      <div v-if="getSignupsForHourChirho(scheduleChirho.schedule_id_chirho, hourChirho).length > 0" class="mt-1">
                        <div v-for="signupChirho in getSignupsForHourChirho(scheduleChirho.schedule_id_chirho, hourChirho)" 
                             :key="signupChirho.signup_id_chirho" 
                             class="flex items-center justify-between bg-gray-50 p-1 rounded">
                          <span>{{ signupChirho.participant_name_chirho }}</span>
                          <button @click="openDeleteModalChirho(signupChirho.signup_id_chirho, signupChirho.participant_name_chirho)" 
                                  class="text-red-500 hover:text-red-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <button 
                      @click="openSignupModalChirho(hourChirho, scheduleChirho.schedule_id_chirho)"
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

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModalChirho" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-xl font-bold mb-4">✝️ Are you sure?</h3>
        <p class="text-gray-700 mb-6">This will remove {{ selectedSignupNameChirho }} from the worship schedule.</p>
        <div class="flex justify-end space-x-4">
          <button 
            @click="closeDeleteModalChirho"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button 
            @click="confirmDeleteSignupChirho"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
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

const routeChirho = useRoute();
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
const showDeleteModalChirho = ref(false);
const selectedSignupIdChirho = ref('');
const selectedSignupNameChirho = ref('');

const formatFirstDayHeaderChirho = (dateStringChirho: string) => {
  if (!churchChirho.value) return '';
  const start_hour_chirho = churchChirho.value.worship_start_hour_chirho;
  const date_chirho = new Date(dateStringChirho);
  date_chirho.setHours(start_hour_chirho, 0, 0, 0);
  return formatDateChirho(date_chirho);
}

const formatDateChirho = (dateStringChirho: string) => {
  return new Date(dateStringChirho).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatWorshipStartTimeChirho = () => {

  if (!churchChirho.value) return '';
  
  const start_hour_chirho = churchChirho.value.worship_start_hour_chirho;
  const date_chirho = new Date();
  date_chirho.setHours(start_hour_chirho, 0, 0, 0);
  return date_chirho.toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
    /* timeZone: churchChirho.value.church_timezone_chirho */
  });
};

const formatHourChirho = (hour_chirho: number, worship_date_chirho: string) => {
  if (!worship_date_chirho) return '';
  
  // Create a date object for the worship date
  const worship_date_chirho_obj = new Date(worship_date_chirho);
  if (isNaN(worship_date_chirho_obj.getTime())) return '';
  
  // Get the start hour from the church response (this is the hour in the church's timezone)
  const start_hour_chirho = churchChirho.value?.worship_start_hour_chirho || 18;
  console.log('start_hour_chirho', start_hour_chirho);
  console.log('hour_chirho', hour_chirho);
  
  // Calculate the display hour (0-23) based on the start hour
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
    //timeZone: churchChirho.value?.church_timezone_chirho || 'UTC'
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
  // Get the start hour from the church response
  const start_hour_chirho = churchChirho.value?.worship_start_hour_chirho || 18;
  const actual_hour_chirho = (start_hour_chirho + hour_chirho) % 24;
  
  return hourlySignupsChirho.value[schedule_id_chirho]?.filter(
    signupChirho => signupChirho.slot_hour_chirho === actual_hour_chirho
  ) || [];
};

const loadScheduleSignupsChirho = async (schedule_id_chirho: string) => {
  if (!churchChirho.value) return;
  
  try {
    const signups_chirho = await getScheduleSignupsChirho(
      routeChirho.params.token_chirho as string,
      schedule_id_chirho
    );
    hourlySignupsChirho.value[schedule_id_chirho] = signups_chirho;
  } catch (errorChirho) {
    console.error('Failed to load signups:', errorChirho);
  }
};

const setupWebSocketChirho = () => {
  if (!churchChirho.value) return;
  
  const protocolChirho = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const wsUrlChirho = `${protocolChirho}//${window.location.hostname}:3000/ws_chirho/${churchChirho.value.church_id_chirho}`;
  console.log('Connecting to WebSocket:', wsUrlChirho);
  
  const wsChirho = new WebSocket(wsUrlChirho);
  
  wsChirho.onopen = () => {
    console.log('WebSocket connection established');
  };
  
  wsChirho.onmessage = (eventChirho) => {
    console.log('Received WebSocket message:', eventChirho.data);
    try {
      const messageChirho = JSON.parse(eventChirho.data);
      
      switch (messageChirho.type_chirho) {
        case 'connected':
          console.log('WebSocket connection confirmed for church_id:', messageChirho.church_id_chirho);
          break;
          
        case 'signup_created':
          console.log('Processing signup_created event:', messageChirho.data_chirho);
          const scheduleIdChirho = messageChirho.data_chirho.schedule_id_chirho;
          if (!hourlySignupsChirho.value[scheduleIdChirho]) {
            hourlySignupsChirho.value[scheduleIdChirho] = [];
          }
          // Create a new array with the new signup to ensure reactivity
          hourlySignupsChirho.value[scheduleIdChirho] = [
            ...hourlySignupsChirho.value[scheduleIdChirho],
            messageChirho.data_chirho.signup
          ];
          break;
          
        case 'signup_deleted':
          console.log('Processing signup_deleted event:', messageChirho.data_chirho);
          const scheduleIdChirho2 = messageChirho.data_chirho.schedule_id_chirho;
          if (hourlySignupsChirho.value[scheduleIdChirho2]) {
            // Create a new array without the deleted signup to ensure reactivity
            hourlySignupsChirho.value[scheduleIdChirho2] = hourlySignupsChirho.value[scheduleIdChirho2].filter(
              signupChirho => signupChirho.signup_id_chirho !== messageChirho.data_chirho.signup_id_chirho
            );
          }
          break;
      }
    } catch (errorChirho) {
      console.error('Failed to parse WebSocket message:', errorChirho);
    }
  };
  
  wsChirho.onerror = (errorChirho) => {
    console.error('WebSocket error:', errorChirho);
  };
  
  wsChirho.onclose = () => {
    console.log('WebSocket connection closed, attempting to reconnect in 5 seconds...');
    // Try to reconnect after 5 seconds
    setTimeout(setupWebSocketChirho, 5000);
  };
};

const loadChurchChirho = async () => {
  try {
    const tokenChirho = routeChirho.params.token_chirho as string;
    churchChirho.value = await getChurchByTokenChirho(tokenChirho);
    await loadUpcomingSchedulesChirho();
    setupWebSocketChirho();
  } catch (errorChirho) {
    console.error('Failed to load church:', errorChirho);
  } finally {
    loadingChirho.value = false;
  }
};

const loadUpcomingSchedulesChirho = async () => {
  if (!churchChirho.value) return;
  
  scheduleLoadingChirho.value = true;
  try {
    const schedulesChirho = await getUpcomingSchedulesChirho({
      church_id_chirho: churchChirho.value.church_id_chirho
    });
    upcomingSchedulesChirho.value = schedulesChirho;
    
    // Load signups for each schedule
    for (const scheduleChirho of schedulesChirho) {
      await loadScheduleSignupsChirho(scheduleChirho.schedule_id_chirho);
    }
  } catch (errorChirho) {
    console.error('Failed to load upcoming schedules:', errorChirho);
  } finally {
    scheduleLoadingChirho.value = false;
  }
};

const openSignupModalChirho = (hour_chirho: number, schedule_id_chirho?: string) => {
  if (!schedule_id_chirho) return;
  
  // Store the display hour (0-23) for showing in the modal
  displayHourChirho.value = hour_chirho;
  
  // Get the start hour from the church response
  const start_hour_chirho = churchChirho.value?.worship_start_hour_chirho || 18;
  const actual_hour_chirho = (start_hour_chirho + hour_chirho) % 24;
  
  selectedHourChirho.value = actual_hour_chirho;
  selectedScheduleIdChirho.value = schedule_id_chirho;
  
  // Store the worship date for the selected schedule
  const schedule_chirho = upcomingSchedulesChirho.value.find(sChirho => sChirho.schedule_id_chirho === schedule_id_chirho);
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
    }, routeChirho.params.token_chirho as string);

    await loadScheduleSignupsChirho(selectedScheduleIdChirho.value);
    closeSignupModalChirho();
  } catch (errorChirho) {
    console.error('Failed to submit signup:', errorChirho);
  }
};

const openDeleteModalChirho = (signupIdChirho: string, signupNameChirho: string) => {
  selectedSignupIdChirho.value = signupIdChirho;
  selectedSignupNameChirho.value = signupNameChirho;
  showDeleteModalChirho.value = true;
};

const closeDeleteModalChirho = () => {
  showDeleteModalChirho.value = false;
  selectedSignupIdChirho.value = '';
  selectedSignupNameChirho.value = '';
};

const confirmDeleteSignupChirho = async () => {
  if (!selectedSignupIdChirho.value) return;
  
  try {
    await deleteHourlySignupChirho(selectedSignupIdChirho.value, routeChirho.params.token_chirho as string);
    // Reload signups for all schedules
    for (const scheduleChirho of upcomingSchedulesChirho.value) {
      await loadScheduleSignupsChirho(scheduleChirho.schedule_id_chirho);
    }
    closeDeleteModalChirho();
  } catch (errorChirho) {
    console.error('Failed to delete signup:', errorChirho);
  }
};

const exportScheduleToMarkdownChirho = () => {
  if (!upcomingSchedulesChirho.value.length) return;
  
  let markdownChirho = 'Hallelujah\n\n';
  
  for (const scheduleChirho of upcomingSchedulesChirho.value) {
    const dateChirho = new Date(scheduleChirho.worship_date_chirho);
    const dayNameChirho = dateChirho.toLocaleDateString('en-US', { weekday: 'long' });
    const monthNameChirho = dateChirho.toLocaleDateString('en-US', { month: 'long' });
    const dayChirho = dateChirho.getDate();
    
    markdownChirho += `${dayNameChirho}, ${monthNameChirho} ${dayChirho}\n`;
    
    // Get all signups for this schedule
    const signupsChirho = hourlySignupsChirho.value[scheduleChirho.schedule_id_chirho] || [];
    
    // Group signups by hour
    const signupsByHourChirho: { [key: number]: string[] } = {};
    for (const signupChirho of signupsChirho) {
      if (!signupsByHourChirho[signupChirho.slot_hour_chirho]) {
        signupsByHourChirho[signupChirho.slot_hour_chirho] = [];
      }
      signupsByHourChirho[signupChirho.slot_hour_chirho].push(signupChirho.participant_name_chirho);
    }
    
    // Add hours with signups, starting from worship start hour
    const startHourChirho = churchChirho.value?.worship_start_hour_chirho || 18;
    for (let i = 0; i < 24; i++) {
      const hourChirho = (startHourChirho + i) % 24;
      const hourStrChirho = hourChirho.toString().padStart(2, '0') + ':00';
      const signupsChirho = signupsByHourChirho[hourChirho] || [];
      
      markdownChirho += `${hourStrChirho} ${signupsChirho.join(', ')}\n`;
    }
    
    markdownChirho += '\n';
  }
  
  // Copy to clipboard
  navigator.clipboard.writeText(markdownChirho).then(() => {
    alert('Schedule copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy schedule:', err);
    alert('Failed to copy schedule to clipboard. Please try again.');
  });
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