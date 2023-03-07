<template>
  <div class="kratos-start kratos-hero-2">
    <div class="kratos-cover kratos-cover-2 text-center">
      <div class="desc desc2 animate-box">
        <a :href="setting.path">
          <h2>{{ setting.cofing.title }}</h2>
          <br />
          <span> {{ setting.cofing.subtitle }} </span>
        </a>
      </div>
    </div>
  </div>
  <div id="kratos-blog-post">
    <div class="container">
      <div id="main" class="row">
        <div
          :class="setting.theme.sidebar === 'left' ||
            setting.theme.sidebar === 'right'
              ? 'col-md-8'
              : 'col-md-12'
          "
        >
          <router-view></router-view>
        </div>

        <section id="kratos-widget-area" class="col-md-4 hidden-xs hidden-sm">
          <div class="sticky-area">
            <About/>
            <Category/>
            <Tagcloud/>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script setup>
import { setting } from "../../setting";
import About from "./components/About/About.vue";
import Category from "./components/Category/Category.vue";
import Tagcloud from "./components/Tagcloud/Tagcloud.vue";
</script>
<style scoped lang="scss" src="./style.scss"></style>
