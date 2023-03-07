<template>
  <aside id="krw-about" class="widget widget-kratos-about clearfix">
    <div class="photo-background"></div>
    <div class="photo-wrapper clearfix">
        <div class="photo-wrapper-tip text-center">
            <img class="about-photo" :src="config.avatarUri" loading="lazy" decoding="auto" />
        </div>
    </div>
    <div class="textwidget">
        <p class="text-center">{{ config.description }}</p>
    </div>
    <div class="site-meta">
        <a class="meta-item">
            <span class="title">
                文章
            </span>
            <span class="count">
                {{ site.noteCount }}
            </span>
        </a>
        <a class="meta-item">
            <span class="title">
                分类
            </span>
            <span class="count">
                {{ site.categories.length }}
            </span>
        </a>
        <a class="meta-item">
            <span class="title">
                标签
            </span>
            <span class="count">
                {{ site.tags.length }}
            </span>
        </a>
    </div>
</aside>
</template>
<script setup>
import { setting } from '../../../../setting';
const config = setting.cofing

const site = {
  tags:[],
  categories:[],
  noteCount: 10,

}
</script>
<style scoped lang="scss" src="./style.scss">

</style>
