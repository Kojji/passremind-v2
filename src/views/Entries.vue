<script setup>
import { computed, ref, onMounted, inject, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import SearchComponent from '/src/components/Search.vue';
import ListComponent from '/src/components/List.vue';
import EditModal from '/src/components/EditEntry.vue';

const store = useStore();
const route = useRoute();

let modal = reactive({
  open: false,
  mode: 'create'
});
let form = reactive({
  id: '',
  service: '',
  login: '',
  password: '',
  serviceLink: '',
  mark: false
});
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
  form.id = '';
  form.service = '';
  form.login = '';
  form.password = '';
  form.serviceLink = '';
  form.mark = false;
  modal.open = true;
  modal.mode = 'create';
}

function openEdit(entry) {
  form.id = entry.id;
  form.service = entry.service;
  form.login = entry.login;
  form.password = entry.password;
  form.serviceLink = entry.serviceLink;
  form.mark = entry.mark;
  modal.mode = 'Edit';
  modal.open = true;
}

function closeModal(status) {
  modal.open = false
}
</script>

<template>
  <div class="container mx-auto">
    <div v-if="modal.open">
      <div class="fixed z-20 top-0 left-0 w-screen h-screen flex items-center justify-center" style="background-color:rgba(183,158,127,0.4);" @click.self="modal.open = false">
        <EditModal v-bind:entry="form" v-bind:mode="modal.mode" @closeModal="closeModal(false)"/>
      </div>
    </div>
    <div>
      <ul class="flex border-b border-orange-800 mb-2">
        <li class="-mb-px mr-1">
          <a :class="selected === 'search' ? 'bg-white inline-block border-l border-t border-r border-orange-800 rounded-t py-2 px-4 text-orange-300 font-semibold' : 'bg-white inline-block py-2 px-4 text-orange-600 hover:text-orange-800 font-semibold cursor-pointer'" @click="selected = 'search'">Search</a>
        </li>
        <li class="-mb-px mr-1">
          <a :class="selected === 'list' ? 'bg-white inline-block border-l border-t border-r border-orange-800 rounded-t py-2 px-4 text-orange-300 font-semibold' : 'bg-white inline-block py-2 px-4 text-orange-600 hover:text-orange-800 font-semibold cursor-pointer'" @click="selected = 'list'">List</a>
        </li>
        <li class="-mb-px w-full flex justify-end mb-1 mr-2">
          <a class="inline-block border border-orange-600 rounded py-1 px-3 bg-orange-600 hover:bg-orange-700 text-zinc-100 cursor-pointer" @click="openCreate()" >Create</a>
        </li>
      </ul>
      <SearchComponent v-if="selected === 'search'" @editEntry="openEdit"/>
      <ListComponent v-else @editEntry="openEdit" />
    </div>
  </div>
</template>