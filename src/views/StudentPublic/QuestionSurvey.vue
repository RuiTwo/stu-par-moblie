//问卷调查
<template>
  <div>
    <div class="view">
      <div class="QuestionSurveyTitle">
        <h2>问卷调查</h2>
      </div>
      <div class="QuestionSurveyContent">
        <div class="QuestionSurveyList" v-for="(item,index) in list">
          <div class="QuestionSurveyItem">
            <van-icon name="warning-o" size='30' style="margin-right: 10px;" />
            <van-cell @click="showPopup(index)">调查问卷{{index+1}}
              <h5>{{item.time}}</h5>
            </van-cell>
            <van-button @click="questionsurveyremove(item._id,index)" icon="delete" type="danger" size="small" style="border-radius:100%;margin-right: 20px;">
            </van-button>
            <van-popup v-model="showlist[index]" class="QuestionSurveyPopMessage">
              <h4 style="text-align: center;margin-bottom: 20px">问卷调查</h4>
              <div style="text-align: center;">
                <p>{{item.Q1}}</p>
                是<input type="radio" value="1" v-model="item.A1">否<input type="radio" value="0" v-model="item.A1">
              </div>
              <div style="text-align: center;">
                <p>{{item.Q2}}</p>
                是<input type="radio" value="1" v-model="item.A2">否<input type="radio" value="0" v-model="item.A2">
              </div>
              <div style="text-align: center;">
                <p>{{item.Q3}}</p>
                是<input type="radio" value="1" v-model="item.A3">否<input type="radio" value="0" v-model="item.A3">
              </div>
              <van-button type="primary" class="QuestionSurveyPopMessageButton" @click="onSubmit(index,item._id)" :disabled="abledlist[index]" >
                {{submittext[index]}}
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
        showlist:[],
        submittext: [],
        abledlist: [],
        list:[
          {
            time:'',
            Q1:'',
            A1:'',
            Q2:'',
            A2:'',
            Q3:'',
            A3:'',
          },
        ]
      };
    },
    created(){
      this.getquestionsurveylist()
    },  
    methods: {
      onSubmit(index,id){
        this.$dialog.confirm({
          title: '提示',
          message: '确认提交？',
        })
          .then(() => {
            var rsp = fetch(
              "http://test.linlicheng.kooboo.site/questionsurveysubmit?id=" + id,
              {
                method: "POST",
                body:JSON.stringify({
                    A1:this.list[index].A1,
                    A2:this.list[index].A2,
                    A3:this.list[index].A3
                  }),
              }
            );
            this.$dialog.alert({
                title: '提示',
                message: '提交成功！',
              })
            this.$set(this.submittext, index, "已提交")
            this.$set(this.abledlist, index, true)
          })
          .catch(() => {
          })
      },
      showPopup(index) {
        this.$set(this.showlist,index,true)
      },
      async getquestionsurveylist(){
        var rsp=await fetch('http://test.linlicheng.kooboo.site/questionsurvey',
        {
          method:"get"
        });
        this.list=await rsp.json(); 
        for(var i=0;i<this.list.length;i++){
          this.showlist[i]=false
          if (Boolean(this.list[i].issubmit)) {
            this.submittext[i] = "已提交"
            this.abledlist[i] = true
          }
          else {
            this.submittext[i] = "提交"
            this.abledlist[i] = false
          }
        }
      },
      async questionsurveyremove(id,index) {
        this.$dialog.confirm({
          title:'提示',
          message:'确认删除？',
        })
        .then(()=>{
          var rsp = fetch(
            "	http://test.linlicheng.kooboo.site/questionsurveyremove?id=" + id,
            {
              method: "get",
            }
          );
          this.list.splice(index,1)
        })
        .catch(()=>{
        }) 
        },
    },
  };
</script>


<style>
  .QuestionSurveyTitle {
    color: gray;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .QuestionSurveyList {
    margin: 0px 0px 0px 30px;
    color: gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .QuestionSurveyItem {
    display: flex;
    align-items: center;
  }

  .QuestionSurveyPopMessage {
    height: 50%;
    width: 70%;
    padding: 30px;
    font-size: 18px;
    display: flex;
    flex-direction: column;
  }
  .QuestionSurveyPopMessage p{
    padding: 10px;
  }
  .QuestionSurveyPopMessageButton{
    border-radius: 5px;
    background-color: #0ac485;
    color: white;
    padding: 20px 0 20px 0;
    margin-top: 20px;
  }
  .Decline {
    border: solid 1px rgb(194, 194, 194);
    width: 90%;
  }
</style>