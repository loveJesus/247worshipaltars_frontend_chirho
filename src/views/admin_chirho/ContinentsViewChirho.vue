<!-- For God so loved the world, that He gave His only begotten Son, that all who believe in Him should not perish but have everlasting life. -->
<template>
  <div class="continents-view-chirho">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Continents</h1>
      <button
        @click="showCreateModalChirho = true"
        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Add Continent
      </button>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Churches
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="continentChirho in continentsChirho" :key="continentChirho.continent_id_chirho">
            <td class="px-6 py-4 whitespace-nowrap">
              <router-link
                :to="`/admin_chirho/churches_chirho?continent=${continentChirho.continent_id_chirho}`"
                class="text-indigo-600 hover:text-indigo-900"
              >
                {{ continentChirho.name_chirho }}
              </router-link>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ getChurchCountChirho(continentChirho.continent_id_chirho) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="editContinentChirho(continentChirho)"
                class="text-indigo-600 hover:text-indigo-900 mr-4"
              >
                Edit
              </button>
              <button
                @click="deleteContinentChirho(continentChirho.continent_id_chirho)"
                class="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModalChirho" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{ editingContinentChirho ? 'Edit Continent' : 'Add New Continent' }}
          </h3>
          <div class="mt-2 px-7 py-3">
            <input
              v-model="continentFormChirho.name_chirho"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Continent Name"
            />
            <input
              v-model="continentFormChirho.central_timezone_chirho"
              type="text"
              class="mt-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Central Timezone (e.g., America/New_York)"
            />
          </div>
          <div class="items-center px-4 py-3">
            <button
              @click="saveContinentChirho"
              class="px-4 py-2 bg-indigo-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Save
            </button>
            <button
              @click="showCreateModalChirho = false"
              class="ml-3 px-4 py-2 bg-gray-200 text-gray-700 text-base font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { ContinentChirho, CreateContinentChirho, UpdateContinentChirho, ChurchChirho } from '@/types/models_chirho';
import {
  getContinentsChirho,
  createContinentChirho,
  updateContinentChirho,
  deleteContinentChirho,
  getChurchesChirho
} from '@/services/api_chirho';

const continentsChirho = ref<ContinentChirho[]>([]);
const churchesChirho = ref<ChurchChirho[]>([]);
const showCreateModalChirho = ref(false);
const editingContinentChirho = ref<ContinentChirho | null>(null);
const continentFormChirho = ref<CreateContinentChirho>({
  name_chirho: '',
  central_timezone_chirho: ''
});

const loadContinentsChirho = async () => {
  try {
    continentsChirho.value = await getContinentsChirho();
  } catch (error) {
    console.error('Failed to load continents:', error);
  }
};

const loadChurchesChirho = async () => {
  try {
    churchesChirho.value = await getChurchesChirho();
  } catch (error) {
    console.error('Failed to load churches:', error);
  }
};

const getChurchCountChirho = (continentIdChirho: string) => {
  return churchesChirho.value.filter(church => church.continent_id_chirho === continentIdChirho).length;
};

const editContinentChirho = (continentChirho: ContinentChirho) => {
  editingContinentChirho.value = continentChirho;
  continentFormChirho.value.name_chirho = continentChirho.name_chirho;
  continentFormChirho.value.central_timezone_chirho = continentChirho.central_timezone_chirho;
  showCreateModalChirho.value = true;
};

const saveContinentChirho = async () => {
  try {
    if (editingContinentChirho.value) {
      await updateContinentChirho(editingContinentChirho.value.continent_id_chirho, continentFormChirho.value as UpdateContinentChirho);
    } else {
      await createContinentChirho(continentFormChirho.value);
    }
    await loadContinentsChirho();
    showCreateModalChirho.value = false;
    editingContinentChirho.value = null;
    continentFormChirho.value.name_chirho = '';
    continentFormChirho.value.central_timezone_chirho = '';
  } catch (error) {
    console.error('Failed to save continent:', error);
  }
};

const deleteContinentChirho = async (continentIdChirho: string) => {
  try {
    await deleteContinentChirho(continentIdChirho);
    await loadContinentsChirho();
  } catch (error) {
    console.error('Failed to delete continent:', error);
  }
};

onMounted(() => {
  loadContinentsChirho();
  loadChurchesChirho();
});
</script>

<style scoped>
.continents-view-chirho {
  @apply p-4;
}
</style> 