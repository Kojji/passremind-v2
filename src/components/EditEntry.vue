<script setup>
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(["closeModal"]);

const props = defineProps(["entry", "mode"]);

let pageVars = reactive({
  loading: false,
});

let form = reactive({
  service: "",
  login: "",
  password: "",
  serviceLink: "",
  mark: false,
});

let passSettings = reactive({
  range: "8",
  uppercase: true,
  lowercase: true,
  number: true,
  symbols: false,
});

onMounted(() => {
  form.id = props.entry.id;
  form.service = props.entry.service;
  form.login = props.entry.login;
  form.password = props.entry.password;
  form.serviceLink = props.entry.serviceLink;
  form.mark = props.entry.mark;
});

async function createEdit() {
  if (props.mode === "create") {
    let information = {
      duration: 3,
      message: "New password registered!",
      type: "success",
    };
    try {
      pageVars.loading = true;
      await store.dispatch("entries/checkIfExixts", {
        ...JSON.parse(JSON.stringify(form)),
        idToken: store.getters["login/getIdToken"],
      });
      await store.dispatch("entries/createEntry", {
        ...JSON.parse(JSON.stringify(form)),
        idToken: store.getters["login/getIdToken"],
      });
      pageVars.loading = false;
      emit("closeModal", true);
      store.dispatch("misc/activateNotification", information);
    } catch (e) {
      pageVars.loading = false;
      if (e.code === 1) {
        information.type = "fail";
        information.message = "An Entry with the same name already exists!";
        store.dispatch("misc/activateNotification", information);
        // corrigir - index of notification class
      }
      // corrigir - notification error
      // console.log(e);
    }
  } else {
    // edit
    try {
      if (
        confirm(
          "You are about to edit an entry, are you sure you want to continue?"
        )
      ) {
        pageVars.loading = true;
        await store.dispatch("entries/checkIfExixts", {
          ...JSON.parse(JSON.stringify(form)),
          idToken: store.getters["login/getIdToken"],
        });
        await store.dispatch("entries/editEntry", {
          ...JSON.parse(JSON.stringify(form)),
          idToken: store.getters["login/getIdToken"],
        });
        pageVars.loading = false;
        emit("closeModal", true);
      }
    } catch (e) {
      pageVars.loading = false;
      // corrigir - notification
      // console.log(e);
    }
  }
}

async function deleteEntry() {
  if (
    confirm(
      "You are about to delete an entry, are you sure you want to continue?"
    )
  ) {
    pageVars.loading = true;
    await store.dispatch("entries/deleteEntry", {
      idEntry: form.id,
      idToken: store.getters["login/getIdToken"],
    });
    pageVars.loading = false;
    emit("closeModal", true);
    // corrigir - test notification
    store.dispatch("misc/activateNotification", {
      duration: 3,
      message: "Entry sucessfully deleted!",
      type: "success",
    });
  }
}

