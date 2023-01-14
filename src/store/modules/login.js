import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from "../../../firebase"
const state = {
  idToken: null,
  logged: false,
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
      signInWithEmailAndPassword(auth, form.email, form.password)
        .then(result => {
          state.commit("setLogged", true)
          state.commit("setIdToken", result.user.uid)
          // db.collection("users").doc(result.user.uid).get()
          // .then(doc => {
          //   console.log(doc)
          // })
          // router.push('/'); 
          res();
        }).catch(() => {
          rej('err1');
        })
    })
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