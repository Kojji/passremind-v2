import { createRouter, createWebHistory } from 'vue-router'
import store from '/src/store/index.js';

const routes = [
  {
    path: '/',
    name: 'Search',
    component: function () {
      return import('../views/Entries.vue')
    },
    // beforeEnter: () => {
    //   if(!store.getters['login/getLogged'] && !store.getters['login/getIdToken']) {
    //     // corrigir - mandar notificação de falha
    //     return {path: '/about'}
    //   }
    // }
  },
  {
    path: '/login',
    name: 'Login',
    component: function () {
      return import( '../views/Login.vue')
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
      try {
        if(to.hash.length > 0) {
          const params = to.hash.substr(1, to.hash.length).split("&");
          store.commit('login/setLogged', true);
          store.commit('login/setIdToken', params[0].replace("id_token=",""));
          return {path: '/'}
        } else {
          store.commit('login/setLogged', false);
          store.commit('login/setIdToken', null);
          return {path: '/about'}
        }
      } catch(e) {
        store.commit('login/setLogged', false);
        store.commit('login/setIdToken', null);
        console.log(e.message);
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
