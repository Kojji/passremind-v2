
const state = {
  code: null,
  idToken: null,
  accessToken: null,
  logged: false,
}

const mutations = {
  setCode(state, value) {
    state.code = value;
  },
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
  getCode(state) {
    return state.code;
  },
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