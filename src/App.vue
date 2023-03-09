<script setup>
import { onMounted, onUnmounted } from "vue";
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";
import {useSetterStore} from './stores/setter';

const setterStore = useSetterStore()

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
});
onUnmounted(() => {
  window.removeEventListener("scroll", pageScrollDownClass);
  // 仅处理鼠标滚动
  window.removeEventListener("wheel", handleTopNavScrollToggle);
});
</script>

<template>
  <div id="kratos-page" :style="{'--bgImage':setterStore.bgImage}">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<style lang="scss">
@media (min-width: 768px) {
  #kratos-page {
    background-image: var(--bgImage); // 使用vue中的值
    background-attachment: fixed; // 背景图片固定不滚动
  }
}
</style>
