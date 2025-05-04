// For God so loved the world, that He gave His only begotten Son, that all who believe in Him should not perish but have everlasting life.

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
console.log('Hallelujah API_BASE_URL:', API_BASE_URL);
import axios from 'axios';
import type {
  LoginRequestChirho,
  LoginResponseChirho,
  ChurchChirho,
  ContinentChirho,
  ScheduleChirho,
  HourlySignupChirho,
  ScheduleQueryChirho,
  CreateContinentChirho,
  UpdateContinentChirho,
  CreateChurchChirho,
  UpdateChurchChirho,
  CreateScheduleChirho,
  UpdateScheduleChirho,
  CreateHourlySignupChirho,
  UpdateHourlySignupChirho
} from '@/types/models_chirho';
import { useAuthStoreChirho } from '@/stores/auth_store_chirho';

const api_chirho = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for auth token
api_chirho.interceptors.request.use((config_chirho) => {
  const token_chirho = localStorage.getItem('token_chirho');
  console.log('Token from localStorage:', token_chirho);
  console.log('Request URL:', config_chirho.url);
  console.log('Request Headers:', config_chirho.headers);
  
  if (token_chirho) {
    config_chirho.headers.Authorization = `Bearer ${token_chirho}`;
    console.log('Authorization header set:', config_chirho.headers.Authorization);
  }
  return config_chirho;
});

// Add response interceptor for token refresh
api_chirho.interceptors.response.use(
  (response_chirho) => response_chirho,
  async (error_chirho) => {
    if (error_chirho.response?.status === 401) {
      const authStoreChirho = useAuthStoreChirho();
      await authStoreChirho.logoutUserChirho();
      window.location.href = '/login_chirho';
    }
    return Promise.reject(error_chirho);
  }
);

// Auth endpoints
export const loginChirho = async (credentials_chirho: LoginRequestChirho): Promise<LoginResponseChirho> => {
  const response_chirho = await api_chirho.post('/api_chirho/admin_chirho/auth_chirho/login_chirho', credentials_chirho);
  console.log('Login response:', response_chirho.data);
  const { token_chirho } = response_chirho.data;
  console.log('Token from response:', token_chirho);
  localStorage.setItem('token_chirho', token_chirho);
  console.log('Token stored in localStorage:', localStorage.getItem('token_chirho'));
  return response_chirho.data;
};

export const logoutChirho = async (): Promise<void> => {
  localStorage.removeItem('token_chirho');
  localStorage.removeItem('refresh_token_chirho');
  await api_chirho.post('/api_chirho/admin_chirho/auth_chirho/logout_chirho');
};

// Continent endpoints
export const getContinentsChirho = async (): Promise<ContinentChirho[]> => {
  const response_chirho = await api_chirho.get('/api_chirho/admin_chirho/continents_chirho');
  return response_chirho.data;
};

export const getContinentChirho = async (continent_id_chirho: string): Promise<ContinentChirho> => {
  const response_chirho = await api_chirho.get(`/api_chirho/admin_chirho/continents_chirho/${continent_id_chirho}`);
  return response_chirho.data;
};

export const createContinentChirho = async (continent_chirho: CreateContinentChirho): Promise<ContinentChirho> => {
  const response_chirho = await api_chirho.post('/api_chirho/admin_chirho/continents_chirho', continent_chirho);
  return response_chirho.data;
};

export const updateContinentChirho = async (continent_id_chirho: string, continent_chirho: UpdateContinentChirho): Promise<ContinentChirho> => {
  const response_chirho = await api_chirho.put(`/api_chirho/admin_chirho/continents_chirho/${continent_id_chirho}`, continent_chirho);
  return response_chirho.data;
};

export const deleteContinentChirho = async (continent_id_chirho: string): Promise<void> => {
  await api_chirho.delete(`/api_chirho/admin_chirho/continents_chirho/${continent_id_chirho}`);
};

