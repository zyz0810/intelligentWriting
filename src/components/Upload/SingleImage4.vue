<template>
  <div class="upload-container">
    <!--限制图片的大小尺寸-->
    <el-upload :class="[{ hide_add: hideUploadEdit }, 'avatar-uploader']"
               :data="dataObj"
               id="upload1"
               :multiple="false"
               action=""
               :disabled='disabled'
               :on-preview="handlePictureCardPreview"
               :on-remove="handleRemove"
               :http-request="uploadImg"
               :file-list="imgArr"
               :limit="1"
               accept=".jpg,.jpeg,.png"
               :append-to-body="true"
               :on-exceed="exceedSize"
               :on-change="handleEditChange"
               list-type="picture-card">
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-dialog title="查看图片"
               :visible.sync="dialogVisible"
               :append-to-body="true">
      <img width="100%"
           :src="dialogImageUrl"
           alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from "@/api/qiniu";
import store from "@/store";
import { uploadImg } from "@/api/upload";

export default {
  name: "SingleImageUpload",
  props: {
    tempUrl: {
      type: String,
      default: "",
      required: true,
    },
    disabled: {
      type: Boolean,
      default: "",
      required: false,
    },
  },
  data () {
    return {
      progressFlag: true,
      progressPercent: 0,
      dialogImageUrl: "",
      dialogVisible: false,
      // tempUrl: '',
      dataObj: { type: "license" },
      imgArr: [],
      hideUploadEdit: false,
    };
  },
  watch: {
    tempUrl: function (a, b) {
      //a是value的新值，b是旧值
      if (a != null && a != "") {
        this.imgArr = [{ url: a }];
        this.hideUploadEdit = true;
      } else {
        this.imgArr = [];
        this.hideUploadEdit = false;
      }
    },
  },
  mounted () {
    if (this.tempUrl != null && this.tempUrl != "") {
      this.imgArr = [{ url: this.tempUrl }];
      this.hideUploadEdit = true;
    } else {
      this.imgArr = [];
      this.hideUploadEdit = false;
    }
  },
  methods: {
    exceedSize () {
      this.$message({ message: "最多只能上传一张图片", type: "warning" });
    },
    emitInput (val) {
      this.$emit("imgSrc", val);
    },
    handleEditChange (file, fileList) {
      this.hideUploadEdit = fileList.length >= 1;
    },
    handleRemove (file, fileList) {
      this.hideUploadEdit = fileList.length >= 1;
      this.emitInput("");
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadImg (e) {
      // let _this = this
      // const is1M = file.size / 1024 / 1024 < 0.8; // 限制小于1M
      // const isSize = new Promise(function (resolve, reject) {
      //   let width = 750; // 限制图片尺寸为750x1334
      //   let height = 1334;
      //   let _URL = window.URL || window.webkitURL;
      //   let img = new Image();
      //   img.onload = function () {
      //     let valid = img.width === width && img.height === height;
      //     valid ? resolve() : reject();
      //   }
      //   img.src = _URL.createObjectURL(file);
      // }).then(() => {
      //   return file;
      // }, () => {
      //   _this.$message.error('图片尺寸限制为750x1334，大小不可超过1MB')
      //   return Promise.reject();
      // });
      // if (!is1M) {
      //   _this.$message.error('图片尺寸限制为750x1334，大小不可超过800KB')
      // }
      // return isSize & is1M
      const file = e.file;
      const isLtSize = file.size / 1024 / 1024 < 0.8;
      if (!isLtSize) {
        this.$message.error('上传图片大小不能超过 800kb');
        this.emitInput("");
        this.imgArr = [];
        this.hideUploadEdit = false;
        return

      }
      const isSize = new Promise(function (resolve, reject) {
        let width = 750; // 限制图片尺寸为750x1334
        let height = 1334;
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function () {
          console.log(valid)
          let valid = img.width === width && img.height === height;
          valid ? resolve() : reject();
        }
        img.src = _URL.createObjectURL(file);
        console.log(img.src)
      }).then(() => {
        // return file;
        uploadImg(file)
          .then((res) => {
            this.emitInput(res.picUrl);
          })
          .catch((e) => {
            this.$message({ message: "上传图片失败", type: "warning" });
          });
      }, () => {
        this.$message.error('图片尺寸限制为750x1334')
        this.emitInput("");
        this.imgArr = [];
        this.hideUploadEdit = false;
        return Promise.reject();
      });
    },
    beforeUpload () {
      const _self = this;
      return new Promise((resolve, reject) => {
        // getToken().then(response => {
        //   const key = response.data.qiniu_key
        //   const token = response.data.qiniu_token
        //   _self._data.dataObj.token = token
        //   _self._data.dataObj.key = key
        //   this.tempUrl = response.data.qiniu_url
        //   resolve(true)
        // }).catch(err => {
        //   reject(false)
        // })
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/element-ui.scss";
@import "~@/styles/element-variables.scss";
@import "~@/styles/index.scss";
/deep/.avatar-uploader {
  width: 80px;
  height: 120px;
  &.hide_add {
    .el-upload {
      display: none;
    }
  }
  .el-upload--picture-card,
  .el-upload-list--picture-card .el-upload-list__item {
    width: 80px;
    height: 120px;
    /*line-height: 80px;*/
  }
  .el-upload--picture-card {
    width: 80px;
    height: 120px;
    cursor: pointer;
    overflow: hidden;
  }
  .el-upload {
    width: 80px;
    height: 120px !important;
    line-height: 120px;
    cursor: pointer;
    overflow: hidden;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 120px;
    /*line-height: 80px;*/
    text-align: center;
  }

  .avatar {
    width: 80px;
    height: 120px;
    border-radius: 6px;
    display: block;
  }
}
</style>
