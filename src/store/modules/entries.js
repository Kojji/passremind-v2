
const state = {
  entries: [],
  listPage: 1,
  listEntries: []
}

const mutations = {
  setEntries(state, value) {
    state.entries = value;
  },
  setListPage(state, value) {
    state.listPage = value;
  },
  setListEntries(state, value) {
    state.listEntries = value;
  }
}

const actions = {

}

const getters = {
  getEntries(state) {
    return state.entries;
  },
  getListPage(state) {
    return state.listPage;
  },
  getListEntries(state) {
    return state.listEntries;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}