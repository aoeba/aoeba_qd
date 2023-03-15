// 已加载的solid类型图标列表
export const awesomeSolidIconList = [
    "folder", "tags", "chevron-circle-right", "chevron-up", "adjust", "search", "house", "envelope"
    , "pen-to-square", "triangle-exclamation", "right-to-bracket", "user", "right-from-bracket"
    , "bars-progress"
]

// 作为store的数据模板,无法从服务端获取到配置信息时,以此为准
export const setting = {
    path: '/',
    // 网站logo
    webLogo: "http://cdn.mk95.cn/img/mk95.png",
    theme: {
        sidebar: "left", // left/right/其他
        topMenu: [
            {
                icon: 'house',
                label: '首页',
                url: '/'
            },
            {
                submenu: [{
                    icon: '',
                    label: 'submenu',
                    url: '/'
                }],
                icon: '',
                label: 'topMenu'
            }],
        // 首页相关属性设置
        index: {
            // 统计阅读数
            read_count: true,
            comment_count: true
        },
        // 播放器?
        aplayer: {
            enabled: true
        },
        contact: {
            // github, qq, weixin, weibo, git, bilibili , mail
            weibo: 'weibo',
            mail: 'mail',
            github: 'https://github',
            qq: 'qq',
            weixin: 'weixin',
            git: 'git',
            bilibili: 'bilibili'
        },
        search: {
            enable: true
        },
        enable_dark: true,
        modeLight: true, // dark / light
        note: {
            wordCount: {
                enable: true,
            },
            show_cc: true
        },
        img: { // 根据 亮/暗 主题切换
            bgImage: {
                light: 'https://candinya.com/images/bg.webp', // 网站背景图片
                dark: 'https://candinya.com/images/bg_dark.webp'
            },
            bannerImage: {
                light: 'https://candinya.com/images/banner.webp',
                dark: 'https://candinya.com/images/banner_dark.webp'
            },
            aboutImage: {
                light: 'https://candinya.com/images/banner.webp',
                dark: 'https://candinya.com/images/banner_dark.webp'
            },
            commentBgImage: {
                light: 'https://candinya.com/images/banner.webp',
                dark: 'https://candinya.com/images/banner_dark.webp'
            },
        },
        editorState: {
            // 编辑器主题  default dark
            theme: 'default',
            // 预览主题 default github vuepress mk-cute smart-blue cyanosis
            preTheme: "cyanosis",
            // 代码主题 atom a11y github gradient kimbie paraiso qtcreator stackoverflow
            codeTheme: "atom",
        },
        icp: '蜀ICP备16019003号-2',
        hoster: {
            url: 'https://curl.qcloud.com/rXfSaR1a',
            img: '',
            text: '腾讯云',
        },
        storage: {
            url: 'https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral',
            img: ''
        }
    },
    config: {
        title: '网站标题',
        subtitle: '二级标题',
        avatarUri: 'https://candinya.com/images/candinya.webp',
        description: '这里是描述'
    }
}