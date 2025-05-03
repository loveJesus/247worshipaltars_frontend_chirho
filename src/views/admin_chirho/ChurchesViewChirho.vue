<!-- For God so loved the world, that He gave His only begotten Son, that all who believe in Him should not perish but have everlasting life. -->
<template>
  <div class="churches-view-chirho">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">
        {{ route.query.continent ? `Churches in ${getContinentNameChirho(route.query.continent as string)}` : 'All Churches' }}
      </h1>
      <button
        @click="showCreateModalChirho = true"
        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Add Church
      </button>
    </div>

    <!-- Continent Tabs -->
    <div class="bg-white shadow rounded-lg p-6 mb-8">
      <div class="flex space-x-4 overflow-x-auto pb-2">
        <button
          @click="router.push({ query: {} })"
          :class="[
            'px-4 py-2 rounded-md text-sm font-medium',
            !route.query.continent
              ? 'bg-gray-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          All Continents
        </button>
        <button
          v-for="continent in continentsChirho"
          :key="continent.continent_id_chirho"
          @click="router.push({ query: { continent: continent.continent_id_chirho } })"
          :class="[
            'px-4 py-2 rounded-md text-sm font-medium',
            route.query.continent === continent.continent_id_chirho
              ? `bg-${getContinentColorChirho(continent.continent_id_chirho)}-600 text-white`
              : `bg-${getContinentColorChirho(continent.continent_id_chirho)}-100 text-${getContinentColorChirho(continent.continent_id_chirho)}-700 hover:bg-${getContinentColorChirho(continent.continent_id_chirho)}-200`
          ]"
        >
          {{ continent.name_chirho }}
          <span v-if="continent.centralized_timezone_chirho" class="ml-2 text-xs">
            ({{ continent.centralized_timezone_chirho }})
          </span>
        </button>
      </div>
    </div>

    <!-- Edit Continent Timezone Modal -->
    <div v-if="showEditTimezoneModalChirho" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Edit Timezone for {{ editingContinentChirho?.name_chirho }}
          </h3>
          <div class="mt-2 px-7 py-3">
            <select
              v-model="editingContinentChirho.centralized_timezone_chirho"
              class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select a Timezone</option>
              <option v-for="timezoneChirho in timezonesChirho" :key="timezoneChirho" :value="timezoneChirho">
                {{ timezoneChirho }}
              </option>
            </select>
          </div>
          <div class="items-center px-4 py-3">
            <button
              @click="saveContinentTimezoneChirho"
              class="px-4 py-2 bg-indigo-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Save
            </button>
            <button
              @click="showEditTimezoneModalChirho = false"
              class="ml-3 px-4 py-2 bg-gray-200 text-gray-700 text-base font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
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
          <tr v-for="churchChirho in filteredChurchesChirho" :key="churchChirho.church_id_chirho">
            <td class="px-6 py-4 whitespace-nowrap">
              <router-link
                :to="`/church_chirho/${churchChirho.member_access_token_chirho}`"
                class="text-indigo-600 hover:text-indigo-900"
              >
                {{ churchChirho.name_chirho }}
              </router-link>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ getContinentNameChirho(churchChirho.continent_id_chirho) }}
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
              v-model="churchFormChirho.leader_name_chirho"
              type="text"
              class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Leader Name"
            />
            <input
              v-model="churchFormChirho.leader_email_chirho"
              type="email"
              class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Leader Email"
            />
            <select
              v-model="churchFormChirho.continent_id_chirho"
              class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select a Continent</option>
              <option v-for="continentChirho in continentsChirho" :key="continentChirho.continent_id_chirho" :value="continentChirho.continent_id_chirho">
                {{ continentChirho.name_chirho }}
              </option>
            </select>
            <select
              v-model="churchFormChirho.church_timezone_chirho"
              class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select a Timezone</option>
              <option v-for="timezoneChirho in timezonesChirho" :key="timezoneChirho" :value="timezoneChirho">
                {{ timezoneChirho }}
              </option>
            </select>
            <textarea
              v-model="churchFormChirho.admin_details_note_chirho"
              class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Admin Notes"
              rows="3"
            ></textarea>
            <textarea
              v-model="churchFormChirho.internal_notes_chirho"
              class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Internal Notes"
              rows="3"
            ></textarea>
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
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { ChurchChirho, CreateChurchChirho, UpdateChurchChirho, ContinentChirho } from '@/types/models_chirho';
import {
  getChurchesChirho,
  createChurchChirho,
  updateChurchChirho,
  deleteChurchChirho,
  getContinentsChirho,
  updateContinentChirho
} from '@/services/api_chirho';

