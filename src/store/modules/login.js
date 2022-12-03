
const state = {
  idToken: null,
  accessToken: null,
  logged: false,
}

const mutations = {
  setIdToken(state, value) {
    state.idToken = value;
  },
  setAccessToken(state, value) {
    state.accessToken = value;
  },
  setLogged(state, value) {
    state.logged = value;
  }
}

const actions = {

}

const getters = {
  getIdToken(state) {
    return state.idToken;
  },
  getAccessToken(state) {
    return state.accessToken;
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