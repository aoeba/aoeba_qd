<template>
  <aside id="krw-about" class="widget widget-kratos-about clearfix">
    <div class="photo-background" :style="{'--aboutImage':setterStore.aboutImage}"></div>
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
                {{ props.noteCount }}
            </span>
        </a>
        <a class="meta-item">
            <span class="title">
                分类
            </span>
            <span class="count">
                {{ categoryStore.getCategories.length }}
            </span>
        </a>
        <a class="meta-item">
            <span class="title">
                标签
            </span>
            <span class="count">
                {{ tagStore.getTags.length }}
            </span>
        </a>
    </div>
</aside>
</template>
<script setup>
import { useSetterStore } from '../../../../stores/setter';
import { useCategoryStore } from '@/stores/useCategory';
import { useTagStore } from '@/stores/useTag';

const setterStore = useSetterStore()
const config = setterStore.setting.config

const categoryStore = useCategoryStore()
const tagStore = useTagStore()

const props = defineProps(['noteCount'])
</script>
<style scoped lang="scss" src="./style.scss">

</style>
