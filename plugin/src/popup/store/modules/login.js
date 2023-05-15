import {
  signInWithEmailAndPassword,
  setPersistence,
  // browserSessionPersistence,
  inMemoryPersistence,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../../../firebase";

const state = {
  idToken: null,
  logged: false,
};

const mutations = {
  setIdToken(state, value) {
    state.idToken = value;
  },
  setLogged(state, value) {
    state.logged = value;
  },
};

const actions = {
  signUp(state, form) {
    return new Promise((res, rej) => {
      setPersistence(auth, inMemoryPersistence).then(() => {
        createUserWithEmailAndPassword(auth, form.email, form.password)
          .then((result) => {
            state.commit("setLogged", true);
            state.commit("setIdToken", result.user.uid);
            res();
          })
          .catch((error) => {
            rej(error.code);
          });
      });
    });
  },
  signIn(state, form) {
    return new Promise((res, rej) => {
      // setPersistence(auth, browserSessionPersistence)
      setPersistence(auth, inMemoryPersistence).then(() => {
        signInWithEmailAndPassword(auth, form.email, form.password)
          .then((result) => {
            state.commit("setLogged", true);
            state.commit("setIdToken", result.user.uid);
            res();
          })
          .catch((error) => {
            rej(error.code);
          });
      });
    });
  },
  signOut(state) {
    return new Promise((res, rej) => {
      signOut(auth)
        .then(() => {
          state.commit("setLogged", false);
          state.commit("setIdToken", null);
          res();
        })
        .catch(() => {
          rej();
        });
    });
  },
  checkToken(state) {
    return new Promise((res, rej) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          state.commit("setLogged", true);
          state.commit("setIdToken", user.uid);
          res();
        } else {
          rej({ message: "User session expired!" });
        }
      });
    });
  },
  sendResetPassword(state, form) {
    return new Promise((res, rej) => {
      sendPasswordResetEmail(auth, form.email)
        .then(() => {
          res();
        })
        .catch((error) => {
          rej(error.code);
        });
    });
  },
};

const getters = {
  getIdToken(state) {
    return state.idToken;
  },
  getLogged(state) {
    return state.logged;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