const route = useRoute();
const router = useRouter();
const churchesChirho = ref<ChurchChirho[]>([]);
const filteredChurchesChirho = ref<ChurchChirho[]>([]);
const continentsChirho = ref<ContinentChirho[]>([]);
const showCreateModalChirho = ref(false);
const editingChurchChirho = ref<ChurchChirho | null>(null);
const churchFormChirho = ref<CreateChurchChirho>({
  name_chirho: '',
  continent_id_chirho: '',
  church_timezone_chirho: '',
  leader_name_chirho: '',
  leader_email_chirho: '',
  admin_details_note_chirho: '',
  internal_notes_chirho: ''
});

const showEditTimezoneModalChirho = ref(false);
const editingContinentChirho = ref<ContinentChirho | null>(null);

// List of common timezones
const timezonesChirho = [
  // North America
  'America/Adak', 'America/Anchorage', 'America/Boise', 'America/Chicago', 'America/Denver', 'America/Detroit', 'America/Indiana/Indianapolis', 'America/Indiana/Knox', 'America/Indiana/Marengo', 'America/Indiana/Petersburg', 'America/Indiana/Tell_City', 'America/Indiana/Vevay', 'America/Indiana/Vincennes', 'America/Indiana/Winamac', 'America/Juneau', 'America/Kentucky/Louisville', 'America/Kentucky/Monticello', 'America/Los_Angeles', 'America/Menominee', 'America/Metlakatla', 'America/New_York', 'America/Nome', 'America/North_Dakota/Beulah', 'America/North_Dakota/Center', 'America/North_Dakota/New_Salem', 'America/Phoenix', 'America/Sitka', 'America/Yakutat', 'Pacific/Honolulu',

  // South America
  'America/Argentina/Buenos_Aires', 'America/Argentina/Catamarca', 'America/Argentina/Cordoba', 'America/Argentina/Jujuy', 'America/Argentina/La_Rioja', 'America/Argentina/Mendoza', 'America/Argentina/Rio_Gallegos', 'America/Argentina/Salta', 'America/Argentina/San_Juan', 'America/Argentina/San_Luis', 'America/Argentina/Tucuman', 'America/Argentina/Ushuaia', 'America/Bogota', 'America/Caracas', 'America/Cayenne', 'America/Fortaleza', 'America/Manaus', 'America/Montevideo', 'America/Paramaribo', 'America/Port-au-Prince', 'America/Punta_Arenas', 'America/Santiago', 'America/Sao_Paulo',

  // Europe
  'Europe/Amsterdam', 'Europe/Andorra', 'Europe/Astrakhan', 'Europe/Athens', 'Europe/Belgrade', 'Europe/Berlin', 'Europe/Bratislava', 'Europe/Brussels', 'Europe/Bucharest', 'Europe/Budapest', 'Europe/Chisinau', 'Europe/Copenhagen', 'Europe/Dublin', 'Europe/Gibraltar', 'Europe/Helsinki', 'Europe/Istanbul', 'Europe/Kaliningrad', 'Europe/Kiev', 'Europe/Kirov', 'Europe/Lisbon', 'Europe/London', 'Europe/Luxembourg', 'Europe/Madrid', 'Europe/Malta', 'Europe/Minsk', 'Europe/Monaco', 'Europe/Moscow', 'Europe/Oslo', 'Europe/Paris', 'Europe/Prague', 'Europe/Riga', 'Europe/Rome', 'Europe/Samara', 'Europe/San_Marino', 'Europe/Sarajevo', 'Europe/Saratov', 'Europe/Simferopol', 'Europe/Skopje', 'Europe/Sofia', 'Europe/Stockholm', 'Europe/Tallinn', 'Europe/Tirane', 'Europe/Ulyanovsk', 'Europe/Uzhgorod', 'Europe/Vaduz', 'Europe/Vatican', 'Europe/Vienna', 'Europe/Vilnius', 'Europe/Volgograd', 'Europe/Warsaw', 'Europe/Zagreb', 'Europe/Zaporozhye', 'Europe/Zurich',

  // Africa
  'Africa/Abidjan', 'Africa/Accra', 'Africa/Addis_Ababa', 'Africa/Algiers', 'Africa/Asmara', 'Africa/Bamako', 'Africa/Bangui', 'Africa/Banjul', 'Africa/Bissau', 'Africa/Blantyre', 'Africa/Brazzaville', 'Africa/Bujumbura', 'Africa/Cairo', 'Africa/Casablanca', 'Africa/Ceuta', 'Africa/Conakry', 'Africa/Dakar', 'Africa/Dar_es_Salaam', 'Africa/Djibouti', 'Africa/Douala', 'Africa/El_Aaiun', 'Africa/Freetown', 'Africa/Gaborone', 'Africa/Harare', 'Africa/Johannesburg', 'Africa/Juba', 'Africa/Kampala', 'Africa/Khartoum', 'Africa/Kigali', 'Africa/Kinshasa', 'Africa/Lagos', 'Africa/Libreville', 'Africa/Lome', 'Africa/Luanda', 'Africa/Lubumbashi', 'Africa/Lusaka', 'Africa/Malabo', 'Africa/Maputo', 'Africa/Maseru', 'Africa/Mbabane', 'Africa/Mogadishu', 'Africa/Monrovia', 'Africa/Nairobi', 'Africa/Ndjamena', 'Africa/Niamey', 'Africa/Nouakchott', 'Africa/Ouagadougou', 'Africa/Porto-Novo', 'Africa/Sao_Tome', 'Africa/Tripoli', 'Africa/Tunis', 'Africa/Windhoek',

  // Asia
  'Asia/Aden', 'Asia/Almaty', 'Asia/Amman', 'Asia/Anadyr', 'Asia/Aqtau', 'Asia/Aqtobe', 'Asia/Ashgabat', 'Asia/Atyrau', 'Asia/Baghdad', 'Asia/Bahrain', 'Asia/Baku', 'Asia/Bangkok', 'Asia/Barnaul', 'Asia/Beirut', 'Asia/Bishkek', 'Asia/Brunei', 'Asia/Chita', 'Asia/Choibalsan', 'Asia/Colombo', 'Asia/Damascus', 'Asia/Dhaka', 'Asia/Dili', 'Asia/Dubai', 'Asia/Dushanbe', 'Asia/Famagusta', 'Asia/Gaza', 'Asia/Hebron', 'Asia/Ho_Chi_Minh', 'Asia/Hong_Kong', 'Asia/Hovd', 'Asia/Irkutsk', 'Asia/Jakarta', 'Asia/Jayapura', 'Asia/Jerusalem', 'Asia/Kabul', 'Asia/Kamchatka', 'Asia/Karachi', 'Asia/Kathmandu', 'Asia/Khandyga', 'Asia/Kolkata', 'Asia/Krasnoyarsk', 'Asia/Kuala_Lumpur', 'Asia/Kuching', 'Asia/Kuwait', 'Asia/Macau', 'Asia/Magadan', 'Asia/Makassar', 'Asia/Manila', 'Asia/Muscat', 'Asia/Nicosia', 'Asia/Novokuznetsk', 'Asia/Novosibirsk', 'Asia/Omsk', 'Asia/Oral', 'Asia/Phnom_Penh', 'Asia/Pontianak', 'Asia/Pyongyang', 'Asia/Qatar', 'Asia/Qostanay', 'Asia/Qyzylorda', 'Asia/Riyadh', 'Asia/Sakhalin', 'Asia/Samarkand', 'Asia/Seoul', 'Asia/Shanghai', 'Asia/Singapore', 'Asia/Srednekolymsk', 'Asia/Taipei', 'Asia/Tashkent', 'Asia/Tbilisi', 'Asia/Tehran', 'Asia/Thimphu', 'Asia/Tokyo', 'Asia/Tomsk', 'Asia/Ulaanbaatar', 'Asia/Urumqi', 'Asia/Ust-Nera', 'Asia/Vientiane', 'Asia/Vladivostok', 'Asia/Yakutsk', 'Asia/Yangon', 'Asia/Yekaterinburg', 'Asia/Yerevan',

  // Australia/Oceania
  'Antarctica/Casey', 'Antarctica/Davis', 'Antarctica/DumontDUrville', 'Antarctica/Macquarie', 'Antarctica/Mawson', 'Antarctica/McMurdo', 'Antarctica/Palmer', 'Antarctica/Rothera', 'Antarctica/Syowa', 'Antarctica/Troll', 'Antarctica/Vostok', 'Australia/Adelaide', 'Australia/Brisbane', 'Australia/Broken_Hill', 'Australia/Currie', 'Australia/Darwin', 'Australia/Eucla', 'Australia/Hobart', 'Australia/Lindeman', 'Australia/Lord_Howe', 'Australia/Melbourne', 'Australia/Perth', 'Australia/Sydney', 'Pacific/Apia', 'Pacific/Auckland', 'Pacific/Bougainville', 'Pacific/Chatham', 'Pacific/Chuuk', 'Pacific/Easter', 'Pacific/Efate', 'Pacific/Enderbury', 'Pacific/Fakaofo', 'Pacific/Fiji', 'Pacific/Funafuti', 'Pacific/Galapagos', 'Pacific/Gambier', 'Pacific/Guadalcanal', 'Pacific/Guam', 'Pacific/Honolulu', 'Pacific/Kiritimati', 'Pacific/Kosrae', 'Pacific/Kwajalein', 'Pacific/Majuro', 'Pacific/Marquesas', 'Pacific/Midway', 'Pacific/Nauru', 'Pacific/Niue', 'Pacific/Norfolk', 'Pacific/Noumea', 'Pacific/Pago_Pago', 'Pacific/Palau', 'Pacific/Pitcairn', 'Pacific/Pohnpei', 'Pacific/Port_Moresby', 'Pacific/Rarotonga', 'Pacific/Saipan', 'Pacific/Tahiti', 'Pacific/Tarawa', 'Pacific/Tongatapu', 'Pacific/Wake', 'Pacific/Wallis'
];

