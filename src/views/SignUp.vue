<script setup>
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
let loginInputs = reactive({
  email: "",
  password: "",
  confirmPassword: "",
});
let pageVars = reactive({
  loading: false,
});

onMounted(() => {
  checkToken();
});

function checkToken() {
  store
    .dispatch("login/checkToken")
    .then(() => {
      store.dispatch("entries/retrieveEncKey");
      store.dispatch("misc/activateNotification", {
        duration: 3,
        message: "User already logged in!",
        type: "success",
      });
      router.push("/");
    })
    .catch(() => {});
}

function signup() {
  pageVars.loading = true;
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
  const emailRule = /.+@.+/;
  if (
    !loginInputs.email ||
    !loginInputs.password ||
    !loginInputs.confirmPassword
  ) {
    store.dispatch("misc/activateNotification", {
      duration: 3,
      message: "Missing required fields!",
      type: "fail",
    });
    pageVars.loading = false;
    return;
  }
  if (!loginInputs.email.match(emailRule)) {
    store.dispatch("misc/activateNotification", {
      duration: 3,
      message: "Email invalid!",
      type: "fail",
    });
    pageVars.loading = false;
    return;
  }
  if (!loginInputs.password.match(passwordRules)) {
    store.dispatch("misc/activateNotification", {
      duration: 3,
      message:
        "Password must have between 8 to 15 characters, containing at least one number, one uppercase and one lowercase letter!",
      type: "fail",
    });
    pageVars.loading = false;
    return;
  }
  store
    .dispatch("login/signUp", {
      email: loginInputs.email,
      password: loginInputs.password,
      confirmPassword: loginInputs.confirmPassword,
    })
    .then(() => {
      store.dispatch("misc/activateNotification", {
        duration: 3,
        message: `New account created!`,
        type: "success",
      });
      router.push("/");
    })
    .catch((error) => {
      let message = "";
      switch (error) {
        case "auth/email-already-in-use":
          message = `Email address is already in use for another account!`;
          break;
        case "auth/weak-password":
          message =
            "Password must have between 8 to 15 characters, containing at least one number, one uppercase and one lowercase letter!";
          break;
        case "auth/invalid-email":
          message = "Email invalid!";
          break;
        case "auth/operation-not-allowed":
          message =
            "Creation of new account have been disabled by the administrator!";
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
    })
    .finally(() => {
      pageVars.loading = false;
    });
}
</script>

<template>
  <div class="Login w-full h-full flex items-center justify-center bg-zinc-100">
    <div
      :class="
        pageVars.loading
          ? 'absolute bg-zinc-50 rounded leading-tight w-full h-full flex items-center justify-center'
          : 'absolute invisible'
      "
    >
      <svg
        class="inline mr-2 w-10 h-10 text-gray-400 animate-spin fill-orange-600"
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
          fill="currentFill"
        />
      </svg>
    </div>
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full h-auto max-w-md"
    >
      <div class="w-16 h-16 mx-auto m-4">
        <img src="/src/assets/pssrLogo-128.png" alt="Passremind logo" />
      </div>
      <div class="m-4">
        <span class="font-bold text-lg">Sign Up</span>
      </div>
      <div class="mb-8">
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="email"
          type="text"
          placeholder="Email"
          v-model="loginInputs.email"
        />
      </div>
      <div class="mb-2">
        <input
          class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker"
          id="password"
          type="password"
          placeholder="Password"
          v-model="loginInputs.password"
        />
        <p className="text-gray-600 text-xs italic float float-left">
          Must contain at least 1 number, 1 lowercase and 1 uppercase letter.
        </p>
      </div>
      <div class="mb-4">
        <input
          class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker"
          id="confirm-password"
          type="password"
          placeholder="Confirm Password"
          v-model="loginInputs.confirmPassword"
        />
        <p className="text-gray-600 text-xs italic float float-left">
          Must match password provided above.
        </p>
      </div>
      <div class="flex items-center justify-end">
        <button
          @click="signup"
          class="bg-green-600 hover:bg-green-800 text-white font-bold py-1 md:py-2 px-2 md:px-4 rounded"
          type="button"
        >
          Create Account
        </button>
      </div>
    </form>
  </div>
</template>
