<script setup>
import { useStore } from 'vuex';
import { computed, onMounted, ref, inject, reactive } from 'vue';
const $axios = inject('axios');
const store = useStore();
let entries = computed(() => store.getters['entries/getListEntries']);
let query = reactive({
  page: 1,
  perPage: 8,
  next: false,
  prev: false,
  total: 0
})

onMounted(async () => {
  checkToken(store.getters['login/getIdToken'])
  list()
})

function list() {
  $axios.get(
    import.meta.env.VITE_API_URL + '/list/',
    {
      headers: {
        'Authorization': 'Bearer ' + store.getters['login/getIdToken'],
        'Accept' : 'application/json',
        'key': 'AES_KEY'
      },
      params: {
        'page': query.page,
        'perPage': 8
      }
    }
  ).then((data)=>{
    query.total = data.data.query.total;
    query.prev = data.data.query.previous;
    query.next = data.data.query.next;
    console.log(data.data)
    if(data.data.success) {
      store.commit('entries/setListEntries', data.data.data)
    } else {

    }
  }).catch((err)=>{
    console.log(err)
  })
}

function openCard(entry) {
  console.log(entry)
}

function copyText(text) {
  console.log(text)
  navigator.clipboard.writeText(text)
    .then(()=>{
      console.log("Copiado")
    })
  
  //corrigir - avisar que foi copiado
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
          Showing <span class="font-semibold text-gray-700">{{((query.perPage * (query.page - 1)) + 1)}}</span> to <span class="font-semibold text-gray-700">{{(query.perPage * query.page)}}</span> of <span class="font-semibold text-gray-700">{{query.total}}</span> Entries
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
    <div class="shadow-inner appearance-none border rounded py-2 px-3 leading-tight row-span-3 col-span-1">
      <div v-if="(entries.length === 0)" class="w-full h-full flex items-center justify-center text-zinc-400">no results were found!</div>
      <div v-else class="grid grid-rows-2 grid-cols-4 gap-2 auto-cols-max h-full">
        <div v-for="entry of entries" :id="entry.id" class="row-span-1 col-span-1 rounded p-2 flex flex-wrap content-center" style="box-shadow: 0 4px 6px -1px rgba(234, 152, 37, 0.5), 0 2px 4px -1px rgba(234, 152, 37, 0.06);" @click="openCard(entry)">
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