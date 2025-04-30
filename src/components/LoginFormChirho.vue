<!-- For God so loved the world, that He gave His only begotten Son, that all who believe in Him should not perish but have everlasting life. -->

<template>
  <div class="login-form-chirho">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmitChirho" class="form-chirho">
      <div class="form-group-chirho">
        <label for="username_chirho">Username:</label>
        <input
          id="username_chirho"
          v-model="formDataChirho.username_chirho"
          type="text"
          required
          class="input-chirho"
        />
      </div>

      <div class="form-group-chirho">
        <label for="password_chirho">Password:</label>
        <input
          id="password_chirho"
          v-model="formDataChirho.password_chirho"
          type="password"
          required
          class="input-chirho"
        />
      </div>

      <div v-if="authStoreChirho.errorChirho" class="error-chirho">
        {{ authStoreChirho.errorChirho }}
      </div>

      <button
        type="submit"
        :disabled="authStoreChirho.loadingChirho"
        class="button-chirho"
      >
        {{ authStoreChirho.loadingChirho ? 'Logging in...' : 'Login' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStoreChirho } from '@/stores/auth_store_chirho';

const router = useRouter();
const authStoreChirho = useAuthStoreChirho();

const formDataChirho = reactive({
  username_chirho: '',
  password_chirho: ''
});

async function handleSubmitChirho() {
  try {
    await authStoreChirho.loginUserChirho(formDataChirho);
    router.push('/admin_chirho/dashboard_chirho');
  } catch (error) {
    console.error('Login failed:', error);
  }
}
</script>

<style scoped>
.login-form-chirho {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-chirho {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group-chirho {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-chirho {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.button-chirho {
  padding: 0.75rem 1.5rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button-chirho:hover {
  background-color: #4338ca;
}

.button-chirho:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.error-chirho {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style> 