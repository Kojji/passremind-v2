import { db } from "../../../firebase"
import { collection, query, doc, setDoc, getDocs } from "firebase/firestore"

const state = {
  entries: [],
  listPage: 1,
  listEntries: [],
  entryObject: {
    id: '',
    service: '',
    login: '',
    password: '',
    serviceLink: '',
    mark: false
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
        // corrigir - encryption
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
  },
  listEntries(state, form) {
    return new Promise(async (res, rej)=>{
      // corrigir - decryption
      let entryArray = []
      const entryQuery = query(collection(db, "users", form.idToken, "entries"));
      const querySnapshot = await getDocs(entryQuery);
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        entryArray.push({
          id: doc.id,
          ...doc.data()
        })
      });
      console.log(entryArray)
      state.commit('setListEntries', entryArray)
      res()
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