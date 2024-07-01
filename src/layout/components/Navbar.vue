<template>
  <div class="navbar">
<!--    <hamburger-->
<!--      id="hamburger-container"-->
<!--      :is-active="sidebar.opened"-->
<!--      class="hamburger-container"-->
<!--      @toggleClick="toggleSideBar"-->
<!--    />-->

<!--    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />-->
    <el-input prefix-icon="el-icon-search" class="search_top" v-model="searchText" placeholder="搜索我的档名"></el-input>
    <div class="right-menu">
      <el-button type="primary" @click="dialogFormVisible = true" v-show="!loginStatus">登录/注册</el-button>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect" trigger="click" v-show="loginStatus">
        <div class="avatar-wrapper">
          <img :src="headImg" class="user-avatar" /><i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="top_account">
          <div class="flex top_info">
            <div class="flex_hd"> <img :src="headImg" class="user-avatar" /></div>
            <div class="flex_bd">
              <p>风清扬007</p>
              <p>ID:332329</p>
            </div>
          </div>
          <router-link to="/account/index">
            <el-dropdown-item>账户设置</el-dropdown-item>
          </router-link>
          <router-link to="/account/index">
            <el-dropdown-item>订单管理</el-dropdown-item>
          </router-link>
          <!--          <router-link to="/">-->
          <!--            <el-dropdown-item>Dashboard</el-dropdown-item>-->
          <!--          </router-link>-->
          <!--          <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">-->
          <!--            <el-dropdown-item>Github</el-dropdown-item>-->
          <!--          </a>-->
          <!--          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">-->
          <!--            <el-dropdown-item>Docs</el-dropdown-item>-->
          <!--          </a>-->
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退 出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog :title="textMap[dialogStatus]" width="900px" :close-on-click-modal="false" :visible.sync="dialogFormVisible" class="login_dialog" append-to-body>
      <i class="el-icon-circle-close login_close" @click="dialogFormVisible = false"></i>
      <div class="flex">
        <div class="left_img">
          <div class="left_logo"><img src="./../../assets/image/logo.png"/></div>
          <p class="left_txt_one">AI创作、AI绘画</p>
          <p class="left_txt_two">一键生成营销文章、小红书体文章、短文、小说</p>
        </div>
        <div class="right_form">
          <el-form ref="dataForm" class="login_form" :rules="rules" :model="passwordTemp" style="width: 400px; " :hide-required-asterisk="true" v-if="dialogStatus != 'weixin'">
            <p class="login_tit">手机号登录/注册</p>
            <el-form-item label=" " prop="mobile">
              <el-input v-model="passwordTemp.mobile" prefix="+86" size="medium" placeholder="请输入手机号" type="number" autocomplete="off">
                <template slot="prepend">+86</template>
              </el-input>
            </el-form-item>
            <el-form-item label=" " prop="verifyCode" class="get_code">
              <el-input size="medium" v-model="passwordTemp.verifyCode" placeholder="请输入验证码" type="number" autocomplete="off"/>
              <el-button type="primary" class="code_btn" @click="getCode" :disabled="disabled">{{codeTxt}}</el-button>
            </el-form-item>
            <el-button type="primary" class="login_btn" @click="updateData()">立即注册/登录</el-button>
          </el-form>
          <div v-if="dialogStatus == 'weixin'">
            <div class="login_erm">
              <img src="https://img1.baidu.com/it/u=3685234108,954911792&fm=253&fmt=auto&app=138&f=GIF?w=200&h=200"/>
              <div class="login_ewm_expire" v-show="expire == true" @click="handleEWM">
                <i class="el-icon-refresh-right"></i>
                <p>二维码已过期，点击刷新</p>
              </div>
            </div>
            <p class="f20 text-center">微信扫码安全登录</p>
          </div>
          <p class="login_txt">登录即表示阅读并同意，<a href="#">《服务协议》</a></p>
          <span class="login_mode" v-show="dialogStatus != 'weixin'" @click="dialogStatus='weixin'">微信登录</span>
          <span class="login_mode" v-show="dialogStatus == 'weixin'" @click="dialogStatus='mobile'">手机登录</span>
