<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
let information = computed(() => store.getters["misc/getNotificationList"]);

let colorRange = {
  success: "bg-green-100",
  fail: "bg-red-100",
  alert: "bg-yellow-100",
};

let titleRange = {
  success: "Success!",
  fail: "Failed!",
  alert: "Alert!",
};

// if executed multiple times in short period of time, the duration get scrambled
function countDown(duration, index) {
  let seconds = duration * 1000;
  setTimeout(function () {
    store.dispatch("misc/removeNotification", {
      index,
    });
  }, seconds);
}
</script>

<template>
  <div class="fixed z-50 right-1.5 top-1.5">
    <TransitionGroup name="list" tag="div">
      <div v-for="(notification, index) in information" :key="index">
        <div
          class="m-auto"
          v-bind:onLoad="countDown(notification.duration, index)"
        >
          <div
            :class="`${
              colorRange[notification.type]
            } rounded-lg border p-3 shadow-lg`"
          >
            <div class="flex flex-row">
              <div class="px-2">
                <svg
                  v-if="notification.type === 'success'"
                  width="24"
                  height="24"
                  viewBox="0 0 1792 1792"
                  fill="#44C997"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"
                  />
                </svg>
                <svg
                  v-if="notification.type === 'fail'"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#ad0a0d"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z"
                  />
                  <path
                    d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"
                  />
                </svg>
                <svg
                  v-if="notification.type === 'alert'"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#9ea108"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
                  />
                </svg>
              </div>
              <div class="ml-2 mr-6">
                <span class="font-semibold">{{
                  titleRange[notification.type]
                }}</span>
                <span class="block text-gray-500 w-[200px] sm:w-[400px]">{{
                  notification.message
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.8s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
