<!-- For God so loved the world, that He gave His only begotten Son, that all who believe in Him should not perish but have everlasting life. -->
<template>
  <div class="church-view-chirho">
    <div v-if="loadingChirho" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
    <div v-else-if="churchChirho" class="max-w-4xl mx-auto px-4 py-8">
      <div class="bg-white shadow rounded-lg overflow-hidden">
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
    </div>
    <div v-else class="text-center py-12">
      <h2 class="text-2xl font-bold text-gray-900">Church not found</h2>
      <p class="mt-2 text-gray-600">The church you're looking for doesn't exist or has been removed.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { ChurchChirho } from '@/types/models_chirho';
import { getChurchByTokenChirho } from '@/services/api_chirho';

const route = useRoute();
const churchChirho = ref<ChurchChirho | null>(null);
const loadingChirho = ref(true);

const formatDateChirho = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const loadChurchChirho = async () => {
  try {
    const tokenChirho = route.params.token_chirho as string;
    churchChirho.value = await getChurchByTokenChirho(tokenChirho);
  } catch (error) {
    console.error('Failed to load church:', error);
  } finally {
    loadingChirho.value = false;
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