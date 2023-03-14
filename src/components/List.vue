<script setup>
import { useStore } from 'vuex';
import { computed, onMounted, reactive } from 'vue';

const store = useStore();
let entries = computed(() => store.getters['entries/getListEntries']);
let query = reactive({
  page: 1,
  perPage: 8,
  next: false,
  prev: false,
  total: 0
})
let loading = reactive({value : true});

onMounted(async () => {
  checkToken(store.getters['login/getIdToken'])
  list()
})

async function list() {
  loading.value = true;
  await store.dispatch('entries/listEntries', {
    page: query.page,
    perPage: query.perPage,
    idToken: store.getters['login/getIdToken']
  })
  loading.value = false;
}

function copyText(text) {
  let information = {
    duration: 3,
    message: "Password copied to clipboard",
    type: "success"
  }
  navigator.clipboard.writeText(text)
    .then(()=>{
      store.dispatch('misc/activateNotification', information)
    })
}

function checkToken(token) {
  console.log(token)
}
</script>

<template>
  <div class="grid grid-flow-col grid-rows-4 gap-3" style="height: 60vh">
    <div class="row-span-1 col-span-1 flex items-center justify-center">
      <div class="flex flex-col items-center">
        <span class="text-sm text-gray-700">
          Showing <span class="font-semibold text-gray-700">{{((query.perPage * (query.page - 1)) + 1)}}</span> to <span class="font-semibold text-gray-700">{{((query.perPage * query.page) > query.total ? query.total : (query.perPage * query.page))}}</span> of <span class="font-semibold text-gray-700">{{query.total}}</span> Entries
        </span>
        <div class="inline-flex mt-2 xs:mt-0">
            <button :class="query.prev ? 'px-4 py-2 text-sm font-medium text-zinc-700 bg-zinc-200 rounded-l hover:bg-zinc-500 hover:text-zinc-200' : 'px-4 py-2 text-sm font-medium text-white bg-zinc-100 rounded-l cursor-not-allowed'" @click="query.page--; list()">
              Prev
            </button>
            <button :class="query.next ? 'px-4 py-2 text-sm font-medium text-zinc-700 bg-zinc-200 border-0 border-l border-white rounded-r hover:bg-zinc-500 hover:text-zinc-200' : 'px-4 py-2 text-sm font-medium text-white bg-zinc-100 border-0 border-l border-white rounded-r cursor-not-allowed'" @click="query.page++; list()">
              Next
            </button>
        </div>
      </div>
    </div>
    <div class="relative shadow-inner appearance-none border rounded leading-tight row-span-3 col-span-1">
      <div :class="loading.value ? 'absolute bg-zinc-50 rounded leading-tight w-full h-full flex items-center justify-center' : 'absolute invisible'">
        <svg class="inline mr-2 w-10 h-10 text-gray-400 animate-spin fill-orange-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
      </div>
      <div v-if="(entries.length === 0)" class="p-2 w-full h-full flex items-center justify-center text-zinc-400">no results were found!</div>
      <div v-else class="p-2 grid grid-rows-2 grid-cols-4 gap-2 auto-cols-max h-full">
        <div v-for="entry of entries" :id="entry.id" class="row-span-1 col-span-1 rounded p-2 flex flex-wrap content-center" style="box-shadow: 0 4px 6px -1px rgba(234, 152, 37, 0.5), 0 2px 4px -1px rgba(234, 152, 37, 0.06);" @click="$emit('editEntry', entry)">
          <p class="text-left font-semibold">{{ entry.service }}</p>
          <div class="w-full flex justify-between">
            <p>{{(entry.login.length > 14 ? entry.login.slice(0,12) + '...' : entry.login)}}</p>
            <font-awesome-icon class="cursor-pointer" icon="fa-solid fa-copy" @click.stop="copyText(entry.login)"/>
          </div>
          <div class="w-full flex justify-between">
            <p>{{entry.password.replace(/./g, '*')}}</p>
            <font-awesome-icon class="cursor-pointer" icon="fa-solid fa-copy" @click.stop="copyText(entry.password)"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>