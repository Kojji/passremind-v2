<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
const store = useStore();
let userLogged = computed(() => store.getters.getLogged);
const loginLink = import.meta.env.VITE_LOGIN_URL;
const logoutLink = import.meta.env.VITE_LOGOUT_URL;
</script>

<template>
  <div id="nav-bar">
    <nav class="flex items-center justify-between bg-orange-600 p-2">
      <div class="flex items-center flex-shrink-0 text-zinc-100">
        <div class="rounded-full bg-zinc-100 w-8 h-8 p-0.5 mr-1">
          <img src="/src/assets/pssrLogo-128.png" alt="Passremind logo" />
        </div>
        <span class="font-semibold text-xl tracking-tight">PassRemind</span>
      </div>
      <div class="block justify-self-end">
        <!-- list and search routes links if logged -->
        <div v-if="userLogged">
          <a :href="logoutLink" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Logout</a>
        </div>
        <div v-else>
          <a :href="loginLink" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Login</a>
        </div>
      </div>
    </nav>
  </div>
</template>