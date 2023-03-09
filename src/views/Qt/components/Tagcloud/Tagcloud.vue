<template>
  <aside id="krw-tags" class="widget widget-kratos-tags clearfix">
    <h4 class="widget-title"><font-awesome-icon icon="fa-solid fa-tags" /> 标签聚合</h4>
    <span class="tag-clouds" v-for="tag in site.tags">
      <a style="font-size: 0.6em">{{ tag }}</a>
    </span>
  </aside>
</template>
<script setup>
const site = {
  tags: ["fsaf", "fas211"],
};
</script>
<style scoped lang="scss" src="./style.scss"></style>
