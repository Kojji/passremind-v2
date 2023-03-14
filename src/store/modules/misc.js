  const state = {
    notificationToggle: false,
    notificationInformation: {
      duration: 5,
      message: "",
      type: "alert" //success, fail, alert
    }
  }
  
  const mutations = {
    setNotificationToggle(state, value) {
      state.notificationToggle = value;
    },
    setNotificationInformation(state, value) {
      state.notificationInformation = value;
    }
  }
  
  const actions = {
    activateNotification(state, information) {
      state.commit("setNotificationToggle", true)
      state.commit("setNotificationInformation", information)
    }
  }
  
  const getters = {
    getNotificationToggle(state) {
      return state.notificationToggle;
    },
    getNotificationInformation(state) {
      return state.notificationInformation;
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }