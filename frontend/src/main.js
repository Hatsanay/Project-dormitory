import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import { iconsSet as icons } from '@/assets/icons'
import DocsExample from '@/components/DocsExample'
import CIcon from '@coreui/icons-vue'
import CoreuiVue from '@coreui/vue'


import axios from 'axios'


axios.defaults.baseURL = 'http://localhost:3030'


const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}


const app = createApp(App)
app.use(createPinia())


app.use(router)


app.use(CoreuiVue)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsExample', DocsExample)
app.mount('#app')
app.config.globalProperties.$axios = axios
