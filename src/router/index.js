import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Search',
    component: function () {
      return import('../views/Entries.vue')
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: function () {
      return import( '../views/Login.vue')
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: function () {
      return import( '../views/SignUp.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
