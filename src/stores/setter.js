import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { setting as userSet } from '../setting'

export const useSetterStore = defineStore('setting', () => {
    const setting = reactive(userSet)

    const bgImage = computed(() => {
        return "url(" + setting.config.bgImage + ")";
    })
    const bannerImage = computed(() => {
        return "url(" + setting.config.bannerImage + ")";
    })
    const aboutImage = computed(() => {
        return "url(" + setting.config.aboutImage + ")";
    })
    const commentBgImage = computed(() => {
        return "url(" + setting.config.commentBgImage + ")";
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
        setting.config.bgImage = setting.theme.img.bgImage[themeMode]
        setting.config.bannerImage = setting.theme.img.bannerImage[themeMode]
        setting.config.aboutImage = setting.theme.img.aboutImage[themeMode]
        setting.config.commentBgImage = setting.theme.img.commentBgImage[themeMode]
    }

    return { setting, changeThemeMode, bgImage, bannerImage, aboutImage, commentBgImage }
})