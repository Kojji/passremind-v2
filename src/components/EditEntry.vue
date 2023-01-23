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

function generatePassword(){
  console.log('generate pass')
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
      <div class="grid grid-flow-col grid-cols-1 md:grid-cols-2 gap-2 p-3">
        <div>
          <div class="py-1">
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="text" placeholder="Name" v-model="form.service">
          </div>
          <div class="py-1">
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="text" placeholder="Login" v-model="form.login">
          </div>
          <div class="py-1">
            <div class="relative text-grey-300">
              <span class="absolute inset-y-0 right-0 flex items-center pr-1">
                <button type="submit" @click="generatePassword()" class="p-1 outline-none pr-2">
                  <svg fill="none" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6">
                    <path d="M7 10C5.89543 10 5 10.8954 5 12C5 13.1046 5.89543 14 7 14C8.10457 14 9 13.1046 9 12C9 10.8954 8.10457 10 7 10Z" fill="#c94c26"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 6.25C3.82436 6.25 1.25 8.82436 1.25 12C1.25 15.1756 3.82436 17.75 7 17.75C9.18057 17.75 11.0762 16.5363 12.0508 14.75H15.25V17C15.25 17.4142 15.5858 17.75 16 17.75H19.5C19.9142 17.75 20.25 17.4142 20.25 17V14.75H22C22.4142 14.75 22.75 14.4142 22.75 14V11C22.75 10.0335 21.9665 9.25 21 9.25H12.0508C11.0762 7.46371 9.18057 6.25 7 6.25ZM2.75 12C2.75 9.65279 4.65279 7.75 7 7.75C8.74161 7.75 10.2402 8.79769 10.8967 10.3003C11.016 10.5734 11.2859 10.75 11.584 10.75H21C21.1381 10.75 21.25 10.8619 21.25 11V13.25H19.5C19.0858 13.25 18.75 13.5858 18.75 14V16.25H16.75V14C16.75 13.5858 16.4142 13.25 16 13.25H11.584C11.2859 13.25 11.016 13.4266 10.8967 13.6997C10.2402 15.2023 8.74161 16.25 7 16.25C4.65279 16.25 2.75 14.3472 2.75 12Z" fill="#c94c26"/>
                  </svg>
                </button>
              </span>
              <input type="text" v-model="form.password" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" placeholder="Password" autocomplete="off">
            </div>
            <!-- <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="text" placeholder="Password" v-model="form.password"> -->
          </div>
          <div class="py-1">
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="text" placeholder="Link" v-model="form.serviceLink">
          </div>
        </div>
        <div class="p-4 hidden md:block">
          <div class="flex items-center m-2">
            <label for="minmax-range" class="block m-2 text-sm font-medium text-gray-900">4</label>
            <input id="minmax-range" type="range" min="4" max="16" value="8" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
            <label for="minmax-range" class="block m-2 text-sm font-medium text-gray-900">16</label>
          </div>
          <div class="flex items-center m-2">
            <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded">
            <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900">Uppercase</label>
          </div>
          <div class="flex items-center m-2">
            <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded">
            <label for="checked-checkbox" class="ml-2 text-sm font-medium text-gray-900">Lowercase</label>
          </div>
          <div class="flex items-center m-2">
            <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded">
            <label for="checked-checkbox" class="ml-2 text-sm font-medium text-gray-900">Numbers</label>
          </div>
          <div class="flex items-center m-2">
            <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded">
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