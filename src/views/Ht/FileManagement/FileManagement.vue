<template>
  <div class="file">
    <t-card class="file-card">
      <!-- 目录 -->
      <div style="padding: 5px 2px; display: flex">
        <div style="align-self: center">
          <t-breadcrumb :max-item-width="'150'">
            <t-breadcrumbItem
              v-for="(b, index) in breadcrumb"
              :key="b.url"
              @click="refreshFolder(b.url, () => pathItemClick(index))"
            >
              <t-icon name="folder" />
              {{ b.name }}
            </t-breadcrumbItem>
          </t-breadcrumb>
        </div>
        <div style="align-self: center; margin-left: 8px">
          <template v-if="addDirStatus">
            <t-input @enter="mkDir" size="medium" @blur="addDirStatus = false">
              <template #prefix-icon>
                <t-icon name="chevron-right" />
              </template>
            </t-input>
          </template>

          <t-button
            shape="circle"
            variant="text"
            size="medium"
            v-else
            @click="addDirStatus = true"
          >
            <template #icon>
              <t-icon name="add" />
            </template>
          </t-button>
        </div>
      </div>

      <!-- 上传区域，可拖拽文件上传，屏蔽t-upload组件点击事件 -->
      <div class="file-content">
        <t-upload
          :auto-upload="true"
          draggable
          :requestMethod="uploadFile"
          theme="custom"
          id="upload"
        >
          <template #default="params">
            <t-skeleton
              :loading="params && params.dragActive"
              :row-col="[
                {
                  type: 'rect',
                  content: () => '松开鼠标上传文件',
                },
              ]"
            >
              <!-- 文件列表展示区 -->
              <div
                class="tdesign-demo-block-column-large demo-container"
                id="m-fileListTable"
                @click="
                  (e) => {
                    e.stopPropagation();
                  }
                "
              >
                <t-table
                  row-key="index"
                  :disableDataPage="true"
                  :columns="columns"
                  :data="fileList"
                  size="small"
                  :sort="sort"
                  @sort-change="sortChange"
                  @filter-change="onFilterChange"
                >
                  <template #operation="{ row }">
                    <div id="m-fileOperation">
                      <template v-if="!row.isFolder">
                        <t-button
                          shape="square"
                          variant="text"
                          size="small"
                          @click.stop="copyUrl(row.url)"
                          class="m-btn"
                        >
                          <template #icon>
                            <t-icon name="file-copy" style="color: slateblue" />
                          </template>
                        </t-button>
                      </template>
                      <t-popconfirm content="确认删除吗" @confirm="rmDir(row)">
                        <t-button shape="square" variant="text" size="small">
                          <template #icon>
                            <t-icon name="delete" style="color: red" />
                          </template>
                        </t-button>
                      </t-popconfirm>
                    </div>
                  </template>
                  <template #name="{ row }">
                    <t-link theme="default" @click.stop="listItemNameClick(row)">
                      <t-icon :name="row.isFolder ? 'folder' : 'file'" />
                      {{ row.name }}
                    </t-link>
                  </template>
                  <template #type="{ row }">
                    {{ row.isFolder ? "-" : row.type }}
                  </template>
                </t-table>
              </div>
              <!--            上传文件操作提示-->
              <span style="display: flex">
                <div @click="(e) => e.stopPropagation()">
                  <t-icon name="tips" style="color: darkorange" />
                  拖拽文件到虚线框上传，或点击
                </div>
                <t-link>这里</t-link>
                <div @click="(e) => e.stopPropagation()">
                  <span>上传文件</span>
                </div>
                <!--            上传进度-->
                <div style="flex-grow: 1" @click="(e) => e.stopPropagation()">
                  <div v-if="uploadFileStatus.status !== 0" style="display: flex">
                    <div style="width: 100px; margin-left: auto; align-self: center">
                      <t-progress
                        theme="line"
                        :percentage="uploadFileStatus.progressValue"
                        :status="progressStatus"
                        :color="{ from: '#0052D9', to: '#00A870' }"
                      />
                    </div>
                    <div style="width: 50px">
                      &nbsp;
                      <span v-if="uploadFileStatus.status === 4">
                        <t-icon
                          name="file-copy"
                          style="color: slateblue; cursor: pointer"
                          @click="copyUrl(uploadFileStatus.url)"
                        />&nbsp;
                        <t-icon
                          name="close"
                          style="color: red; cursor: pointer"
                          @click="uploadFileStatus.status = 0"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </span>
            </t-skeleton>
            <!-- <p v-if="params && params.dragActive">释放鼠标</p> -->
            <!-- <span>数据状态：{{params}}</span> -->
          </template>
        </t-upload>
      </div>
    </t-card>
  </div>
