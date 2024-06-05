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

      <el-button type="primary">登录/注册</el-button>
<!--      <el-dropdown-->
<!--        class="avatar-container right-menu-item hover-effect"-->
<!--        trigger="click"-->
<!--      >-->
<!--        <div class="avatar-wrapper">-->
<!--          &lt;!&ndash;<img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">&ndash;&gt;-->
<!--          <img :src="headImg" class="user-avatar" />-->
<!--          <span style="float: right; margin: 0 5px; font-size: 14px">{{-->
<!--            name-->
<!--          }}</span>-->
<!--          <i class="el-icon-caret-bottom" />-->
<!--        </div>-->
<!--        <el-dropdown-menu slot="dropdown" class="text-center">-->
<!--          &lt;!&ndash;          <router-link to="/profile/index">&ndash;&gt;-->
<!--          &lt;!&ndash;            <el-dropdown-item>Profile</el-dropdown-item>&ndash;&gt;-->
<!--          &lt;!&ndash;          </router-link>&ndash;&gt;-->
<!--          &lt;!&ndash;          <router-link to="/">&ndash;&gt;-->
<!--          &lt;!&ndash;            <el-dropdown-item>Dashboard</el-dropdown-item>&ndash;&gt;-->
<!--          &lt;!&ndash;          </router-link>&ndash;&gt;-->
<!--          &lt;!&ndash;          <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">&ndash;&gt;-->
<!--          &lt;!&ndash;            <el-dropdown-item>Github</el-dropdown-item>&ndash;&gt;-->
<!--          &lt;!&ndash;          </a>&ndash;&gt;-->
<!--          &lt;!&ndash;          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">&ndash;&gt;-->
<!--          &lt;!&ndash;            <el-dropdown-item>Docs</el-dropdown-item>&ndash;&gt;-->
<!--          &lt;!&ndash;          </a>&ndash;&gt;-->
<!--          <el-dropdown-item divided @click.native="updatePassword">-->
<!--            <span style="display: block">修改密码</span>-->
<!--          </el-dropdown-item>-->
<!--          <el-dropdown-item divided @click.native="logout">-->
<!--            <span style="display: block">退 出</span>-->
<!--          </el-dropdown-item>-->
<!--        </el-dropdown-menu>-->
<!--      </el-dropdown>-->
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="passwordTemp"
        label-width="120px"
        style="width: 400px; margin-left: 50px"
        v-if="dialogStatus != 'updatePassword'"
      >
        <el-form-item label="手机号" prop="mobile">
          <el-input
            v-model="passwordTemp.mobile"
            placeholder="请输入手机号"
            type="number"
            autocomplete="off"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item label="验证码" prop="verifyCode" class="get_code">
          <el-input
            v-model="passwordTemp.verifyCode"
            placeholder="请输入验证码"
            type="number"
            autocomplete="off"
          />
          <el-button type="primary" @click="getCode" :disabled="disabled">{{
            codeTxt
          }}</el-button>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input
            v-model="passwordTemp.password"
            placeholder="请输入新密码"
            type="password"
            minlength="6"
            maxlength="16"
            :show-password="true"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="passwordTemp.confirmPassword"
            placeholder="请再次输入密码"
            type="password"
            minlength="6"
            maxlength="16"
            :show-password="true"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
        v-if="dialogStatus != 'updatePassword'"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateData()">确 定</el-button>
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
      headImg: headImg,
      systemDate: "",
      name: getName() != "null" ? getName() : "",
      nowDate: "",
      dialogFormVisible: false,
      textMap: {
        update: "修改密码",
      },
      dialogStatus: "",
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
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          updatePassword(this.passwordTemp).then((res) => {
            if (res.resp_code == 0) {
              this.dialogFormVisible = false;
              this.$message({
                message: "密码重置成功",
                type: "success",
              });
            }
          });
        }
      });
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
.get_code {
  position: relative;
  button {
    position: absolute;
    top: 0;
    right: 0;
  }
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