<!--          <div slot="footer" class="dialog-footer" v-if="dialogStatus != 'updatePassword'">-->
<!--            <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--            <el-button type="primary" @click="updateData()">确 定</el-button>-->
<!--          </div>-->
        </div>

      </div>



    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import ErrorLog from "@/components/ErrorLog";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import Search from "@/components/HeaderSearch";
import headImg from "@/assets/headImg/img.png";
import {
  getToken,
  setToken,
  removeToken,
  getId,
  setId,
  removeId,
  getName,
  setName,
  removeName,
  getMobile,
} from "@/utils/auth";
import { validUsername, validatePhone, isPassword } from "@/utils/validate";
import { updatePassword } from "@/api/user";
import { getSmsCode } from "@/api/code";
export default {
  data() {
    return {
      loginStatus:false,
      expire:false,
      headImg: headImg,
      systemDate: "",
      name: getName() != "null" ? getName() : "",
      nowDate: "",
      dialogFormVisible: false,
      textMap: {
        update: "修改密码",
      },
      dialogStatus: "weixin",
      temp: {
        oldPassword: "",
      },
      rules: {
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { validator: isPassword },
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "change" },
          { validator: validatePhone },
        ],
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "change" },
        ],
        confirmPassword: [
          { required: true, message: "请再次输入密码", trigger: "change" },
          { validator: isPassword },
        ],
      },
      passwordTemp: {
        confirmPassword: "",
        mobile: getMobile(),
        password: "",
        verifyCode: "",
      },
      codeTxt: "获取验证码",
      disabled: false,
      searchText:'',
    };
  },
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search,
  },
  computed: {
    ...mapState({
      roles: (state) => state.user.roles,
    }),
    ...mapGetters(["sidebar", "avatar", "device"]),
  },
  methods: {
    handleEWM(){
      this.expire = false;
    },
    getRule() {
      this.$router.push({ path: "/rule" });
    },
    resetPasswordTemp() {
      this.passwordTemp = {
        confirmPassword: "",
        mobile: getMobile(),
        password: "",
        verifyCode: "",
      };
    },
    getCode() {
      if (this.passwordTemp.mobile != "") {
        getSmsCode({ mobile: this.passwordTemp.mobile }).then((res) => {
          // this.publishOption = res.data
          // if(res.resp_code == 0){
          this.countdown2(this);
          // }
        });
      } else {
        this.$confirm("请输入手机号码", "提示", {
          type: "warning",
          showCancelButton: false,
        })
          .then(() => {})
          .catch(() => {});
      }
    },
    countdown2(that) {
      let setTime = 60;
      let time = setTime;
      let codeTxt = "获取验证码";
      return (function timeFn(o) {
        if (time == 0) {
          that.codeTxt = codeTxt;
          that.disabled = false;
          time = setTime;
        } else {
          that.codeTxt = time + "s重试";
          that.disabled = true;
          time--;
          setTimeout(function () {
            timeFn(o);
          }, 1000);
        }
        if (that.dialogFormVisible == false) {
          time = 0;
        }
      })();
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    updatePassword() {
      this.resetPasswordTemp();
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.loginStatus = true;
      this.dialogFormVisible = false;
      // this.$refs["dataForm"].validate((valid) => {
      //   if (valid) {
      //     updatePassword(this.passwordTemp).then((res) => {
      //       if (res.resp_code == 0) {
      //         this.dialogFormVisible = false;
      //         this.$message({
      //           message: "密码重置成功",
      //           type: "success",
      //         });
      //       }
      //     });
      //   }
      // });
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push(`/login?redirect=/dashboard`);
    },
    // addDate() {
    //   let nowDate = new Date();
    //   this.nowDate = new Date();
    //   let date = {
    //     year: nowDate.getFullYear(),
    //     month: nowDate.getMonth() + 1,
    //     date: nowDate.getDate(),
    //   };
    //   if(date.month<10 && date.date<10){
    //     this.systemDate = date.year + '-' + 0 + date.month + '-' + 0 + date.date;
    //   }else if(date.month<10 && date.date>10){
    //     this.systemDate = date.year + '-' + 0 + date.month + '-' + date.date;
    //   }else if(date.month>10 && date.date<10){
    //     this.systemDate = date.year + '-' + date.month + '-' + 0 + date.date;
    //   }else {
    //     this.systemDate = date.year + '-' + date.month + '-' + date.date;
    //   }
    // }
  },
  mounted() {
    // this.addDate();
  },
};
</script>

