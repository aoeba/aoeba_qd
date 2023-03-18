<template>
  <div
    :class="
      setting.theme.sidebar === 'left' || setting.theme.sidebar === 'right'
        ? 'col-md-8'
        : 'col-md-12'
    "
  >
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
            <a @click="goto('/note/' + note.id)">
              <img class="kratos-entry-thumb-new-img" :src="note.img" alt="" />
            </a>
          </div>
          <div class="kratos-post-inner-new">
            <header class="kratos-entry-header-new">
              <a class="label-link" @click="goto('/categories/' + note.category)">
                {{ note.category }}</a
              >
              <h2 class="kratos-entry-title-new">
                <a @click="goto('/note/' + note.id)" itemprop="mainEntityOfPage"
                  ><span itemprop="name headline">{{ note.title }}</span></a
                >
              </h2>
            </header>
            <div class="kratos-entry-content-new">
              <p itemprop="description">{{ note.content }}</p>
            </div>
          </div>
          <footer class="kratos-post-meta-new">
            <span class="pull-left">
              <time datetime="2018-06-30T07:27:05.000Z" itemprop="datePublished">
                <font-awesome-icon icon="fa-regular fa-calendar-days" />
                <a>{{ strDateToYMD(note.createdAt) }}</a>
              </time>
              <font-awesome-icon icon="fa-solid fa-tags" v-if="note.tags.length > 0" />
              <template v-for="(tag, i) in note.tags">
                <a class="tag-none-link" rel="tag"> {{ tag.name }}</a>
                <template v-if="i < note.tags.length - 1">,</template>
              </template>
              <font-awesome-icon icon="fa-regular fa-eye" />
              <a>
                <span data-path="/posts/Kratos-Rebirth/" class="waline-pageview-count">{{
                  note.readCount
                }}</span>
                次阅读
              </a>
              <font-awesome-icon icon="fa-regular fa-comment-dots" />
              <a>
                <span data-path="/posts/Kratos-Rebirth/" class="waline-comment-count">{{
                  note.commentCount
                }}</span>
                条评论
              </a>
            </span>
            <span class="pull-right">
              <a class="read-more" @click="goto('/note/' + note.id)" title="阅读全文"
                >阅读全文</a
              >
              <font-awesome-icon icon="fa-solid fa-chevron-circle-right" />
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
    />
  </div>

  <section id="kratos-widget-area" class="col-md-4 hidden-xs hidden-sm">
    <div class="sticky-area">
      <About :noteCount="pagination.total"/>
      <Category />
      <Tagcloud />
    </div>
  </section>
</template>
<script setup>
import { useSetterStore } from "../../../stores/setter";
import About from "../components/About";
import Category from "../components/Category";
import Tagcloud from "../components/Tagcloud";
import router from "../../../router";
import { ref, reactive } from "vue";
import { getNoteList } from "@/api/note";
import { strDateToYMD } from "@/utils";
import { getCommentsV3 } from "@/api/github";
import { getReadCount } from "@/api/leancloud";

const setterStore = useSetterStore();
const setting = setterStore.setting;

const noteList = ref([]);

const goto = (path) => {
  router.push(path);
};
// 查询结果回调
const pageChangeCallback = (data) => {
  noteList.value.length = 0;
  noteList.value.push(...data.content);
  pagination.total = data.total;
  pagination.current = data.number;
  pagination.pageSize = data.size;
  // 获取评论数及阅读数
  noteList.value.forEach((value) => {
    const id = "/note/" + value.id;
    getCommentsV3(id)
      .then((res) => {
        value.commentCount = res.data.length;
      })
      .catch((err) => {
        value.commentCount = 0;
      });
    const url =
      window.location.protocol + "//" + window.location.host + "/note/" + value.id;
    getReadCount(url)
      .then((count) => {
        value.readCount = count;
      })
      .catch((err) => {
        value.readCount = 0;
      });
  });
};
// 分页对象
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showJumper: true,
  onChange: (pageInfo) => {
    getNoteList("", "", "", pageInfo.current, pageInfo.pageSize).then((res) => {
      pageChangeCallback(res);
      // 回到文章列表开始的位置
      document.querySelector("#kratos-blog-post").scrollIntoView({ behavior: "smooth" });
    });
  },
});

// 初始化时调用一次
getNoteList().then((res) => {
  pageChangeCallback(res);
});
</script>
<style scoped lang="scss" src="./style.scss"></style>
