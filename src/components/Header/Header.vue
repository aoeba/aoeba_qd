<template>
  <div id="kratos-header">
    <header id="kratos-desktop-topnav" class="kratos-topnav">
      <div class="container">
        <div class="nav-header">
          <nav id="kratos-menu-wrap">
            <ul id="kratos-primary-menu" class="aoeba-topnav-left sf-menu">
              <template v-if="setting.theme.topMenu.length > 0">
                <template v-for="menu in setting.theme.topMenu">
                  <li>
                    <a v-if="menu.submenu?.length > 0">
                      <ClientOnly>
                        <font-awesome-icon
                          :icon="'fa-solid fa-' + menu.icon"
                          v-if="menu.icon"
                        />
                      </ClientOnly>
                      {{ menu.label }}
                    </a>
                    <a v-else :href="menu.url">
                      <ClientOnly>
                        <font-awesome-icon
                          :icon="'fa-solid fa-' + menu.icon"
                          v-if="menu.icon"
                        />
                      </ClientOnly>
                      {{ menu.label }}
                    </a>
                    <ul class="sub-menu" v-if="menu.submenu?.length > 0">
                      <template v-for="submenu in menu.submenu">
                        <li>
                          <a :href="submenu.url">
                            <ClientOnly>
                              <font-awesome-icon
                                :icon="'fa-solid fa-' + submenu.icon"
                                v-if="submenu.icon"
                              />
                            </ClientOnly>
                            {{ submenu.label }}
                          </a>
                        </li>
                      </template>
                    </ul>
                  </li>
                </template>
              </template>
            </ul>
            <!-- 顶部导航栏右边 -->
            <ul class="aoeba-topnav-right sf-menu">
              <li style="height: 100%;display: flex;align-items: center">
                <Search />
              </li>
              <li v-if="!userStore.isLogin">
                <a @click="showLoginModal = true">
                  <ClientOnly>
                    <font-awesome-icon icon="fa-solid fa-right-to-bracket" />
                  </ClientOnly>
                  登录
                </a>
              </li>
              <li v-else>
                <a>
                  <ClientOnly>
                    <font-awesome-icon icon="fa-solid fa-user" />
                  </ClientOnly>
                  {{ userStore.userInfo.userName }}
                </a>
                <ul class="sub-menu">
                  <li>
                    <a @click="router.push('/ht')">
                      <ClientOnly>
                        <font-awesome-icon icon="fa-solid fa-bars-progress" />
                      </ClientOnly>
                      后台管理
                    </a>
                  </li>
                  <li>
                    <a @click="logout">
                      <ClientOnly>
                        <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
                      </ClientOnly>
                      退出
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <header id="kratos-mobile-topnav" class="kratos-topnav">
      <div class="container">
        <div class="color-logo">
          <a href="/">{{ setting.config.title }}</a>
        </div>
        <div class="nav-toggle">
          <a class="kratos-nav-toggle js-kratos-nav-toggle">
            <i></i>
          </a>
        </div>
      </div>
    </header>
    <!-- 登录modal -->
    <t-dialog
      v-model:visible="showLoginModal"
      header="登录"
      :confirmBtn="null"
      :cancelBtn="null"
    >
      <t-form
        ref="loginForm"
        :data="userInfo"
        :colon="true"
        @reset="loginFormReset"
        @submit="login"
        :rules="loginRules"
      >
        <t-form-item label="用户名" name="userName">
          <t-input v-model="userInfo.userName" placeholder="请输入用户名"></t-input>
        </t-form-item>
        <t-form-item label="密码" name="password">
          <t-input
            v-model="userInfo.password"
            type="password"
            clearable
            placeholder="请输入密码"
          ></t-input>
        </t-form-item>
        <t-form-item style="padding-top: 8px">
          <t-button theme="primary" type="submit" style="margin-right: 10px"
            >提交</t-button
          >
          <t-button theme="default" variant="base" type="reset">重置</t-button>
        </t-form-item>
      </t-form>
    </t-dialog>
  </div>
</template>
<script setup>
import { MessagePlugin } from "tdesign-vue-next";
import { reactive, ref, toRaw } from "vue";
import { useUserStore } from "../../stores/user";
import { login as apiLogin } from "../../api/user.js";
import { useSetterStore } from "@/stores/setter";
import { useContext } from "vite-ssr/vue";
import { ClientOnly } from "vite-ssr";
import { useRouter } from "vue-router";
import Search from "@/components/Search";

const router = useRouter();
const { isClient } = useContext();
const setterStore = useSetterStore();
await setterStore.loadQdSettingInfo();
const userStore = useUserStore();
const setting = toRaw(setterStore.setting);

// 登录表单是否显示
const showLoginModal = ref(false);
// 登录表单验证规则
const loginRules = {
  userName: [{ required: true, message: "用户名不可为空", type: "error" }],
  password: [{ required: true, message: "密码不可为空", type: "error" }],
};
const userInfo = reactive({
  userName: "",
  password: "",
  token: "",
});
// 重置登录表单
const loginFormReset = () => {
  userInfo.userName = "";
  userInfo.password = "";
  MessagePlugin.success("重置成功");
};
// 登录
const login = () => {
  apiLogin(userInfo).then((res) => {
    userInfo.token = res;
    userStore.login(userInfo);
    showLoginModal.value = false;
    MessagePlugin.success("登录成功");
  });
};
// 退出并返回首页
const logout = () => {
  userStore.logout();
  MessagePlugin.success("退出成功");
  router.push("/");
};
</script>
<style scoped lang="scss" src="./style.scss"></style>
