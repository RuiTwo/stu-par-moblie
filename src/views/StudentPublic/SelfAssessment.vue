//自我评价
<template>
  <div>
    <div class="view">
      <div class="SelfAssessmentTitle">
        <h2>自我评价</h2>
      </div>

      <div class="SelfAssessmentForm">
        <van-form @submit="selfassessmentonSubmit">
          <van-field
            v-model="character"
            name="character"
            label="性格类型"
            placeholder="请输入性格类型"
          />
          <van-field
            v-model="interest"
            name="interest"
            label="兴趣爱好"
            placeholder="请输入兴趣爱好"
          />
          <van-field
            v-model="specialty"
            name="specialty"
            label="特长"
            placeholder="请输入特长"
          />
          <div style="margin: 16px;">
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
import { Dialog } from "vant";
export default {
  data() {
    return {
      character: "",
      interest: "",
      specialty: "",
    };
  },
  methods: {
    async selfassessmentonSubmit() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认提交？",
        })
        .then(() => {
          if (this.character == "") {
            this.$dialog.alert({
              title: "提示",
              message: "请输入性格类型",
            });
            return;
          } else if (this.interest == "") {
            this.$dialog.alert({
              title: "提示",
              message: "请输入兴趣爱好",
            });
            return;
          } else if (this.specialty == "") {
            this.$dialog.alert({
              title: "提示",
              message: "请输入特长",
            });
            return;
          } else {
            var rsp = fetch(
              "http://test.linlicheng.kooboo.site/selfassessment",
              {
                method: "post",
                body: JSON.stringify({
                  character: this.character,
                  interest: this.interest,
                  specialty: this.specialty,
                  stuId: this.$store.getters.getUserName,
                }),
              }
            );
            this.$dialog.alert({
              title: "提示",
              message: "提交成功！",
            });
            this.character = "";
            this.interest = "";
            this.specialty = "";
          }
        })
        .catch(() => {});
    },
  },
};
</script>

<style>
.SelfAssessmentTitle {
  color: gray;
  text-align: center;
  margin-top: 30px;
}

.SelfAssessmentForm {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>