<template>
  <div class="rule-box">

    <div class="rule-wrapper ql-snow">
      <div class="text-right mb_20" v-show="isEdit == false">
        <el-button type="primary" @click="handleEdit">编辑</el-button>
      </div>
       <div v-html="description"
            v-show="isEdit == false"
            class="description ql-editor">
         {{ description }}
       </div>

      <div class="quill_editor_content" v-show="isEdit == true">
        <quillEditor ref="myQuillEditor" :isEditor="!isEdit" :content.sync="descriptionCurrent" />
        <div class="text-center mt_20">
          <el-button type="primary" @click="handleSave">保 存</el-button>
          <el-button @click="isEdit = false;descriptionCurrent = description">取 消</el-button>
        </div>
      </div>


    </div>
  </div>
</template>

<script >
  import quillEditor from "@/components/quillEditor/quillEditor";
  import {getRule,saveRule} from "@/api/rules"
export default {
  data() {
    return {
      isEdit:false,
      description:'',
      descriptionCurrent:'',
    };
  },
  components: {
    quillEditor,
  },
  methods: {
    getRules(){
      getRule().then((res) => {
        this.description = res.data.content;
        this.descriptionCurrent = res.data.content;
      });
    },
    handleEdit(){
      this.isEdit = true;
      const descriptionCurrent = this.descriptionCurrent;
      if (this.$refs.myQuillEditor) {
        this.$refs.myQuillEditor.changeContent(descriptionCurrent);
      }
    },
    handleSave(){

      saveRule({content:this.descriptionCurrent}).then((res) => {
        this.isEdit = false;
        this.getRules();
      });
    },
  },
  mounted() {
    this.getRules();
  },
};
</script>

<style lang="scss" scoped>
  .quill_editor_content{
    height: calc(100vh - 147px);
  }
.rule-box {
  background: #f0f2f5;
  height: calc(100vh - 83px);
  padding: 10px;
  box-sizing: border-box;
  .rule-wrapper {
    font-size: 16px;
    /*line-height: 2em;*/
    background: white;
    border-radius: 20px;
    padding: 20px 50px;
    box-sizing: border-box;

  }
  /deep/.quill .ql-container{
    font-size: 16px;
    height:  calc(100vh - 267px);
  }
  .description{
    max-height: calc(100vh - 205px);
    overflow: auto;
  }
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