const loadChurchesChirho = async () => {
  try {
    churchesChirho.value = await getChurchesChirho();
    filterChurchesChirho();
  } catch (error) {
    console.error('Failed to load churches:', error);
  }
};

const loadContinentsChirho = async () => {
  try {
    continentsChirho.value = await getContinentsChirho();
  } catch (error) {
    console.error('Failed to load continents:', error);
  }
};

const filterChurchesChirho = () => {
  const continentIdChirho = route.query.continent as string;
  if (continentIdChirho) {
    filteredChurchesChirho.value = churchesChirho.value.filter(
      church => church.continent_id_chirho === continentIdChirho
    );
  } else {
    filteredChurchesChirho.value = churchesChirho.value;
  }
};

// Watch for route changes to update the filter
watch(() => route.query.continent, () => {
  filterChurchesChirho();
});

const getContinentNameChirho = (continentIdChirho: string | null) => {
  if (!continentIdChirho) return 'None';
  const continentChirho = continentsChirho.value.find(c => c.continent_id_chirho === continentIdChirho);
  return continentChirho ? continentChirho.name_chirho : 'Unknown';
};

const editChurchChirho = (churchChirho: ChurchChirho) => {
  editingChurchChirho.value = churchChirho;
  churchFormChirho.value = {
    name_chirho: churchChirho.name_chirho,
    continent_id_chirho: churchChirho.continent_id_chirho || '',
    church_timezone_chirho: churchChirho.church_timezone_chirho,
    leader_name_chirho: churchChirho.leader_name_chirho || '',
    leader_email_chirho: churchChirho.leader_email_chirho || '',
    admin_details_note_chirho: churchChirho.admin_details_note_chirho || '',
    internal_notes_chirho: churchChirho.internal_notes_chirho || ''
  };
  showCreateModalChirho.value = true;
};

