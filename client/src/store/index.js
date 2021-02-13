import { createStore } from 'vuex'


import AuthModule from './module/authModule'
import LogModule from './module/logModule'
import AppModule from './module/appModule'


export default createStore({
  state: {
    alertData: {
      show: false,
      text: '',
      alertClass: ''
    }
  },
  getters: {
    alertData: state => state.alertData
  },
  mutations: {
    showAlert(state, alertInfo) {
      state.alertData = {
        show: true,
        text: alertInfo.text,
        alertClass: alertInfo.alertClass
      }
    }
  },
  actions: {
  },
  modules: {
    AuthModule,
    LogModule,
    AppModule
  }
})