<style lang="scss" scoped>
  .top_account{
    .top_info{
      align-items: center;
      padding: 15px;
      img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }
      p{
        &:nth-child(1){
          font-size: 14px;
          color: #2B3F66;
        }
        &:nth-child(2){
          font-size: 12px;
          color: #AFB7C7;
          margin-top: 6px;
        }
      }
    }
  }
  .login_dialog{
    /*position: relative;*/
    /deep/.el-dialog__header{
      display: none;
    }
    /deep/.el-dialog__body{
      padding: 0;
    }
    .login_close{
      font-size: 20px;
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 99;
      cursor: pointer;
    }
  }
  .left_img{
    min-width: 50%;
    height: 460px;
    background: url("./../../assets/image/login_img01.png") no-repeat 100% 100%;
    padding: 40px 0 0 50px;
    .left_logo{
      width: 130px;
      margin-bottom: 20px;
    }
    .left_txt_one{
      color: #000;
      font-size: 30px;
      font-weight: 500;
    }
    .left_txt_two{
      color: #636363;
      font-size: 16px;
      font-weight: 500;
      line-height: 3;
    }
  }
  .right_form{
    margin-left: 20px;
    width: 400px;
    .login_form{
      /deep/.el-input__inner{
        height: 50px;
        line-height: 50px;
      }
    }
  }
  .login_erm{
    position: relative;
    width: 205px;
    height: 205px;
    border-radius: 10px;
    border: 1px solid #E2E2E2;
    margin: 53px auto 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 180px;
      height: 180px;

    }
    .login_ewm_expire{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(255,255,255,.9);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      i{
        font-size: 40px;
        color:#3370FF;
        font-weight: bold;
        display: block;
        margin-bottom: 10px;
      }
      p{
        color: #3D3D3D;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
  .login_tit{
    font-size: 20px;
    font-weight: 500;
    line-height: 2;
    text-align: center;
    margin: 50px 0 25px;
  }
  .code_btn{
    background: transparent;
    border: none;
    color: #009CFF;
  }
  .login_txt{
    text-align: center;
    margin: 10px 0 50px;
    color: #999;
    a{
      color: #3971E8;
    }
  }
  .login_mode{
    background: #F3F3F3;
    border-radius: 4px;
    width: 197px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    display: block;
    margin: 0 auto;
    cursor: pointer;
  }
.get_code {
  position: relative;

  button {
    position: absolute;
    top: 0;
    right: 0;
    height: 32px;
    line-height: 32px;
  }
}
.login_btn{
  width: 100%;
  height: 50px;
  margin-top: 10px;
}
.navbar {
  height: 56px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  /*display: flex;*/
  /*align-items: center;*/
  padding: 0 10px;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .date {
    font-size: 20px;
    font-weight: 500;
    line-height: 50px;
    display: inline-block;
    height: 100%;
    float: left;
    margin-right: 20px;
  }
  .search_top{
    width: 300px;
    line-height: 56px;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 56px;
    width: 100px;

    &:focus {
      outline: none;
    }

    .el-input{
      width: 300px;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        /*margin-top: 5px;*/
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          // border-radius: 10px;
          margin-top: 5px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}
.cursor {
  cursor: pointer;
}
.el-icon-question {
  color: #999;
  margin-right: 6px;
}
</style>
