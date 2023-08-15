import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faFolder, faCalendarDays, faEye, faCommentDots } from '@fortawesome/free-regular-svg-icons'
import { faGithub, faQq, faWeixin, faWeibo, faGit, faBilibili } from '@fortawesome/free-brands-svg-icons'
import {
    faTags, faFolder as sFolder, faChevronCircleRight,
    faChevronUp, faAdjust, faSearch, faHouse, faEnvelope, faPenToSquare, faTriangleExclamation,
    faRightToBracket, faUser, faRightFromBracket, faBarsProgress, faGears, faTag
}
    from '@fortawesome/free-solid-svg-icons'

import './assets/scss/kratosr.scss'
import './assets/scss/aoeba/handle.scss'
import "nprogress/nprogress.css";

import TDesign from 'tdesign-vue-next';

import viteSSR, { ClientOnly } from 'vite-ssr'
import { createHead } from '@vueuse/head';
import devalue from '@nuxt/devalue';
import { init } from '@/utils/http'

export default viteSSR(App, {
    routes: router.routes,
    transformState(state) {
        return import.meta.env.SSR ? devalue(state) : state
    },
},
    (context) => {
        /* Vite SSR main hook for custom logic */
        const { app, router, initialState, isClient } = context
        const head = createHead()
        const pinia = createPinia()
        // pinia.state.value = initialState.pinia;
        if (import.meta.env.SSR) {
            // 序列化并设置为 window.__INITIAL_STATE__
            initialState.pinia = pinia.state.value
        } else {
            // 初始化axios
            init()
            // 在客户端，我们恢复 state
            pinia.state.value = initialState.pinia
        }
        library.add(faGithub, faQq, faWeixin, faWeibo, faGit, faBilibili)
        library.add(faFolder, faCalendarDays, faEye, faCommentDots)
        library.add(sFolder, faTags, faChevronCircleRight, faChevronUp, faAdjust, faSearch, faHouse, faEnvelope
            , faPenToSquare, faTriangleExclamation, faRightToBracket, faUser, faRightFromBracket, faBarsProgress
            , faGears, faTag)
        app.use(pinia)
        app.use(router)
        app.use(TDesign)
        app.use(head)
        app.component(ClientOnly.name, ClientOnly)
        app.component('font-awesome-icon', FontAwesomeIcon)
        app.config.errorHandler = function (error, vm, info) {
            console.error('Global Error Handler:', error, vm, info);
        }
        // app.mount('#kratos-wrapper')
        // // 必须由用户设置
        // if (isClient) {
        //     pinia.state.value = window.__pinia
        // }
        return { head }
    })