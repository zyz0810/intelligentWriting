<template>
  <div class="app-container">
    <div class="vip_container flex">
     <div class="vip_item">
       <div class="vip_top">
         <p class="vip_top_one">免费版</p>
         <p class="vip_top_two">AI智能创作</p>
       </div>
       <div class="vip_middle">
         <p class="vip_middle_one"><span class="f12">￥</span>0</p>
         <p class="vip_middle_two">免费</p>
         <el-button class="vip_middle_btn">去使用</el-button>
       </div>
       <div class="vip_bottom">
         <p><i class="el-icon-check clr_blue01"></i>AI智能写作</p>
         <p><i class="el-icon-check clr_blue01"></i>AI伪原创</p>
         <p><i class="el-icon-close clr_red01"></i>AI对话</p>
         <p><i class="el-icon-check clr_blue01"></i>文章续写</p>
         <p><i class="el-icon-close clr_red01"></i>文案提取</p>
         <p><i class="el-icon-close clr_red01"></i>智能纠错</p>
         <p><i class="el-icon-close clr_red01"></i>多人协同</p>
         <p><i class="el-icon-check clr_blue01"></i>断句改写</p>
         <p class="bold"><i class="el-icon-check clr_blue01"></i>基本模型：2000字/天</p>
       </div>
     </div>
      <div class="vip_item">
        <div class="vip_top">
          <p class="vip_top_one">基础班/月</p>
          <p class="vip_top_two">智能纠错；高级模型</p>
        </div>
        <div class="vip_middle">
          <p class="vip_middle_one"><span class="f12">￥</span>24</p>
          <s class="vip_middle_two clr_red01">原价48/月，限时5折优惠</s>
          <el-button class="vip_middle_btn vip_middle_btn_two" @click="handlePay">立即升级</el-button>
        </div>
        <div class="vip_bottom">
          <p><i class="el-icon-check clr_blue01"></i>AI智能写作</p>
          <p><i class="el-icon-check clr_blue01"></i>AI伪原创</p>
          <p><i class="el-icon-check clr_blue01"></i>AI对话</p>
          <p><i class="el-icon-check clr_blue01"></i>文章续写</p>
          <p><i class="el-icon-close clr_red01"></i>文案提取</p>
          <p><i class="el-icon-check clr_blue01"></i>智能纠错</p>
          <p><i class="el-icon-check clr_blue01"></i>多人协同</p>
          <p><i class="el-icon-check clr_blue01"></i>断句改写</p>
          <p class="bold"><i class="el-icon-check clr_blue01"></i>基本模型：2000字/天</p>
        </div>
      </div>
      <div class="vip_item">
        <div class="vip_top">
          <p class="vip_top_one">专业版/年</p>
          <p class="vip_top_two">文案提取，多种写作能力</p>
        </div>
        <div class="vip_middle">
          <p class="vip_middle_one"><span class="f12">￥</span>69</p>
          <s class="vip_middle_two clr_red01">原价96/年，限时5折优惠</s>
          <el-button class="vip_middle_btn vip_middle_btn_three" @click="handlePay">立即升级</el-button>
        </div>
        <div class="vip_bottom">
          <p><i class="el-icon-check clr_blue01"></i>AI智能写作</p>
          <p><i class="el-icon-check clr_blue01"></i>AI伪原创</p>
          <p><i class="el-icon-check clr_blue01"></i>AI对话</p>
          <p><i class="el-icon-check clr_blue01"></i>文章续写</p>
          <p><i class="el-icon-check clr_blue01"></i>文案提取</p>
          <p><i class="el-icon-check clr_blue01"></i>智能纠错</p>
          <p><i class="el-icon-check clr_blue01"></i>多人协同</p>
          <p><i class="el-icon-check clr_blue01"></i>断句改写</p>
          <p class="bold"><i class="el-icon-check clr_blue01"></i>基本模型：2000字/天</p>
        </div>
      </div>
      <div class="vip_item">
        <div class="vip_top">
          <p class="vip_top_one">团队版</p>
          <p class="vip_top_two">企业/团队协同</p>
        </div>
        <div class="vip_middle">
          <p class="vip_middle_one"><span class="f12">￥</span>399</p>
          <s class="vip_middle_two clr_red01">原价599/月，最多20个账号</s>
          <el-button class="vip_middle_btn vip_middle_btn_four" @click="handlePay">立即升级</el-button>
        </div>
        <div class="vip_bottom">
          <p><i class="el-icon-check clr_blue01"></i>AI智能写作</p>
          <p><i class="el-icon-check clr_blue01"></i>AI伪原创</p>
          <p><i class="el-icon-check clr_blue01"></i>AI对话</p>
          <p><i class="el-icon-check clr_blue01"></i>文章续写</p>
          <p><i class="el-icon-check clr_blue01"></i>文案提取</p>
          <p><i class="el-icon-check clr_blue01"></i>智能纠错</p>
          <p><i class="el-icon-check clr_blue01"></i>多人协同</p>
          <p><i class="el-icon-check clr_blue01"></i>断句改写</p>
          <p class="bold"><i class="el-icon-check clr_blue01"></i>基本模型：2000字/天</p>
        </div>
      </div>
    </div>

