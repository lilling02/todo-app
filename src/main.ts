import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import mitt from "mitt";

import App from './App.vue'
// import router from './router'

import './assets/main.css'


const app = createApp(App)

const store = createPinia()
store.use(piniaPluginPersist)

app.use(store)
// app.use(router)
app.config.globalProperties.mittBus = mitt(); //全局事件总线

app.mount('#app')

