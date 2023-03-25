import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'
import App from './App.vue'
import router from './router'
import firebase from "@/services/firebaseConnection"

import './assets/main.css'

firebase.auth().onAuthStateChanged(()=> {

const app = createApp(App)

app.use(naive)
app.use(createPinia())
app.use(router)

app.mount('#app')
})
