<script setup>
import { ref, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import SearchComponent from "/src/components/Search.vue";
import ListComponent from "/src/components/List.vue";
import MarkedComponent from "/src/components/Marked.vue";
import EditModal from "/src/components/EditEntry.vue";

const store = useStore();
const router = useRouter();

let modal = reactive({
  open: false,
  mode: "create",
  propagateRefresh: false,
});
let form = reactive({
  id: "",
  service: "",
  login: "",
  password: "",
  serviceLink: "",
  mark: false,
});
let selected = ref("search");

onMounted(() => {
  checkToken();
});

function checkToken() {
  store
    .dispatch("login/checkToken")
    .then(() => {
      store.dispatch("entries/retrieveEncKey");
    })
    .catch((e) => {
      // console.log(e.message)
      router.push("/login");
    });
}

function openCreate() {
  form.id = "";
  form.service = "";
  form.login = "";
  form.password = "";
  form.serviceLink = "";
  form.mark = false;
  modal.open = true;
  modal.mode = "create";
}

function openEdit(entry) {
  form.id = entry.id;
  form.service = entry.service;
  form.login = entry.login;
  form.password = entry.password;
  form.serviceLink = entry.serviceLink;
  form.mark = entry.mark;
  modal.mode = "Edit";
  modal.open = true;
}

function closeModal(refresh) {
  modal.open = false;
  if (refresh) modal.propagateRefresh = true;
}
</script>

<template>
  <div class="container mx-auto">
    <div v-if="modal.open">
      <div
        class="fixed z-20 top-0 left-0 w-screen h-screen flex items-center justify-center"
        style="background-color: rgba(183, 158, 127, 0.4)"
        @click.self="modal.open = false"
      >
        <EditModal
          v-bind:entry="form"
          v-bind:mode="modal.mode"
          @closeModal="closeModal"
        />
      </div>
    </div>
    <div>
      <ul class="flex border-b border-orange-800 my-2">
        <li class="-mb-px mr-1">
          <a
            :class="
              selected === 'search'
                ? 'bg-white inline-block border-l border-t border-r border-orange-800 rounded-t py-2 px-4 text-orange-300 font-semibold'
                : 'bg-white inline-block py-2 px-4 text-orange-600 hover:text-orange-800 font-semibold cursor-pointer'
            "
            @click="selected = 'search'"
            >Search</a
          >
        </li>
        <li class="-mb-px mr-1">
          <a
            :class="
              selected === 'list'
                ? 'bg-white inline-block border-l border-t border-r border-orange-800 rounded-t py-2 px-4 text-orange-300 font-semibold'
                : 'bg-white inline-block py-2 px-4 text-orange-600 hover:text-orange-800 font-semibold cursor-pointer'
            "
            @click="selected = 'list'"
            >List</a
          >
        </li>
        <li class="-mb-px mr-1">
          <a
            :class="
              selected === 'marked'
                ? 'bg-white inline-block border-l border-t border-r border-orange-800 rounded-t py-2 px-4 text-orange-300 font-semibold'
                : 'bg-white inline-block py-2 px-4 text-orange-600 hover:text-orange-800 font-semibold cursor-pointer'
            "
            @click="selected = 'marked'"
            >Marked</a
          >
        </li>
        <li class="-mb-px w-full flex justify-end mb-1 mr-2">
          <a
            class="inline-block border border-orange-600 rounded py-1 px-3 bg-orange-600 hover:bg-orange-800 text-zinc-100 cursor-pointer"
            @click="openCreate()"
            >Create</a
          >
        </li>
      </ul>
      <SearchComponent
        v-if="selected === 'search'"
        @editEntry="openEdit"
        v-bind:refresh="modal.propagateRefresh"
        @refreshed="modal.propagateRefresh = false"
      />
      <ListComponent
        v-if="selected === 'list'"
        @editEntry="openEdit"
        v-bind:refresh="modal.propagateRefresh"
        @refreshed="modal.propagateRefresh = false"
      />
      <MarkedComponent
        v-if="selected === 'marked'"
        @editEntry="openEdit"
        v-bind:refresh="modal.propagateRefresh"
        @refreshed="modal.propagateRefresh = false"
      />
    </div>
  </div>
</template>
