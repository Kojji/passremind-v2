<template>
  <div class="home">
    <a href="https://passremind.auth.us-east-1.amazoncognito.com/login?client_id=3bvhhi5bvlhej5tbhi5atnhfs9&response_type=token&scope=email+openid&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F">
      <button type="button" class="flex items-center drop-shadow-xl xl:w-36 w-32 xl:h-12 h-10  rounded-md bg-amber-600 font-semibold text-lg text-zinc-100 hover:bg-amber-700">
        <p class="xl:text-base text-sm">Login</p>
      </button>
    </a>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '/src/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
