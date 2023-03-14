<script setup>
import { useStore } from 'vuex';
import { computed, reactive } from 'vue';

const store = useStore();
let information = computed(() => store.getters['misc/getNotificationInformation']);
let active = computed(() => store.getters['misc/getNotificationToggle']);

let color = reactive({
  bgColor: "bg-green-100",
  message: "Success"
})

function countDown() {
  if(information.value.type === "success") { color.bgColor = "bg-green-100"; color.message = "Success!" }
  else if(information.value.type === "fail") { color.bgColor = "bg-red-100"; color.message = "Failed!" }
  else { color.bgColor = "bg-yellow-100"; color.message = "Alert!" }
  let seconds = information.value.duration * 1000
  setTimeout(function() {
    store.commit('misc/setNotificationToggle', false)
  }, seconds);
} 
</script>

<template>
  <Transition>
    <div v-if="active" class="absolute right-1.5 top-1.5" v-bind:onLoad="countDown()">
      <div class="m-auto">
        <div :class="`${color.bgColor} rounded-lg border p-3 shadow-lg`">
          <div class="flex flex-row">
            <div class="px-2">
              <svg v-if="information.type === 'success'" width="24" height="24" viewBox="0 0 1792 1792" fill="#44C997" xmlns="http://www.w3.org/2000/svg">
                <path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
              </svg>
              <svg v-if="information.type === 'fail'" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="#ad0a0d" viewBox="0 0 24 24">
                <path d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z"/><path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"/>
              </svg>
              <svg v-if="information.type === 'alert'" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="#9ea108" viewBox="0 0 20 20">
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
              </svg>
            </div>
            <div class="ml-2 mr-6">
              <span class="font-semibold">{{ color.message }}</span>
              <span class="block text-gray-500">{{ information.message }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active, .v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter-from, .v-leave-to {
  opacity: 0;
}
</style>