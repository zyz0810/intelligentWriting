<template>
  <div class="dashboard-editor-container">
    <!--    <github-corner class="github-corner" />-->

    <h1 class=" mt_20">待办事项</h1>

    <div class="mt_20 flex box">
      <div class="do_item flex-item">
        <p class="title f18 bold">供应商</p>
        <el-divider></el-divider>
        <ul class="content f16">
          <li>认证待审核 <router-link :to="{name:'tenantList',query:{status:'PENDING_REVIEW'}}" class="ml_10" :class="[info.supplierPendingReviewAuditCount>0?'red01':'green01']">{{info.supplierPendingReviewAuditCount}}</router-link></li>
          <li>缴费待审核 <router-link :to="{name:'tenantList',query:{status:'PAYMENT_REVIEW'}}" class="ml_10" :class="[info.supplierPaymentReviewAuditCount>0?'red01':'green01']">{{info.supplierPaymentReviewAuditCount}}</router-link></li>
          <li>商品待审核 <router-link :to="{name:'productList',query:{result:'2'}}" class="ml_10" :class="[info.supplierProductToAuditCount>0?'red01':'green01']">{{info.supplierProductToAuditCount}}</router-link></li>
          <li>服务商品待审核 <router-link :to="{name:'auditList',query:{checkStatus:'1'}}" class="ml_10" :class="[info.supplierOperatorProductToAuditCount>0?'red01':'green01']">{{info.supplierOperatorProductToAuditCount}}</router-link></li>
          <li>推广商品待审核 <router-link :to="{name:'promotionList',query:{approveResult:'1'}}" class="ml_10" :class="[info.supplierPromotionProductToAuditCount>0?'red01':'green01']">{{info.supplierPromotionProductToAuditCount}}</router-link></li>
        </ul>
      </div>
      <div class="do_item flex-item">
        <p class="title f18 bold">服务商</p>
        <el-divider></el-divider>
        <ul class="content f16">
          <li>认证待审核 <router-link :to="{name:'providerList',query:{providerStatus:'REGISTER'}}" class="ml_10" :class="[info.providerInformationToAuditCount>0?'red01':'green01']">{{info.providerInformationToAuditCount}}</router-link></li>
          <li>缴费待审核 <router-link :to="{name:'providerList',query:{providerStatus:'PAYMENT_REVIEWED'}}" class="ml_10" :class="[info.providerPaymentReviewedToAuditCount>0?'red01':'green01']">{{info.providerPaymentReviewedToAuditCount}}</router-link></li>
          <li>商品待审核 <router-link :to="{name:'productExam',query:{checkStatus:'1'}}" class="ml_10" :class="[info.providerProductToAuditCount>0?'red01':'green01']">{{info.providerProductToAuditCount}}</router-link></li>
        </ul>
      </div>
      <div class="do_item flex-item">
        <p class="title f18 bold">客户</p>
        <el-divider></el-divider>
        <ul class="content f16">
          <li>一级待审核 <router-link :to="{name:'oneList'}" class="ml_10" :class="[info.customerOneLevelAuditCount>0?'red01':'green01']">{{info.customerOneLevelAuditCount}}</router-link></li>
          <li>二级待审核 <router-link :to="{name:'twoList'}" class="ml_10" :class="[info.customerTwoLevelAuditCount>0?'red01':'green01']">{{info.customerTwoLevelAuditCount}}</router-link></li>
          <li>三级待审核 <router-link :to="{name:'threeList'}" class="ml_10" :class="[info.customerThreeLevelAuditCount>0?'red01':'green01']">{{info.customerThreeLevelAuditCount}}</router-link></li>
        </ul>
      </div>
      <div class="do_item flex-item">
        <p class="title f18 bold">活动</p>
        <el-divider></el-divider>
        <ul class="content f16">
          <li>秒杀商品审核 <router-link :to="{name:'secondSkillExam',query:{activeTab:'product',signUpStatus:'0'}}" class="ml_10" :class="[info.seckillProductToAuditCount>0?'red01':'green01']">{{info.seckillProductToAuditCount}}</router-link></li>
          <li>秒杀缴费审核 <router-link :to="{name:'secondSkillExam',query:{activeTab:'money',signUpStatus:'3'}}" class="ml_10" :class="[info.seckillPaymentToAuditCount>0?'red01':'green01']">{{info.seckillPaymentToAuditCount}}</router-link></li>
          <li>特价商品审核 <router-link :to="{name:'todaySpecialExam',query:{activeTab:'product',signUpStatus:'0'}}" class="ml_10" :class="[info.dailyProductToAuditCount>0?'red01':'green01']">{{info.dailyProductToAuditCount}}</router-link></li>
          <li>特价缴费审核 <router-link :to="{name:'todaySpecialExam',query:{activeTab:'money',signUpStatus:'3'}}" class="ml_10" :class="[info.dailyPaymentToAuditCount>0?'red01':'green01']">{{info.dailyPaymentToAuditCount}}</router-link></li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  import CountTo from 'vue-count-to'
  import PanelGroup from './components/PanelGroup'
  import PieChart from '@/components/Charts/PieChartTwo'
  import BarChartThree from '@/components/Charts/BarChartThree'
  import {getStatistics} from "@/api/task";

  export default {
    name: 'DashboardAdmin',
    components: {
      CountTo,
      PanelGroup,
      PieChart,
      BarChartThree,
    },
    data() {
      return {
        info:{}

      }
    },
    mounted() {
      this.getStatistics();
    },
    methods: {
      getStatistics(){
        getStatistics().then((res) => {
          this.info = res.data;

        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    height: calc(100vh - 84px);
    padding: 20px;
    /*background-color: rgb(240, 242, 245);*/
    /*width: 90%;*/
    margin: 0 auto;
    /*background: url("./../../../assets/image/index.jpg") no-repeat;*/
    /*background-size: 100%;*/
    /*background-position: center;*/
    position: relative;
    overflow: auto;
    /*img{*/
    /*  width: 100%;*/
    /*  height: 100%;*/
    /*}*/
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
    .box{
      align-items: stretch;
      .do_item{
        background: #fff;
        border-radius: 10px;

        &:not(:first-child){
          margin-left: 10px;
        }
        .title{
          padding: 20px 20px 0;
        }
        .content{
          line-height: 2.5;
          padding: 0 20px 50px;
        }

      }
    }

  }


  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }


  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
      padding-left: 10px !important;
      padding-right: 10px !important;
    }

    .card-panel {
      height: 125px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-people {
          background: #40c9c6;
        }

        .icon-message {
          background: #36a3f7;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-shopping {
          background: #34bfa3
        }
      }

      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .iconfont {
        float: left;
        font-size: 58px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width:550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }

</style>
