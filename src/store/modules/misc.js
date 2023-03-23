  const state = {
    notificationList: []
  }
  
  const mutations = {
    setNotificationList(state, value) {
      state.notificationList = value;
    },
  }
  
  const actions = {
    activateNotification(state, information) {
      let notifications = JSON.parse(JSON.stringify(state.getters['getNotificationList']))
      notifications.push(information)
      state.commit("setNotificationList", notifications)
    },
    removeNotification(state) {
      let notifications = JSON.parse(JSON.stringify(state.getters['getNotificationList']))
      notifications.splice(0, 1)
      state.commit("setNotificationList", notifications)
    }
  }
  
  const getters = {
    getNotificationList(state) {
      return state.notificationList;
    },
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }