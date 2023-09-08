import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as faBookmarkRegular, faClone } from '@fortawesome/free-regular-svg-icons'

library.add( faClone, faBookmark, faBookmarkRegular )

const app = createApp(App).use(store).use(router).use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

