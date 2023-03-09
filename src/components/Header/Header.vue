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
                      <font-awesome-icon :icon="'fa-solid fa-' + menu.icon" v-if="menu.icon"/>
                      {{ menu.label }}
                    </a>
                    <a v-else @click="router.push(menu.url)">
                      <font-awesome-icon :icon="'fa-solid fa-' + menu.icon" v-if="menu.icon"/>
                      {{ menu.label }}
                    </a>
                    <ul class="sub-menu" v-if="menu.submenu?.length > 0">
                      <template v-for="submenu in menu.submenu">
                        <li>
                          <a @click="router.push(submenu.url)">
                            <font-awesome-icon :icon="'fa-solid fa-' + submenu.icon" v-if="submenu.icon"/>
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
          <a @click="router.push('/')">{{ setting.config.title }}</a>
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
import router from "../../router";
</script>
<style scoped lang="scss" src="./style.scss"></style>
