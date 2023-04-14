<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <div class="w-full bg-orange-600 py-1.5">
    <p class="text-zinc-100 my-2 mx-auto">
      <a href="https://fernandokoji.dev" target="_blank">{{
        `@${year} - Fernando Koji Yamashiro`
      }}</a>
    </p>
  </div>
</template>
