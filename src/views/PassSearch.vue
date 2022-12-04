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
  <a href="https://passremind.auth.us-east-1.amazoncognito.com/logout?client_id=3bvhhi5bvlhej5tbhi5atnhfs9&logout_uri=http://localhost:8080/about">
    <button type="button" class="flex items-center drop-shadow-xl xl:w-36 w-32 xl:h-12 h-10  rounded-md bg-amber-600 font-semibold text-lg text-zinc-100 hover:bg-amber-700">
      <p class="xl:text-base text-sm">Logout</p>
    </button>
  </a>
</template>