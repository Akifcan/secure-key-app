import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import AppBase from './components/AppBase'

createApp(App)
    .component('AppBase', AppBase)
    .use(store)
    .use(router)
    .mount('#app')
