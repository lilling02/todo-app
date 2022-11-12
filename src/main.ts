import { createApp } from 'vue'
import { createPinia } from 'pinia'
import mitt from "mitt";

import App from './App.vue'
// import router from './router'

import './assets/main.css'

const app = createApp(App)
app.config.globalProperties.mittBus = new mitt() //全局事件总线

app.use(createPinia())
// app.use(router)

app.mount('#app')

