<script setup>
import TopNav from '/src/components/TopBar.vue'
import FooterNav from '/src/components/Footer.vue'
</script>

<template>
  <div id="app" class="flex flex-col h-screen justify-between">
    <TopNav />
    <router-view />
    <FooterNav />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
