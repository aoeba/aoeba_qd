import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const userInfo = reactive({
        userName: "",
        token: ''
    })

    const login = (uinfo) => {
        userInfo.userName = uinfo.userName
        userInfo.token = uinfo.token
        sessionStorage.setItem('userInfo',JSON.stringify(userInfo))
    }

    const logout = ()=> {
        userInfo.userName = ''
        userInfo.token = ''
        sessionStorage.removeItem('userInfo')
    }

    const isLogin = computed(() => {
        return userInfo.token !== '' && userInfo.token !== null && userInfo.token !== undefined
    })
    return { userInfo, login, isLogin, logout }
})