<template>
  <template v-if="categoryStore.getCategories.length > 0">
    <aside id="krw-categories" class="widget widget-kratos-categories clearfix">
      <h4 class="widget-title">
        <font-awesome-icon icon="fa-solid fa-folder"/> 分类目录
      </h4>
      <ul class="category-list">
        <li class="category-list-item" v-for="category in categoryStore.getCategories">
          <font-awesome-icon icon="fa-regular fa-folder" />
          <a class="category-list-link" @click="emits('clickCategory',category.category)">
            {{ category.category }}</a
          ><span class="category-list-count"> {{ category.size }}</span>
        </li>
      </ul>
    </aside>
  </template>
</template>
<script setup>
import { useCategoryStore } from '@/stores/useCategory';
const categoryStore = useCategoryStore()

const emits = defineEmits(['clickCategory'])
</script>
<style scoped lang="scss" src="./style.scss"></style>
