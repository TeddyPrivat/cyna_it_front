 import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getPayloadFromToken } from '@/services/getPayloadFromToken';
import { fetchUser as fetchUserData } from '@/services/user';


export const useUserStore = defineStore('user', () => {
  const user = ref<any>(null);
  const isLoggedIn = ref(false);
  const token = ref<string | null>(null);

  async function initializeUser() {
    const storedToken = localStorage.getItem('jwt');
    if (!storedToken) return;

    token.value = storedToken;

    const payload = getPayloadFromToken(storedToken);
    if (payload?.id) {
      const userData = await fetchUserData(payload.id);
      if (userData) {
        user.value = userData;
        isLoggedIn.value = true;
      }
    }
  }

  function logout() {
    user.value = null;
    isLoggedIn.value = false;
    token.value = null;
    localStorage.removeItem('jwt');
    localStorage.removeItem('roles');
  }

  return {
    user,
    isLoggedIn,
    token,
    initializeUser,
    logout,
  };
});