// Church endpoints
export const getChurchesChirho = async (): Promise<ChurchChirho[]> => {
  const response_chirho = await api_chirho.get('/api_chirho/admin_chirho/churches_chirho');
  return response_chirho.data;
};

export const getChurchChirho = async (church_id_chirho: string): Promise<ChurchChirho> => {
  const response_chirho = await api_chirho.get(`/api_chirho/admin_chirho/churches_chirho/${church_id_chirho}`);
  return response_chirho.data;
};

export const createChurchChirho = async (church_chirho: CreateChurchChirho): Promise<ChurchChirho> => {
  const response_chirho = await api_chirho.post('/api_chirho/admin_chirho/churches_chirho', church_chirho);
  return response_chirho.data;
};

export const updateChurchChirho = async (church_id_chirho: string, church_chirho: UpdateChurchChirho): Promise<ChurchChirho> => {
  const response_chirho = await api_chirho.put(`/api_chirho/admin_chirho/churches_chirho/${church_id_chirho}`, church_chirho);
  return response_chirho.data;
};

export const deleteChurchChirho = async (church_id_chirho: string): Promise<void> => {
  await api_chirho.delete(`/api_chirho/admin_chirho/churches_chirho/${church_id_chirho}`);
};

// Schedule endpoints
export const getSchedulesChirho = async (query_chirho?: ScheduleQueryChirho): Promise<ScheduleChirho[]> => {
  const response_chirho = await api_chirho.get('/api_chirho/admin_chirho/schedule_chirho', { params: query_chirho });
  return response_chirho.data;
};

export const getScheduleChirho = async (schedule_id_chirho: string): Promise<ScheduleChirho> => {
  const response_chirho = await api_chirho.get(`/api_chirho/admin_chirho/schedule_chirho/${schedule_id_chirho}`);
  return response_chirho.data;
};

export const createScheduleChirho = async (schedule_chirho: CreateScheduleChirho): Promise<ScheduleChirho> => {
  console.log('Creating schedule:', schedule_chirho);
  const response_chirho = await api_chirho.post('/api_chirho/admin_chirho/schedule_chirho/assign_chirho', {
    church_id_chirho: schedule_chirho.church_id_chirho,
    worship_date_chirho: schedule_chirho.worship_date_chirho,
    assigned_by_admin_id_chirho: "00000000-0000-0000-0000-000000000201"
  });
  return response_chirho.data;
};

export const updateScheduleChirho = async (schedule_id_chirho: string, schedule_chirho: UpdateScheduleChirho): Promise<ScheduleChirho> => {
  const _response1_chirho = await api_chirho.delete(`/api_chirho/admin_chirho/schedule_chirho/unassign_chirho/${schedule_id_chirho}`);
  const response2_chirho = await api_chirho.post('/api_chirho/admin_chirho/schedule_chirho/assign_chirho', {
    church_id_chirho: schedule_chirho.church_id_chirho,
    worship_date_chirho: schedule_chirho.worship_date_chirho,
    assigned_by_admin_id_chirho: "00000000-0000-0000-0000-000000000201"
  });
  return response2_chirho.data;
};

export const deleteScheduleChirho = async (schedule_id_chirho: string): Promise<void> => {
  await api_chirho.delete(`/api_chirho/admin_chirho/schedule_chirho/unassign_chirho/${schedule_id_chirho}`);
};

export const assignScheduleChirho = async (church_id_chirho: string, worship_date_chirho: string): Promise<ScheduleChirho> => {
  const response_chirho = await api_chirho.post('/api_chirho/admin_chirho/schedules_chirho/assign_chirho', [church_id_chirho, worship_date_chirho]);
  return response_chirho.data;
};

export const unassignScheduleChirho = async (church_id_chirho: string, worship_date_chirho: string): Promise<void> => {
  await api_chirho.delete(`/api_chirho/admin_chirho/schedules_chirho/unassign_chirho/${church_id_chirho}/${worship_date_chirho}`);
};

