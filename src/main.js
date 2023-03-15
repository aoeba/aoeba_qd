import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faFolder, faCalendarDays, faEye, faCommentDots } from '@fortawesome/free-regular-svg-icons'
library.add(faFolder, faCalendarDays, faEye, faCommentDots)
import { faGithub, faQq, faWeixin, faWeibo, faGit, faBilibili } from '@fortawesome/free-brands-svg-icons'
library.add(faGithub, faQq, faWeixin, faWeibo, faGit, faBilibili)
import {
    faTags, faFolder as sFolder, faChevronCircleRight,
    faChevronUp, faAdjust, faSearch, faHouse, faEnvelope, faPenToSquare, faTriangleExclamation,
    faRightToBracket,faUser,faRightFromBracket,faBarsProgress,faGears
}
    from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(sFolder, faTags, faChevronCircleRight, faChevronUp, faAdjust, faSearch, faHouse, faEnvelope
    , faPenToSquare, faTriangleExclamation, faRightToBracket,faUser,faRightFromBracket,faBarsProgress
    ,faGears)

import './assets/scss/kratosr.scss'
import './assets/scss/aoeba/handle.scss'
import "nprogress/nprogress.css";

import TDesign from 'tdesign-vue-next';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(TDesign)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#kratos-wrapper')
