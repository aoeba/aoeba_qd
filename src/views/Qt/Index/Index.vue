<template>
  <div
    :class="
      setting.theme.sidebar === 'left' || setting.theme.sidebar === 'right'
        ? 'col-md-8'
        : 'col-md-12'
    "
  >
    <!-- 页内导航组件 -->
    <template v-if="noteFilter.category || noteFilter.tag.length > 0">
      <article class="kratos-hentry kratos-entry-border-new clearfix">
        <div id="note-filter" class="kratos-breadcrumb">
          <span class="text">搜索:</span>
          <t-tag
            key="category"
            :closable="true"
            @close="noteFilter.category = ''"
            size="large"
            variant="light"
            maxWidth="200"
            v-if="noteFilter.category"
            class="note-filter-tag"
          >
            <template #icon>
            <ClientOnly>
              <font-awesome-icon icon="fa-regular fa-folder" />
            </ClientOnly>
            </template>
            {{ noteFilter.category }}
          </t-tag>
          <t-tag
            v-for="(tag, index) in noteFilter.tag"
            :key="index + tag"
            :closable="true"
            @close="noteFilter.tag.splice(noteFilter.tag.indexOf(tag), 1)"
            size="large"
            variant="light"
            maxWidth="200"
            class="note-filter-tag"
          >
            <template #icon>
            <ClientOnly>
              <font-awesome-icon icon="fa-solid fa-tag" />
            </ClientOnly>
            </template>
            {{ tag }}
          </t-tag>
          <a
            title="清空"
            @click="
              () => {
                noteFilter.category = '';
                noteFilter.tag.length = 0;
              }
            "
          >
            <t-icon name="clear" size="30px" />
          </a>
        </div>
      </article>
    </template>
    <template v-for="note in noteList">
      <article
        class="kratos-hentry clearfix"
        itemscope=""
        itemtype="https://schema.org/Article"
      >
        <div class="kratos-entry-border-new clearfix">
          <div class="pin-top wrapper" v-if="note.mark == 1">
            <div class="pin-top inner"></div>
          </div>

          <div class="kratos-entry-thumb-new">
            <a :href="'/note/' + note.id">
              <img class="kratos-entry-thumb-new-img" :src="note.img" alt="" />
            </a>
          </div>
          <div class="kratos-post-inner-new">
            <header class="kratos-entry-header-new">
              <a class="label-link" @click="() => (noteFilter.category = note.category)">
                {{ note.category }}</a
              >
              <h2 class="kratos-entry-title-new">
                <a :href="'/note/' + note.id" itemprop="mainEntityOfPage"
                  ><span itemprop="name headline">{{ note.title }}</span></a
                >
              </h2>
            </header>
            <div class="kratos-entry-content-new">
              <p itemprop="description">{{ splitString(note.content, 130) }}</p>
            </div>
          </div>
          <footer class="kratos-post-meta-new">
            <span class="pull-left">
              <time datetime="2018-06-30T07:27:05.000Z" itemprop="datePublished">
                <ClientOnly>
                  <font-awesome-icon icon="fa-regular fa-calendar-days" />
                </ClientOnly>
                <a>{{ strDateToYMD(note.createdAt) }}</a>
              </time>
              <ClientOnly>
                <font-awesome-icon icon="fa-solid fa-tags" v-if="note.tags.length > 0" />
              </ClientOnly>
              <template v-for="(tag, i) in note.tags">
                <a class="tag-none-link" rel="tag"> {{ tag.name }}</a>
                <template v-if="i < note.tags.length - 1">,</template>
              </template>
              <ClientOnly>
                <font-awesome-icon icon="fa-regular fa-eye" />
              </ClientOnly>
              <a>
                <span data-path="/posts/Kratos-Rebirth/" class="waline-pageview-count">{{
                  note.readCount
                }}</span
                >次阅读
              </a>
              <ClientOnly>
                <font-awesome-icon icon="fa-regular fa-comment-dots" />
              </ClientOnly>
              <a>
                <span data-path="/posts/Kratos-Rebirth/" class="waline-comment-count">{{
                  note.commentCount
                }}</span
                >条评论
              </a>
            </span>
            <span class="pull-right">
              <a class="read-more" :href="'/note/' + note.id" title="阅读全文"
                >阅读全文</a
              >
              <ClientOnly>
                <font-awesome-icon icon="fa-solid fa-chevron-circle-right" />
              </ClientOnly>
            </span>
          </footer>
        </div>
      </article>
    </template>
    <!-- 分页组件 -->
    <t-pagination
      :showPageSize="false"
      :totalContent="false"
      @change="pagination.onChange"
      :total="pagination.total"
      v-model="pagination.current"
      :pageSize="pagination.pageSize"
      v-if="noteList.length > 0"
    />
    <!-- 全屏加载，过滤查询时显示 -->
    <t-loading :loading="loading" text="加载中..." fullscreen />
  </div>

  <section id="kratos-widget-area" class="col-md-4 hidden-xs hidden-sm">
    <div class="sticky-area">
      <About :noteCount="noteCount" />
      <Category @click-category="(value) => (noteFilter.category = value)" />
      <Tagcloud @click-tag="clickTag" />
    </div>
  </section>
