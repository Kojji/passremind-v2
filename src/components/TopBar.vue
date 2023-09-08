<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

let userLogged = computed(() => store.getters["login/getLogged"]);
function doLogout() {
  store.dispatch("login/signOut").finally(() => {
    store.commit("entries/setEncKey", null);
    router.push("login");
  });
}
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
          <button
            @click="doLogout()"
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:bg-orange-800"
            type="button"
          >
            Logout
          </button>
        </div>
        <div v-else>
          <button
            @click="$router.push('/login')"
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:bg-orange-800"
            type="button"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>