<!--支付二维码弹窗-->
    <el-dialog :visible.sync="dialogPayVisible"
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
        <p class="result_watch">可以在账户内设置，<span class="a_primary">查看订单</span></p>
        <el-button type="primary" @click="payResult='fail'">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { search, exportList } from "@/api/validReturn";
import { mapState } from "vuex";

import AdminApi from "@/api/export";
export default {
  name: "orderList",
  data () {
    return {
      payResult:'success',
      dialogResultVisible:false,
      dialogPayVisible:false,
      templateSearch:'',
      dataList: [{
        id:1,
        name:'未命名',
        createName:'bobo',
        time:'刚刚',
        collect:1,
      },{
        id:2,
        name:'未命名',
        createName:'bobo',
        time:'刚刚',
        collect:0,
      }],
      total: 0,
      listLoading: false,
      showDialog: false,
      showShipmentsDialog: false,
      isActivated: false,
      tableHeight: 300,
      orderInfor: {},
      listQuery: {
        page: 1,
        limit: 10,
        sn: "",
        storeName: "",
        status: "",
        supplierName: "",
        startTime: "",
        endTime: "",
        statusWebType: "",
      },
      selectList: [],
      exportLoading: false,
    };
  },
  components: {  },
  computed: {
    ...mapState({
      roles: (state) => state.user.roles,
    }),
    dateTime: {
      get () {
        if (this.listQuery.startTime && this.listQuery.endTime) {
          return [this.listQuery.startTime, this.listQuery.endTime];
        } else {
          return [];
        }
      },
      set (v) {
        if (v) {
          this.listQuery.startTime = v[0];
          this.listQuery.endTime = v[1];
        } else {
          this.listQuery.startTime = "";
          this.listQuery.endTime = "";
        }
      },
    },
    isCanOption () {
      return this.selectList.length != 1;
    },
  },
  filters: {
    formatRefundStatus (cellValue) {
      return cellValue == 0
        ? "系统关闭"
        : cellValue == 1
          ? "售后待审核"
          : cellValue == 2
            ? "售后审核通过，待寄回"
            : cellValue == 3
              ? "售后审核未通过"
              : cellValue == 4
                ? "已寄回，待入库审核"
                : cellValue == 5
                  ? "入库完成，待退款审核"
                  : cellValue == 6
                    ? "入库审核未通过"
                    : cellValue == 7
                      ? "退款成功"
                      : cellValue == 8
                        ? "退款失败"
                        : cellValue == 9
                          ? "撤销申请"
                          : "";
    },
  },
  async mounted () {
    this.$nextTick(() => {
      let height =
        window.innerHeight - this.$refs.activityTable.$el.offsetTop - 170;
      this.tableHeight = height > 300 ? height : 300;
      window.onresize = () => {
        let height =
          window.innerHeight - this.$refs.activityTable.$el.offsetTop - 170;
        this.tableHeight = height > 300 ? height : 300;
      };
    });
    // this.search();
    await this.$on("hook:activated", () => {
      if (this.isActivated) {
        // this.search();
      }
    });
    this.isActivated = true;
  },
  methods: {
    handleResult(){
      this.dialogPayVisible = false;
      this.dialogResultVisible = true;
      this.payResult = 'success';
    },
    handlePay(){
      this.dialogPayVisible = true;
    },
    resetList () {
      Object.assign(this.listQuery, {
        page: 1,
        limit: 10,
        sn: "",
        storeName: "",
        status: "",
        supplierName: "",
        startTime: "",
        endTime: "",
      });
      this.search();
    },
    hint (value) {
      return this.$confirm(value, "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning",
      }).catch();
    },
    handleRowClick (row, column, event) {
      this.$refs.activityTable.toggleRowSelection(row);
    },
    formatTime (row, column, cellValue, index) {
      return cellValue
        ? this.$moment(cellValue).format("YYYY-MM-DD HH:mm:ss")
        : "暂无";
    },
    formatRefundReason (row, column, cellValue, index) {
      return cellValue == 1
        ? "商品质量问题"
        : cellValue == 2
          ? "物流问题"
          : cellValue == 3
            ? "其他问题"
            : cellValue == 4
              ? "包裹拒收"
              : cellValue == 5
                ? "包裹未收到"
                : "暂无";
    },
    formatDisplayStatus (row, column, cellValue, index) {
      return cellValue == 1
        ? "售后待审核"
        : cellValue == 2
          ? "售后审核通过，待寄回"
          : cellValue == 3
            ? "售后审核未通过"
            : cellValue == 4
              ? "待入库审核"
              : cellValue == 5
                ? "入库审核未通过"
                : cellValue == 6
                  ? "待换货"
                  : cellValue == 7
                    ? "已完成"
                    : cellValue == 8
                      ? "撤销申请"
                      : cellValue == 9
                        ? "系统关闭"
                        : cellValue == 10
                          ? "拒绝收货"
                          : cellValue == 11
                            ? "确认收货"
                            : "";
    },
    fromatRefundType (row, column, cellValue, index) {
      return cellValue == 1 ? "退货退款" : cellValue == 2 ? "仅退款" : "";
    },
    handleFilter () {
      this.listQuery.page = 1;
      this.search()
    },
    search () {
      // this.listLoading = true;
      // const {
      //   page,
      //   limit,
      //   sn,
      //   storeName,
      //   status,
      //   supplierName,
      //   startTime,
      //   endTime,
      //   statusWebType,
      // } = this.listQuery;
      // search({
      //   page,
      //   limit,
      //   sn,
      //   storeName,
      //   status,
      //   supplierName,
      //   startTime,
      //   endTime,
      //   statusWebType,
      // })
      //   .then((res) => {
      //     this.dataList = res.data.data;
      //     this.total = res.data.count;
      //     this.listLoading = false;
      //     this.$refs.activityTable.doLayout();
      //   })
      //   .catch(() => {
      //     this.listLoading = false;
      //   });
    },
    getDetial () {
      this.orderInfor = this.selectList[0];
      this.showDialog = true;
    },
    exportView () {
      this.exportLoading = true
      let ids = this.selectList.map(item => item.id)
      // let { startTime, endTime, supplierName, statusWebType, orderSn, refundOrderSn, refundType, customerName, status, } = this.listQuery
      let { createTime, endTime, supplierName, statusWebType, orderSn, refundOrderSn, refundType, customerName, status, } = this.listQuery
      // AdminApi.exportList({ startTime, endTime, supplierName, statusWebType, orderSn, refundOrderSn, refundType, customerName, status, isOmc: true, ids }).then(res => {
      AdminApi.exportList({ createTime, endTime, supplierName, statusWebType, orderSn, refundOrderSn, refundType, customerName, status, ids }).then(res => {
        this.exportLoading = false
        const blob = new Blob([res]);
        let myDate = new Date();
        let timename = myDate.toLocaleDateString().split('/').join('-');
        const fileName = '效期退换订单' + timename + '.xls';
        const linkNode = document.createElement('a');
        linkNode.download = fileName; //a标签的download属性规定下载文件的名称
        linkNode.style.display = 'none';
        linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
        document.body.appendChild(linkNode);
        linkNode.click();  //模拟在按钮上的一次鼠标单击
        URL.revokeObjectURL(linkNode.href); // 释放URL 对象
        document.body.removeChild(linkNode);
      }).catch(() => {
        this.exportLoading = false;
      });

    },
  },
};
</script>

