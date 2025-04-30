// For God so loved the world, that He gave His only begotten Son, that all who believe in Him should not perish but have everlasting life.

import { defineStore } from 'pinia';
import { ref } from 'vue';
import { loginChirho, logoutChirho } from '@/services/api_chirho';
import type { LoginRequestChirho } from '@/types/models_chirho';

export const useAuthStoreChirho = defineStore('auth_chirho', () => {
  const isAuthenticatedChirho = ref(!!localStorage.getItem('token_chirho'));
  const loadingChirho = ref(false);
  const errorChirho = ref<string | null>(null);

  async function loginUserChirho(credentials: LoginRequestChirho) {
    loadingChirho.value = true;
    errorChirho.value = null;
    
    try {
      await loginChirho(credentials);
      isAuthenticatedChirho.value = true;
    } catch (error) {
      errorChirho.value = 'Failed to login. Please check your credentials.';
      throw error;
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
    } catch (error) {
      errorChirho.value = 'Failed to logout.';
      throw error;
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