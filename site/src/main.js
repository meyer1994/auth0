import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import 'normalize.css/normalize.css'
import 'sakura.css/css/sakura-dark.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
window.app = app
