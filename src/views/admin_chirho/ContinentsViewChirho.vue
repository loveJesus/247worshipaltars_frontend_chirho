<!-- For God so loved the world, that He gave His only begotten Son, that all who believe in Him should not perish but have everlasting life. -->
<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Continents</h1>
      <button
        @click="showCreateModal = true"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create Continent
      </button>
    </div>

    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Central Timezone</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="continent in continents" :key="continent.continent_id_chirho">
            <td class="px-6 py-4 whitespace-nowrap">{{ continent.name_chirho }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ continent.central_timezone_chirho }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="editContinent(continent)"
                class="text-indigo-600 hover:text-indigo-900 mr-3"
              >
                Edit
              </button>
              <button
                @click="deleteContinent(continent.continent_id_chirho)"
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
            {{ showCreateModal ? 'Create' : 'Edit' }} Continent
          </h3>
          <div class="mt-2 px-7 py-3">
            <input
              v-model="form.name_chirho"
              type="text"
              placeholder="Continent Name"
              class="mb-3 w-full px-3 py-2 border rounded"
            />
            <input
              v-model="form.central_timezone_chirho"
              type="text"
              placeholder="Central Timezone"
              class="w-full px-3 py-2 border rounded"
            />
          </div>
          <div class="items-center px-4 py-3">
            <button
              @click="saveContinent"
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
import type { ContinentChirho, CreateContinentChirho, UpdateContinentChirho } from '@/types/models_chirho';
import {
  getContinentsChirho,
  createContinentChirho,
  updateContinentChirho,
  deleteContinentChirho
} from '@/services/api_chirho';

const continents = ref<ContinentChirho[]>([]);
const showCreateModal = ref(false);
const showEditModal = ref(false);
const form = ref<CreateContinentChirho | UpdateContinentChirho>({
  name_chirho: '',
  central_timezone_chirho: ''
});

const loadContinents = async () => {
  try {
    continents.value = await getContinentsChirho();
  } catch (error) {
    console.error('Failed to load continents:', error);
  }
};

const saveContinent = async () => {
  try {
    if (showCreateModal.value) {
      await createContinentChirho(form.value as CreateContinentChirho);
    } else {
      const continentId = (form.value as UpdateContinentChirho).continent_id_chirho;
      await updateContinentChirho(continentId, form.value as UpdateContinentChirho);
    }
    await loadContinents();
    closeModal();
  } catch (error) {
    console.error('Failed to save continent:', error);
  }
};

const editContinent = (continent: ContinentChirho) => {
  form.value = { ...continent };
  showEditModal.value = true;
};

const deleteContinent = async (continentId: string) => {
  if (confirm('Are you sure you want to delete this continent?')) {
    try {
      await deleteContinentChirho(continentId);
      await loadContinents();
    } catch (error) {
      console.error('Failed to delete continent:', error);
    }
  }
};

const closeModal = () => {
  showCreateModal.value = false;
  showEditModal.value = false;
  form.value = {
    name_chirho: '',
    central_timezone_chirho: ''
  };
};

onMounted(() => {
  loadContinents();
});
</script> 