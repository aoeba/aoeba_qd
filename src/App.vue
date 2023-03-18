<script setup>
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";
import { useSetterStore } from "@/stores/setter";
import { updateVisitorCounter } from "@/api/leancloud"

const setterStore = useSetterStore();
const userStore = useUserStore();
onMounted(() => {
  // 从sessionStorage中加载userInfo
  if (sessionStorage.getItem("userInfo")) {
    userStore.login(JSON.parse(sessionStorage.getItem("userInfo")));
  }
  setterStore.loadQdSettingInfo();
  // 记录访问量
  var url = window.location.protocol+"//"+window.location.host;
  updateVisitorCounter(url,"玛卡玛卡")
});
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss"></style>
