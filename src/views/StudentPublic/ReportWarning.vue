//上报心理预警
<template>
  <div>
    <div
      class="view"
      id="reportwarning"
    >
      <div class="ReportWarningTitle">
        <h2>上报心理预警</h2>
      </div>

      <div class="ReportWarningText">
        <p>如发现其他同学有疑似心理异常行为，请积极上报老师，老师会及时为该同学进行心理疏导。</p>
      </div>

      <p style="margin: 40px 0px 10px 20px;color: gray;">请填写心理预警的学生信息</p>

      <div class="ReportWarningForm">
        <van-form @submit="reportwarningonSubmit">

          <div class="ReportWarningContent">
            <van-field
              v-model="stdname"
              name="stdname"
              label="姓名"
              placeholder="请输入姓名"
            />
            <van-field
              v-model="stdclass"
              name="stdclass"
              label="班级"
              placeholder="请输入班级"
            />
            <van-field
              v-model="stdno"
              name="stdno"
              label="学号"
              placeholder="请输入学号"
            />
            <van-field
              v-model="stdaction"
              name="stdaction"
              label="表现行为"
              placeholder="请输入表现行为"
            />
          </div>

          <div class="ReportWarningAnonymous">
            <p style="margin: 20px 0px 10px 40px;color: gray;">是否匿名
              <input
                type="checkbox"
                @click="hide"
              ></input>
            </p>
          </div>

          <div
            class="ReportWarningHidden"
            :style="{visibility:visible}"
          >
            <van-field
              disabled
              v-model="postername"
              name="postername"
              label="上报者姓名"
              :placeholder="postername"
            />
            <van-field
              v-model="phonenumber"
              name="phonenumber"
              label="手机号"
              placeholder="请输入手机号"
            />
          </div>

          <div class="ReportWarningButton">
            <van-button
              round
              block
              type="info"
              native-type="submit"
              style="background-color: #0ac485;height: 30px;"
            >提交
            </van-button>
          </div>
        </van-form>
      </div>

    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      stdname: "",
      stdclass: "",
      stdno: "",
      stdaction: "",
      postername: "",
      phonenumber: "",
      visible: "visible",
    };
  },
  mounted() {
    this.postername = this.$store.getters.getRealName;
  },
  methods: {
    async reportwarningonSubmit() {
      let checkStuUserName = new RegExp(/^\d{10}$/); //匹配十位数字 学生账号
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认提交？",
        })
        .then(() => {
          if (this.stdname == "") {
            this.$dialog.alert({
              title: "提示",
              message: "请输入上报对象姓名",
            });
            return;
          } else if (this.stdclass == "") {
            this.$dialog.alert({
              title: "提示",
              message: "请输入上报对象班级",
            });
            return;
          } else if (this.stdno == "") {
            this.$dialog.alert({
              title: "提示",
              message: "请输入上报对象学号",
            });
            return;
          } else if (this.stdaction == "") {
            this.$dialog.alert({
              title: "提示",
              message: "请输入上报对象表现行为",
            });
            return;
          } else if (checkStuUserName.test(this.stdno)) {
            this.$dialog.alert({
              title: "提示",
              message: "请输入正确的学号信息",
            });
            return;
          } else {
            if (this.visible == "visible") {
              if (this.phonenumber == "") {
                this.$dialog.alert({
                  title: "提示",
                  message: "请输入上报者手机号",
                });
                return;
              } else {
                var rsp = fetch(
                  "http://test.linlicheng.kooboo.site/reportwarning",
                  {
                    method: "post",
                    body: JSON.stringify({
                      stdname: this.stdname,
                      stdclass: this.stdclass,
                      stdno: this.stdno,
                      stdaction: this.stdaction,
                      postername: this.postername,
                      phonenumber: this.phonenumber,
                    }),
                  }
                );
              }
            } else if (this.visible == "hidden") {
              var rsp = fetch(
                "http://test.linlicheng.kooboo.site/reportwarning",
                {
                  method: "post",
                  body: JSON.stringify({
                    stdname: this.stdname,
                    stdclass: this.stdclass,
                    stdno: this.stdno,
                    stdaction: this.stdaction,
                    postername: "",
                    phonenumber: "",
                  }),
                }
              );
            }
            this.$dialog.alert({
              title: "提示",
              message: "提交成功！",
            });
            this.stdname = "";
            this.stdclass = "";
            this.stdno = "";
            this.stdaction = "";
            this.phonenumber = "";
          }
        })
        .catch(() => {});
    },
    hide() {
      if (event.target.checked) {
        this.visible = "hidden";
      } else {
        this.visible = "visible";
      }
    },
  },
};
</script>

<style>
.ReportWarningTitle {
  color: gray;
  text-align: center;
  margin-top: 30px;
}

.ReportWarningText {
  font-size: 10px;
  line-height: 20px;
  margin: 20px;
  color: gray;
}

#reportwarning .van-cell__title {
  flex: 0.5;
}

.ReportWarningContent {
  margin-top: 30px;
  margin: 20px;
  border: solid 1px rgb(196, 196, 196);
  border-radius: 5px;
  padding: 10px;
}

.ReportWarningHidden {
  margin: 20px 20px 20px 30px;
}

.ReportWarningButton {
  margin: 0px 0px 40px 40px;
  width: 80%;
}
</style>