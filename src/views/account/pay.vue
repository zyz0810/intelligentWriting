<template>
  <div>
    <el-dialog :visible.sync="showDialog"
               :close-on-click-modal="true"
               width="700px"
               @close="close"
               :append-to-body="true"
               top="20vh"
               class="dialogContainer no_header_dialog"
               @open="open"
               :show-close="false"
               title="">

      <div class="pay_dialog">
        <div class="pay_dialog_left" @click="handleResult">
          <img src="https://img1.baidu.com/it/u=3685234108,954911792&fm=253&fmt=auto&app=138&f=GIF?w=200&h=200"/>
          <p>扫码支付</p>
        </div>
        <div class="pay_dialog_right">
          <p class="pay_txt">应付金额</p>
          <p class="pay_money"><span>￥</span>19.00</p>
          <p>支付即视为您同意《 如此AI会员服务协议》和《如此AI个人/企业会员授权许可协议》 </p>
        </div>
      </div>
    </el-dialog>
    <!--    支付结果-->
    <el-dialog :visible.sync="dialogResultVisible"
               :close-on-click-modal="true"
               width="400px"
               @close="close"
               :append-to-body="true"
               top="20vh"
               class="dialogContainer no_header_dialog"
               @open="open"
               title="">
      <div class="result_dialog">
        <i :class="[payResult == 'success'?'el-icon-success':'el-icon-error']"></i>
        <p class="result_txt">{{payResult == 'success'?'支付成功':'支付失败'}}</p>
        <p class="result_watch">可以在账户内设置，<span class="a_primary" @click="handleOrder">查看订单</span></p>
        <el-button type="primary" @click="payResult='fail'">确定</el-button>
      </div>
    </el-dialog>
  </div>

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
      dialogResultVisible:false,
      payResult:'success',
      dataInfo: {
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
      },
      imageList: [],
      deliveryList: [],
      total: 0,
      tableHeight: "36vh",
      refundOrderItemList: [],
      logList: [],
      listLoading: false,
      exchangeGoodsList: [],
      logistics: [],
      aaaaa: '99#1,2#1'
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
    handleResult(){
      this.showDialog = false;
      this.dialogResultVisible = true;
      this.payResult = 'success';
    },
    handleOrder(){
      this.$router.push({
        path: "/account/index",
        query: { tabActive: 'second'},
      });
    },
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
