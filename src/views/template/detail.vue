<template>
  <my-dialog :visible.sync="dialogVisible"
             :close-on-click-modal="false"
             width="80%"
             @close="close"
             :append-to-body="true"
             top="5vh"
             class="dialogContainer"
             @open="open"
             title="效期退款订单">
    <el-tabs class="dialog_tab">
      <el-tab-pane label="效期退款详情"
                   name="0">
        <div class="labelBox">
          <label>效期退换编号：{{ orderInfor.sn || "" }}</label>
          <label>申请时间：{{ orderInfor.createTime ? $moment(orderInfor.createTime).format("YYYY-MM-DD HH:mm:ss") : ""}}</label>
          <label>状态：{{ orderInfor.status | formatStatus }}</label>
        </div>
        <el-table border v-loading="listLoading"
                  :data="refundOrderItemList"
                  :header-cell-style="{ background: '#f5f7fa' }"
                  element-loading-text="拼命加载中"
                  :height="tableHeight"
                  ref="table"
                  :summary-method="getSummaries"
                  :show-summary="true"
                  highlight-current-row>
          <el-table-column label="商品主图"
                           align="center"
                           prop="" :width="global.tableValueWidth.tableImgWidth" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-avatar shape="square"
                         size="large"
                         v-showImage="scope.row.skuImageUrl"
                         :src="scope.row.skuImageUrl"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column label="商品编码"
                           align="center"
                           prop="goodsSn" :width="global.tableValueWidth.tableMoreNumberWidth" show-overflow-tooltip></el-table-column>
          <el-table-column label="SKU编码"
                           align="center"
                           prop="skuCode" :width="global.tableValueWidth.tableMoreNumberWidth" show-overflow-tooltip></el-table-column>
          <el-table-column label="商品名称"
                           align="center"
                           prop="name" :min-width="global.tableValueWidth.tableProductNameWidth" show-overflow-tooltip></el-table-column>
          <el-table-column label="规格"
                           align="center"
                           prop="specificationValue" :width="global.tableValueWidth.tableSpecWidth" show-overflow-tooltip></el-table-column>
          <el-table-column label="商品单价"
                           align="center"
                           prop="price" :width="global.tableValueWidth.tablePriceWidth" show-overflow-tooltip></el-table-column>
          <el-table-column label="申请退换数量"
                           :width="global.tableValueWidth.tablePriceWidth" show-overflow-tooltip
                           align="center"
                           prop="productAmount"></el-table-column>
          <el-table-column label="应退金额"
                           align="center" :width="global.tableValueWidth.tablePriceWidth" show-overflow-tooltip
                           prop="refundPrice"></el-table-column>
          <el-table-column label="批次信息"
                           align="center"
                           width="300"
                           prop="retailPrice">
            <template slot-scope="scope">
              <!--'adfsfsd#fkferuewirwo'.split('#')  scope.row.batchNo
              {{'adfsfsd#fkferuewirwo'.split('#')}} [scope.row.batchNo]-->
              <el-table v-loading="listLoading"
                        :data="scope.row.batchNoList"
                        :header-cell-style="{ background: '#f5f7fa' }"
                        element-loading-text="拼命加载中"
                        highlight-current-row>
                <el-table-column label="批号"
                                 align="center"
                                 prop="no">
                  <template slot-scope="scope">
                    <div>{{scope.row.no}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="数量"
                                 align="center"
                                 prop="num">
                  <template slot-scope="scope">
                    <div>{{scope.row.num}}</div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="物流信息"
                   name="1">
        <ul class="dataInfo">
          <li>物流公司：{{ logistics.logisticsCompany || "" }}</li>
          <li>物流单号：{{ logistics.logisticsOrderNo || "" }}</li>
          <li>联系电话：{{logistics.logisticsPhone || "" }}</li>
          <li>
            图片：
            <el-image v-for="(item, index) in logistics.imageUrlList"
                      :key="index"
                      v-showImage="item"
                      style=" width: 100px; height: 100px; margin-right: 4px; cursor: pointer; "
                      :src="item"
                      fit="fill"></el-image>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="协商历史"
                   name="2">
        <el-table border v-loading="listLoading"
                  :data="logList"
                  :header-cell-style="{ background: '#f5f7fa' }"
                  element-loading-text="拼命加载中"
                  :max-height="tableHeight"
                  height='400'
                  highlight-current-row>
          <el-table-column label="操作人"
                           align="center"
                           prop="opUser"></el-table-column>
          <el-table-column label="时间"
                           align="center"
                           prop="createTime"
                           :formatter="formatTime"></el-table-column>
          <el-table-column label="操作类型"
                           align="center"
                           prop="statusDesc"></el-table-column>
          <el-table-column label="操作结果"
                           align="center"
                           prop="opResult"></el-table-column>
          <el-table-column label="备注"
                           align="center"
                           prop="remark"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="关联换货订单"
                   name="3">
        <div v-if='exchangeGoodsList.length != 0'>
          <el-tabs type="border-card"
                   class="tab-child">
            <el-tab-pane class="aaa"
                         v-for='(item,index) in exchangeGoodsList'
                         :key='index'>
              <span slot="label">换货{{index + 1}}</span>
              <div class="labelBox">
                <label>订单编号：{{ item.orderSN || "--" }}</label>
                <label>下单时间：{{ item.createTime || "--" }}</label>
                <label>状态：{{ item.orderDisplayStatus | formatDisplayStatus }}</label>
              </div>
              <el-table border v-loading="listLoading"
                        :data="item.commodityDetailList"
                        :header-cell-style="{ background: '#f5f7fa' }"
                        ref="tableList"
                        :max-height="tableHeight"
                        element-loading-text="拼命加载中"
                        fit
                        height="280"
                        :summary-method="getSummariesOne"
                        :show-summary="true"
                        highlight-current-row>
                <el-table-column label="主图"
                                 align="center"
                                 fixed>
                  <template slot-scope="scope">
                    <img :src="scope.row.mainImage"
                         class="product_img" />
                  </template>
                </el-table-column>
                <el-table-column label="商品编码"
                                 align="center"
                                 prop="goodsSn"
                                 fixed></el-table-column>
                <el-table-column label="商品名称"
                                 align="center"
                                 prop="fullName"
                                 fixed></el-table-column>
                <el-table-column label="类型"
                                 align="center"
                                 fixed>
                  <template slot-scope="scope">
                    {{ scope.row.orderItemType | filtersType }}
                  </template>
                </el-table-column>
                <el-table-column label="规格"
                                 align="center"
                                 prop="specification"></el-table-column>
                <el-table-column label="sku编码"
                                 align="center"
                                 prop="skuCode"></el-table-column>
                <el-table-column label="数量"
                                 align="center"
                                 prop="amount"></el-table-column>
                <el-table-column label="单位"
                                 align="center"
                                 prop="unit"></el-table-column>
                <!--          <el-table-column label="单价" align="center" prop="unitPrice">-->
                <!--            <template slot-scope="scope">{{scope.row.orderItemType==2?scope.row.unitPriceDiscount:scope.row.unitPrice}}</template>-->
                <!--          </el-table-column>-->
                <el-table-column label="单价"
                                 align="center"
                                 prop="unitPrice"></el-table-column>
                <el-table-column label="商品金额"
                                 align="center"
                                 prop="commodityPrice"></el-table-column>
                <el-table-column label="平台促销优惠金额"
                                 align="center"
                                 width="150"
                                 prop="platformPromotionDiscount"></el-table-column>
                <el-table-column label="平台优惠券优惠金额"
                                 align="center"
                                 width="150"
                                 prop="platformCouponDiscount"></el-table-column>
                <el-table-column label="商家促销优惠金额"
                                 align="center"
                                 width="150"
                                 prop="promotionDiscount"></el-table-column>
                <el-table-column label="商家优惠券优惠金额"
                                 align="center"
                                 width="150"
                                 prop="couponDiscount"></el-table-column>
                <el-table-column label="余额抵扣"
                                 align="center"
                                 prop="useRebatePrice"></el-table-column>
                <el-table-column label="预计返利金"
                                 align="center"
                                 width="100"
                                 prop="rebateDiscount"></el-table-column>
                <el-table-column label="应付金额"
                                 align="center"
                                 prop="payPrice"></el-table-column>
              </el-table>
              <div class="flex">
                <div class="flex-center">
                  <div class="order_info f12 m20">
                    <span>收货人：{{ item.consignee || "--" }}</span>
                    <span>联系方式：{{ item.consigneePhone || "--" }}</span>
                    <span>收货地址：{{ item.consigneeAddress || "--" }}</span>
                  </div>
                  <div class="order_info f12">
                    <span>客户备注：{{ item.clientRemarks || "--" }}</span>
                  </div>
                  <div class="order_info f12">
                    <span>客服备注：{{ item.serviceRemarks || "--" }}</span>
                  </div>
                </div>
                <div class="order_info f12 m20">
                  <div v-if="item.couponDiscount">
                    优惠金额：<span class="red01">-{{ item.couponDiscount }}</span>
                  </div>
                  <div v-if="item.freight">
                    运费：<span class="red01">{{ item.freight }}</span>
                  </div>
                  <div v-if="item.payTotalPrice">
                    应付金额：<span class="red01">{{ item.payTotalPrice }}</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div v-else
             class='box-exchange'
             style="">暂无数据</div>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="dialogVisible = false">返回</el-button>
    </span>
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
  filters: {
    filtersType: function (value) {
      let StatusArr = { 0: "普通", 1: "套餐", 2: "赠品" };
      return StatusArr[value];
    },
    // 订单状态 1-待付款 2-待确认收款 3-待审核 4-代发货 5-已发货 6-已完成 7-已取消
    formatDisplayStatus (cellValue) {
      return cellValue == 1
        ? "待付款"
        : cellValue == 2
          ? "待确认收款"
          : cellValue == 3
            ? "待审核"
            : cellValue == 4
              ? "代发货"
              : cellValue == 5
                ? "已发货"
                : cellValue == 6
                  ? "已完成"
                  : cellValue == 7
                    ? "已取消"
                    : '--';
    },
    formatStatus (cellValue) {
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
    formatRefundType (cellValue) {
      return cellValue == 1 ? "退货退款" : cellValue == 2 ? "仅退款" : "暂无";
    },
    formatRefundReason (cellValue) {
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
  },
  methods: {
    getSummariesOne (param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (
          !values.every(value => isNaN(value)) &&
          (column.property == "refundPrice" ||
            column.property == "platformCouponDiscount" ||
            column.property == "promotionDiscount" ||
            column.property == "commodityPrice" ||
            column.property == "promotionCouponDiscount" ||
            column.property == "payPrice")
        ) {
          sums[index] = values
            .reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return Number(prev) + curr;
              } else {
                return Number(prev);
              }
            }, 0)
            .toFixed(2);
        } else if (column.property == "amount") {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return Number(prev) + curr;
            } else {
              return Number(prev);
            }
          }, 0);
        } else {
          sums[index] = "";
        }
      });
      this.$nextTick(() => {
        this.$refs.tableList.doLayout();
      });
      return sums;
    },
    getSummaries (param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (
          !values.every(value => isNaN(value)) &&
          (column.property == "refundPrice" ||
            column.property == "refundPrice")
        ) {
          sums[index] = values
            .reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return Number(prev) + curr;
              } else {
                return Number(prev);
              }
            }, 0)
            .toFixed(2);
        } else if (column.property == "productAmount") {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return Number(prev) + curr;
            } else {
              return Number(prev);
            }
          }, 0);
        } else {
          sums[index] = "";
        }
      });
      this.$nextTick(() => {
        this.$refs.table.doLayout();
      });
      return sums;
    },
    findById () {
      this.listLoading = true;
      findById({ id: this.orderInfor.id })
        .then((res) => {
          this.refundOrderItemList = res.data.replacementItems;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    formatTime (row, column, cellValue, index) {
      return cellValue
        ? this.$moment(cellValue).format("YYYY-MM-DD HH:mm:ss")
        : "暂无";
    },
    logDetail () {
      this.listLoading = true;
      logDetail({ id: this.orderInfor.id })
        .then((res) => {
          this.logList = res.data;
          this.listLoading = false;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    logistic () {
      this.listLoading = true;
      logistic({ id: this.orderInfor.id })
        .then((res) => {
          this.logistics = res.data
          this.listLoading = false;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    orderDetail () {
      this.listLoading = true;
      orderDetail({ id: this.orderInfor.id })
        .then((res) => {
          // this.exchangeGoodsList = res.data.length == 0 ? [{ commodityDetailList: [] }] : res.data
          this.exchangeGoodsList = res.data
          this.listLoading = false;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    open () {
      this.findById();
      this.logDetail();
      this.logistic();
      this.orderDetail()
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
    formatType (row, column, cellValue, index) {
      return cellValue == 0
        ? "普通"
        : cellValue == 1
          ? "套餐"
          : cellValue == 2
            ? "赠品"
            : "暂无";
    },
    // 0:待审核1:待收货.2.待换货,3.审核通过,4,售后审核未通过,5入库审核未通过,已关闭(6.撤销申请,7.系统关闭,8,拒绝收货)
    formatOperationStatus (row, column, cellValue, index) {
      return cellValue == 0
        ? "待审核"
        : cellValue == 1
          ? "待收货"
          : cellValue == 2
            ? "待换货"
            : cellValue == 3
              ? "审核通过"
              : cellValue == 4
                ? "售后审核未通过"
                : cellValue == 5
                  ? "入库审核未通过,已关闭"
                  : cellValue == 6
                    ? "撤销申请"
                    : cellValue == 7
                      ? "系统关闭"
                      : cellValue == 8
                        ? "拒绝收货"
                        : "暂无";
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
