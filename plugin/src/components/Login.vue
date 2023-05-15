<script setup>
import { reactive } from "vue";
import { useStore } from "vuex";

let loginInputs = reactive({
  email: "",
  password: "",
});

const store = useStore();

function login() {
  store
    .dispatch("login/signIn", {
      email: loginInputs.email,
      password: loginInputs.password,
    })
    .then(() => {
      console.log("logged in");
    })
    .catch((error) => {
      let message = "";
      switch (error) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          message = "Email and/or password incorrect!";
          break;
        case "auth/invalid-email":
          message = "Email invalid!";
          break;
        case "auth/user-disabled":
          message = "Administrator disabled this user!";
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
      console.log("failed");
    });
}
</script>

<template>
  <div id="login">
    <form class="px-8 pt-6 pb-8 mb-4 flex flex-col w-full h-auto">
      <div class="w-12 h-12 mx-auto">
        <img src="../assets/pssrLogo.png" alt="Passremind logo" />
      </div>
      <span class="mx-auto font-bold text-lg">PassRemind Extension</span>

      <div class="mb-2">
        <span class="font-bold text-lg">Login</span>
      </div>
      <div class="mb-4">
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="email"
          type="text"
          placeholder="Email"
          v-model="loginInputs.email"
        />
      </div>
      <div class="mb-6">
        <input
          class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
          id="password"
          type="password"
          placeholder="Password"
          v-model="loginInputs.password"
        />
      </div>
      <div class="flex items-center justify-between">
        <a
          class="inline-block align-baseline font-bold text-sm hover:text-blue-500"
          href="#"
        >
          Go to page
        </a>
        <button
          @click="login"
          class="bg-green-600 hover:bg-green-800 text-white font-bold py-1 md:py-2 px-2 md:px-4 rounded"
          type="button"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
};
</script>
