import { ref, reactive, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { setting as userSet } from '../setting'
import { getQdSetting } from '@/api/setting'

export const useSetterStore = defineStore('setting', () => {
    const setting = reactive(userSet)

    const nowImg = reactive({})

    const bgImage = computed(() => {
        return "url(" + nowImg.bgImage + ")";
    })
    const bannerImage = computed(() => {
        return "url(" + nowImg.bannerImage + ")";
    })
    const aboutImage = computed(() => {
        return "url(" + nowImg.aboutImage + ")";
    })
    const commentBgImage = computed(() => {
        return "url(" + nowImg.commentBgImage + ")";
    })
    const themeMode = computed(()=> {
        if (setting.theme.modeLight) {
            return 'light'
        } else {
            return 'dark'
        }
    })
    watch(themeMode,(newValue,oldValue) => {
        changeThemeMode(newValue)
    })
    const changeThemeMode = (themeMode) => {
        if (themeMode === 'dark') {
            setting.theme.modeLight = false
            // 编辑器主题切换
            setting.theme.editorState.theme = 'dark'
            // TDesign 模式切换
            document.documentElement.setAttribute('theme-mode', themeMode)
            // Kratos 模式切换
            document.documentElement.setAttribute("data-theme", themeMode);
        } else {
            setting.theme.modeLight = true
            //  编辑器主题切换
            setting.theme.editorState.theme = 'default'
            // TDesign 模式切换
            document.documentElement.removeAttribute('theme-mode')
            // Kratos 模式切换
            document.documentElement.setAttribute("data-theme", themeMode);
        }
        // 图片切换
        nowImg.bgImage = setting.theme.img.bgImage[themeMode]
        nowImg.bannerImage = setting.theme.img.bannerImage[themeMode]
        nowImg.aboutImage = setting.theme.img.aboutImage[themeMode]
        nowImg.commentBgImage = setting.theme.img.commentBgImage[themeMode]
    }

    // 重新加载qsSetting信息
    const loadQdSettingInfo = () => {
        getQdSetting().then( data => {
            if (data && data != '') {
                const settingData = JSON.parse(data)
                setting.config = settingData.config
                setting.path = settingData.path
                setting.webLogo = settingData.webLogo
                setting.theme = settingData.theme
                // 加载完成后重置主题样式
                changeThemeMode(setting.theme.modeLight ? 'light' : 'dark')
            } else {
                console.log("未配置QdSetting")
            }
        })
    }


    return { setting, changeThemeMode, bgImage, bannerImage, aboutImage, commentBgImage, loadQdSettingInfo }
})