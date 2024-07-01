<template>
  <my-dialog :visible.sync="dialogVisible"
             :close-on-click-modal="false"
             width="550px"
             @close="close"
             :append-to-body="true"
             top="10vh"
             class="dialogContainer"
             @open="open"
             title="开发票">
    <el-form
      ref="dataForm"
      :rules="rules"
      :model="formData"
      label-width="80px"
      class="dialog_form"
    >
      <el-form-item label="发票抬头" prop="one">
        <el-input
          v-model.trim="formData.one"
          placeholder="请输入"
          autocomplete="off"
          clearable
        />
      </el-form-item>
      <el-form-item label="抬头类型" prop="two">
        <el-radio-group v-model="formData.two">
          <el-radio :label="0">个人</el-radio>
          <el-radio :label="1">企业</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="选择订单" prop="two">
        <el-select v-model="formData.two" placeholder="请选择">
          <el-option
            v-for="item in orderOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="金额" prop="four">
        <el-input
          v-model.trim="formData.four"
          placeholder="请输入"
          autocomplete="off"
          clearable
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary"
        @click="updateData()"
        :loading="saveLoading">提 交</el-button>
    </div>

  </my-dialog>
</template>

<script>
import { findById, logDetail, logistic, orderDetail } from "@/api/validReturn";
export default {
  props: {
    showDialog: {
      required: true,
      type: Boolean,
      default: false,
    },
    orderInfor: {
      required: true,
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      saveLoading:false,
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "change" }]
      },
      formData:{
        one:'',
        two:'',
        three:'',
        four:'',
      },
      orderOptions:[]
    };
  },
  computed: {
    dialogVisible: {
      get () {
        return this.showDialog;
      },
      set (value) {
        this.$emit("update:show-dialog", value);
      },
    },
  },

  methods: {
    updateData(){},
    open () {

    },
    close () {
      Object.assign(this.dataInfo, {
        orderStatus: "",
        orderSn: "",
        sn: "",
        createTime: "",
        refundStatus: "",
        refundPrice: "",
        refundReason: "",
        refundExplain: "",
        refundType: "",
        deliveryCorp: "",
        trackingNo: "",
        phone: "",
      });
      this.imageList = [];
      this.refundOrderItemList = [];
      this.deliveryList = [];
      this.logList = [];
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form-item--mini.el-form-item {
  margin-bottom: 24px;
}
.labelBox {
  display: block;
  padding: 10px 0;
  label {
    margin-right: 10px;
  }
}
.dialog-title {
  font-size: 24px;
  text-align: center;
  margin-top: 20px;
}
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  .el-button:nth-child(2) {
    margin-left: 30px;
  }
}
.el-form {
  padding: 0 20px;
}
.dataInfo {
  list-style: none;
  margin: 0px;
  li {
    padding: 4px 0;
  }
}
/deep/.tab-child {
  .el-tabs__content {
    height: 50vh !important;
  }
}
.order_info {
  line-height: 1.8em;
  span {
    margin-right: 20px;
  }
}
.box-exchange {
  text-align: center;
  margin: 100px 0px;
}
</style>
