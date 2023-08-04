<template>
  <div class="note-detail">
    <!-- 查询 -->
    <t-card>
      <div class="select">
        <div class="sel-item">
          关键字
          <t-input v-model="selectForm.keyword" placeholder="请输入关键字" />
        </div>
        <div class="sel-item">
          分类
          <t-select v-model="selectForm.category" placeholder="请选择分类">
            <t-option
              v-for="item in categoryStore.getCategories"
              :key="item.category"
              :value="item.category"
              :label="item.category"
            ></t-option>
          </t-select>
        </div>
        <div class="sel-item">
          标签
          <t-select
            v-model="selectForm.tag"
            placeholder="请选择标签"
            multiple
            :min-collapsed-num="1"
          >
            <t-option
              v-for="item in tagStore.getTags"
              :key="item.name"
              :value="item.name"
              :label="item.name"
            ></t-option>
          </t-select>
        </div>
        <div class="sel-btn">
          <t-button class="btn" theme="default" variant="base" @click="reset"
            >重置</t-button
          >
          <t-button class="btn" @click="clickCx">查询</t-button>
        </div>
      </div>
    </t-card>

    <t-card>
      <!-- 结果 -->
      <t-table
        row-key="index"
        :data="noteList"
        :columns="columns"
        :pagination="pagination"
      >
        <template #img="{ row }">
          <t-avatar :image="row.img" shape="round" />
        </template>
        <template #tags="{ row }">
          <t-tag theme="primary" variant="light" v-for="tag in row.tags" class="tag">
            {{ tag.name }}
          </t-tag>
        </template>
        <template #category="{ row }">
          <t-tag theme="warning" variant="light">{{ row.category }}</t-tag>
        </template>
        <template #ctrl="{ row }">
          <t-button
            shape="square"
            variant="text"
            size="small"
            @click="showNoteSetDrag(row)"
          >
            <template #icon><t-icon name="setting" /></template>
          </t-button>
          <t-button shape="square" variant="text" size="small" @click="editNote(row)">
            <template #icon><t-icon name="edit" /></template>
          </t-button>

          <t-button shape="square" variant="text" size="small" @click="updateMark(row)">
            <template #icon
              ><t-icon :name="row.mark == 1 ? 'star-filled' : 'star'"
            /></template>
          </t-button>
        </template>
      </t-table>
    </t-card>

    <!-- note设置窗口 -->
    <t-dialog
      v-model:visible="visibleNoteSetDrag"
      header="设置"
      :cancelBtn="null"
      :confirmBtn="null"
    >
      <template #body>
        <t-form :data="noteSetFormData" @submit="submitNoteSet">
          <div class="set-note-img">
            <img
              :src="noteSetFormData.img"
              :style="{ width: '284px', height: '160px' }"
            />
          </div>

          <t-form-item label="标题" name="title">
            <t-input v-model="noteSetFormData.title"></t-input>
          </t-form-item>
          <t-form-item label="封面" name="img">
            <t-input v-model="noteSetFormData.img" @blur="noteSetShowImg"></t-input>
          </t-form-item>
          <t-form-item label="分类" name="category">
            <t-select v-model="noteSetFormData.category" placeholder="请选择分类">
              <t-option
                v-for="item in categoryStore.getCategories"
                :key="item.category"
                :value="item.category"
                :label="item.category"
              ></t-option>
            </t-select>
          </t-form-item>
          <t-form-item label="标签" name="category">
            <t-select
              v-model="noteSetFormData.tags"
              placeholder="请选择标签"
              multiple
              :min-collapsed-num="3"
            >
              <t-option
                v-for="item in tagStore.getTags"
                :key="item.name"
                :value="item.name"
                :label="item.name"
              ></t-option>
            </t-select>
          </t-form-item>
          <t-form-item>
            <t-button theme="primary" type="submit">保存</t-button> &nbsp;
            <t-button theme="success" @click="pushWxgzh">推送到微信</t-button>
          </t-form-item>
        </t-form>
      </template>
    </t-dialog>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { MessagePlugin } from "tdesign-vue-next";
