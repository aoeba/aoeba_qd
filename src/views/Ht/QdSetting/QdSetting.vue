<template>
  <div class="qd-setting">
    <t-card class="aoeba-card">
      <div class="set-item-title">
        <font-awesome-icon icon="fa-solid fa-gears" />网站信息
      </div>
      <div label="网站信息" class="aoeba-set config">
        <div>
          <t-input-adornment prepend="网站标题">
            <t-input placeholder="请输入" v-model="setting.config.title" />
          </t-input-adornment>
          <t-input-adornment prepend="二级标题">
            <t-input placeholder="请输入" v-model="setting.config.subtitle" />
          </t-input-adornment>
        </div>
        <div>
          <t-input-adornment prepend="用户头像">
            <t-input placeholder="请输入" v-model="setting.config.avatarUri" />
          </t-input-adornment>
          <t-input-adornment prepend="个人描述">
            <t-input placeholder="请输入" v-model="setting.config.description" />
          </t-input-adornment>
        </div>
        <div>
          <t-input-adornment prepend="网站logo">
            <t-input v-model="setting.webLogo" placeholder="请输入webLogo链接"></t-input>
          </t-input-adornment>
          <t-input-adornment prepend="ICP">
            <t-input placeholder="请输入ICP" v-model="setting.theme.icp" />
          </t-input-adornment>
        </div>
      </div>
      <div class="set-item-title">
        <font-awesome-icon icon="fa-solid fa-gears" />顶部菜单
      </div>
      <div label="顶部菜单" class="aoeba-set topMenu">
        <div>
          <t-button size="small" variant="base" @click="addTopMenuItem">新增</t-button>
        </div>
        <div>
          <t-enhanced-table
            ref="topMenuTable"
            row-key="label"
            size="small"
            :columns="topMenuTabColumns"
            :data="setting.theme.topMenu"
            :tree="{ childrenKey: 'submenu', treeNodeColumnIndex: 1 }"
            drag-sort="row-handler"
            @abnormal-drag-sort="onTopMenuAbnormalDragSort"
            @drag-sort="getTopMenuTreeNode"
          >
            <template #drag>
              <t-icon name="move" />
            </template>
            <template #icon="{ row }">
              <font-awesome-icon
                :icon="'fa-solid fa-' + row.icon"
                v-if="row.icon != ''"
              />
              {{ row.icon }}
            </template>
            <template #operate="{ row }">
              <t-link variant="text" hover="color" @click="onEidtTopMenuRow(row)">
                编辑
              </t-link>
              &nbsp;
              <t-popconfirm
                content="确认删除吗"
                :onConfirm="() => onTopMenuDeleteConfirm(row)"
              >
                <t-link variant="text" hover="color" theme="danger"> 删除 </t-link>
              </t-popconfirm>
            </template>
          </t-enhanced-table>
        </div>
      </div>

      <!-- 首页相关设置 -->
      <div class="set-item-title">
        <font-awesome-icon icon="fa-solid fa-gears" />首页设置
      </div>
      <div label="首页设置" class="aoeba-set index">
        <div>显示阅读数:<t-switch v-model="setting.theme.index.read_count" /></div>
        <div>显示评论数:<t-switch v-model="setting.theme.index.comment_count" /></div>
        <div>显示搜索:<t-switch v-model="setting.theme.search.enable" /></div>
        <div>
          默认主题:<t-switch v-model="setting.theme.modeLight">
            <template #label="slotProps">{{
              setting.theme.modeLight ? "亮" : "暗"
            }}</template>
          </t-switch>
        </div>
        <div>显示主题切换:<t-switch v-model="setting.theme.enable_dark" /></div>
      </div>
      <div class="set-item-title">
        <font-awesome-icon icon="fa-solid fa-gears" />文章设置
      </div>
      <div label="文章设置" class="aoeba-set note">
        <div>
          显示字数统计:<t-switch v-model="setting.theme.note.wordCount.enable" /> &nbsp;
        </div>
        <div>显示许可信息:<t-switch v-model="setting.theme.note.show_cc" /></div>
      </div>
      <div class="set-item-title">
        <font-awesome-icon icon="fa-solid fa-gears" />编辑器设置
      </div>
      <div label="编辑器设置" class="aoeba-set editorState">
        <div>
          <t-select v-model="setting.theme.editorState.preTheme" filterable>
            <t-option
              v-for="preTheme in [
                'default',
                'github',
                'vuepress',
                'mk-cute',
                'smart-blue',
                'cyanosis',
              ]"
              :key="preTheme"
              :label="preTheme"
              :value="preTheme"
            />
            <template #prefixIcon> 预览主题： </template>
          </t-select>
        </div>
        <div>
          <t-select v-model="setting.theme.editorState.codeTheme" filterable>
            <t-option
              v-for="codeTheme in [
                'atom',
                'a11y',
                'github',
                'gradient',
                'kimbie',
                'paraiso',
                'qtcreator',
                'stackoverflow',
              ]"
              :key="codeTheme"
              :label="codeTheme"
              :value="codeTheme"
            />
            <template #prefixIcon> 代码主题： </template>
          </t-select>
        </div>
      </div>
      <div class="set-item-title">
        <font-awesome-icon icon="fa-solid fa-gears" />网站背景图片
      </div>
      <div label="网站背景图片" class="aoeba-set bgImage">
        <t-input-adornment prepend="light">
          <t-input
            placeholder="请输入图片地址"
            v-model="setting.theme.img.bgImage.light"
          />
        </t-input-adornment>
        <t-input-adornment prepend="dark">
          <t-input
            placeholder="请输入图片地址"
            v-model="setting.theme.img.bgImage.dark"
          />
        </t-input-adornment>
      </div>
      <div class="set-item-title">
        <font-awesome-icon icon="fa-solid fa-gears" />网站标题背景图片
      </div>
      <div label="网站标题背景图片" class="aoeba-set bannerImage">
        <t-input-adornment prepend="light">
          <t-input
            placeholder="请输入图片地址"
            v-model="setting.theme.img.bannerImage.light"
          />
        </t-input-adornment>
        <t-input-adornment prepend="dark">
          <t-input
            placeholder="请输入图片地址"
            v-model="setting.theme.img.bannerImage.dark"
          />
        </t-input-adornment>
      </div>
      <div class="set-item-title">
        <font-awesome-icon icon="fa-solid fa-gears" />我的卡片背景图片
      </div>
      <div label="我的卡片背景图片" class="aoeba-set aboutImage">
        <t-input-adornment prepend="light">
          <t-input
            placeholder="请输入图片地址"
            v-model="setting.theme.img.aboutImage.light"
          />
        </t-input-adornment>
        <t-input-adornment prepend="dark">
          <t-input
            placeholder="请输入图片地址"
            v-model="setting.theme.img.aboutImage.dark"
          />
        </t-input-adornment>
      </div>
      <div class="set-item-title">
        <font-awesome-icon icon="fa-solid fa-gears" />评论背景图片
      </div>
      <div label="评论背景图片" class="aoeba-set commentBgImage">
        <t-input-adornment prepend="light">
          <t-input
            placeholder="请输入图片地址"
            v-model="setting.theme.img.commentBgImage.light"
          />
        </t-input-adornment>
        <t-input-adornment prepend="dark">
          <t-input
            placeholder="请输入图片地址"
            v-model="setting.theme.img.commentBgImage.dark"
          />
        </t-input-adornment>
      </div>
      <!-- 联系方式 -->
      <div class="set-item-title">
        <font-awesome-icon icon="fa-solid fa-gears" />联系方式
      </div>
      <div label="联系方式" class="aoeba-set contact">
        <div>
          <t-input-adornment prepend="微博">
            <t-input placeholder="请输入微博地址" v-model="setting.theme.contact.weibo" />
          </t-input-adornment>
          <t-input-adornment prepend="邮箱">
            <t-input placeholder="请输入邮箱" v-model="setting.theme.contact.mail" />
          </t-input-adornment>
          <t-input-adornment prepend="github">
            <t-input
              placeholder="请输入github地址"
              v-model="setting.theme.contact.github"
            />
          </t-input-adornment>
        </div>
        <div>
          <t-input-adornment prepend="qq">
            <t-input
              placeholder="请输入二维码图片地址"
              v-model="setting.theme.contact.qq"
            />
          </t-input-adornment>
          <t-input-adornment prepend="微信">
            <t-input
              placeholder="请输入二维码图片地址"
              v-model="setting.theme.contact.weixin"
            />
          </t-input-adornment>
          <t-input-adornment prepend="git">
            <t-input placeholder="请输入git地址" v-model="setting.theme.contact.git" />
          </t-input-adornment>
        </div>
        <div>
          <t-input-adornment prepend="bilibili">
            <t-input
              placeholder="请输入bilibili地址"
              v-model="setting.theme.contact.bilibili"
            />
          </t-input-adornment>
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="set-item-title">
        <font-awesome-icon icon="fa-solid fa-gears" />云服务提供商
      </div>
      <div label="云服务提供商" class="aoeba-set hoster">
        <t-input-adornment prepend="名称">
          <t-input
            placeholder="请输入云服务提供商名称"
            v-model="setting.theme.hoster.text"
          />
        </t-input-adornment>
        <t-input-adornment prepend="图标">
          <t-input
            placeholder="请输入图标地址(默认无忧)"
            v-model="setting.theme.hoster.img"
          />
        </t-input-adornment>
        <t-input-adornment prepend="url">
          <t-input placeholder="请输入url" v-model="setting.theme.hoster.url" />
        </t-input-adornment>
      </div>
      <div class="set-item-title">
        <font-awesome-icon icon="fa-solid fa-gears" />云存储提供商
      </div>
      <div label="云存储提供商" class="aoeba-set storage">
        <t-input-adornment prepend="图标">
          <t-input
            placeholder="请输入图标地址(默认又拍云)"
            v-model="setting.theme.storage.img"
          />
        </t-input-adornment>
        <t-input-adornment prepend="url">
          <t-input placeholder="请输入url" v-model="setting.theme.storage.url" />
        </t-input-adornment>
      </div>
      <!-- 操作按钮 -->
      <div class="set-ctrl">
        <t-button @click="save">保存</t-button>
        <t-button variant="outline" @click="setterStore.loadQdSettingInfo()">重置</t-button>
      </div>
      <!-- 顶部菜单编辑行弹窗 -->
      <t-dialog
        v-model:visible="topMenuEditDialogVisible"
        @confirm="topMenuEditDialogEnter"
      >
        <div>文本</div>
        <t-input v-model="topMenuEditData.label" />
        <div>上级菜单</div>
        <t-select v-model="topMenuEditData.sj" filterable>
          <t-option key="menu.label" label="无(一级菜单)" value="" />
          <t-option
            v-for="menu in setting.theme.topMenu"
            :key="menu.label"
            :label="menu.label"
            :value="menu.label"
          />
        </t-select>
        <div>图标</div>
        <t-select v-model="topMenuEditData.icon" filterable>
          <template #prefixIcon>
            <font-awesome-icon
              :icon="'fa-solid fa-' + topMenuEditData.icon"
              v-if="topMenuEditData.icon != ''"
            />
          </template>
          <t-option v-for="icon in iconList" :key="icon" :label="icon" :value="icon">
            <font-awesome-icon :icon="'fa-solid fa-' + icon" />
            {{ icon }}
          </t-option>
        </t-select>
        <div>路径</div>
        <t-select v-model="topMenuEditData.url" filterable creatable>
          <t-option v-for="path in pathList" :key="path" :label="path" :value="path" />
        </t-select>
      </t-dialog>
    </t-card>
  </div>
