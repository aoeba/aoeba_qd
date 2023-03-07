<script setup>
import { setting } from "./setting";
import Header from "./components/Header/Header.vue";
</script>

<template>
  <div class="custom-background">
    <div id="kratos-wrapper">
      <div id="kratos-page">
        <!-- <%- partial('_partial/header') %> -->
        <Header />
        <router-view></router-view>
      </div>
    </div>
    <!-- <%- partial('_partial/footer') %>
          <%- partial('_partial/after-footer') %> -->
  </div>
</template>
