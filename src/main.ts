import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import mitt from "mitt";

import App from './App.vue'
// import router from './router'

import './assets/main.css'


const app = createApp(App)
app.config.globalProperties.mittBus = new mitt(); //全局事件总线

const store = createPinia()
store.use(piniaPluginPersist)

app.use(store)
// app.use(router)

app.mount('#app')

