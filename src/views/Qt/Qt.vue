<template>
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
</template>
<script setup>
import { useSetterStore } from "../../stores/setter";
import router from "../../router";

const setterStore = useSetterStore();
const setting = setterStore.setting;
</script>
<style lang="scss" src="./style.scss"></style>
