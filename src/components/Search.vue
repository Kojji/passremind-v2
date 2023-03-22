<script setup>
import { useStore } from "vuex";
import { computed, onMounted, reactive, watch, ref } from "vue";

const emit = defineEmits(["refreshed", "editEntry"]);
const props = defineProps(["refresh"]);

watch(
  () => props.refresh,
  (curr, old) => {
    if (curr) {
      list();
      emit("refreshed");
    }
  }
);

const store = useStore();
let entries = computed(() => store.getters["entries/getSearchEntries"]);
let searchText = ref("");
let loading = reactive({ value: false });

async function search() {
  loading.value = true;
  await store.dispatch("entries/searchEntries", {
    idToken: store.getters["login/getIdToken"],
    search: searchText.value,
  });
  loading.value = false;
}

function openCard(entry) {
  console.log(entry);
}

function copyText(text, type) {
  let information = {
    duration: 3,
    message: `${type} copied to clipboard!`,
    type: "success",
  };
  navigator.clipboard.writeText(text).then(() => {
    store.dispatch("misc/activateNotification", information);
  });
}

function toggleMark(index) {
  let idToken = store.getters["login/getIdToken"];
  store
    .dispatch("entries/toggleMark", { idToken, index })
    .then((markStatus) => {
      store.dispatch("misc/activateNotification", {
        duration: 3,
        message: markStatus
          ? "Entry marked as favorite!"
          : "Entry unmarked as favorite!",
        type: "success",
      });
    })
    .catch(() => {
      store.dispatch("misc/activateNotification", {
        duration: 3,
        message: "Attempt to mark/unmark entry failed! Try again later!",
        type: "fail",
      });
    });
}
</script>

<template>
  <div class="grid grid-flow-col grid-rows-4 gap-3">
    <div class="row-span-1 col-span-1 flex items-center justify-center">
      <div class="relative text-grey-300 py-4">
        <span class="absolute inset-y-0 right-0 flex items-center pr-1">
          <button
            type="submit"
            @click="search()"
            class="p-1 focus:outline-none focus:shadow-outline pr-2"
          >
            <svg
              fill="none"
              stroke="grey"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-6 h-6"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </span>
        <input
          type="search"
          @keydown.enter="search()"
          name="search"
          v-model="searchText"
          class="py-2 pl-4 text-sm text-zinc-700 bg-zinc-100 rounded-md pr-10 focus:outline-zinc-300 focus:bg-white focus:text-gray-900"
          placeholder="Search..."
          autocomplete="off"
        />
      </div>
    </div>
    <div
      class="relative shadow-inner appearance-none border rounded leading-tight row-span-3 col-span-1"
    >
      <div
        :class="
          loading.value
            ? 'absolute bg-zinc-50 rounded leading-tight w-full h-full flex items-center justify-center'
            : 'absolute invisible'
        "
      >
        <svg
          class="inline mr-2 w-10 h-10 text-gray-400 animate-spin fill-orange-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
      <div
        v-if="entries.length === 0"
        class="p-2 w-full h-full flex items-center justify-center text-zinc-400"
      >
        no results were found!
      </div>
      <div
        v-else
        class="p-2 grid grid-rows-2 sm:grid-cols-3 md:grid-cols-4 grid-cols-2 gap-2 auto-cols-max h-full"
      >
        <div
          v-for="(entry, index) in entries"
          :id="entry.id"
          class="row-span-1 col-span-1 rounded p-2 flex flex-wrap content-start min-h-min border rounded leading-tight"
          @click="$emit('editEntry', entry)"
        >
          <div class="w-full flex justify-end" style="color: orangered">
            <font-awesome-icon
              v-if="entry.mark"
              class="cursor-pointer"
              icon="fa-solid fa-bookmark"
              @click.stop="toggleMark(index)"
            />
            <font-awesome-icon
              v-else
              class="cursor-pointer"
              icon="fa-regular fa-bookmark"
              @click.stop="toggleMark(index)"
            />
          </div>
          <p class="text-left font-semibold py-2">
            {{
              entry.service.length > 16
                ? entry.service.slice(0, 14) + "..."
                : entry.service
            }}
          </p>
          <div class="w-full flex justify-between">
            <p>
              {{
                entry.login.length > 14
                  ? entry.login.slice(0, 12) + "..."
                  : entry.login
              }}
            </p>
            <font-awesome-icon
              style="color: orangered"
              class="cursor-pointer"
              icon="fa-regular fa-clone"
              @click.stop="copyText(entry.login, 'Login')"
            />
          </div>
          <div class="w-full flex justify-between">
            <p>{{ entry.password.replace(/./g, "*") }}</p>
            <font-awesome-icon
              style="color: orangered"
              class="cursor-pointer"
              icon="fa-regular fa-clone"
              @click.stop="copyText(entry.password, 'Password')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
