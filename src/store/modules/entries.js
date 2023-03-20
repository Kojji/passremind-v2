import { db, functions } from "../../../firebase"
import { collection, query, doc, setDoc, where, limit, getDocs, updateDoc } from "firebase/firestore"
import { httpsCallable } from "firebase/functions";
import SimpleCrypto from "simple-crypto-js";

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
        const getEncKey = httpsCallable(functions, 'getPassEnc');
        let resultEncKey = await getEncKey();
        if(!resultEncKey || !resultEncKey.data) {
          throw new Error("Encryption key not found!")
        }
        let simpleEnc = new SimpleCrypto(resultEncKey.data);
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
        const getEncKey = httpsCallable(functions, 'getPassEnc');
        let resultEncKey = await getEncKey();
        if(!resultEncKey || !resultEncKey.data) {
          throw new Error("Encryption key not found!")
        }
        let simpleEnc = new SimpleCrypto(resultEncKey.data);
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
  listEntries(state, form) {
    return new Promise(async (res, rej)=>{
      const getEncKey = httpsCallable(functions, 'getPassEnc');
      let resultEncKey = await getEncKey();
      if(!resultEncKey || !resultEncKey.data) {
        throw new Error("Encryption key not found!")
      }
      let simpleEnc = new SimpleCrypto(resultEncKey.data);
      let entryArray = []
      const entryQuery = query(collection(db, "users", form.idToken, "entries"));
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
      let copy = state.getters["getListEntries"]
      await updateDoc(doc(db, "users", idToken, "entries", copy[index].id), {
        mark: !copy[index].mark
      });
      copy[index].mark = !copy[index].mark
      state.commit('setListEntries', copy)
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