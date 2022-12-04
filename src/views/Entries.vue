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
  checkToken(store.getters['login/getIdToken'])

})


function checkToken(token) {
  console.log(token)
}
</script>

<template>
  <div>LoggedIn</div>
  <div>Component - Choose Search (default) or list view</div>
  <div>component - search bar or pagination</div>
  <div>component - Entries View</div>
</template>