import { db } from "../../../firebase"
import { collection, query, doc, setDoc, where, limit, getDocs } from "firebase/firestore"

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
    return new Promise(async (res, rej)=>{
      const queryRef = query(collection(db, "users", form.idToken, "entries"), where("service", "==", form.service), limit(1));

      const querySnapshot = await getDocs(queryRef);
      if(querySnapshot.docs.length > 0) {
        rej('Entry already exists')
      } else {
        res()
      }
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