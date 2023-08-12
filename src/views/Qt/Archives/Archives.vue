<template>
  <section class="col-md-12">
    <article>
      <div class="kratos-hentry kratos-post-inner clearfix">
        <div class="kratos-post-content">
          <h2 class="title-h2 text-center">文章归档</h2>
          <div id="archives">
            <div class="post-block archive post" style="margin-left: 2em">
              <h3 class="archive-page-counter">当前共有 xxx 篇文章 (゜-゜)つロ 干杯~</h3>
              <div class="posts-collapse">
                <template v-for="key in Object.keys(archivesMap).reverse()">
                  <div class="collection-title">
                    <h2 class="archive-year">{{ key }}</h2>
                  </div>
                  <template v-for="archives in archivesMap[key]">
                    <article
                      class="post"
                      itemscope=""
                      itemtype="https://schema.org/Article"
                    >
                      <header class="post-header">
                        <h3 class="post-title">
                          <a
                            class="post-title-link"
                            :href="`/note/${archives.note.id}`"
                            itemprop="mainEntityOfPage"
                          >
                            <span itemprop="name headline">{{ archives.note.title }}</span>
                          </a>
                        </h3>
                        <div class="post-meta">
                          <time
                            class="post-time"
                            itemprop="datePublished"
                            :datetime="archives.note.createdAt"
                          >
                            {{ archives.month }}-{{ archives.day }}
                          </time>
                        </div>
                      </header>
                    </article>
                  </template>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>
<script setup>
import { useAsyncData } from "@/utils/httpssr";

const archivesMap = await useAsyncData("archives", "/archives");
</script>
<style scoped lang="scss" src="./style.scss"></style>
