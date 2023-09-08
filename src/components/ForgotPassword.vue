<script setup>
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(["closeModal"]);

let pageVars = reactive({
  loading: false,
});

let form = reactive({
  email: "",
});

function confirmRecover() {
  pageVars.loading = true;
  const emailRule = /.+@.+/;
  if (!form.email || !form.email.match(emailRule)) {
    store.dispatch("misc/activateNotification", {
      duration: 3,
      message: "Email invalid!",
      type: "fail",
    });
    pageVars.loading = false;
    return;
  }
  store
    .dispatch("login/sendResetPassword", {
      email: form.email,
    })
    .then(() => {
      store.dispatch("misc/activateNotification", {
        duration: 3,
        message: "User password redefinition email was sent!",
        type: "success",
      });
      pageVars.loading = false;
      emit("closeModal", false);
    })
    .catch((error) => {
      let message = "";
      switch (error) {
        case "auth/user-not-found":
          message = "User with given email address was not found!";
          break;
        case "auth/invalid-email":
          message = "Email invalid!";
          break;
        default:
          message = `There was an error in your request, please try again later!`;
          break;
      }

      store.dispatch("misc/activateNotification", {
        duration: 3,
        message,
        type: "fail",
      });
      pageVars.loading = false;
    });
}
</script>

<template>
  <div class="w-full h-auto max-w-md">
    <div class="relative bg-white rounded-lg">
      <div
        class="flex items-start justify-between py-2 px-4 border-b rounded-t border-orange-300"
      >
        <h3 class="text-xl font-semibold text-orange-600">Reset Password</h3>
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
      <div class="px-8 pt-4">
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="email"
          type="text"
          placeholder="Email"
          v-model="form.email"
        />
      </div>
      <div class="flex justify-end p-6">
        <button
          type="button"
          @click="$emit('closeModal', false)"
          class="text-orange-600 hover:text-orange-800 bg-white hover:bg-zinc-200 rounded-lg border border-orange-600 text-sm font-medium px-3 py-2 mx-2"
        >
          Cancel
        </button>
        <button
          v-if="!pageVars.loading"
          type="button"
          @click="confirmRecover()"
          class="bg-orange-600 text-zinc-100 hover:bg-orange-800 font-medium rounded-lg text-sm px-3 py-2 text-center"
        >
          Confirm
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
