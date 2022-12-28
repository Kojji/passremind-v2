<script setup>
</script>

<template>
  <div class="Login w-full h-full flex items-center justify-center bg-zinc-100">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full h-auto max-w-md">
      <div class="w-16 h-16 mx-auto m-4">
        <img src="/src/assets/pssrLogo-128.png" alt="Passremind logo" />
      </div>
      <div class="mb-4">
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" type="text" placeholder="Email">
      </div>
      <div class="mb-6">
        <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="Password">
      </div>
      <div class="flex items-center justify-between">
        <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
          Forgot Password?
        </a>
        <div>
          <button class="bg-zinc-300 text-white font-bold py-1 md:py-2 px-2 md:px-4 mr-1 md:mr-2 rounded cursor-not-allowed" type="button">
            Sign Up
          </button>
          <button class="bg-green-600 hover:bg-green-800 text-white font-bold py-1 md:py-2 px-2 md:px-4 rounded" type="button">
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>