// Hourly Signup endpoints
export const getHourlySignupsChirho = async (): Promise<HourlySignupChirho[]> => {
  const response_chirho = await api_chirho.get('/api_chirho/admin_chirho/hourly_signups_chirho');
  return response_chirho.data;
};

export const getHourlySignupChirho = async (signup_id_chirho: string): Promise<HourlySignupChirho> => {
  const response_chirho = await api_chirho.get(`/api_chirho/admin_chirho/hourly_signups_chirho/${signup_id_chirho}`);
  return response_chirho.data;
};

export const createHourlySignupChirho = async (signup_chirho: CreateHourlySignupChirho, church_token_chirho: string): Promise<HourlySignupChirho> => {
  console.log('Creating hourly signup:', signup_chirho);
  const response_chirho = await api_chirho.post(`/api_chirho/public_chirho/church_chirho/${church_token_chirho}/assign_to_schedule_chirho/${signup_chirho.schedule_id_chirho}`, signup_chirho);
  return response_chirho.data;
};

export const updateHourlySignupChirho = async (signup_id_chirho: string, signup_chirho: UpdateHourlySignupChirho): Promise<HourlySignupChirho> => {
  const response_chirho = await api_chirho.put(`/api_chirho/admin_chirho/hourly_signups_chirho/${signup_id_chirho}`, signup_chirho);
  return response_chirho.data;
};

export const deleteHourlySignupChirho = async (signup_id_chirho: string, church_token_chirho: string): Promise<void> => {
  await api_chirho.delete(`/api_chirho/public_chirho/church_chirho/${church_token_chirho}/signup_chirho/${signup_id_chirho}`);
};

// Public endpoints
export const getPublicChurchesChirho = async (): Promise<ChurchChirho[]> => {
  const response_chirho = await api_chirho.get('/api_chirho/public_chirho/churches_chirho');
  return response_chirho.data;
};

export const getPublicChurchChirho = async (church_id_chirho: string): Promise<ChurchChirho> => {
  const response_chirho = await api_chirho.get(`/api_chirho/public_chirho/churches_chirho/${church_id_chirho}`);
  return response_chirho.data;
};

export const getPublicSchedulesChirho = async (query_chirho?: ScheduleQueryChirho): Promise<ScheduleChirho[]> => {
  const response_chirho = await api_chirho.get('/api_chirho/public_chirho/schedules_chirho', { params: query_chirho });
  return response_chirho.data;
};

export const getPublicScheduleChirho = async (schedule_id_chirho: string): Promise<ScheduleChirho> => {
  const response_chirho = await api_chirho.get(`/api_chirho/public_chirho/schedules_chirho/${schedule_id_chirho}`);
  return response_chirho.data;
};

export const getUpcomingSchedulesChirho = async (query_chirho?: ScheduleQueryChirho): Promise<ScheduleChirho[]> => {
  const response_chirho = await api_chirho.get('/api_chirho/public_chirho/schedules_chirho/upcoming_chirho', { params: query_chirho });
  return response_chirho.data;
};

export const getChurchByTokenChirho = async (tokenChirho: string): Promise<ChurchChirho> => {
  const response = await fetch(`${API_BASE_URL}/api_chirho/public_chirho/church_chirho/${tokenChirho}`);
  if (!response.ok) {
    throw new Error('Failed to fetch church');
  }
  return response.json();
};

export const getScheduleSignupsChirho = async (
  church_token_chirho: string,
  schedule_id_chirho: string
): Promise<HourlySignupChirho[]> => {
  const response_chirho = await api_chirho.get<HourlySignupChirho[]>(
    `/api_chirho/public_chirho/church_chirho/${church_token_chirho}/schedule_chirho/${schedule_id_chirho}/signups_chirho`
  );
  return response_chirho.data;
}; 