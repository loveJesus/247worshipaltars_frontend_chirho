import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const appChirho = createApp(App)

appChirho.use(createPinia())
appChirho.use(router)

appChirho.mount('#app')
