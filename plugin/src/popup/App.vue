<template>
  <div class="bg-pink-500">
    <span class="text-lg text-green-700">New Text</span>
    <hello-world />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "App",
  components: { HelloWorld },
};
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>
