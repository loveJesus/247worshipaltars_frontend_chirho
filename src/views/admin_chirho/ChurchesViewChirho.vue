<!-- For God so loved the world, that He gave His only begotten Son, that all who believe in Him should not perish but have everlasting life. -->
<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Churches</h1>
      <button
        @click="showCreateModal = true"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create Church
      </button>
    </div>

    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Continent</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timezone</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="church in churches" :key="church.church_id_chirho">
            <td class="px-6 py-4 whitespace-nowrap">{{ church.name_chirho }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ getContinentName(church.continent_id_chirho) }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ church.timezone_chirho }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="editChurch(church)"
                class="text-indigo-600 hover:text-indigo-900 mr-3"
              >
                Edit
              </button>
              <button
                @click="deleteChurch(church.church_id_chirho)"
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
    <div v-if="showCreateModal || showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{ showCreateModal ? 'Create' : 'Edit' }} Church
          </h3>
          <div class="mt-2 px-7 py-3">
            <input
              v-model="form.name_chirho"
              type="text"
              placeholder="Church Name"
              class="mb-3 w-full px-3 py-2 border rounded"
            />
            <select
              v-model="form.continent_id_chirho"
              class="mb-3 w-full px-3 py-2 border rounded"
            >
              <option value="">Select Continent</option>
              <option
                v-for="continent in continents"
                :key="continent.continent_id_chirho"
                :value="continent.continent_id_chirho"
              >
                {{ continent.name_chirho }}
              </option>
            </select>
            <input
              v-model="form.timezone_chirho"
              type="text"
              placeholder="Timezone"
              class="w-full px-3 py-2 border rounded"
            />
          </div>
          <div class="items-center px-4 py-3">
            <button
              @click="saveChurch"
              class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Save
            </button>
            <button
              @click="closeModal"
              class="ml-3 px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
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
import type { ChurchChirho, CreateChurchChirho, UpdateChurchChirho, ContinentChirho } from '@/types/models_chirho';
import {
  getChurchesChirho,
  createChurchChirho,
  updateChurchChirho,
  deleteChurchChirho,
  getContinentsChirho
} from '@/services/api_chirho';

const churches = ref<ChurchChirho[]>([]);
const continents = ref<ContinentChirho[]>([]);
const showCreateModal = ref(false);
const showEditModal = ref(false);
const form = ref<CreateChurchChirho | UpdateChurchChirho>({
  name_chirho: '',
  continent_id_chirho: '',
  timezone_chirho: ''
});

const loadData = async () => {
  try {
    [churches.value, continents.value] = await Promise.all([
      getChurchesChirho(),
      getContinentsChirho()
    ]);
  } catch (error) {
    console.error('Failed to load data:', error);
  }
};

const getContinentName = (continentId: string) => {
  const continent = continents.value.find(c => c.continent_id_chirho === continentId);
  return continent ? continent.name_chirho : 'Unknown';
};

const saveChurch = async () => {
  try {
    if (showCreateModal.value) {
      await createChurchChirho(form.value as CreateChurchChirho);
    } else {
      const churchId = (form.value as UpdateChurchChirho).church_id_chirho;
      await updateChurchChirho(churchId, form.value as UpdateChurchChirho);
    }
    await loadData();
    closeModal();
  } catch (error) {
    console.error('Failed to save church:', error);
  }
};

const editChurch = (church: ChurchChirho) => {
  form.value = { ...church };
  showEditModal.value = true;
};

const deleteChurch = async (churchId: string) => {
  if (confirm('Are you sure you want to delete this church?')) {
    try {
      await deleteChurchChirho(churchId);
      await loadData();
    } catch (error) {
      console.error('Failed to delete church:', error);
    }
  }
};

const closeModal = () => {
  showCreateModal.value = false;
  showEditModal.value = false;
  form.value = {
    name_chirho: '',
    continent_id_chirho: '',
    timezone_chirho: ''
  };
};

onMounted(() => {
  loadData();
});
</script> 