<script setup>
import { computed, onMounted, inject } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const $axios = inject('axios');
const store = useStore();
const route = useRoute();

onMounted(() => {
  // console.log(store.getters['login/getCode'])
  // console.log(store.getters['login/getLogged'])
  // check token, if not valid redirect to logout
  checkToken(store.getters['login/getCode'])

})

function checkToken(code) {
  console.log(code)
  $axios.get(import.meta.env.VITE_API_URL + '/')
  .then((data)=>{
    console.log(data.data)
  }).catch((err)=>{
    console.log(err)
  })

}
</script>

<template>
  <div>LoggedIn</div>
  <div>Component - Choose Search (default) or list view</div>
  <div>component - search bar or pagination</div>
  <div>component - Entries View</div>
</template>