//学生近况
<template>
  <div>
    <div class="view">
      <div class="StuRecentTitle">
        <h2>近况通知</h2>
      </div>
      <div class="StuRecentContent">
        <div
          class="StuRecentList"
          v-for="(item,index) in list"
        >
          <div class="StuRecentItem">
            <van-icon
              name="warning-o"
              size='30'
              style="margin-right: 10px;"
            />
            <van-cell @click="showPopup(index)">近况通知{{index+1}}
              <h5>{{item.time}}</h5>
            </van-cell>
            <van-button
              @click="removeRecent(item._id,index)"
              icon="delete"
              type="danger"
              size="small"
              style="border-radius:100%;margin-right: 20px;"
            >
            </van-button>
            <van-popup
              v-model="showlist[index]"
              class="PopMessage"
            >
              <h4 style="text-align: center;margin-bottom: 30px">近况通知</h4>
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
import { getSturecentList } from "../../network/requestMethods";
import { sturecentRemove } from "../../network/requestMethods";
// getSturecentList()sturecentRemove
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
    getSturecentList().then((res) => {
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
    removeRecent(id, index) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认删除？",
        })
        .then(() => {
          sturecentRemove(id).then();
          this.list.splice(index, 1);
        })
        .catch(() => {});
    },
  },
};
</script>

<style>
.StuRecentTitle {
  color: gray;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
.StuRecentList {
  margin: 0px 0px 0px 30px;
  color: gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.StuRecentItem {
  display: flex;
  align-items: center;
}

.PopMessage {
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