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
</script>

<template>
  <div class="container mx-auto">
    <ul class="flex border-b">
      <li class="-mb-px mr-1">
        <a :class="selected === 'search' ? 'bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold' : 'bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold cursor-pointer'" @click="selected = 'search'">Search</a>
      </li>
      <li class="-mb-px mr-1">
        <a :class="selected === 'list' ? 'bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold' : 'bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold cursor-pointer'" @click="selected = 'list'">List</a>
      </li>
    </ul>
    <SearchComponent v-if="selected === 'search'" />
    <ListComponent v-else />
  </div>
</template>