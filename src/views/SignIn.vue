<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();

onMounted(() => {
  if(route.query.code) {
    store.commit('login/setLogged', true);
    store.commit('login/setCode', route.query.code);

    console.log(store.getters['login/getCode']);
    console.log(store.getters['login/getLogged']);
  }
})

// let selectedItem = computed(() => store.getters.getSelectedItem)

function checkToken() {

}
</script>

<template>
  <div>SignIn</div>
</template>