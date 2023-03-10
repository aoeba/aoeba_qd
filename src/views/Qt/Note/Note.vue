<template>
  <div
    :class="
      setting.theme.sidebar === 'left' || setting.theme.sidebar === 'right'
        ? 'col-md-8'
        : 'col-md-12'
    "
  >
    <article itemscope itemtype="https://schema.org/Article">
      <div class="kratos-hentry kratos-post-inner clearfix">
        <header class="kratos-entry-header">
          <h1 class="kratos-entry-title text-center" itemprop="name headline">
            {{ note.title }}
          </h1>
          <h2 class="text-center" v-if="note.subtitle">{{ note.subtitle }}</h2>
          <ul class="kratos-post-meta text-center">
            <li>
              <time datetime="2018-06-30T07:27:05.000Z" itemprop="datePublished">
                <font-awesome-icon icon="fa-regular fa-calendar-days" />
                <a>{{ note.date }}</a>
              </time>
            </li>

            <li v-if="theme.note.wordCount?.enable">
              <font-awesome-icon icon="fa-solid fa-pen-to-square" />
              999字
            </li>
          </ul>
        </header>
        <div class="kratos-post-content">
          <div
            id="expire-alert"
            class="alert alert-warning"
            role="alert"
            v-if="note.expire"
          >
            <div class="icon">
              <font-awesome-icon icon="fa-solid fa-triangle-exclamation" />
            </div>
            <div class="text">
              <p>本文最后编辑于{{ note.updated }}，其中的内容可能需要更新</p>
            </div>
          </div>
          <hr />
        </div>
        <div class="aoeba-note-content">
          <md-editor
            v-model="text"
            :editorId="'md-editor'"
            :theme="theme.editorState.theme"
            :preview-theme="theme.editorState.preTheme"
            :code-theme="theme.editorState.codeTheme"
            preview-only
          />
        </div>

        <div class="kratos-copyright text-center clearfix" v-if="theme.note.show_cc">
          <h5 itemprop="copyrightNotice">
            本作品采用
            <a
              rel="license nofollow"
              target="_blank"
              href="https://creativecommons.org/licenses/by-sa/4.0/"
            >
              知识共享署名-相同方式共享 4.0 国际许可协议</a
            >
            进行许可
          </h5>
        </div>
        <footer class="kratos-entry-footer clearfix">
          <div class="footer-tag clearfix">
            <div class="pull-left">
              <font-awesome-icon icon="fa-solid fa-tags" style="padding-right: 8px" />
              <template v-for="(tag, i) in note.tags">
                <a class="tag-none-link" id="aoeba-note-tag" rel="tag"> {{ tag }}</a>
                <template v-if="i < note.tags.length - 1">,</template>
              </template>
            </div>
            <div class="pull-date">
              <time itemprop="dateModified">最后编辑：{{ note.updated }}</time>
            </div>
          </div>
        </footer>
      </div>
    </article>
  </div>
  <section id="kratos-widget-area" class="col-md-4 hidden-xs hidden-sm">
    <div class="sticky-area">
      <aside id="krw-toc" class="widget widget-kratos-toc clearfix toc-div-class">
        <div class="photo-background"></div>
        <h4 class="widget-title no-after">
          <i class="fa fa-compass"></i>
          文章目录
          <!-- TODO span 的 width可以用来显示阅读进度 style="width: 84.237%;" -->
          <span class="toc-progress-bar"></span>
        </h4>
        <div class="textwidget">
          <md-catalog
            :editorId="'md-editor'"
            :scroll-element="scrollElement"
            :theme="theme.editorState.theme"
          />
        </div>
      </aside>
    </div>
  </section>
</template>
<script setup>
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { useSetterStore } from "../../../stores/setter";
import { ref } from "vue";

// 编辑器需要的相关库
// <=5.2.0
import screenfull from "screenfull";
import katex from "katex";
import "katex/dist/katex.min.css";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import mermaid from "mermaid";
import highlight from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";
import prettier from "prettier";
import parserMarkdown from "prettier/parser-markdown";

MdEditor.config({
  editorExtensions: {
    prettier: {
      prettierInstance: prettier,
      parserMarkdownInstance: parserMarkdown,
    },
    highlight: {
      instance: highlight,
    },
    screenfull: {
      instance: screenfull,
    },
    katex: {
      instance: katex,
    },
    cropper: {
      instance: Cropper,
    },
    mermaid: {
      instance: mermaid,
    },
  },
});

const MdCatalog = MdEditor.MdCatalog;
const setterStore = useSetterStore();
const setting = setterStore.setting;
const theme = setting.theme;
const scrollElement = document.documentElement;

const note = {
  title: "测试标题",
  subtitle: "二级标题",
  date: "2023-01-01",
  expire: true,
  updated: "2023-03-07",
  content: "## fafaf文本内容试",
  tags: ["tag1", "tag2", "tag3"],
};

const text = ref(note.content);
</script>
<style scoped lang="scss" src="./style.scss"></style>
