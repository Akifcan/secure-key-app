import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import AppBase from './components/AppBase'
import AppModal from './components/AppModal'
import AppAlert from './components/AppAlert'



createApp(App)
    .component('AppBase', AppBase)
    .component('AppModal', AppModal)
    .component('AppAlert', AppAlert)
    .use(store)
    .use(router)
    .mount('#app')
