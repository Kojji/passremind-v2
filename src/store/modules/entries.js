
const state = {
  entries: [],
}

const mutations = {
  setEntries(state, value) {
    state.entries = value;
  },
}

const actions = {

}

const getters = {
  getEntries(state) {
    return state.entries;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}