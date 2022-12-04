import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Search',
    component: function () {
      return import('../views/PassSearch.vue')
    }
  },
  {
    path: '/about',
    name: 'About',
    component: function () {
      return import( '../views/About.vue')
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: function () {
      return import('../views/Login.vue')
    }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: function () {
      return import('../views/SignIn.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
