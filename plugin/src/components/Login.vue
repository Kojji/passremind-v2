<script setup>
import { reactive } from "vue";

let loginInputs = reactive({
  email: "",
  password: "",
});
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
