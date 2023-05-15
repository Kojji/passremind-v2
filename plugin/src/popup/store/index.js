import { createStore } from "vuex";
import entries from "./modules/entries";
import login from "./modules/login";
import misc from "./modules/misc";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    entries,
    login,
    misc,
  },
});