</template>

<script>
import { MessagePlugin } from "tdesign-vue-next";
import { ref } from "vue";
import { getFileSize, timestampToTime } from "@/utils";
import { readDir, uploadFile, addDir, delDir } from "@/api/file";

export default {
  data() {
    return {
      columns: [
        {
          colKey: "name",
          title: "名称",
          align: "left",
          width: "200",
          sortType: "all",
          sorter: true,
          filter: {
            type: "input",
          },
        },
        {
          colKey: "type",
          title: "类型",
          align: "center",
          sorter: true,
          sortType: "all",
        },
        {
          colKey: "length",
          title: "大小",
          align: "center",
        },
        {
          colKey: "last_modified",
          title: "更新日期",
          align: "center",
        },
        {
          colKey: "operation",
          title: "操作",
          align: "center",
        },
      ],
    };
  },
  methods: {
    copyUrl(url) {
      // 创建input元素
      const el = document.createElement("input");
      // 给input元素赋值需要复制的文本
      el.setAttribute("value", url);
      // 将input元素插入页面
      document.body.appendChild(el);
      // 选中input元素的文本
      el.select();
      // 复制内容到剪贴板
      document.execCommand("copy");
      // 删除input元素
      document.body.removeChild(el);
      MessagePlugin.success("已复制到剪切板:" + url);
    },
    refreshFolder(url, afterSuccess) {
      readDir(url).then((res) => {
        this.initFileList = res;
        if (this.initFileList == null) {
          this.initFileList = [];
        } else {
          this.initFileList.forEach((x) => {
            x.length = getFileSize(x.length);
            x.last_modified = timestampToTime(x.last_modified, 1);
          });
        }
        this.fileList = this.initFileList;
        this.sortFileList(this.fileList, this.sort);
        if (afterSuccess !== undefined) {
          afterSuccess();
        }
      });
    },
    listItemNameClick(row) {
      // 文件列表点击事件
      if (row.isFolder) {
        // 如果是点击的文件夹，刷新文件列表，更新目录面包屑，更新当前路径
        this.refreshFolder(this.breadcrumbPath + "/" + row.name, () => {
          this.breadcrumbPath += "/" + row.name;
          this.breadcrumb.push({ name: row.name, url: this.breadcrumbPath });
        });
      }
    },
    pathItemClick(index) {
      // 目录面包屑被点击时要更新当前路径及目录面包屑
      this.breadcrumb = this.breadcrumb.slice(0, index + 1);
      this.breadcrumbPath = this.breadcrumb[index].url;
    },
    uploadFile(file) {
      return new Promise((resolve) => {
        // file.percent 用于控制上传进度，如果不希望显示上传进度，则不对 file.percent 设置值即可。
        // 如果代码规范不能设置 file.percent，也可以设置 files
        this.uploadFileStatus.progressValue = 0;
        this.uploadFileStatus.status = 1;
        let resp = {
          status: "success",
          response: {},
        };
        debugger;
        let format = new window.FormData();
        const fileData = file.raw;
        format.append("file", fileData);
        format.append("path", this.breadcrumbPath);
        let obj = this;
        uploadFile(format, (progressEvent) => {
          obj.uploadFileStatus.progressValue = Math.floor(
            (progressEvent.loaded / progressEvent.total) * 50
          );
          //  等于50的时候说明上传完成了，要等后台处理
          if (obj.uploadFileStatus.progressValue === 50) {
            let timer = setInterval(function () {
              if (obj.uploadFileStatus.progressValue < 95) {
                obj.uploadFileStatus.progressValue += 7;
              } else {
                clearInterval(timer);
              }
            }, 200);
          }
        })
          .then((res) => {
            resp.response.url = res;
            obj.uploadFileStatus.url = resp.response.url;
            obj.uploadFileStatus.status = 4;
            obj.uploadFileStatus.progressValue = 100;
            resolve(resp);
          })
          .catch((err) => {
            resp.status = "fail";
            obj.uploadFileStatus.status = 3;
            resolve(resp);
          });
      });
    },
    sortChange(val) {
      this.sort = val;
      if (!val) {
        return;
      }
      this.sortFileList(this.fileList, val);
    },
    sortFileList(arr, val) {
      arr.sort((a, b) => {
        let r = val.descending
          ? b[val.sortBy] > a[val.sortBy]
          : a[val.sortBy] > b[val.sortBy];
        return r ? 1 : -1;
      });
    },
    onFilterChange(filters) {
      if (!filters.hasOwnProperty("name")) {
        this.fileList = this.initFileList;
        return;
      }
      this.fileList = this.initFileList.filter((item) => {
        let result = false;
        if (item.name.indexOf(filters.name) !== -1) {
          result = true;
        }
        return result;
      });
    },
    mkDir(value) {
      if (value === undefined || value === "") {
        this.addDirStatus = false;
        return;
      }
      addDir(this.breadcrumbPath + "/" + value).then((res) => {
        this.listItemNameClick({ isFolder: true, name: value });
        this.addDirStatus = false;
      });
    },
    rmDir(row) {
      delDir(this.breadcrumbPath + "/" + row.name).then((res) => {
        this.refreshFolder(this.breadcrumbPath);
      });
    },
    ctrlV(event) {
      var items = event.clipboardData && event.clipboardData.items;
      var file = null;
      if (items && items.length) {
        // 检索剪切板items
        for (var i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            file = items[i].getAsFile();
            break;
          }
        }
      }
      // 此时file就是剪切板中的图片文件
      if (file != null) {
        // 此时可以自行将文件上传至服务器
        // 调整文件名
        let fileName = file.name; // 保存文件名
        let fileName2 = fileName.split("."); // 对文件名进行切割
        let curDate = new Date();
        let Y = curDate.getFullYear();
        let M =
          curDate.getMonth() + 1 < 10
            ? `0${curDate.getMonth() + 1}`
            : `${curDate.getMonth() + 1}`;
        let D = curDate.getDate() < 10 ? `0${curDate.getDate()}` : `${curDate.getDate()}`;
        let H =
          curDate.getHours() < 10 ? `0${curDate.getHours()}` : `${curDate.getHours()}`;
        let Min =
          curDate.getMinutes() < 10
            ? `0${curDate.getMinutes()}`
            : `${curDate.getMinutes()}`;
        let S =
          curDate.getSeconds() < 10
            ? `0${curDate.getSeconds()}`
            : `${curDate.getSeconds()}`;
        let newName = Y + M + D + H + Min + S + fileName2[0];
        //var renameFile =new File([原文件], 新文件名,文件类型);
        var renameFile = new File([file], newName, {
          type: file.type,
        });
        this.uploadFile({ raw: renameFile });
      } else {
        MessagePlugin.warning("在剪切板中未找到图片");
      }
    },
  },
  created() {
    this.refreshFolder(this.breadcrumbPath);
  },
  computed: {
    progressStatus() {
      if (this.uploadFileStatus.status === 3) {
        return "error";
      }
      if (this.uploadFileStatus.progressValue === 100) {
        this.uploadFileStatus.status = 4;
        return "success";
      }
      return "active";
    },
  },
  mounted() {
    const that = this;
    // ctrl+v 粘贴上传图片
    document.addEventListener("paste", this.ctrlV);
  },
  unmounted() {
    document.removeEventListener("paste", this.ctrlV);
  },
  setup(props) {
    const breadcrumb = ref([]);
    const breadcrumbPath = ref("");
    const skeletonLoading = ref(false);
    const initFileList = ref([]); // 包含最近一次请求的全量数据
    const fileList = ref([]); // 过滤后会被修改值
    const addDirStatus = ref(false); // 控制添加目录的输入框是否显示
    /**
     * status : 0-stop 1-active 2-uploadSuccess 3-error 4-success
     * @type {pathUrl: string, progressValue: number, status: number}
     */
    const uploadFileStatus = ref({
      progressValue: 0,
      status: 0,
      url: "",
    });
    const sort = ref({
      sortBy: "type",
      descending: false,
    });

    breadcrumb.value.push({ name: "根目录", url: "" });
    return {
      breadcrumb,
      fileList,
      breadcrumbPath,
      sort,
      initFileList,
      skeletonLoading,
      addDirStatus,
      uploadFileStatus,
    };
  },
};
</script>
<style lang="scss" src="./style.scss"></style>
