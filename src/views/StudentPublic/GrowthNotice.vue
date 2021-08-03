//成长通知
<template>
  <div>
    <div class="view">
      <div class="GrowthNoticeTitle">
        <h2>成长通知</h2>
      </div>

      <div class="GrowthNoticeContent">
        <div
          class="GrowthNoticeList"
          v-for="(item,index) in list"
        >
          <div class="GrowthNoticeItem">
            <van-icon
              name="warning-o"
              size='30'
              style="margin-right: 10px;"
            />
            <van-cell @click="showPopup(index)">成长通知{{index+1}}
              <h5>{{item.time}}</h5>
            </van-cell>
            <van-button
              @click="removeNotice(item.noticeId,index)"
              icon="delete"
              type="danger"
              size="small"
              style="border-radius:100%;margin-right: 20px;"
            ></van-button>
            <van-popup
              v-model="showlist[index]"
              class="GrowthNoticePopMessage"
            >
              <h4 style="text-align: center;margin-bottom: 30px">成长通知</h4>
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
import { getGrowNotice } from "../../network/requestMethods";
import { growNoticeRemove } from "../../network/requestMethods";
export default {
  data() {
    return {
      showlist: [],
      list: [
        {
          time: "",
          content: "",
          noticeId: "",
        },
      ],
    };
  },
  created() {
    let checkParUserName = new RegExp(/^p\d{10}$/); //匹配以p开头的十一位数字 家长账号
    let userId = "";
    if (checkParUserName.test(this.$store.getters.getUserName)) {
      userId = this.$store.getters.getChildId;
    } else {
      userId = this.$store.getters.getUserName;
    }
    getGrowNotice(userId).then((res) => {
      this.list = res.data;
      for (var i = 0; i < this.list.length; i++) {
        this.showlist[i] = false;
      }
    });
  },
  methods: {
    showPopup(index) {
      this.$set(this.showlist, index, true);
    },
    removeNotice(noticeId, index) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认删除？",
        })
        .then(() => {
          growNoticeRemove(noticeId).then(() => {
            this.list.splice(index, 1);
          });
        })
        .catch(() => {});
    },
    async getgrowthnoticelist() {
      var rsp = await fetch("http://test.linlicheng.kooboo.site/growthnotice", {
        method: "get",
      });
      this.list = await rsp.json();
      for (var i = 0; i < this.list.length; i++) {
        this.showlist[i] = false;
      }
    },
    async growthnoticeremove(id, index) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认删除？",
        })
        .then(() => {
          var rsp = fetch(
            "	http://test.linlicheng.kooboo.site/growthnoticeremove?id=" + id,
            {
              method: "get",
            }
          );
          this.list.splice(index, 1);
        })
        .catch(() => {});
    },
  },
};
</script>
<style>
.GrowthNoticeTitle {
  color: gray;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
.GrowthNoticeList {
  margin: 0px 0px 0px 30px;
  color: gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.GrowthNoticeItem {
  display: flex;
  align-items: center;
  width: 95%;
}
.GrowthNoticePopMessage {
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