import {
  getNoteList,
  updateNote,
  tagArrayTostr,
  pushNoteToWxgzh,
  updateNoteMark,
} from "@/api/note";
import { useCategoryStore } from "@/stores/useCategory";
import { useTagStore } from "@/stores/useTag";
import { useRouter } from "vue-router";

const router = useRouter();
// 表格设置
const columns = [
  { colKey: "img", title: "封面", width: 80 },
  { colKey: "title", title: "标题", width: 260, ellipsis: true },
  { colKey: "category", title: "分类", ellipsis: true },
  { colKey: "tags", title: "标签", ellipsis: true },
  { colKey: "createdAt", title: "创建时间", width: 140, ellipsis: true },
  // { colKey: 'updatedAt', title: '更新时间' },
  { colKey: "ctrl", title: "操作" },
];

// 查询条件
const selectForm = reactive({
  category: "",
  tag: [],
  keyword: "",
});
// 查询结果
const noteList = reactive([]);
// 是否正在查询
const isLoading = ref(true);
// 查询结果回调
const pageChangeCallback = (data) => {
  noteList.length = 0;
  noteList.push(...data.content);
  pagination.total = data.total;
  pagination.current = data.number;
  pagination.pageSize = data.size;
  isLoading.value = false;
};
// 分页对象
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showJumper: true,
  onChange: (pageInfo) => {
    isLoading.value = true;
    getNoteList("", "", "", pageInfo.current, pageInfo.pageSize).then((res) => {
      pageChangeCallback(res);
    });
  },
});

// 初始化时调用一次
getNoteList().then((res) => {
  pageChangeCallback(res);
});

const categoryStore = useCategoryStore();
const tagStore = useTagStore();

// note设置窗口表单数据
const noteSetFormData = reactive({
  id: "",
  title: "",
  tags: [],
  category: "",
  img: "",
});
// 点击查询按钮
const clickCx = () => {
  let tags = "";
  selectForm.tag.forEach((t) => {
    tags += t + ",";
  });
  if (tags.endsWith(",")) {
    tags = tags.substring(0, tags.length - 1);
  }
  getNoteList(tags, selectForm.keyword, selectForm.category).then((res) => {
    pageChangeCallback(res);
  });
};
// 控制note设置窗口是否显示
const visibleNoteSetDrag = ref(false);
// 展示note设置窗口
const showNoteSetDrag = (row) => {
  visibleNoteSetDrag.value = true;
  noteSetFormData.id = row.id;
  noteSetFormData.title = row.title;
  noteSetFormData.img = row.img;
  noteSetFormData.category = row.category;
  noteSetFormData.tags.length = 0;
  if (row.tags != "") {
    row.tags.forEach((t) => {
      noteSetFormData.tags.push(t.name);
    });
  }
  noteSetFormData.img = row.img;
};
// 提交note设置信息
const submitNoteSet = () => {
  let { id, title, tags, category, img } = noteSetFormData;
  let note = {
    id: id,
    title: title,
    tags: [],
    category: category,
    img: img,
  };
  tags.forEach((t) => {
    note.tags.push({ name: t, size: 0 });
  });
  let noteJson = JSON.stringify(note);
  updateNote(noteJson).then(() => {
    MessagePlugin.success("更新成功!");
  });
};
const noteSetShowImg = (value) => {
  noteSetFormData.img = value;
};
// 重置查询条件
const reset = () => {
  selectForm.category = "";
  selectForm.tag = [];
  selectForm.keyword = "";
};
// 编辑note
const editNote = (row) => {
  router.push('/ht/editNote?id=' + row.id)
};
// 推送到微信公众号
const pushWxgzh = () => {
  let { id, img } = noteSetFormData;
  let note = {
    id: id,
    img: img,
  };
  pushNoteToWxgzh(note).then(() => {
    MessagePlugin.success("成功推送到微信!");
  });
};
// 更新note的mark标志
const updateMark = (row) => {
  let mark = row.mark == 0 ? 1 : 0;
  updateNoteMark(row.id, mark).then(() => {
    row.mark = mark;
    if (mark == 1) {
      MessagePlugin.success("加⭐成功");
    } else {
      MessagePlugin.success("成功取消加⭐");
    }
  });
};
</script>
<style scoped lang="scss" src="./style.scss"></style>