const saveChurchChirho = async () => {
  try {
    if (!churchFormChirho.value.name_chirho || !churchFormChirho.value.church_timezone_chirho) {
      console.error('Name and timezone are required');
      return;
    }

    if (editingChurchChirho.value) {
      await updateChurchChirho(editingChurchChirho.value.church_id_chirho, churchFormChirho.value as UpdateChurchChirho);
    } else {
      await createChurchChirho({
        name_chirho: churchFormChirho.value.name_chirho,
        continent_id_chirho: churchFormChirho.value.continent_id_chirho || null,
        church_timezone_chirho: churchFormChirho.value.church_timezone_chirho,
        leader_name_chirho: churchFormChirho.value.leader_name_chirho || null,
        leader_email_chirho: churchFormChirho.value.leader_email_chirho || null,
        admin_details_note_chirho: churchFormChirho.value.admin_details_note_chirho || null,
        internal_notes_chirho: churchFormChirho.value.internal_notes_chirho || null,
        member_access_token_chirho: '' // This will be generated by the backend
      });
    }
    await loadChurchesChirho();
    showCreateModalChirho.value = false;
    editingChurchChirho.value = null;
    churchFormChirho.value = {
      name_chirho: '',
      continent_id_chirho: '',
      church_timezone_chirho: '',
      leader_name_chirho: '',
      leader_email_chirho: '',
      admin_details_note_chirho: '',
      internal_notes_chirho: ''
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

// Map continent IDs to colors
const getContinentColorChirho = (continentIdChirho: string): string => {
  const colorMapChirho: { [key: string]: string } = {
    '1': 'blue',
    '2': 'green',
    '3': 'purple',
    '4': 'red',
    '5': 'yellow',
    '6': 'indigo',
    '7': 'pink'
  };
  return colorMapChirho[continentIdChirho] || 'gray';
};

const editContinentTimezoneChirho = (continent: ContinentChirho) => {
  editingContinentChirho.value = { ...continent };
  showEditTimezoneModalChirho.value = true;
};

const saveContinentTimezoneChirho = async () => {
  if (!editingContinentChirho.value) return;
  
  try {
    await updateContinentChirho(editingContinentChirho.value.continent_id_chirho, {
      name_chirho: editingContinentChirho.value.name_chirho,
      centralized_timezone_chirho: editingContinentChirho.value.centralized_timezone_chirho || null
    });
    await loadContinentsChirho();
    showEditTimezoneModalChirho.value = false;
    editingContinentChirho.value = null;
  } catch (error) {
    console.error('Failed to update continent timezone:', error);
  }
};

onMounted(() => {
  loadChurchesChirho();
  loadContinentsChirho();
});
</script>

<style scoped>
.churches-view-chirho {
  @apply p-4;
}
</style> 