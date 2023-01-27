import { db } from "../../../firebase"
import { doc, setDoc } from "firebase/firestore"

const state = {
  entries: [],
  listPage: 1,
  listEntries: [],
  entryObject: {
    id: 0,
    cognito_id: '',
    service: '',
    login: '',
    password: ''
  }
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
  checkIfExixts(state, form) {
    return new Promise((res, rej)=>{


      res()
      // if found
      // rej('Entry already exists')
    })
  },
  createEntry(state, form) {
    return new Promise(async (res, rej)=>{
      try {
        await setDoc(doc(db, "users", form.idToken, "entries", form.service), {
          service: form.service,
          login: form.login,
          password: form.password,
          serviceLink: form.serviceLink,
          mark: form.mark
        });
        res()

      } catch(e) {
        console.log(e.message)
        rej()
      }
    })
  }
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