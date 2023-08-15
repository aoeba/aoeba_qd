<template>
  <footer>
    <div id="footer" :class="setting.theme.aplayer.enabled ? 'ap-lrc' : ''">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-md-offset-3 footer-list text-center">
            <ul class="kratos-social-icons">
              <!-- Keep for compatibility 
               weibo, mail, github, qq, weixin, git, bilibili -->
              <li v-if="setting.theme.contact.weibo" key="weibo">
                <a target="_blank" rel="nofollow" :href="setting.theme.contact.weibo">
                  <ClientOnly>
                    <font-awesome-icon icon="fa-brands fa-weibo" />
                  </ClientOnly>
                </a>
              </li>
              <li v-if="setting.theme.contact.mail" key="mail">
                <a :href="'mailto:' + setting.theme.contact.mail">
                  <ClientOnly>
                    <font-awesome-icon icon="fa-solid fa-envelope" />
                  </ClientOnly>
                </a>
              </li>
              <li v-if="setting.theme.contact.github" key="github">
                <a target="_blank" rel="nofollow" :href="setting.theme.contact.github">
                  <ClientOnly>
                    <font-awesome-icon icon="fa-brands fa-github" />
                  </ClientOnly>
                </a>
              </li>
              <li v-if="setting.theme.contact.qq" key="qq">
                <ClientOnly>
                  <t-popup placement="top">
                    <a target="_blank" rel="nofollow" :href="setting.theme.contact.qq">
                      <font-awesome-icon icon="fa-brands fa-qq" />
                    </a>
                    <template #content>
                      <img :src="setting.theme.contact.qq" class="note-img-pre" />
                    </template>
                  </t-popup>
                </ClientOnly>
              </li>
              <li v-if="setting.theme.contact.weixin" key="weixin">
                <ClientOnly>
                  <t-popup placement="top">
                    <a
                      target="_blank"
                      rel="nofollow"
                      :href="setting.theme.contact.weixin"
                    >
                      <font-awesome-icon icon="fa-brands fa-weixin" />
                    </a>
                    <template #content>
                      <img :src="setting.theme.contact.weixin" class="note-img-pre" />
                    </template>
                  </t-popup>
                </ClientOnly>
              </li>
              <li v-if="setting.theme.contact.git" key="git">
                <a target="_blank" rel="nofollow" :href="setting.theme.contact.git">
                  <ClientOnly>
                    <font-awesome-icon icon="fa-brands fa-git" />
                  </ClientOnly>
                </a>
              </li>
              <li v-if="setting.theme.contact.bilibili" key="bilibili">
                <a target="_blank" rel="nofollow" :href="setting.theme.contact.bilibili">
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
                <li v-if="setting.theme.storage?.url">
                  本网站由
                  <a
                    :href="setting.theme.storage.url"
                    rel="external nofollow"
                    target="_blank"
                  >
                    <img
                      :src="
                        setting.theme.storage.img ? setting.theme.storage.img : upyun_logo
                      "
                      height="14"
                      loading="lazy"
                      decoding="auto"
                    />
                  </a>
                  提供CDN加速/云存储服务
                </li>
                <li v-if="setting.theme.hoster?.text">
                  部署于
                  <a
                    :href="setting.theme.hoster.url"
                    rel="external nofollow"
                    target="_blank"
                  >
                    <img
                      :src="setting.theme.hoster.img ? setting.theme.hoster.img : txy_wy"
                      height="14"
                      loading="lazy"
                      decoding="auto"
                    />
                    {{ setting.theme.hoster.text }}
                  </a>
                </li>
              </div>
              <div v-if="setting.theme.icp">
                <li>
                  <a
                    href="https://beian.miit.gov.cn"
                    rel="external nofollow"
                    target="_blank"
                    ><img :src="psr_img" height="14" loading="lazy" decoding="auto" />
                    {{ setting.theme.icp }}
                  </a>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div class="kr-tool text-center">
        <div class="tool">
          <!-- <div class="box search-box" v-if="setting.theme.search.enable">
            <a @click="changeSearchVisible">
              <span>
                <ClientOnly>
                  <font-awesome-icon icon="fa-solid fa-search" />
                </ClientOnly>
              </span>
            </a>
          </div> -->
          <div
            class="box theme-box"
            id="darkmode-switch"
            v-if="setting.theme.enable_dark"
            @click="changeModeLight(!setting.theme.modeLight)"
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
import { toRaw } from "vue";
import { ClientOnly } from "vite-ssr";

const setterStore = toRaw(useSetterStore());
await setterStore.loadQdSettingInfo();
const setting = toRaw(setterStore.setting);

const backTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const changeModeLight = (modeLight) => {
  let mode = "light";
  setting.theme.modeLight = modeLight;
  if (modeLight) {
    mode = "light";
  } else {
    mode = "dark";
  }
  setterStore.changeThemeMode(mode);
};

changeModeLight(setting.theme.modeLight);

const year = new Date().getFullYear();

</script>
<style scoped lang="scss" src="./style.scss"></style>
