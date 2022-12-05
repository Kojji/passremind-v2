<script setup>
import { computed, ref, onMounted, inject } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import SearchComponent from '/src/components/Search.vue';
import ListComponent from '/src/components/List.vue';


const $axios = inject('axios');
const store = useStore();
const route = useRoute();

let selected = ref('search');

onMounted(() => {
  // console.log(store.getters['login/getCode'])
  // console.log(store.getters['login/getLogged'])
  // check token, if not valid redirect to logout
  checkToken(store.getters['login/getIdToken'])

})


function checkToken(token) {
  console.log(token)
}

function openCreate() {
  console.log('open create')
}
</script>

<template>
  <div class="container mx-auto">
    <ul class="flex border-b border-orange-800 mb-2">
      <li class="-mb-px mr-1">
        <a :class="selected === 'search' ? 'bg-white inline-block border-l border-t border-r border-orange-800 rounded-t py-2 px-4 text-orange-300 font-semibold' : 'bg-white inline-block py-2 px-4 text-orange-600 hover:text-orange-800 font-semibold cursor-pointer'" @click="selected = 'search'">Search</a>
      </li>
      <li class="-mb-px mr-1">
        <a :class="selected === 'list' ? 'bg-white inline-block border-l border-t border-r border-orange-800 rounded-t py-2 px-4 text-orange-300 font-semibold' : 'bg-white inline-block py-2 px-4 text-orange-600 hover:text-orange-800 font-semibold cursor-pointer'" @click="selected = 'list'">List</a>
      </li>
      <li class="-mb-px w-full flex justify-end mb-1 mr-2">
        <a class="inline-block border border-orange-600 rounded py-1 px-3 bg-orange-600 text-zinc-100" @click="openCreate()">Create</a>
      </li>
    </ul>
    <SearchComponent v-if="selected === 'search'" />
    <ListComponent v-else />
  </div>
</template>