<template>
  <div id="kratos-page" :style="{ '--bgImage': setterStore.bgImage.value }">
    <Header />
    <div
      class="kratos-start kratos-hero-2"
      :style="{ '--bannerImage': setterStore.bannerImage.value }"
    >
      <div class="kratos-cover kratos-cover-2 text-center">
        <div class="desc desc2 animate-box">
          <a :href="setting.path">
            <h2>{{ setting.config.title }}</h2>
            <br />
            <span> {{ setting.config.subtitle }} </span>
          </a>
        </div>
      </div>
    </div>
    <div id="kratos-blog-post">
      <div class="container">
        <div id="main" class="row">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup>
import { ClientOnly } from "vite-ssr";
import { useSetterStore } from "@/stores/setter";
import { useUserStore } from "@/stores/user";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { onMounted, onUnmounted, toRaw } from "vue";
import { updateVisitorCounter } from "@/api/leancloud";
import { useContext } from "vite-ssr/vue";

const { isClient } = useContext();
const setterStore = toRaw(useSetterStore());
await setterStore.loadQdSettingInfo();
const userStore = toRaw(useUserStore());
const setting = toRaw(setterStore.setting);

if (isClient) {
  let isScrolledDown = false;
  const pageScrollDownClass = () => {
    window.requestAnimationFrame(() => {
      if (window.scrollY > 200) {
        if (!isScrolledDown) {
          document.body.classList.add("scroll-down");
          isScrolledDown = true;
        }
      } else {
        if (isScrolledDown) {
          document.body.classList.remove("scroll-down");
          isScrolledDown = false;
        }
      }
    });
  };

  // 记录上一次滚动高度，用于判断滚动方向
  let lastHeight = window.innerHeight;
  // 记录顶部栏隐藏状态
  let isTopNavHidden = false;

  // 处理事件的函数
  const handleTopNavScrollToggle = () => {
    window.requestAnimationFrame(() => {
      if (lastHeight < window.scrollY) {
        // 向下滚动
        if (!isTopNavHidden) {
          document.body.classList.add("nav-up");
          isTopNavHidden = true;
        }
      } else if (lastHeight > window.scrollY) {
        // 向上滚动
        if (isTopNavHidden) {
          document.body.classList.remove("nav-up");
          isTopNavHidden = false;
        }
      }
      // 相等则不做处理
      lastHeight = window.scrollY;
    });
  };

  onMounted(() => {
    window.addEventListener("scroll", pageScrollDownClass);
    // 仅处理鼠标滚动
    window.addEventListener("wheel", handleTopNavScrollToggle);
    // 从sessionStorage中加载userInfo
    if (sessionStorage.getItem("userInfo")) {
      userStore.login(JSON.parse(sessionStorage.getItem("userInfo")));
    }
    setterStore.loadQdSettingInfo();
    // 记录访问量
    var url = window.location.protocol + "//" + window.location.host;
    updateVisitorCounter(url, "玛卡玛卡");
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", pageScrollDownClass);
    // 仅处理鼠标滚动
    window.removeEventListener("wheel", handleTopNavScrollToggle);
  });
}
</script>
<style lang="scss" src="./style.scss"></style>
