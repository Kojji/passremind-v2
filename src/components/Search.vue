<script setup>
import { useStore } from 'vuex';
import { computed, ref, inject } from 'vue';
const $axios = inject('axios');
const store = useStore();
let entries = computed(() => store.getters['entries/getEntries']);
let searchText = ref('');

function search() {
  $axios.get(
    import.meta.env.VITE_API_URL + '/search/',
    {
      headers: {
        'Authorization': 'Bearer ' + store.getters['login/getIdToken'],
        'Accept' : 'application/json',
        'key': 'AES_KEY'
      },
      params: {
        'search': searchText.value,
        'perPage': 20
      }
    }
  ).then((data)=>{
    if(data.data.success) {
      store.commit('entries/setEntries', data.data.data)
    } else {

    }
  }).catch((err)=>{
    console.log(err)
  })
}
</script>

<template>
  <div class="grid grid-flow-col grid-rows-4 gap-3" style="height: 60vh">
    <div class="row-span-1 col-span-1 flex items-center justify-center">
      <div class="relative text-gray-300">
        <span class="absolute inset-y-0 right-0 flex items-center pr-1">
          <button type="submit" @click="search()" class="p-1 focus:outline-none focus:shadow-outline pr-2">
            <svg fill="none" stroke="grey" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </span>
        <input type="search" @keydown.enter="search()" name="search" v-model="searchText" class="py-2 pl-4 text-sm text-zinc-700 bg-zinc-100 rounded-md pr-10 focus:outline-zinc-300 focus:bg-white focus:text-gray-900" placeholder="Search..." autocomplete="off">
      </div>
    </div>
    <div class="shadow-inner appearance-none border rounded py-2 px-3 leading-tight row-span-3 col-span-1">
      <div v-if="(entries.length === 0)" class="w-full h-full flex items-center justify-center text-zinc-400">no results found!</div>
      <div v-else>
        <div v-for="entry of entries" :id="entry.id">
          <p>{{`${entry.id} - ${entry.service}`}}</p>
        </div>
      </div>
    </div>
  </div>
</template>