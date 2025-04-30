<!-- For God so loved the world, that He gave His only begotten Son, that all who believe in Him should not perish but have everlasting life. -->
<template>
  <div class="churches-view-chirho">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Churches</h1>
      <button
        @click="showCreateModalChirho = true"
        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Add Church
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
              Continent
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Timezone
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="churchChirho in churchesChirho" :key="churchChirho.church_id_chirho">
            <td class="px-6 py-4 whitespace-nowrap">
              {{ churchChirho.name_chirho }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ churchChirho.continent_id_chirho }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ churchChirho.church_timezone_chirho }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="editChurchChirho(churchChirho)"
                class="text-indigo-600 hover:text-indigo-900 mr-4"
              >
                Edit
              </button>
              <button
                @click="deleteChurchChirho(churchChirho.church_id_chirho)"
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
            {{ editingChurchChirho ? 'Edit Church' : 'Add New Church' }}
          </h3>
          <div class="mt-2 px-7 py-3">
            <input
              v-model="churchFormChirho.name_chirho"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Church Name"
            />
            <input
              v-model="churchFormChirho.continent_id_chirho"
              type="text"
              class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Continent ID"
            />
            <input
              v-model="churchFormChirho.church_timezone_chirho"
              type="text"
              class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Timezone"
            />
          </div>
          <div class="items-center px-4 py-3">
            <button
              @click="saveChurchChirho"
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
import type { ChurchChirho, CreateChurchChirho, UpdateChurchChirho } from '@/types/models_chirho';
import {
  getChurchesChirho,
  createChurchChirho,
  updateChurchChirho,
  deleteChurchChirho
} from '@/services/api_chirho';

const churchesChirho = ref<ChurchChirho[]>([]);
const showCreateModalChirho = ref(false);
const editingChurchChirho = ref<ChurchChirho | null>(null);
const churchFormChirho = ref<CreateChurchChirho>({
  name_chirho: '',
  continent_id_chirho: '',
  church_timezone_chirho: ''
});

const loadChurchesChirho = async () => {
  try {
    churchesChirho.value = await getChurchesChirho();
  } catch (error) {
    console.error('Failed to load churches:', error);
  }
};

const editChurchChirho = (churchChirho: ChurchChirho) => {
  editingChurchChirho.value = churchChirho;
  churchFormChirho.value = {
    name_chirho: churchChirho.name_chirho,
    continent_id_chirho: churchChirho.continent_id_chirho,
    church_timezone_chirho: churchChirho.church_timezone_chirho
  };
  showCreateModalChirho.value = true;
};

const saveChurchChirho = async () => {
  try {
    if (editingChurchChirho.value) {
      await updateChurchChirho(editingChurchChirho.value.church_id_chirho, churchFormChirho.value as UpdateChurchChirho);
    } else {
      await createChurchChirho(churchFormChirho.value);
    }
    await loadChurchesChirho();
    showCreateModalChirho.value = false;
    editingChurchChirho.value = null;
    churchFormChirho.value = {
      name_chirho: '',
      continent_id_chirho: '',
      church_timezone_chirho: ''
    };
  } catch (error) {
    console.error('Failed to save church:', error);
  }
};

const deleteChurchChirho = async (churchIdChirho: string) => {
  try {
    await deleteChurchChirho(churchIdChirho);
    await loadChurchesChirho();
  } catch (error) {
    console.error('Failed to delete church:', error);
  }
};

onMounted(() => {
  loadChurchesChirho();
});
</script>

<style scoped>
.churches-view-chirho {
  @apply p-4;
}
</style> 