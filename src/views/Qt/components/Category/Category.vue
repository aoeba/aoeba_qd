<template>
  <template v-if="site.categories.length > 0">
    <aside id="krw-categories" class="widget widget-kratos-categories clearfix">
      <h4 class="widget-title">
        <font-awesome-icon icon="fa-solid fa-folder"/> 分类目录
      </h4>
      <ul class="category-list" v-for="category in site.categories">
        <div class="category-list-item">
          <font-awesome-icon icon="fa-regular fa-folder" />
          <a class="category-list-link" :href="'/category/' + category.name">
            {{ category.name }}</a
          ><span class="category-list-count"> {{ category.size }}</span>
        </div>
      </ul>
    </aside>
  </template>
</template>
<script setup>
const site = {
  categories: [
    {
      name: "分类1",
      size: 3,
    },
    {
      name: "分类21",
      size: 12,
    },
  ],
};
</script>
<style scoped lang="scss" src="./style.scss"></style>