function generatePassword() {
  if (
    !passSettings.uppercase &&
    !passSettings.lowercase &&
    !passSettings.number &&
    !passSettings.symbols
  )
    return;

  var password = "";
  let chars = "";

  if (passSettings.uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (passSettings.lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
  if (passSettings.number) chars += "01234567890123456789"; // numbers duplicated so they have almost the same chance to appear compared to other chars
  if (passSettings.symbols) chars += "!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  for (var index = 0; index < Number(passSettings.range) - 1; index++) {
    var character = Math.floor(Math.random() * chars.length);
    password += chars.substring(character, character + 1);
  }
  form.password = password;
}
</script>

<template>
  <div class="w-full h-auto md:max-w-2xl max-w-lg">
    <div class="relative bg-white rounded-lg">
      <div
        class="flex items-start justify-between py-2 px-4 border-b rounded-t border-orange-300"
      >
        <h3 class="text-xl font-semibold text-orange-600">
          {{ props.mode === "create" ? "Create Entry" : "Edit Entry" }}
        </h3>
        <button
          type="button"
          class="text-orange-600 bg-transparent hover:bg-orange-600 hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          @click="$emit('closeModal', false)"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
      </div>
      <div class="grid grid-flow-col grid-cols-1 md:grid-cols-2 gap-2 p-3">
        <div>
          <div class="py-1">
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="text"
              placeholder="Name"
              v-model="form.service"
            />
          </div>
          <div class="py-1">
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="text"
              placeholder="Login"
              v-model="form.login"
            />
          </div>
          <div class="py-1">
            <div class="relative text-grey-300">
              <span class="absolute inset-y-0 right-0 flex items-center pr-1">
                <button
                  type="submit"
                  @click="generatePassword()"
                  class="p-1 outline-none pr-2"
                >
                  <svg
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    class="w-6 h-6"
                  >
                    <path
                      d="M7 10C5.89543 10 5 10.8954 5 12C5 13.1046 5.89543 14 7 14C8.10457 14 9 13.1046 9 12C9 10.8954 8.10457 10 7 10Z"
                      fill="#c94c26"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 6.25C3.82436 6.25 1.25 8.82436 1.25 12C1.25 15.1756 3.82436 17.75 7 17.75C9.18057 17.75 11.0762 16.5363 12.0508 14.75H15.25V17C15.25 17.4142 15.5858 17.75 16 17.75H19.5C19.9142 17.75 20.25 17.4142 20.25 17V14.75H22C22.4142 14.75 22.75 14.4142 22.75 14V11C22.75 10.0335 21.9665 9.25 21 9.25H12.0508C11.0762 7.46371 9.18057 6.25 7 6.25ZM2.75 12C2.75 9.65279 4.65279 7.75 7 7.75C8.74161 7.75 10.2402 8.79769 10.8967 10.3003C11.016 10.5734 11.2859 10.75 11.584 10.75H21C21.1381 10.75 21.25 10.8619 21.25 11V13.25H19.5C19.0858 13.25 18.75 13.5858 18.75 14V16.25H16.75V14C16.75 13.5858 16.4142 13.25 16 13.25H11.584C11.2859 13.25 11.016 13.4266 10.8967 13.6997C10.2402 15.2023 8.74161 16.25 7 16.25C4.65279 16.25 2.75 14.3472 2.75 12Z"
                      fill="#c94c26"
                    />
                  </svg>
                </button>
              </span>
              <input
                type="text"
                v-model="form.password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                placeholder="Password"
                autocomplete="off"
              />
            </div>
          </div>
          <div class="py-1">
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="text"
              placeholder="Link"
              v-model="form.serviceLink"
            />
          </div>
        </div>
        <div class="p-4 hidden md:block">
          <div class="flex items-center m-2">
            <label
              for="minmax-range"
              class="block m-2 text-sm font-medium text-gray-900"
              >4</label
            >
            <input
              id="minmax-range"
              type="range"
              min="4"
              max="16"
              v-model="passSettings.range"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <label
              for="minmax-range"
              class="block m-2 text-sm font-medium text-gray-900"
              >16</label
            >
          </div>
          <div class="flex items-center m-2">
            <input
              id="uppercase-checkbox"
              type="checkbox"
              v-model="passSettings.uppercase"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
            />
            <label
              for="uppercase-checkbox"
              class="ml-2 text-sm font-medium text-gray-900"
              >Uppercase</label
            >
          </div>
          <div class="flex items-center m-2">
            <input
              id="lowercase-checkbox"
              type="checkbox"
              v-model="passSettings.lowercase"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
            />
            <label
              for="lowercase-checkbox"
              class="ml-2 text-sm font-medium text-gray-900"
              >Lowercase</label
            >
          </div>
          <div class="flex items-center m-2">
            <input
              id="number-checkbox"
              type="checkbox"
              v-model="passSettings.number"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
            />
            <label
              for="number-checkbox"
              class="ml-2 text-sm font-medium text-gray-900"
              >Numbers</label
            >
          </div>
          <div class="flex items-center m-2">
            <input
              id="symbols-checkbox"
              type="checkbox"
              v-model="passSettings.symbols"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
            />
            <label
              for="symbols-checkbox"
              class="ml-2 text-sm font-medium text-gray-900"
              >Symbols</label
            >
          </div>
        </div>
      </div>

      <div
        class="flex items-center justify-end p-2 space-x-2 border-t border-orange-300 rounded-b"
      >
        <button
          data-modal-toggle="defaultModal"
          type="button"
          @click="$emit('closeModal', false)"
          class="text-orange-600 hover:text-orange-800 bg-white hover:bg-zinc-200 rounded-lg border border-orange-600 text-sm font-medium px-3 py-2"
        >
          Cancel
        </button>
        <button
          v-if="props.mode !== 'create'"
          data-modal-toggle="defaultModal"
          type="button"
          @click="deleteEntry()"
          class="bg-red-500 text-zinc-100 hover:bg-red-700 font-medium rounded-lg text-sm px-3 py-2 text-center"
        >
          Delete
        </button>
        <button
          v-if="!pageVars.loading"
          data-modal-toggle="defaultModal"
          type="button"
          @click="createEdit()"
          class="bg-orange-600 text-zinc-100 hover:bg-orange-800 font-medium rounded-lg text-sm px-3 py-2 text-center"
        >
          {{ props.mode === "create" ? "Create" : "Edit" }}
        </button>
        <button
          v-else
          disabled
          type="button"
          class="bg-zinc-200 text-zinc-600 font-medium rounded-lg text-sm px-3 py-2 text-center"
        >
          <svg
            aria-hidden="true"
            role="status"
            class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"
            />
          </svg>
          Loading...
        </button>
      </div>
    </div>
  </div>
</template>
