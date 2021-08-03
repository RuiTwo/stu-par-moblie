//学生关怀
<template>
  <div>
    <div class="view">
      <div class="StdCareTitle">
        <h2>学生关怀</h2>
      </div>

      <div class="StdCareContent">
        <div class="StdCareList" v-for="(item,index) in list">
          <div class="StdCareItem">
            <van-icon name="warning-o" size='30' style="margin-right: 10px;" />
            <van-cell @click="showPopup(index)">学生关怀{{index+1}}
              <h5>{{item.time}}</h5>
            </van-cell>
            <van-button @click="removeitem(item._id,index)" icon="delete" type="danger" size="small" style="border-radius:100%;margin-right: 20px;">
            </van-button>
            <van-popup v-model="showlist[index]" class="StdCarePopMessage">
              <h4 style="text-align: center;margin-bottom: 30px">学生关怀</h4>
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
  import {getStudentcareList} from '../../network/requestMethods'
  import {studentCareRemove} from '../../network/requestMethods'
  export default {
    data() {
      return {
        showlist:[],
        list:[
          {
            time:'',
            content:'',
          },
        ]
      };
    },
    created(){
      getStudentcareList().then(res=>{
        this.list=res.data; 
        for(let i=0;i<this.list.length;i++){
          this.showlist[i]=false
        }
      })
    },  
    methods: {
      showPopup(index) {
        this.$set(this.showlist,index,true)
      },
      // async getstudentcarelist(){
      //   var rsp=await fetch('http://test.linlicheng.kooboo.site/studentcare',
      //   {
      //     method:"get"
      //   });
      //   this.list=await rsp.json(); 
      //   for(var i=0;i<this.list.length;i++){
      //     this.showlist[i]=false
      //   }
      // },
      async studentcareremove(id,index) {
        
        },
        removeitem(id,index){
          this.$dialog.confirm({
          title:'提示',
          message:'确认删除？',
        })
        .then(()=>{
          studentCareRemove(id).then();
          this.list.splice(index,1);
        })
        .catch(()=>{
        }) 
        }
    },
  };
</script>
<style>
  .StdCareTitle {
    color: gray;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .StdCareList {
    margin: 0px 0px 0px 30px;
    color: gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .StdCareItem {
    display: flex;
    align-items: center;
  }

  .StdCarePopMessage {
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