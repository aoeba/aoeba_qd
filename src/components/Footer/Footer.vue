<template>
  <footer>
    <div id="footer" :class="theme.aplayer.enabled ? 'ap-lrc' : ''">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-md-offset-3 footer-list text-center">
            <ul class="kratos-social-icons">
              <!-- Keep for compatibility 
               weibo, mail, github, qq, weixin, git, bilibili -->
              <li v-if="theme.contact.weibo" key="weibo">
                <a target="_blank" rel="nofollow" :href="theme.contact.weibo">
                  <ClientOnly>
                    <font-awesome-icon icon="fa-brands fa-weibo" />
                  </ClientOnly>
                </a>
              </li>
              <li v-if="theme.contact.mail" key="mail">
                <a :href="'mailto:' + theme.contact.mail">
                  <ClientOnly>
                    <font-awesome-icon icon="fa-solid fa-envelope" />
                  </ClientOnly>
                </a>
              </li>
              <li v-if="theme.contact.github" key="github">
                <a target="_blank" rel="nofollow" :href="theme.contact.github">
                  <ClientOnly>
                    <font-awesome-icon icon="fa-brands fa-github" />
                  </ClientOnly>
                </a>
              </li>
              <li v-if="theme.contact.qq" key="qq">
                <t-popup placement="top">
                  <a target="_blank" rel="nofollow" :href="theme.contact.qq">
                    <ClientOnly>
                      <font-awesome-icon icon="fa-brands fa-qq" />
                    </ClientOnly>
                  </a>
                  <template #content>
                    <img :src="theme.contact.qq" class="note-img-pre" />
                  </template>
                </t-popup>
              </li>
              <li v-if="theme.contact.weixin" key="weixin">
                <t-popup placement="top">
                  <a target="_blank" rel="nofollow" :href="theme.contact.weixin">
                    <ClientOnly>
                      <font-awesome-icon icon="fa-brands fa-weixin" />
                    </ClientOnly>
                  </a>
                  <template #content>
                    <img :src="theme.contact.weixin" class="note-img-pre" />
                  </template>
                </t-popup>
              </li>
              <li v-if="theme.contact.git" key="git">
                <a target="_blank" rel="nofollow" :href="theme.contact.git">
                  <ClientOnly>
                    <font-awesome-icon icon="fa-brands fa-git" />
                  </ClientOnly>
                </a>
              </li>
              <li v-if="theme.contact.bilibili" key="bilibili">
                <a target="_blank" rel="nofollow" :href="theme.contact.bilibili">
                  <ClientOnly>
                    <font-awesome-icon icon="fa-brands fa-bilibili" />
                  </ClientOnly>
                </a>
              </li>
            </ul>
            <ul class="kratos-copyright">
              <div>
                <li>
                  &copy; {{ year }} {{ setterStore.setting.config.title }} 版权所有.
                </li>
              </div>
              <div>
                <li v-if="theme.storage?.url">
                  本网站由
                  <a :href="theme.storage.url" rel="external nofollow" target="_blank">
                    <img
                      :src="theme.storage.img ? theme.storage.img : upyun_logo"
                      height="14"
                      loading="lazy"
                      decoding="auto"
                    />
                  </a>
                  提供CDN加速/云存储服务
                </li>
                <li v-if="theme.hoster?.text">
                  部署于
                  <a :href="theme.hoster.url" rel="external nofollow" target="_blank">
                    <img
                      :src="theme.hoster.img ? theme.hoster.img : txy_wy"
                      height="14"
                      loading="lazy"
                      decoding="auto"
                    />
                    {{ theme.hoster.text }}
                  </a>
                </li>
              </div>
              <div v-if="theme.icp">
                <li>
                  <a
                    href="https://beian.miit.gov.cn"
                    rel="external nofollow"
                    target="_blank"
                    ><img :src="psr_img" height="14" loading="lazy" decoding="auto" />
                    {{ theme.icp }}
                  </a>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div class="kr-tool text-center">
        <div class="tool">
          <div class="box search-box" v-if="theme.search.enable">
            <a @click="MessagePlugin.warning('暂未实现')">
              <span>
                <ClientOnly>
                  <font-awesome-icon icon="fa-solid fa-search" />
                </ClientOnly>
              </span>
            </a>
          </div>
          <div
            class="box theme-box"
            id="darkmode-switch"
            v-if="theme.enable_dark"
            @click="changeModeLight(!theme.modeLight)"
          >
            <span>
              <ClientOnly>
                <font-awesome-icon icon="fa-solid fa-adjust" />
              </ClientOnly>
            </span>
          </div>
        </div>
        <div class="box gotop-box">
          <span :onClick="backTop">
            <ClientOnly>
              <font-awesome-icon icon="fa-solid fa-chevron-up" />
            </ClientOnly>
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
import { useSetterStore } from "../../stores/setter";
import psr_img from "../../assets/images/psr.webp";
import txy_wy from "../../assets/images/txy_wy.svg";
import upyun_logo from "../../assets/images/upyun_logo.png";
import { MessagePlugin } from "tdesign-vue-next";
import { useContext } from "vite-ssr/vue";
import { toRaw } from "vue";
import { ClientOnly } from "vite-ssr";

const { isClient } = useContext();
const setterStore = toRaw(useSetterStore());
await setterStore.loadQdSettingInfo();
const setting = toRaw(setterStore.setting);
const theme = setting.theme;

const backTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const changeModeLight = (modeLight) => {
  let mode = "light";
  theme.modeLight = modeLight;
  if (modeLight) {
    mode = "light";
  } else {
    mode = "dark";
  }
  setterStore.changeThemeMode(mode);
};

changeModeLight(theme.modeLight);

const year = new Date().getFullYear();
</script>
<style scoped lang="scss" src="./style.scss"></style>
