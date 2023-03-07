<template>
  <template v-for="note in noteList">
    <article
      class="kratos-hentry clearfix"
      itemscope=""
      itemtype="https://schema.org/Article"
    >
      <div class="kratos-entry-border-new clearfix">
        <div class="pin-top wrapper" v-if="note.top">
          <div class="pin-top inner"></div>
        </div>

        <div class="kratos-entry-thumb-new">
          <a :href="'/note' + note.id">
            <img class="kratos-entry-thumb-new-img" :src="note.pic" alt="" />
          </a>
        </div>
        <div class="kratos-post-inner-new">
          <header class="kratos-entry-header-new">
            <a class="label-link" :href="'/categories/' + note.category">
              {{ note.category }}</a
            >
            <h2 class="kratos-entry-title-new">
              <a :href="'/note/' + note.id" itemprop="mainEntityOfPage"
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
              <a>{{ note.date }}</a>
            </time>
            <font-awesome-icon icon="fa-solid fa-tags" />
            <template v-for="(tag, i) in note.tags">
              <a class="tag-none-link" rel="tag"> {{ tag }}</a>
              <template v-if="i < note.tags.length - 1">,</template>
            </template>
              <font-awesome-icon icon="fa-regular fa-eye"></font-awesome-icon>
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
            <a class="read-more" href="/posts/Kratos-Rebirth/" title="阅读全文"
              >阅读全文<i class="fa fa-chevron-circle-right"></i
            ></a>
          </span>
        </footer>
      </div>
    </article>
  </template>
</template>
<script setup>
// import { setting } from "../../setting";

const noteList = [
  {
    id: "wfsfcom",
    title: "1qqqqqqq",
    subtitle: "---f--f--f-f",
    tags: ["aa", "dd", "cc"],
    category: "aa",
    content: "fasfaff",
    readCount: 1,
    commentCount: 2,
    date: "2022-01-01",
    top: true,
    pic: "1",
  },
];
</script>
<style scoped lang="scss" src="./style.scss"></style>
