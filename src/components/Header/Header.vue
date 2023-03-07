<template>
  <div id="kratos-header">
    <header id="kratos-desktop-topnav" class="kratos-topnav">
      <div class="container">
        <div class="nav-header">
          <nav id="kratos-menu-wrap">
            <ul id="kratos-primary-menu" class="sf-menu">
              <template v-if="setting.theme.topMenu.length > 0">
                <template v-for="menu in setting.theme.topMenu">
                  <li>
                    <a v-if="menu.submenu?.length > 0">
                      <i :class="'fa fa-' + menu.icon" v-if="menu.icon"></i>
                      {{ menu.label }}
                    </a>
                    <a v-else :href="menu.url">
                      <i :class="'fa fa-' + menu.icon" v-if="menu.icon"></i>
                      {{ menu.label }}
                    </a>
                    <ul class="sub-menu" v-if="menu.submenu?.length > 0">
                      <template v-for="submenu in menu.submenu">
                        <li>
                          <a :href="submenu.url">
                            <i :class="'fa fa-' + submenu.icon" v-if="submenu.icon"></i>
                            {{ submenu.label }}
                          </a>
                        </li>
                      </template>
                    </ul>
                  </li>
                </template>
              </template>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <header id="kratos-mobile-topnav" class="kratos-topnav">
      <div class="container">
        <div class="color-logo">
          <a href="/">{{ setting.cofing.title }}</a>
        </div>
        <div class="nav-toggle">
          <a class="kratos-nav-toggle js-kratos-nav-toggle">
            <i></i>
          </a>
        </div>
      </div>
    </header>
  </div>
</template>
<script setup>
import { setting } from "../../setting";
</script>
<style scoped lang="scss" src="./style.scss"></style>
