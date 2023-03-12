<template>
  <div class="edit-note">
    <t-card class="aoeba-note-info">
      <div class="aoeba-note-info-1">
        <t-input
          v-model="title"
          class="aoeba-note-title"
          size="large"
          placeholder="请输入标题"
        />
        <t-button variant="outline" @click="save(1)"> 保存草稿 </t-button>
        <t-button theme="primary" @click="save(2)"> 发布文章 </t-button>
      </div>
      <div class="aoeba-note-info-2">
        <span>封面：</span>
        <t-popup placement="bottom">
          <t-input
            v-model="noteImg"
            clearable
            placeholder="请输入封面图片链接"
            class="note-img"
          />
          <template #content>
            <img :src="noteImg" class="note-img-pre" />
          </template>
        </t-popup>
        <span>分类：</span>
        <t-select placeholder="请选择分类" v-model="category" clearable valueType="value">
          <t-option
            v-for="item in categoryStore.getCategories"
            :key="item.category"
            :value="item.category"
            :label="item.category"
          ></t-option>
          <template #prefixIcon> </template>
          <!-- 自定义底部内容 -->
          <template #panelBottomContent>
            <div class="select-category-footer">
              <t-button
                v-if="editOrCreateCategory === 'create'"
                theme="primary"
                variant="text"
                block
                @click="onAddCategory"
                >新增选项</t-button
              >
              <div v-else>
                <t-input v-model="newCategory" autofocus></t-input>
                <t-button size="small" style="margin: 2px" @click="addCategory">
                  确认
                </t-button>
                <t-button
                  theme="default"
                  size="small"
                  style="margin: 2px"
                  @click="onAddCategoryCancel"
                >
                  取消
                </t-button>
              </div>
            </div>
          </template>
        </t-select>
        <span>标签：</span>
        <!-- tag -->
        <div class="tag-block">
          <t-tag
            v-for="(tag, index) in noteTags"
            :key="index"
            theme="primary"
            :max-width="150"
            :title="tag.name"
            :closable="true"
            variant="light"
            @close="handleTagClose(index)"
          >
            <t-icon name="discount" />{{ tag.name }}
          </t-tag>
        </div>
        <div class="tag-block editable">
          <t-tag v-if="!tagInputVisible" @click="clickAddTag">
            <t-icon name="add" />
            添加标签
          </t-tag>
          <t-input
            v-else
            ref="tagInput"
            size="small"
            style="width: 94px"
            @blur="tagInputEnter"
            @enter="tagInputEnter"
          />
        </div>
      </div>
    </t-card>
    <md-editor
      v-model="text"
      :editorId="'md-editor'"
      :theme="theme.editorState.theme"
      :preview-theme="theme.editorState.preTheme"
      :code-theme="theme.editorState.codeTheme"
    />
  </div>
</template>
<script setup>
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { useSetterStore } from "@/stores/setter";
import { ref, nextTick, onMounted } from "vue";
import { useCategoryStore } from "@/stores/useCategory";
import { MessagePlugin } from "tdesign-vue-next";
import { tagArrayTostr, saveNote, updateNote, getNote } from "@/api/note";

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

const setterStore = useSetterStore();
const setting = setterStore.setting;
const theme = setting.theme;
// 文章内容
const text = ref("");
// 插槽，用于接收从路由中传来的文章id
const props = defineProps(["id"]);

// 当前选择的分类
const category = ref("default");
// 文章标题
const title = ref("");
// 新增的分类
const newCategory = ref("");
const categoryStore = useCategoryStore();
// 控制分类的输入框
const editOrCreateCategory = ref("create");
const onAddCategory = () => {
  editOrCreateCategory.value = "edit";
};
const onAddCategoryCancel = () => {
  editOrCreateCategory.value = "create";
};
const addCategory = () => {
  // 新增分类
  if (newCategory.value == "") {
    return;
  }
  categoryStore.addCategory({ category: newCategory.value, size: 0 });
  newCategory.value = "";
  editOrCreateCategory.value = "create";
};
// 当前文章的tags
const noteTags = ref([]);
// 新增tag的输入框
const tagInput = ref("");
// tag输入框是否可见
const tagInputVisible = ref(false);
// tag输入框enter事件
const tagInputEnter = (val) => {
  if (val && !noteTags.value.some((item) => item.name === val)) {
    noteTags.value.push({ name: val });
  }
  tagInputVisible.value = false;
};
// 点击新增tag按钮触发
const clickAddTag = () => {
  tagInputVisible.value = true;
  nextTick(() => {
    tagInput.value.focus();
  });
};
// 删除某一个tag触发
const handleTagClose = (index) => {
  noteTags.value.splice(index, 1);
};
// note封面图片地址
const noteImg = ref("");
// note数据
const note = {
  id: null,
  title: null,
  category: "",
  tags: [],
  content: null,
  img: "",
};
/**
 * 保存草稿或发布文章
 * @param {Number} type 1:保存草稿  2:发布文章
 */
const save = (type) => {
  note.title = title.value;
  note.category = category.value;
  note.tags = noteTags.value;
  note.content = text.value;
  note.img = noteImg.value;
  switch (type) {
    case 1:
      console.log(note);
      break;
    case 2:
      if (note.id == null) {
        saveNote(note).then((res) => {
          MessagePlugin.success("发布内容保存成功");
        });
      } else {
        updateNote(note).then(() => {
          MessagePlugin.success("发布内容更新成功");
        });
      }
      break;
    default:
      MessagePlugin.warning(
        "未定义的操作[" + type + "],允许的操作是[1:保存草稿  2:发布文章]"
      );
  }
};

const emit = defineEmits(['changeMenu'])
// 初始化含id时加载文章内容
onMounted(() => {
  emit('changeMenu','editNote')
  if (props.id) {
    getNote(props.id).then((data) => {
      title.value = data.title;
      category.value = data.category;
      noteTags.value = data.tags;
      text.value = data.content;
      noteImg.value = data.img;
      note.id = props.id;
    });
  }
});
</script>
<style scoped lang="scss" src="./style.scss"></style>
