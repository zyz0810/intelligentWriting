<template>
  <div class="app-container">

    <div class="create_box">
      <p class="create_tit">快速创建</p>
      <div class="flex">
        <div class="create_item">
          <div class="left_img"><img src="./../../assets/headImg/img.png"/></div>
          <div class="right_txt">
            <p class="first_txt">新建文档</p>
            <p class="second_txt">新文本起草</p>
          </div>
        </div>
        <div class="create_item">
          <div class="left_img"><img src="./../../assets/headImg/img.png"/></div>
          <div class="right_txt">
            <p class="first_txt">上传文档</p>
            <p class="second_txt">从本地上传文档</p>
          </div>
        </div>
      </div>
    </div>
    <el-tabs class="refund_tab"
             v-model="listQuery.statusWebType"
             @tab-click="search">
      <el-tab-pane label="全部"
                   name='0'></el-tab-pane>
      <el-tab-pane label="待审核"
                   name="1"></el-tab-pane>
      <el-tab-pane label="待换货"
                   name="2"></el-tab-pane>
      <el-tab-pane label="已完成"
                   name="3"></el-tab-pane>
      <el-tab-pane label="已关闭"
                   name="4"></el-tab-pane>
    </el-tabs>
    <el-table border v-loading="listLoading"
              :data="dataList"
              :header-cell-style="{ background: '#f5f7fa' }"
              element-loading-text="拼命加载中"
              @selection-change="(list) => (selectList = list)"
              @row-click="handleRowClick"
              :max-height="tableHeight"
              ref="activityTable"
              highlight-current-row>
      <el-table-column type="selection"
                       min-width="42"
                       align="center"></el-table-column>
      <el-table-column label="效期退换编号"
                       :width="global.tableValueWidth.tableMoreNumberWidth" show-overflow-tooltip
                       align="center"
                       prop="sn"
                       fixed="left"></el-table-column>
      <el-table-column label="供应商名称"
                       :width="global.tableValueWidth.tableSupplierNameWidth" show-overflow-tooltip
                       align="center"
                       prop="supplierName"></el-table-column>
      <el-table-column label="客户编码"
                       :width="global.tableValueWidth.tableMoreNumberWidth" show-overflow-tooltip
                       align="center"
                       prop="storeSn"></el-table-column>
      <el-table-column label="客户名称"
                       :width="global.tableValueWidth.tableSupplierNameWidth" show-overflow-tooltip
                       align="center"
                       prop="storeName"></el-table-column>
      <el-table-column label="退货金额"
                       align="center"
                       prop="price" :width="global.tableValueWidth.tablePriceWidth" show-overflow-tooltip></el-table-column>
      <el-table-column label="商品种类"
                       align="center"
                       prop="skuTypes" :width="global.tableValueWidth.tablePriceWidth" show-overflow-tooltip></el-table-column>
      <el-table-column label="商品数量"
                       align="center"
                       prop="productAmount" :width="global.tableValueWidth.tablePriceWidth" show-overflow-tooltip></el-table-column>
      <el-table-column label="物流公司"
                       align="center"
                       prop="logisticsCompany" :width="global.tableValueWidth.tableShortNameWidth" show-overflow-tooltip></el-table-column>
      <el-table-column label="物流单号"
                       align="center"
                       prop="logisticsOrderNo" :width="global.tableValueWidth.tableShortNameWidth" show-overflow-tooltip></el-table-column>
      <el-table-column label="状态"
                       :width="global.tableValueWidth.tableExamStatusWidth" show-overflow-tooltip
                       :formatter="formatDisplayStatus"
                       align="center"
                       prop="status"></el-table-column>
      <el-table-column label="换货金额"
                       align="center" :width="global.tableValueWidth.tablePriceWidth" show-overflow-tooltip
                       prop="exchangePrice"></el-table-column>
      <el-table-column label="申请时间"
                       align="center"
                       :width="global.tableValueWidth.tableTimeWidth" show-overflow-tooltip
                       prop="createTime"
                       :formatter="formatTime"></el-table-column>
      <el-table-column label="客服审核时间"
                       align="center"
                       :width="global.tableValueWidth.tableTimeWidth" show-overflow-tooltip
                       prop="stuffCheckTime"
                       :formatter="formatTime"></el-table-column>
      <el-table-column label="入库审核时间"
                       align="center"
                       :width="global.tableValueWidth.tableTimeWidth" show-overflow-tooltip
                       prop="inStockCheckTime"
                       :formatter="formatTime"></el-table-column>
    </el-table>
    <pagination :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                class="text-right"
                @pagination="search" />
    <detailDialog :showDialog.sync="showDialog"
                  :orderInfor="orderInfor" />
  </div>
</template>

<script>
import { search, exportList } from "@/api/validReturn";
import { mapState } from "vuex";
import detailDialog from "./detail";
import AdminApi from "@/api/export";
export default {
  name: "orderList",
  data () {
    return {
      dataList: [],
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
  components: { detailDialog },
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
  height: calc(100vh - 84px);
  overflow: auto;
}
.create_box{
  background: #fff;
  padding: 10px;
  border-radius: 4px;
  .create_tit{
    font-size: 16px;
    line-height: 30px;
  }
  .create_item{
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 4px;
    background: #F7F8FA;
    min-width: 230px;
    margin-right: 10px;
    .left_img{
      width: 36px;
      height: 36px;
      margin-right: 10px;
    }
    .first_txt{
      color:#2B3F66;
      font-size: 14px;
    }
    .second_txt{
      color:#707E98;
      font-size: 12px;
      margin-top: 5px;
    }
  }
}

.refundStatus {
  color: #409eff;
  text-decoration: underline;
}
.refund_tab {
  height: auto;
  /deep/.el-tabs__content {
    height: auto;
  }
}
</style>
