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
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">
                    {{ formatDateChirho(schedule.worship_date_chirho) }}
                  </h3>
                </div>
                <div class="text-right">
                  <button 
                    @click="openSignupModalChirho(0, schedule.schedule_id_chirho)"
                    class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Sign Up
                  </button>
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
          <p class="text-lg">{{ formatHourChirho(selectedHourChirho) }}</p>
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
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
          <input 
            v-model="signupEmailChirho"
            type="email"
            class="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your email"
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
import { getChurchByTokenChirho, getScheduleChirho, createHourlySignupChirho, getUpcomingSchedulesChirho } from '@/services/api_chirho';

const route = useRoute();
const churchChirho = ref<ChurchChirho | null>(null);
const scheduleChirho = ref<ScheduleChirho | null>(null);
const upcomingSchedulesChirho = ref<ScheduleChirho[]>([]);
const loadingChirho = ref(true);
const scheduleLoadingChirho = ref(false);
const showSignupModalChirho = ref(false);
const selectedHourChirho = ref(0);
const selectedScheduleIdChirho = ref('');
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

const formatHourChirho = (hour: number) => {
  const date = new Date();
  date.setHours(hour, 0, 0, 0);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true
  });
};

const getSignupForHourChirho = (hour: number) => {
  return scheduleChirho.value?.hourly_signups_chirho.find(
    signup => new Date(signup.worship_hour_chirho).getHours() === hour
  );
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

const loadScheduleChirho = async () => {
  if (!churchChirho.value) return;
  
  scheduleLoadingChirho.value = true;
  try {
    const dateStr = currentDateChirho.value.toISOString().split('T')[0];
    scheduleChirho.value = await getScheduleChirho(churchChirho.value.church_id_chirho, dateStr);
  } catch (error) {
    console.error('Failed to load schedule:', error);
  } finally {
    scheduleLoadingChirho.value = false;
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
  } catch (error) {
    console.error('Failed to load upcoming schedules:', error);
  } finally {
    scheduleLoadingChirho.value = false;
  }
};

const openSignupModalChirho = (hour: number, scheduleIdChirho?: string) => {
  selectedHourChirho.value = hour;
  selectedScheduleIdChirho.value = scheduleIdChirho;
  showSignupModalChirho.value = true;
};

const closeSignupModalChirho = () => {
  showSignupModalChirho.value = false;
  signupNameChirho.value = '';
  signupEmailChirho.value = '';
};

const submitSignupChirho = async () => {
  if (!churchChirho.value || !selectedScheduleIdChirho.value) return;

  try {
    await createHourlySignupChirho({
      schedule_id_chirho: selectedScheduleIdChirho.value,
      slot_hour_chirho: selectedHourChirho.value,
      participant_name_chirho: signupNameChirho.value
    }, route.params.token_chirho as string);

    await loadUpcomingSchedulesChirho();
    closeSignupModalChirho();
  } catch (error) {
    console.error('Failed to submit signup:', error);
  }
};

onMounted(() => {
  loadChurchChirho();
  loadUpcomingSchedulesChirho();
});
</script>

<style scoped>
.church-view-chirho {
  @apply min-h-screen bg-gray-50;
}
</style> 