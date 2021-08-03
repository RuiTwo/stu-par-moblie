//修改密码
<template>
  <div>
    <div class="view">
      <div class="AlterPwdTitle">
        <h2>修改密码</h2>
      </div>

      <div class="AlterPwdForm">
        <van-form @submit="onSubmit">
          <van-field
            v-model="old_password"
            name="old_password"
            label="旧密码"
            placeholder="旧密码"
            :rules="[{ required: true, message: '请填写旧密码' }]"
            left-icon="coupon-o"
            :error-message=oldError
          />
          <van-field
            v-model="new_password"
            type="password"
            name="new_password"
            label="新密码"
            placeholder="新密码"
            :rules="[{ required: true, message: '请填写新密码' }]"
            left-icon="coupon-o"
            :error-message = newError
          />
          <van-field
            v-model="check_password"
            type="password"
            name="new_password"
            label="确认密码"
            placeholder="确认密码"
            :rules="[{ required: true, message: '请再次填写新密码' }]"
            left-icon="coupon-o"
            :error-message=checkError
          />
          <div style="margin: 16px;">
            <van-button
              round
              block
              type="info"
              native-type="submit"
              style="background-color: #0ac485;height: 30px;"
            >提交</van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>

</template>

<script>
import { Dialog } from "vant";
import { isStdLogin } from "../../network/requestMethods";
import { isParentLogin } from "../../network/requestMethods";
import { alterPwd } from "../../network/requestMethods";
import { alterParPwd } from "../../network/requestMethods";
import { alterStuPwd } from "../../network/requestMethods";
export default {
  data() {
    return {
      oldError: "",
      newError: "",
      checkError: "",
      old_password: "",
      new_password: "",
      check_password: "",
      oldPwdright: false,
    };
  },
  methods: {
    clearPwdInput() {
      this.old_password = "";
      this.new_password = "";
      this.check_password = "";
      this.oldError = "";
    },
    onSubmit(values) {
      console.log("submit", values);
      let username = this.$store.getters.getUserName;
      let checkParUserName = new RegExp(/^p\d{10}$/); //匹配以p开头的十一位数字 家长账号
      let checkStuUserName = new RegExp(/^\d{10}$/); //匹配十位数字 学生账号
      let password = this.$store.getters.getPwd;
      if (checkParUserName.test(username)) {
        //判断当前用户是家长还是学生
        isParentLogin(username, this.old_password).then((res) => {
          if (res.data.length == 0) {
            this.oldError = "旧密码输入错误";
          } else {
            if (this.new_password != this.check_password) {
              this.newError = "两次密码输入不一致";
              this.clearPwdInput();
            } else {
              Dialog.confirm({
                title: "提示",
                message: "您确认修改密码吗",
              }).then(() => {
                alterParPwd(username, this.new_password).then(() => {
                  this.$store.dispatch("setPwdAsy", this.new_password);
                  console.log(localStorage.getItem("password"));
                  this.clearPwdInput();
                  Dialog.alert({
                    message: "密码修改成功",
                  }).then(() => {
                    this.$router.go(-1);
                  });
                });
              });
            }
          }
        });
      } else {
        isStdLogin(username, this.old_password).then((res) => {
          if (res.data.length == 0) {
            this.oldError = "旧密码输入错误";
          } else {
            if (this.new_password != this.check_password) {
              this.newError = "两次密码输入不一致";
              this.clearPwdInput();
            } else {
              Dialog.confirm({
                title: "提示",
                message: "您确认修改密码吗",
              }).then(() => {
                alterStuPwd(username, this.new_password).then(() => {
                  this.$store.dispatch("setPwdAsy", this.new_password);
                  console.log(localStorage.getItem("password"));
                  this.clearPwdInput();
                  Dialog.alert({
                    message: "密码修改成功",
                  }).then(() => {
                    this.$router.go(-1);
                  });
                });
              });
            }
          }
        });
      }
    },
  },
};
</script>

<style>
.AlterPwdTitle {
  color: #0ac485;
  text-align: center;
  margin-top: 30px;
}
.AlterPwdForm {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>