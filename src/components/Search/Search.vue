<template>
  <div id="docsearch"></div>
</template>

<script setup>
import docsearch from "@docsearch/js";
import "@docsearch/css";
import { onMounted } from "vue";

import { useContext } from "vite-ssr/vue";
const { isClient } = useContext();

if (isClient) {
  onMounted(() => {
    docsearch({
      appId: "T449NSZJE1",
      apiKey: "7e149b610772123f0b137efc9b1976ed",
      indexName: "mk95",
      insights: true, // Optional, automatically send insights when user interacts with search results
      container: "#docsearch",
      debug: false, // Set debug to true if you want to inspect the modal
    });
  });
}
</script>
<style lang="scss" src="./style.scss"></style>
