<template>
  <div class="edit_article">
    <Tinymce :height="800" v-model="tiny.value"></Tinymce>
  </div>
</template>

<script>
  import Tinymce from "@/components/Tinymce_two";
  export default {
    components: {
      Tinymce,
    },
    data() {
      return {
        tiny: {
          value: undefined,
        },
      };
    },
    methods: {
      // 保存富文本内容-保存字符串
      add() {
        const params = `this.tiny?.value`;
      },
      edit() {
        // 接口回显保存html
        // this.tiny.value = res.data|| ''
      },
    },
  };
</script>
<style lang="scss" scoped>
  .edit_article{
    padding: 10px;
  }
</style>
