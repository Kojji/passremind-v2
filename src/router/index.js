import { createRouter, createWebHistory } from 'vue-router'
import store from '/src/store/index.js';

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
    name: 'SignIn'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
  if(to.path === '/signin') {
    if(to.query.code) {
      store.commit('login/setLogged', true);
      store.commit('login/setCode', to.query.code);
      return {path: '/'}
    } else {
      store.commit('login/setLogged', false);
      store.commit('login/setCode', null);
      return {path: '/about'}
    }
  }
})

export default router
