import { signInWithEmailAndPassword, setPersistence, inMemoryPersistence, signOut } from "firebase/auth"
import { auth } from "../../../firebase"
import router from '../../router'

const state = {
  idToken: null,
  logged: false
}

const mutations = {
  setIdToken(state, value) {
    state.idToken = value;
  },
  setLogged(state, value) {
    state.logged = value;
  }
}

const actions = {
  signIn(state, form) {
    return new Promise((res, rej)=>{
      setPersistence(auth, inMemoryPersistence)
        .then(() => {
          signInWithEmailAndPassword(auth, form.email, form.password)
            .then((result) => {
              state.commit("setLogged", true);
              state.commit("setIdToken", result.user.uid);
              res();
            }).catch(() => {
              rej('err1');
            });
        });
    });
  },
  signOut(state) {
    return new Promise((res, rej)=>{
      signOut(auth)
        .then(() => {
          state.commit("setLogged", false);
          state.commit("setIdToken", null);
          router.push('/login');
          res();
        }).catch(() => {
          rej();
        });
    });
  }
}

const getters = {
  getIdToken(state) {
    return state.idToken;
  },
  getLogged(state) {
    return state.logged;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}