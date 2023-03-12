<template>
  <div id="kratos-page" :style="{ '--bgImage': setterStore.bgImage }">
    <Header />
    <div
      class="kratos-start kratos-hero-2"
      :style="{ '--bannerImage': setterStore.bannerImage }"
    >
      <div class="kratos-cover kratos-cover-2 text-center">
        <div class="desc desc2 animate-box">
          <a @click="router.push(setting.path)">
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
          <!-- <div
          :class="setting.theme.sidebar === 'left' ||
            setting.theme.sidebar === 'right'
              ? 'col-md-8'
              : 'col-md-12'
          "
        > 
        </div>
        <section id="kratos-widget-area" class="col-md-4 hidden-xs hidden-sm">
          <div class="sticky-area">
            <About/>
            <Category/>
            <Tagcloud/>
          </div>
        </section> -->
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup>
import { useSetterStore } from "@/stores/setter";
import router from "@/router";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { onMounted, onUnmounted } from "vue";

const setterStore = useSetterStore();
const setting = setterStore.setting;

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
<style lang="scss" src="./style.scss"></style>
