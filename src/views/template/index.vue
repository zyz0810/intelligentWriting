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
    <div class="template_box">
      <div class="template_tit">
        <span class="f16">从AI模板创建</span>
        <ul class="template_tab">
          <li @click="templateTabIndex = item.id" :class="[templateTabIndex == item.id ? 'active':'']" v-for="(item,index) in templateTab" :key="'template_tab'+item">
            {{item.name}}</li>
        </ul>
        <el-input class="template_search"
          placeholder="搜索AI模板"
          prefix-icon="el-icon-search"
          v-model="templateSearch">
        </el-input>
      </div>
      <div class="template_cont">
        <div class="template_item" v-for="(item,index) in templateList" :key="'templateList'+index">
          <div class="template_item_first">
            <div class="template_item_first_left"><img src="./../../assets/image/yellow.png" /></div>
            <div class="template_item_first_middle">智能写作</div>
            <div class="template_item_first_right"><i class="el-icon-star-on f20"></i></div>
          </div>
          <div class="template_item_second">当你不知道用什么，试试这个</div>
          <div class="template_item_third"><span class="bg_primary">使用</span></div>
        </div>
      </div>
    </div>
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
      templateTab:[{
        id:0,
        name:'我的收藏'
      },{
        id:1,
        name:'AI模板'
      },{
        id:2,
        name:'媒体写作'
      },{
        id:3,
        name:'短视频'
      },{
        id:4,
        name:'学校教育'
      },{
        id:5,
        name:'电商'
      }],
      templateTabIndex:0,
      templateList:[{id:0},{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14},{id:15}],
      templateSearch:'',
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
    cursor: pointer;
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
.template_box{
  margin: 20px 0;
  .template_tit{
    padding-left: 10px;
    display: flex;
    align-items: center;
    margin: 10px 0 5px;
  }
  .template_search{
    width: 226px;
  }
  .template_tab{
    margin-left: 20px;
    display: flex;
    align-items: center;
    flex: 1;
    li{
      cursor: pointer;
      display: inline-block;
      padding: 0 6px;
      margin-right: 5px;
      line-height: 24px;
      border-radius: 4px;
      &.active{
        background: #fff;
      }
    }
  }
  .template_cont{
    display: flex;
    flex-wrap: wrap;
    flex-shrink: 0;
  }
  .template_item{
    cursor: pointer;
    padding: 10px;
    margin: 5px 10px 5px 0;
    border-radius: 4px;
    width: calc(25% - 8.4px);
    background: #fff;
    &:nth-child(4n){
      margin: 5px 0 5px 0;
    }
    .template_item_first{
      display: flex;
      align-items: center;
      .template_item_first_left{
        width: 14px;
        margin-right: 5px;
        img{
          width: 14px;
          height: 14px;
        }
      }
      .template_item_first_middle{
        font-size: 14px;
        flex: 1;
      }
      .template_item_first_right{
        width: 30px;
        text-align: right;
        color: #E7E7E7;
      }
    }
    .template_item_second{
      font-size: 12px;
      color: #707E98;
      margin-top: 10px;
      height: 3em;
    }
    .template_item_third{
      text-align: right;
      span{
        display: inline-block;
        padding: 0 13px;
        color: #fff;
        font-size: 12px;
        line-height: 24px;
        border-radius: 30px;
        /*background: #2CB1B1;*/
      }
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
