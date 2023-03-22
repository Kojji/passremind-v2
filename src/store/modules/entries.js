import { db, functions } from "../../../firebase"
import {
  query,
  where,
  limit,
  orderBy,
  startAt,
  startAfter,
  endAt,
  endBefore,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  doc,
  getCountFromServer,
} from "firebase/firestore"
import { httpsCallable } from "firebase/functions";
import SimpleCrypto from "simple-crypto-js";

const state = {
  entries: [],
  listPage: 1,
  searchEntries:[],
  listEntries: [],
  entryObject: {
    id: '',
    service: '',
    login: '',
    password: '',
    serviceLink: '',
    mark: false
  },
  totalListEntries: 0,
  encKey: null
}

const mutations = {
  setEntries(state, value) {
    state.entries = value;
  },
  setListPage(state, value) {
    state.listPage = value;
  },
  setSearchEntries(state, value) {
    state.searchEntries = value;
  },
  setListEntries(state, value) {
    state.listEntries = value;
  },
  setTotalListEntries(state, value) {
    state.totalListEntries = value;
  },
  setEncKey(state, value) {
    state.encKey = value;
  }
}

const actions = {
  retrieveEncKey(state) {
    return new Promise(async (res, rej) => {
      try {
        const getEncKey = httpsCallable(functions, 'getPassEnc');
        let resultEncKey = await getEncKey();
        if(!resultEncKey.data) throw new Error("Unable to retrieve encryption key!")
        state.commit("setEncKey", resultEncKey.data)
        res()
      } catch(err) {
        rej(err.message)
      }
    })
  },
  checkIfExixts(state, form) {
    return new Promise(async (res, rej)=>{
      const queryRef = query(collection(db, "users", form.idToken, "entries"), where("service", "==", form.service), limit(1));

      const querySnapshot = await getDocs(queryRef);
      if(querySnapshot.docs.length > 0) {
        console.log(querySnapshot.docs[0].id)
        if(querySnapshot.docs[0].id !== form.id) {
          rej({code: 1, message: 'Entry already exists'})
        } else {
          res()
        }
      } else {
        res()
      }
    })
  },
  createEntry(state, form) {
    return new Promise(async (res, rej)=>{
      try {
        let simpleEnc = new SimpleCrypto(state.getters["getEncKey"]);
        await setDoc(doc(db, "users", form.idToken, "entries", form.service), {
          service: form.service,
          login: simpleEnc.encrypt(form.login),
          password: simpleEnc.encrypt(form.password),
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
  editEntry(state, form) {
    return new Promise(async (res, rej)=>{
      try {
        let simpleEnc = new SimpleCrypto(state.getters["getEncKey"]);
        await setDoc(doc(db, "users", form.idToken, "entries", form.id), {
          service: form.service,
          login: simpleEnc.encrypt(form.login),
          password: simpleEnc.encrypt(form.password),
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
  searchEntries(state, form) {
    return new Promise(async (res, rej)=>{
      let simpleEnc = new SimpleCrypto(state.getters["getEncKey"]);
      let entryArray = []
      const entryQuery = query(collection(db, "users", form.idToken, "entries"), orderBy("service"), startAt(form.search), endAt(form.search+'\uf8ff'), limit(state.getters['getConstLimitPerPage']));
      const querySnapshot = await getDocs(entryQuery);
      querySnapshot.forEach((doc) => {
        let entryData = doc.data()
        entryArray.push({
          id: doc.id,
          service: entryData.service,
          login: simpleEnc.decrypt(entryData.login),
          password: simpleEnc.decrypt(entryData.password),
          serviceLink: entryData.serviceLink,
          mark: entryData.mark
        })
      });
      state.commit('setSearchEntries', entryArray)
      res()
    })
  },
  listEntries(state, form) {
    return new Promise(async (res, rej)=>{
      let simpleEnc = new SimpleCrypto(state.getters["getEncKey"]);
      let entryArray = []
      const entryQuery = query(collection(db, "users", form.idToken, "entries"), orderBy("service"), limit(state.getters['getConstLimitPerPage']));
      const countSnapshot = await getCountFromServer(query(collection(db, "users", form.idToken, "entries")));
      state.commit('setTotalListEntries', countSnapshot.data().count);
      state.commit('setListPage', 1);
      const querySnapshot = await getDocs(entryQuery);
      querySnapshot.forEach((doc) => {
        let entryData = doc.data()
        entryArray.push({
          id: doc.id,
          service: entryData.service,
          login: simpleEnc.decrypt(entryData.login),
          password: simpleEnc.decrypt(entryData.password),
          serviceLink: entryData.serviceLink,
          mark: entryData.mark
        })
      });
      state.commit('setListEntries', entryArray)
      res()
    })
  },
  // corrigir - error treatment
  paginateUp(state, form) {
    return new Promise(async (res, rej)=>{
      let simpleEnc = new SimpleCrypto(state.getters["getEncKey"]);
      let entryArray = []
      const docSnap = await getDoc(doc(db, "users", form.idToken, "entries", state.getters['getListEntries'][state.getters['getListEntries'].length - 1].id));
      const entryQuery = query(collection(db, "users", form.idToken, "entries"), orderBy("service"), limit(state.getters['getConstLimitPerPage']), startAfter(docSnap));
      state.commit('setListPage', form.page);
      const querySnapshot = await getDocs(entryQuery);
      querySnapshot.forEach((doc) => {
        let entryData = doc.data()
        entryArray.push({
          id: doc.id,
          service: entryData.service,
          login: simpleEnc.decrypt(entryData.login),
          password: simpleEnc.decrypt(entryData.password),
          serviceLink: entryData.serviceLink,
          mark: entryData.mark
        })
      });
      state.commit('setListEntries', entryArray)
      res()
    })
  },
  paginateDown(state, form) {
    return new Promise(async (res, rej)=>{
      let simpleEnc = new SimpleCrypto(state.getters["getEncKey"]);
      let entryArray = []
      const docSnap = await getDoc(doc(db, "users", form.idToken, "entries", state.getters['getListEntries'][state.getters['getListEntries'].length - 1].id));
      const entryQuery = query(collection(db, "users", form.idToken, "entries"), orderBy("service"), limit(state.getters['getConstLimitPerPage']), endBefore(docSnap));
      state.commit('setListPage', form.page);
      const querySnapshot = await getDocs(entryQuery);
      querySnapshot.forEach((doc) => {
        let entryData = doc.data()
        entryArray.push({
          id: doc.id,
          service: entryData.service,
          login: simpleEnc.decrypt(entryData.login),
          password: simpleEnc.decrypt(entryData.password),
          serviceLink: entryData.serviceLink,
          mark: entryData.mark
        })
      });
      console.log(entryArray)
      state.commit('setListEntries', entryArray)
      res()
    })
  },
  toggleMark(state, {idToken, index}) {
    return new Promise(async (res, rej)=>{
      try {
        let copy = state.getters["getListEntries"]
        await updateDoc(doc(db, "users", idToken, "entries", copy[index].id), {
          mark: !copy[index].mark
        });
        copy[index].mark = !copy[index].mark
        state.commit('setListEntries', copy)
        res(copy[index].mark)
      } catch(err) {
        rej(err.message)
      }
    })
  },
  deleteEntry(state, {idToken, idEntry}) {
    return new Promise(async (res, rej)=>{
      try {
        await deleteDoc(doc(db, "users", idToken, "entries", idEntry));
        res()
      } catch(err) {
        rej(err.message)
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
  getSearchEntries(state) {
    return state.searchEntries;
  },
  getListEntries(state) {
    return state.listEntries;
  },
  getTotalListEntries(state) {
    return state.totalListEntries;
  },
  getConstLimitPerPage() {
    return 8;
  },
  getEncKey(state) {
    return state.encKey;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}