</template>
<script setup>
import { useSetterStore } from "@/stores/setter";
import { reactive, onMounted, ref } from "vue";
import { MessagePlugin } from "tdesign-vue-next";
import { awesomeSolidIconList } from "@/setting";
import { useRouter } from "vue-router";
import { updateQdSetting } from "@/api/setting"

// solid可选图标名称列表
const iconList = ref([...awesomeSolidIconList]);
// 路由列表
const pathList = ref([]);
const router = useRouter();
router.getRoutes().forEach((el) => {
  pathList.value.push(el.path);
});

const setterStore = useSetterStore();
const setting = setterStore.setting;

// 顶部菜单配置数据
const topMenuTable = ref(null);
const topMenuTabColumns = [
  {
    colKey: "drag", // 列拖拽排序必要参数
    title: "排序",
    width: 46,
  },
  {
    colKey: "label",
    title: "文本",
    width: "150",
  },
  { colKey: "icon", title: "图标", width: "120" },
  { colKey: "url", title: "路径", width: "120" },
  {
    colKey: "operate",
    width: 100,
    title: "操作",
  },
];
const onTopMenuAbnormalDragSort = (params) => {
  if (params.code === 1001) {
    MessagePlugin.warning("不同层级的元素，不允许调整顺序");
  }
};
// 删除菜单项
const onTopMenuDeleteConfirm = (row) => {
  topMenuTable.value.remove(row.label);
  getTopMenuTreeNode();
  MessagePlugin.success("删除成功");
};
// 获取菜单表格配置节点信息(加载到store中)
const getTopMenuTreeNode = () => {
  const treeData = topMenuTable.value.getTreeNode();
  setting.theme.topMenu = treeData;
};
// 顶部菜单编辑窗口是否显示
const topMenuEditDialogVisible = ref(false);
// 顶部菜单当前编辑的数据
const topMenuEditData = reactive({
  icon: "",
  label: "",
  url: "",
  sj: "",
});
// 当前正在编辑的topMenu菜单唯一标识(label)
const TOP_MENU_TAB_ROW_KEY = ref("");
// 编辑菜单子项
const onEidtTopMenuRow = (row) => {
  TOP_MENU_TAB_ROW_KEY.value = row.label;
  topMenuEditData.icon = row.icon;
  topMenuEditData.label = row.label;
  topMenuEditData.url = row.url;
  let tableRowState = topMenuTable.value.getData(row.label);
  if (tableRowState.parent) {
    topMenuEditData.sj = tableRowState.parent.row.label;
  } else {
    topMenuEditData.sj = "";
  }
  topMenuEditDialogVisible.value = true;
};
// topMenu子项编辑窗口确认事件
const topMenuEditDialogEnter = () => {
  if (TOP_MENU_TAB_ROW_KEY.value == "") {
    // 新增
    const item = {
      icon: topMenuEditData.icon,
      label: topMenuEditData.label,
      url: topMenuEditData.url,
    };
    topMenuTable.value.appendTo(topMenuEditData.sj, item);
  } else {
    // 更新,先把原数据取出来再更新,否则可能丢失孩子节点
    let data = topMenuTable.value.getData(TOP_MENU_TAB_ROW_KEY.value).row;
    data.icon = topMenuEditData.icon;
    data.label = topMenuEditData.label;
    data.url = topMenuEditData.url;
    topMenuTable.value.setData(TOP_MENU_TAB_ROW_KEY.value, data);
  }
  // 设置store中的菜单值
  getTopMenuTreeNode();
  topMenuEditDialogVisible.value = false;
};
// 新增顶部菜单节点
const addTopMenuItem = () => {
  TOP_MENU_TAB_ROW_KEY.value = "";
  topMenuEditData.icon = "";
  topMenuEditData.label = "";
  topMenuEditData.url = "";
  topMenuEditDialogVisible.value = true;
};
// 保存配置信息
const save = () => {
  updateQdSetting(JSON.stringify(setting)).then(res => {
    MessagePlugin.success("保存成功");
  })
}
onMounted(() => {
  // 加载最新的配置信息
  // setterStore.loadQdSettingInfo();
});
</script>
<style scoped lang="scss" src="./style.scss"></style>
