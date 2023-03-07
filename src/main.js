import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import {faFolder,faCalendarDays,faEye,faCommentDots} from '@fortawesome/free-regular-svg-icons'
library.add(faFolder,faCalendarDays,faEye,faCommentDots)

// import { } from '@fortawesome/free-brands-svg-icons'

import { faTags ,faFolder  as sFolder } from '@fortawesome/free-solid-svg-icons'
library.add(sFolder,faTags)
/* add icons to the library */

import './assets/scss/kratosr.scss'
// import './assets/scss/highlight/theme/night-blue.scss'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
