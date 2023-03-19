<template>
  <aside
    id="krw-tags"
    class="widget widget-kratos-tags clearfix"
    v-if="tagStore.getTags.length > 0"
  >
    <h4 class="widget-title"><font-awesome-icon icon="fa-solid fa-tags" /> 标签聚合</h4>
    <span class="tag-clouds" v-for="tag in tagStore.getTags">
      <a style="font-size: 0.6em" @click="emits('clickTag', tag.name)">{{ tag.name }}</a>
    </span>
  </aside>
</template>
<script setup>
import { useTagStore } from "@/stores/useTag";
const tagStore = useTagStore();
const emits = defineEmits(["clickTag"]);
</script>
<style scoped lang="scss" src="./style.scss"></style>
