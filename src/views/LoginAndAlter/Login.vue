//登录页面
<template>
  <div>
    <mobile-header></mobile-header>
    <div class="view">
      <div class="LoginTitle">
        <h3>学生/家长登录</h3>
      </div>

      <div class="LoginForm">
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="用户名"
            :error-message="errorName"
            :rules="[{ required: true, message: '请填写用户名' }]"
            left-icon="user-circle-o"
            @input="removeError"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :error-message="errorPwd"
            :rules="[{ required: true, message: '请填写密码' }]"
            left-icon="coupon-o"
            @input="removeError"
          />
          <div style="margin: 4vh;">
            <van-button
              round
              block
              type="info"
              native-type="submit"
              style="background-color: #0ac485;height: 5vh;"
            >登录</van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>

</template>

<script>
import MobileHeader from "../../components/MobileHeader.vue";
import { isStdLogin } from "../../network/requestMethods";
import { isParentLogin } from "../../network/requestMethods";

export default {
  components: { MobileHeader },
  data() {
    return {
      username: "",
      password: "",
      errorName: " ",
      errorPwd: " ",
      isRightUser: false,
    };
  },
  methods: {
    clearInput() {
      this.username = "";
      this.password = "";
      this.errorName = "";
      this.errorPwd = "";
    },
    onSubmit(values) {
      let checkParUserName = new RegExp(/^p\d{10}$/); //匹配以p开头的十一位数字 家长账号
      let checkStuUserName = new RegExp(/^\d{10}$/); //匹配十位数字 学生账号
      if (checkParUserName.test(values.username)) {
        isParentLogin(values.username, values.password).then((res) => {
          if (res.data.length > 0) {
            console.log(res.data);
            this.$router.push({
              path: "/parhome",
              query: {
                username: values.username,
              },
            });
            this.$store.dispatch("setRealNameAsy", res.data[0].nameOfParents);
            this.$store.dispatch("setNameAsy", values.username);
            this.$store.dispatch("setPwdAsy", values.password);
            this.$store.dispatch('setChildIdAsy',res.data[0].childId)
            this.clearInput();
          } else {
            this.errorName = "用户名或密码错误";
            this.clearInput();
          }
        });
      } else {
        if (checkStuUserName.test(values.username)) {
          //初步判断是否是学生账号格式
          isStdLogin(values.username, values.password).then((res) => {
            if (res.data.length > 0) {
              //判断账号密码是否正确
              let isCommittee = res.data[0].isCommittee == 1;
              this.$store.dispatch("setIsCommiteeAsy", isCommittee);

              if (this.$store.getters.getIsCommitee) {
                this.$router.push({
                  path: "/stdcomhome",
                  query: {
                    username: values.username,
                  },
                });
              } else {
                this.$router.push({
                  path: "/stdhome",
                  query: {
                    username: values.username,
                  },
                });
              }
              console.log(res.data);

              this.$store.dispatch("setNameAsy", values.username);
              this.$store.dispatch("setPwdAsy", values.password);
              this.$store.dispatch("setRealNameAsy", res.data[0].stuName);
              this.clearInput();
            } else {
              this.errorName = "用户名或密码错误";
            }
          });
        } else {
          //账号格式既不是家长又不是学生
          this.errorName = "用户名错误";
        }
      }
    },
    removeError() {
      this.errorName = "";
      this.errorPwd = "";
    },
  },
  created() {},
};
</script>
<style>
.LoginTitle {
  color: #0ac485;
  text-align: center;
  margin-top: 6vh;
}
.LoginForm {
  margin-top: 6vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
