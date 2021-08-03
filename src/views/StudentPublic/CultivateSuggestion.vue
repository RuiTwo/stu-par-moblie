//培养建议
<template>
  <div>
    <div class="view">
      <div class="CultivateSuggestionTitle">
        <h2>培养建议</h2>
      </div>

      <div class="CultivateSuggestionContent">
        <div
          class="CultivateSuggestionList"
          v-for="(item,index) in list"
        >
          <div class="CultivateSuggestionItem">
            <van-icon
              name="warning-o"
              size='30'
              style="margin-right: 10px;"
            />
            <van-cell @click="showPopup(index)">培养建议{{index+1}}
              <h5>{{item.time}}</h5>
            </van-cell>
            <van-button
              @click="removeSuggestion(item.SuggestionId,index)"
              icon="delete"
              type="danger"
              size="small"
              style="border-radius:100%;margin-right: 20px;"
            >
            </van-button>
            <van-popup
              v-model="showlist[index]"
              class="CultivateSuggestionPopMessage"
            >
              <h4 style="text-align: center;margin-bottom: 30px">培养建议</h4>
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
import { getCultivateSuggestionlist } from "../../network/requestMethods";
import { cultivateSuggestionRemove } from "../../network/requestMethods";
export default {
  data() {
    return {
      showlist: [],
      list: [
        {
          time: "",
          content: "",
          SuggestionId: "",
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
    getCultivateSuggestionlist(userId).then((res) => {
      this.list = res.data;
      console.log(res.data);
      for (let i = 0; i < this.list.length; i++) {
        this.showlist[i] = false;
      }
    });
  },
  methods: {
    showPopup(index) {
      this.$set(this.showlist, index, true);
    },
    removeSuggestion(SuggestionId, index) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认删除？",
        })
        .then(() => {
          cultivateSuggestionRemove(SuggestionId).then(() => {
            this.list.splice(index, 1);
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style>
.CultivateSuggestionTitle {
  color: gray;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
.CultivateSuggestionList {
  margin: 0px 0px 0px 30px;
  color: gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.CultivateSuggestionItem {
  display: flex;
  align-items: center;
  width: 95%;
}

.CultivateSuggestionPopMessage {
  height: 50%;
  width: 70%;
  padding: 30px;
  font-size: 18px;
}

.Decline {
  background: rgb(194, 194, 194);
  border: solid 1px rgb(194, 194, 194);
  width: 90%;
}
</style>