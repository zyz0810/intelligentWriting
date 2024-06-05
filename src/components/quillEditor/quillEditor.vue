<template>
  <div>
    <quill-editor
      ref="myQuillEditor"
      v-model="currentContent"
      :options="editorOption"
      @focus="onEditorFocus($event)"
      @blur="onEditorBlur($event)"
      @change="onEditorChange($event)"
      @ready="onEditorReady($event)"
      class="quill"
    >
      <div id="toolbar" slot="toolbar">
        <span
          v-if="isShowImg"
          class="iconfont icon-piliangdaoru editorImg"
          title="图片"
          @click="insertImgClick($event)"
        />
        <!-- <span class="iconfont icon-chuangjian" title="视频" @click="insertVideoClick($event)" />  插入视频 -->
      </div>
    </quill-editor>
    <input
      id="insert_image"
      style="display: none"
      type="file"
      @change="fileInsert($event)"
    />
    <!-- 选择图片input -->
    <input
      id="insert_video"
      style="display: none"
      type="file"
      @change="fileInsert($event)"
    />
    <!-- 选择视频input -->
  </div>
</template>

<script>
  import Quill from "quill";
  import $ from "jquery";
  import { uploadImg } from "@/api/upload";
  import {lineHeightStyle} from "@/utils/lineHeight";
  import {addQuillTitle} from "@/utils/quillTitle";

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
    ["blockquote", "code-block"], // 引用  代码块-----['blockquote', 'code-block']
    [{ header: 1 }, { header: 2 }], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
    [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
    [{ script: "sub" }, { script: "super" }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
    [{ indent: "-1" }, { indent: "+1" }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
    [{ direction: "rtl" }], // 文本方向-----[{'direction': 'rtl'}]
    [{ size: ["small", false, "large", "huge"] }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
    [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
    [{ font: [] }], // 字体种类-----[{ font: [] }]
    [{ align: [] }], // 对齐方式-----[{ align: [] }]
    ["clean"], // 清除文本格式-----['clean']
    ["image"], // 链接、图片、视频-----['link', 'image', 'video']
    [{lineheight:['initial', '1', '1.5', '1.75', '2', '3', '4', '5']}]
  ];
  export default {
    name: "MyQuillEditor",
    props: {
      content: {
        type: String,
        default: "",
      },
      isChange: {
        type: Boolean,
        default: false,
      },
      isShowImg: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        editor: {}, // 富文本编辑器对象
        currentContent: this.content, // 富文本编辑器默认内容
        initialValue: this.content,
        editorOption: {
          placeholder: "请输入...",
          theme: "snow",
          modules: {
            toolbar: {
              container: toolbarOptions, // 工具栏
              handlers: {
                image: function (value) {
                  if (value) {
                    document.getElementById("insert_image").click();
                  } else {
                    this.quill.format("image", false);
                  }
                },
                lineheight:(value)=> {
                  if(value){
                    console.log('成功'+value)
                    let quill = this.$refs.myQuillEditor.quill;
                    quill.format("lineHeight",value)
                  }else{
                    console.log('失败'+value)
                  }
                }
              },
            },
          },
        },
      };
    },
    mounted() {
      this.editor = this.$refs.myQuillEditor.quill;
      addQuillTitle();
    },
    beforeDestroy() {
      this.editor = null;
      this.currentContent = "";
      this.$emit("update:content", "");
      delete this.editor;
    },
    methods: {
      onEditorReady(editor) {
        Quill.register({'formats/lineHeight':lineHeightStyle},true)
      },
      // 富文本编辑器 失去焦点事件
      onEditorBlur(editor) {
        this.$emit("update:content", this.currentContent);
      },
      // 富文本编辑器 获得焦点事件
      onEditorFocus(editor) {},
      // 富文本编辑器 内容改变事件
      onEditorChange(editor) {
        this.$emit(
          "update:isChange",
          !Object.is(this.initialValue, this.currentContent)
        );
        this.$emit("update:content", this.currentContent);
      },
      // 富文本编辑器 点击插入图片
      insertImgClick(e) {
        document.getElementById("insert_image").click();
      },
      // 富文本编辑器 点击插入视频
      insertVideoClick(e) {
        document.getElementById("insert_video").click();
      },
      changeContent(value) {
        this.initialValue = value;
        this.currentContent = value;
      },
      // 富文本编辑器 点击插入图片或者视频上传并预览
      fileInsert(e) {
        let oFile = e.target.files[0];
        if (typeof oFile === "undefined") {
          return;
        }
        const name = e.target.files[0].name; // 文件扩展名
        const type = name.split(".").pop();
        let sfileType = "image"; // 上传文件类型
        if (!["jpg", "jpeg", "png", "gif"].includes(type)) {
          this.$alert("不支持该类型图片", "提示", {
            confirmButtonText: "确定",
          });
          return;
        }
        let reader = new FileReader();
        reader.readAsDataURL(oFile);
        reader.onloadend = () => {
          uploadImg(oFile)
            .then((res) => {
              this.editor.insertEmbed(
                this.editor.selection.savedRange.index,
                sfileType,
                res.picUrl
              ); // 这个方法用来手动插入dom到编辑器里
              this.editor.setSelection(
                this.editor.selection.savedRange.index + 1
              ); // 这个方法可以获取光标位置
            })
            .catch((response) => {
              this.$message({ message: "图片上传失败", type: "warning" });
            });
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  .editorImg::before {
    font-size: 20px;
    cursor: pointer;
  }

  .quill /deep/ .ql-container {
    height: 300px;
  }
  /deep/.ql-snow .ql-picker.ql-size .ql-picker-label::before,   /deep/.ql-snow .ql-picker.ql-header .ql-picker-label::before, /deep/.ql-snow .ql-picker.ql-font .ql-picker-label::before{
    display: table-cell;
  }
  /deep/.ql-snow .ql-picker.ql-lineheight .ql-picker-label::before{
    content:'行高';
    display: table-cell;
  }
  /deep/.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='1']::before{
    content:'1';
  }
  /deep/.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='1.5']::before{
    content:'1.5';
  }
  /deep/.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='1.75']::before{
    content:'1.75';
  }
  /deep/ .ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='2']::before{
    content:'2';
  }
  /deep/.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='3']::before{
    content:'3';
  }
  /deep/.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='4']::before{
    content:'4';
  }
  /deep/.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='5']::before{
    content:'5';
  }
  /deep/.ql-snow .ql-picker.ql-lineheight{
    width: 70px;
  }






  /deep/.ql-editor .ql-indent-1:not(.ql-direction-rtl) {
    /*padding-left: 3em;*/
    padding-left: 1em;
  }
  /deep/ .ql-editor li.ql-indent-1:not(.ql-direction-rtl) {
    /*padding-left: 4.5em;*/
    padding-left: 2.5em;
  }
  /deep/.ql-editor .ql-indent-1.ql-direction-rtl.ql-align-right {
    /*padding-right: 3em;*/
    padding-right: 1em;
  }
  /deep/ .ql-editor li.ql-indent-1.ql-direction-rtl.ql-align-right {
    /*padding-right: 4.5em;*/
    padding-right: 2.5em;
  }
  /deep/.ql-editor .ql-indent-2:not(.ql-direction-rtl) {
    /*padding-left: 6em;*/
    padding-left: 2em;
  }
  /deep/.ql-editor li.ql-indent-2:not(.ql-direction-rtl) {
    /*padding-left: 7.5em;*/
    padding-left: 3.5em;
  }
  /deep/.ql-editor .ql-indent-2.ql-direction-rtl.ql-align-right {
    /*padding-right: 6em;*/
    padding-right: 2em;
  }
  /deep/.ql-editor li.ql-indent-2.ql-direction-rtl.ql-align-right {
    /*padding-right: 7.5em;*/
    padding-right: 3.5em;
  }
  /deep/.ql-editor .ql-indent-3:not(.ql-direction-rtl) {
    /*padding-left: 9em;*/
    padding-left: 3em;
  }
  /deep/.ql-editor li.ql-indent-3:not(.ql-direction-rtl) {
    /*padding-left: 10.5em;*/
    padding-left: 4.5em;
  }
  /deep/.ql-editor .ql-indent-3.ql-direction-rtl.ql-align-right {
    /*padding-right: 9em;*/
    padding-right: 3em;
  }
  /deep/.ql-editor li.ql-indent-3.ql-direction-rtl.ql-align-right {
    /*padding-right: 10.5em;*/
    padding-right: 4.5em;
  }
  /deep/.ql-editor .ql-indent-4:not(.ql-direction-rtl) {
    /*padding-left: 12em;*/
    padding-left: 4em;
  }
  /deep/.ql-editor li.ql-indent-4:not(.ql-direction-rtl) {
    /*padding-left: 13.5em;*/
    padding-left: 5.5em;
  }
  /deep/.ql-editor .ql-indent-4.ql-direction-rtl.ql-align-right {
    /*padding-right: 12em;*/
    padding-right: 4em;
  }
  /deep/.ql-editor li.ql-indent-4.ql-direction-rtl.ql-align-right {
    /*padding-right: 13.5em;*/
    padding-right: 5.5em;
  }
  /deep/.ql-editor .ql-indent-5:not(.ql-direction-rtl) {
    /*padding-left: 15em;*/
    padding-left: 5em;
  }
  /deep/.ql-editor li.ql-indent-5:not(.ql-direction-rtl) {
    /*padding-left: 16.5em;*/
    padding-left: 6.5em;
  }
  /deep/.ql-editor .ql-indent-5.ql-direction-rtl.ql-align-right {
    /*padding-right: 15em;*/
    padding-right: 5em;
  }
  /deep/.ql-editor li.ql-indent-5.ql-direction-rtl.ql-align-right {
    /*padding-right: 16.5em;*/
    padding-right: 6.5em;
  }
  /deep/.ql-editor .ql-indent-6:not(.ql-direction-rtl) {
    /*padding-left: 18em;*/
    padding-left: 6em;
  }
  /deep/.ql-editor li.ql-indent-6:not(.ql-direction-rtl) {
    /*padding-left: 19.5em;*/
    padding-left: 7.5em;
  }
  /deep/.ql-editor .ql-indent-6.ql-direction-rtl.ql-align-right {
    /*padding-right: 18em;*/
    padding-right: 6em;
  }
  /deep/.ql-editor li.ql-indent-6.ql-direction-rtl.ql-align-right {
    /*padding-right: 19.5em;*/
    padding-right: 7.5em;
  }
  /deep/.ql-editor .ql-indent-7:not(.ql-direction-rtl) {
    /*padding-left: 21em;*/
    padding-left: 7em;
  }
  /deep/.ql-editor li.ql-indent-7:not(.ql-direction-rtl) {
    /*padding-left: 22.5em;*/
    padding-left: 8.5em;
  }
  /deep/.ql-editor .ql-indent-7.ql-direction-rtl.ql-align-right {
    /*padding-right: 21em;*/
    padding-right: 7em;
  }
  /deep/ .ql-editor li.ql-indent-7.ql-direction-rtl.ql-align-right {
    /*padding-right: 22.5em;*/
    padding-right: 8.5em;
  }
  /deep/.ql-editor .ql-indent-8:not(.ql-direction-rtl) {
    /*padding-left: 24em;*/
    padding-left: 8em;
  }
  /deep/ .ql-editor li.ql-indent-8:not(.ql-direction-rtl) {
    /*padding-left: 25.5em;*/
    padding-left: 9.5em;
  }
  /deep/.ql-editor .ql-indent-8.ql-direction-rtl.ql-align-right {
    /*padding-right: 24em;*/
    padding-right: 8em;
  }
  /deep/.ql-editor li.ql-indent-8.ql-direction-rtl.ql-align-right {
    /*padding-right: 25.5em;*/
    padding-right: 9.5em;
  }
  /deep/.ql-editor .ql-indent-9:not(.ql-direction-rtl) {
    /*padding-left: 27em;*/
    padding-left: 9em;
  }
  /deep/.ql-editor li.ql-indent-9:not(.ql-direction-rtl) {
    /*padding-left: 28.5em;*/
    padding-left: 10.5em;
  }
  /deep/.ql-editor .ql-indent-9.ql-direction-rtl.ql-align-right {
    /*padding-right: 27em;*/
    padding-right: 9em;
  }
  /deep/.ql-editor li.ql-indent-9.ql-direction-rtl.ql-align-right {
    /*padding-right: 28.5em;*/
    padding-right: 10.5em;
  }

</style>
