import { signInWithEmailAndPassword, setPersistence, inMemoryPersistence } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../../../firebase"
import router from '../../router'

const state = {
  idToken: null,
  logged: false,
  userData: {displayName :null}
}

const mutations = {
  setIdToken(state, value) {
    state.idToken = value;
  },
  setLogged(state, value) {
    state.logged = value;
  },
  setUserData(state, value) {
    state.userData = value;
  }
}

const actions = {
  signIn(state, form) {
    return new Promise((res, rej)=>{
      setPersistence(auth, inMemoryPersistence)
        .then(() => {
          signInWithEmailAndPassword(auth, form.email, form.password)
            .then(result => {
              state.commit("setLogged", true);
              state.commit("setIdToken", result.user.uid);
              router.push('/');
              res();
            }).catch(() => {
              rej('err1');
            });
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
  },
  getUserData(state) {
    return state.userData;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}