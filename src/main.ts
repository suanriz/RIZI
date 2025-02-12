import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'

import '@/assets/css/reset.css'
import '@/assets/css/global.sass'

import AOS from 'aos'
import 'aos/dist/aos.css'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import vueLazyLoad from 'vue3-lazyload'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

AOS.init()

app.use(vueLazyLoad, {})
  .use(pinia)
  .use(router)
  .mount('#app')
