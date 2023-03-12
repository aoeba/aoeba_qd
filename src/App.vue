<script setup>
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";

const userStore = useUserStore();
onMounted(() => {
  // 从sessionStorage中加载userInfo
  if (sessionStorage.getItem("userInfo")) {
    userStore.login(JSON.parse(sessionStorage.getItem("userInfo")));
  }
});
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss"></style>
