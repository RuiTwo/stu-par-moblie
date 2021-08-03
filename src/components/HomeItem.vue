//首页item
<template>
  <div class="flex HomeItem" @click="itemClick(path)" >
    <div class="flex unreadMsg" :style="{visibility:numsVisibility}">
        <div class="urText">{{unreadMsgNum}}</div>
      </div>
    <div class="imgitem">
      <img src="../assets/img/list.svg" alt="">
    </div>
    <div class="itemText">
      {{itemText}}
    </div>
  </div>
</template>

<script>
export default {
  props:{
    itemText:{
      type:String,
      default:'xx'
    },
    unreadMsgNum:{
      type:Number,
      default:99
    },
    path:{
      type:String,
      default:''
    },
    numsVisibility:{
      type:String,
      default:'hidden',
    }
  },
  methods:{
    itemClick(path){
      this.$router.push(path);
    }
  }
}
</script>

<style>
.HomeItem{
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 8vh;
  font-size: 2vh;
  color: #777777;
}

.imgitem>img{
  width: 8vh;
}
.unreadMsg{
  z-index: 1;
  margin: 0 0 -2vh 6vh;
  justify-content: center;
  align-items: center;
  width: 2.8vh;
  height: 2.8vh;
  background:#F81325;
  border-radius: 3vh;
  color: white;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.urText{
  font-size: 1.5vw;
}
.itemText{
  margin-top: 1vh;
  white-space: nowrap;
  text-align: center;
  font-size: 2.3vh;
  font-weight:bolder;

}
.van-dropdown-item__option{
  text-align: center;
}
.van-dropdown-item__content{
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
}
.van-dropdown-item__option{
  text-align: center;
}
.van-cell__title{
  margin: 0 auto;
}
.van-cell__title,.van-dropdown-item__option--active {
  text-align:center
}


</style>