</template>
<script setup>
import { useSetterStore } from "../../../stores/setter";
import About from "../components/About";
import Category from "../components/Category";
import Tagcloud from "../components/Tagcloud";
import { ref, reactive, watch, toRaw } from "vue";
import { getNoteList, tagArrayTostr } from "@/api/note";
import { strDateToYMD, splitString } from "@/utils";
import { getCommentsV3 } from "@/api/github";
import { getReadCountByUrls } from "@/api/leancloud";
import { MessagePlugin } from "tdesign-vue-next";
import { useContext } from "vite-ssr/vue";
import { useAsyncData } from "@/utils/httpssr";
import { ClientOnly } from "vite-ssr";
const { isClient, initialState } = useContext();

const setterStore = useSetterStore();
const setting = setterStore.setting;

// 分页对象
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showJumper: true,
  onChange: (pageInfo) => {
    if (isClient) {
      getNoteList(
        tagArrayTostr(noteFilter.tag),
        "",
        noteFilter.category,
        pageInfo.current,
        pageInfo.pageSize
      ).then((res) => {
        pageChangeCallback(res);
        // 回到文章列表开始的位置
        document
          .querySelector("#kratos-blog-post")
          .scrollIntoView({ behavior: "smooth" });
      });
    }
  },
});
const noteList = ref([]);
// 文章总数
const noteCount = ref(0);
// 文章查询条件
const noteFilter = reactive({
  tag: [],
  category: "",
});
// 全屏加载
const loading = ref(false);

let reqUrl = "/note/find?tags=&keyword=&category=&pageNo=1&pageSize=10";
const resp = await useAsyncData("initData", reqUrl);
const initData = toRaw(resp.value);
noteList.value.push(...initData.content);
noteCount.value = initData.total;
// 点击tag时触发
const clickTag = (value) => {
  if (noteFilter.tag.includes(value)) {
    MessagePlugin.warning("该标签已经选择过了:" + value);
  } else {
    noteFilter.tag.push(value);
  }
};
if (isClient) {
  // "https://www.mk95.cn"
  const urlPre = window.location.protocol + "//" + window.location.host;

  // 查询结果回调
  const pageChangeCallback = (resp) => {
    noteList.value.length = 0;
    noteList.value.push(...resp.content);
    pagination.total = resp.total;
    pagination.current = resp.number;
    pagination.pageSize = resp.size;
    // 获取评论数及阅读数
    const urls = [];
    noteList.value.forEach((value) => {
      const id = "/note/" + value.id;
      getCommentsV3(id)
        .then((res) => {
          value.commentCount = res.data.length;
        })
        .catch((err) => {
          value.commentCount = 0;
        });
      value.readCount = 0;
      const url = urlPre + "/note/" + value.id;
      urls.push(url);
    });
    getReadCountByUrls(urls).then((res) => {
      const countMap = new Map();
      res.forEach((counter) => {
        countMap.set(counter.get("pageUrl"), counter.get("PV"));
      });
      noteList.value.forEach((value) => {
        const count = countMap.get(urlPre + "/note/" + value.id);
        value.readCount = count ? count : 0;
      });
    });
  };

  watch(noteFilter, (newValue, oldValue) => {
    loading.value = true;
    getNoteList(tagArrayTostr(noteFilter.tag), "", noteFilter.category)
      .then((res) => {
        pageChangeCallback(res);
      })
      .finally(() => {
        loading.value = false;
      });
  });
  // 第一次要手动调用下
  pageChangeCallback(initData);
}
</script>
<style scoped lang="scss" src="./style.scss"></style>
