<script setup>
import { onMounted, reactive } from 'vue';

const props = defineProps([
  'entry',
  'mode'
])

let form = reactive({
  service: '',
  login: '',
  password: '',
  serviceLink: '',
  mark: false
});

onMounted(() => {
  form.service = props.entry.service;
  form.login = props.entry.login;
  form.password = props.entry.password;
  form.serviceLink = props.entry.serviceLink;
  form.mark = props.entry.mark;
})

function createEdit() {
  console.log(JSON.parse(JSON.stringify(form)))
}

</script>

<template>
  <div class="w-full h-auto max-w-2xl">
    <div class="relative bg-white rounded-lg">
      <div class="flex items-start justify-between py-2 px-4 border-b rounded-t border-orange-300">
        <h3 class="text-xl font-semibold text-orange-600">
          {{props.mode === 'create' ? 'Create Entry' : 'Edit Entry'}}
        </h3>
        <button type="button"
          class="text-orange-600 bg-transparent hover:bg-orange-600 hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          @click="$emit('closeModal')">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
      </div>
      <div class="grid grid-flow-col grid-cols-2 gap-2 p-3">
        <div>
          <div class="py-1">
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="text" placeholder="Name" v-model="form.service">
          </div>
          <div class="py-1">
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="text" placeholder="Login" v-model="form.login">
          </div>
          <div class="py-1">
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="text" placeholder="Password" v-model="form.password">
          </div>
          <div class="py-1">
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="text" placeholder="Link" v-model="form.serviceLink">
          </div>
        </div>
        <div class="p-4">
          <div class="flex items-center m-2">
            <label for="minmax-range" class="block m-2 text-sm font-medium text-gray-900">4</label>
            <input id="minmax-range" type="range" min="4" max="16" value="8" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
            <label for="minmax-range" class="block m-2 text-sm font-medium text-gray-900">16</label>
          </div>
          <div class="flex items-center m-2">
            <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
            <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900">Uppercase</label>
          </div>
          <div class="flex items-center m-2">
            <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
            <label for="checked-checkbox" class="ml-2 text-sm font-medium text-gray-900">Lowercase</label>
          </div>
          <div class="flex items-center m-2">
            <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
            <label for="checked-checkbox" class="ml-2 text-sm font-medium text-gray-900">Numbers</label>
          </div>
          <div class="flex items-center m-2">
            <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
            <label for="checked-checkbox" class="ml-2 text-sm font-medium text-gray-900">Symbols</label>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end p-2 space-x-2 border-t border-orange-300 rounded-b">
        <button data-modal-toggle="defaultModal" type="button" @click="$emit('closeModal')" class="text-orange-600 hover:text-orange-800 bg-white hover:bg-gray-100 rounded-lg border border-orange-600 text-sm font-medium px-3 py-2 hover:text-gray-900">Cancel</button>
        <button data-modal-toggle="defaultModal" type="button" @click="createEdit()" class="bg-orange-600 text-zinc-100 hover:bg-orange-700 font-medium rounded-lg text-sm px-3 py-2 text-center">{{props.mode === 'create' ? 'Create' : 'Edit'}}</button>
      </div>
    </div>
  </div>
</template>