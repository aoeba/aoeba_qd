<template>
  <t-layout>
    <div class="aoeba-ht">
      <div class="aoeba-ht-left">
        <t-menu expand-mutex v-model="menuValue" :collapsed="collapsed">
          <template #logo>
            <a href="/">
              <img
                :width="collapsed ? 35 : 136"
                :src="setterStore.setting.webLogo"
                alt="logo"
              />
            </a>
          </template>
          <t-menu-item value="noteDetail" :to="{ path: '/ht/noteDetail' }">
            <template #icon>
              <t-icon name="bulletpoint" />
            </template>
            笔记详情
          </t-menu-item>
          <t-menu-item value="editNote" :to="{ path: '/ht/editNote' }">
            <template #icon>
              <t-icon name="edit-1" />
            </template>
            写笔记
          </t-menu-item>
          <t-menu-item value="fileManagement" :to="{ path: '/ht/fileManagement' }">
            <template #icon>
              <t-icon name="file" />
            </template>
            文件管理
          </t-menu-item>
          <t-submenu value="setting">
            <template #icon>
              <t-icon name="setting" />
            </template>
            <template #title>
              <span>系统设置</span>
            </template>
            <t-menu-item value="qdSetting" :to="{ path: '/ht/qdSetting' }">
              主题设置
            </t-menu-item>
            <t-menu-item value="3-1-2"> 2级菜单内容 </t-menu-item>
          </t-submenu>
          <template #operations>
            <t-button variant="text" shape="square" @click="changeCollapsed">
              <template #icon><t-icon name="view-list" /></template>
            </t-button>
          </template>
        </t-menu>
      </div>
      <div class="aoeba-ht-right">
        <client-only>
          <router-view @changeMenu="changeMenuValue"></router-view>
        </client-only>
      </div>
    </div>
  </t-layout>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSetterStore } from "@/stores/setter";
import { ClientOnly } from "vite-ssr/vue";

const router = useRouter();
const setterStore = useSetterStore();
// 左侧控制区收缩/展开
const collapsed = ref(false);
const changeCollapsed = () => {
  collapsed.value = !collapsed.value;
};
const menuValue = ref("");
// 子页面之间直接跳转时通知父页面改当前菜单
const changeMenuValue = (value) => {
  menuValue.value = value;
};
</script>
<style scoped lang="scss" src="./style.scss"></style>
