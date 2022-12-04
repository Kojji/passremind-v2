import { createRouter, createWebHistory } from 'vue-router'
import store from '/src/store/index.js';

const routes = [
  {
    path: '/',
    name: 'Search',
    component: function () {
      return import('../views/Entries.vue')
    },
    beforeEnter: (to, from) => {
      if(!store.getters['login/getLogged'] && !store.getters['login/getCode']) {
        // corrigir - mandar notificação de falha
        return {path: '/about'}
      }
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
    path: '/signin',
    name: 'SignIn',
    beforeEnter: (to, from) => {
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
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
