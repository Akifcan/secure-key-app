import { createStore } from 'vuex'


import AuthModule from './module/authModule'
import LogModule from './module/logModule'


export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    AuthModule,
    LogModule
  }
})