<style lang="scss" scoped>

.app-container {
  /*background: #fff;*/
  height: calc(100vh - 56px);
  overflow: auto;
}
.vip_container{
  background: #fff;
  height: calc(100vh - 76px);
  padding: 20px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
}
.vip_item{
  width: 200px;
  border-radius: 10px;
  border: 1px solid #EBEBEB;
  margin: 20px 10px;
  &:nth-child(1){
    .vip_top {
      background: url("./../../assets/image/vip_img02.png") no-repeat 100% 100%;
    }
  }
  &:nth-child(2){
    .vip_top {
      background: url("./../../assets/image/vip_img03.png") no-repeat 100% 100%;
    }
  }
  &:nth-child(3){
    .vip_top {
      background: url("./../../assets/image/vip_img04.png") no-repeat 100% 100%;
    }
  }
  &:nth-child(4){
    .vip_top {
      background: url("./../../assets/image/vip_img05.png") no-repeat 100% 100%;
    }
  }
  .vip_top{
    height: 85px;
    color: #fff;
    padding: 20px 10px 0;
    /*background: url("./../../assets/image/vip_img02.png") no-repeat 100% 100%;*/
    .vip_top_one{
      font-size: 20px;
      /*padding-top: 20px;*/
      line-height: 1.6;
    }
    .vip_top_two{
      font-size: 14px;
    }

  }
  .vip_middle{
    padding: 20px 10px;
  }
  .vip_middle_one{
    font-size: 32px;
  }
  .vip_middle_two{
    font-size: 12px;
    line-height: 2;
  }
  .vip_middle_btn{
    width: 100%;
    margin-top: 20px;
    &.vip_middle_btn_two{
      color: #fff;
      background: #6488CB;
    }
    &.vip_middle_btn_three{
      color: #fff;
      background: #CAA865;
    }
    &.vip_middle_btn_four{
      color: #fff;
      background: #454665;
    }
  }
  .vip_bottom{
    font-size: 12px;
    line-height: 2.6;
    padding: 20px 10px;
    i{
      font-weight: bold;
      margin-right: 5px;
    }
  }
}

</style>
