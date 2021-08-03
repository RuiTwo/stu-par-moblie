//日常活动
<template>
  <div>
    <div class="view">
      <div class="DaliyActivitiesTitle">
        <h2>日常活动</h2>
      </div>

      <div class="DaliyActivitiesCharge">
        <van-button v-show="this.$store.getters.getIsCommitee " type="primary" class="DaliyActivitiesButton" icon="plus" @click="showCharge"></van-button>
        <van-popup v-model="showcharge" class="DaliyActivitiesPopMessage">
          <h4 style="text-align: center;margin-bottom: 30px">发布活动</h4>
          <van-cell-group>
            <van-field label="活动主题" placeholder="请输入活动主题" v-model="AcTitle" />
            <van-field label="活动内容" placeholder="请输入活动内容" v-model="AcContent" />
            <van-field label="活动时间" placeholder="请输入活动时间" v-model="AcTime" />
            <van-field label="活动地点" placeholder="请输入活动地点" v-model="AcPlace" />
            <van-field label="活动人数" placeholder="请输入活动人数" v-model="AcNumOfPerson" />
          </van-cell-group>
          <van-button style="border-radius: 5px;background-color: #0ac485;color: white;" @click="daliyactivitiesadd">发布
          </van-button>
        </van-popup>
      </div>

      <div class="DaliyActivitiesContent">
        <div class="DaliyActivitiesList" v-for="(item,index) in list">
          <div class="DaliyActivitiesItem">
            <van-icon name="warning-o" size='30' style="margin-right: 10px;" />
            <van-cell @click="showPopup(index)">活动{{index+1}}
              <h5>{{item.time}}</h5>
            </van-cell>
            <van-button @click="daliyactivitiesremove(item._id,index)" icon="delete" type="danger" size="small"
              style="border-radius:100%;margin-right: 20px;"></van-button>
            <van-popup v-model="showlist[index]" class="DaliyActivitiesPopMessage">
              <h4 style="text-align: center;margin-bottom: 30px">日常活动</h4>
              <p>活动主题：{{item.AcTitle}}</p>
              <p>活动内容：{{item.AcContent}}</p>
              <p>活动时间：{{item.AcTime}}</p>
              <p>活动地点：{{item.AcPlace}}</p>
              <p>活动人数：{{item.AcNumOfPerson}}</p>
              <van-button type="primary" style="border-radius: 5px;background-color: #0ac485;color: white;"
                @click="join(index,item._id)" :disabled="abledlist[index]">{{jointext[index]}}
              </van-button>
            </van-popup>
          </div>
          <div class="Decline"></div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        showcharge: false,
        AcTime: '',
        AcTitle: '',
        AcContent: '',
        AcPlace: '',
        AcNumOfPerson: '',
        jointext: [],
        abledlist: [],
        showlist:[],
        list: [
          {
            time: '',
            AcTime: '',
            AcTitle: '',
            AcContent: '',
            AcPlace: '',
            AcNumOfPerson: '',
            isjoin: 0
          },
        ]
      };
    },
    created() {
      this.getdaliyactivitieslist()
    },
    methods: {
      async daliyactivitiesadd() {
        this.$dialog.confirm({
          title: '提示',
          message: '确认发布？',
        })
          .then(() => {
            if (this.AcTitle == '') {
              this.$dialog.alert({
                title: '提示',
                message: '请输入活动主题',
              })
              return
            }
            else if (this.AcContent == '') {
              this.$dialog.alert({
                title: '提示',
                message: '请输入活动内容',
              })
              return
            }
            else if (this.AcTime == '') {
              this.$dialog.alert({
                title: '提示',
                message: '请输入活动时间',
              })
              return
            }
            else if (this.AcPlace == '') {
              this.$dialog.alert({
                title: '提示',
                message: '请输入活动地点',
              })
              return
            }
            else if (this.AcNumOfPerson == '') {
              this.$dialog.alert({
                title: '提示',
                message: '请输入活动人数',
              })
              return
            }
            else {
              var d = new Date();
              var rsp = fetch(
                "http://test.linlicheng.kooboo.site/daliyactivitiesadd",
                {
                  method: "post",
                  body: JSON.stringify({
                    time: d.getFullYear().toString() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + 'T' + d.getHours() + ':' + d.getMinutes(),
                    AcTime: this.AcTime,
                    AcTitle: this.AcTitle,
                    AcContent: this.AcContent,
                    AcPlace: this.AcPlace,
                    AcNumOfPerson: this.AcNumOfPerson,
                    isjoin:0
                  }),
                }
              );
              this.$dialog.alert({
                title: '提示',
                message: '发布成功！',
              }).then(() => {
                this.showcharge = false;
                this.AcTime = '';
                this.AcTitle = '';
                this.AcContent = '';
                this.AcPlace = '';
                this.AcNumOfPerson = '';
                window.location.reload()
              });
            }
          })
          .catch(() => {
          })
      },
      showCharge() {
        this.showcharge = true;
      },
      showPopup(index) {
        this.$set(this.showlist,index,true)
      },
      async join(index, id) {
        this.$dialog.confirm({
          title: '提示',
          message: '确认参加该活动？',
        })
          .then(() => {
            var rsp = fetch(
              "http://test.linlicheng.kooboo.site/daliyactivitiesjoin?id=" + id,
              {
                method: "get",
              }
            );
            this.$dialog.alert({
                title: '提示',
                message: '报名成功！',
              })
            this.$set(this.jointext, index, "已报名")
            this.$set(this.abledlist, index, true)
          })
          .catch(() => {
          })
      },
      async getdaliyactivitieslist() {
        var rsp = await fetch('http://test.linlicheng.kooboo.site/daliyactivities',
          {
            method: "get"
          });
        this.list = await rsp.json();
        for (var i = 0; i < this.list.length; i++) {
          this.showlist[i]=false
          if (Boolean(this.list[i].isjoin)) {
            this.jointext[i] = "已报名"
            this.abledlist[i] = true
          }
          else {
            this.jointext[i] = "报名"
            this.abledlist[i] = false
          }
        }
      },
      async daliyactivitiesremove(id,index) {
        this.$dialog.confirm({
          title: '提示',
          message: '确认后将无法查看您的报名情况，是否删除？',
        })
          .then(() => {
            var rsp = fetch(
              "	http://test.linlicheng.kooboo.site/daliyactivitiesremove?id=" + id,
              {
                method: "get",
              }
            );
            this.list.splice(index,1)
          })
          .catch(() => {
          })
      },
    },
  };
</script>

<style>
  .DaliyActivitiesTitle {
    color: gray;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
  }

  .DaliyActivitiesList {
    margin: 0px 0px 0px 30px;
    color: gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .DaliyActivitiesButton {
    width: 75px;
    height: 35px;
    margin: 0px 0px 20px 20px;
    border-radius: 5px;
    background-color: #0ac485;
  }

  .DaliyActivitiesItem {
    display: flex;
    align-items: center;
  }

  .DaliyActivitiesPopMessage {
    height: 50%;
    width: 80%;
    padding: 30px;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .Decline {
    border: solid 1px rgb(194, 194, 194);
    width: 90%;
  }
</style>