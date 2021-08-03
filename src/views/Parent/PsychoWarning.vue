//学生心理预警
<template>
  <div>
    <div class="view">
      <div class="PsychoWarningTitle">
        <h2>心理预警</h2>
      </div>
      <div class="PsychoWarningContent">
        <div
          class="PsychoWarningList"
          v-for="(item,index) in list"
        >
          <div class="PsychoWarningItem">
            <van-icon
              name="warning-o"
              size='30'
              style="margin-right: 10px;"
            />
            <van-cell @click="showPopup(index)">心理预警{{index+1}}
              <h5>{{item.time}}</h5>
            </van-cell>
            <van-button
              @click="removeItem(item._id,index)"
              icon="delete"
              type="danger"
              size="small"
              style="border-radius:100%;margin-right: 20px;"
            ></van-button>
            <van-popup
              v-model="showlist[index]"
              class="PsychoWarningPopMessage"
            >
              <h4 style="text-align: center;margin-bottom: 30px">心理异常预警</h4>
              {{item.content}}
            </van-popup>
          </div>
          <div class="Decline"></div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { getPsychoWarninglist } from "../../network/requestMethods";
import { psychoWarningRemove } from "../../network/requestMethods";
export default {
  data() {
    return {
      showlist: [],
      list: [
        {
          time: "",
          content: "",
        },
      ],
    };
  },
  created() {
    getPsychoWarninglist().then((res) => {
      this.list = res.data;
      for (let i = 0; i < this.list.length; i++) {
        this.showlist[i] = false;
      }
    });
  },
  methods: {
    showPopup(index) {
      this.$set(this.showlist, index, true);
    },
    // async getpsychowarninglist(){
    //   var rsp=await fetch('http://test.linlicheng.kooboo.site/psychowarning',
    //   {
    //     method:"get"
    //   });
    //   this.list=await rsp.json();
    //   for(var i=0;i<this.list.length;i++){
    //     this.showlist[i]=false
    //   }
    // },

    removeItem(id, index) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认删除？",
        })
        .then(() => {
          psychoWarningRemove(id);
          this.list.splice(index, 1);
        })
        .catch(() => {});
    },
  },
};
</script>

<style>
.PsychoWarningTitle {
  color: gray;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
.PsychoWarningList {
  margin: 0px 0px 0px 30px;
  color: gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.PsychoWarningItem {
  display: flex;
  align-items: center;
}
.PsychoWarningPopMessage {
  height: 50%;
  width: 70%;
  padding: 30px;
  font-size: 18px;
}

.Decline {
  border: solid 1px rgb(194, 194, 194);
  width: 90%;
}
</style>