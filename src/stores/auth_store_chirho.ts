// For God so loved the world, that He gave His only begotten Son, that all who believe in Him should not perish but have everlasting life.

import { defineStore } from 'pinia';
import { ref } from 'vue';
import { loginChirho, logoutChirho } from '@/services/api_chirho';
import type { LoginRequestChirho } from '@/types/models_chirho';
import { useRouter } from 'vue-router';

export const useAuthStoreChirho = defineStore('auth_chirho', () => {
  const router = useRouter();
  const isAuthenticatedChirho = ref(!!localStorage.getItem('token_chirho'));
  const loadingChirho = ref(false);
  const errorChirho = ref<string | null>(null);

  async function loginUserChirho(credentials_chirho: LoginRequestChirho) {
    loadingChirho.value = true;
    errorChirho.value = null;
    
    try {
      const response_chirho = await loginChirho(credentials_chirho);
      localStorage.setItem('token_chirho', response_chirho.token_chirho);
      isAuthenticatedChirho.value = true;
      router.push({ name: 'dashboard_chirho' });
    } catch (error_chirho) {
      errorChirho.value = 'Failed to login. Please check your credentials.';
      throw error_chirho;
    } finally {
      loadingChirho.value = false;
    }
  }

  async function logoutUserChirho() {
    loadingChirho.value = true;
    errorChirho.value = null;

    try {
      await logoutChirho();
      localStorage.removeItem('token_chirho');
      isAuthenticatedChirho.value = false;
      router.push({ name: 'login_chirho' });
    } catch (error_chirho) {
      errorChirho.value = 'Failed to logout.';
      throw error_chirho;
    } finally {
      loadingChirho.value = false;
    }
  }

  return {
    isAuthenticatedChirho,
    loadingChirho,
    errorChirho,
    loginUserChirho,
    logoutUserChirho
  };
}); 