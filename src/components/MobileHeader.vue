<template>
  <div class="flex mobileHeader">
    <i class="icon arrowImg" :style="{visibility:iconVisibility}" @click="routerBack()"></i>
    <div class="title">学生成长跟踪系统</div>
    <user-info class="user" :style="{display:userVisibility}"></user-info>
  </div>
</template>

<script>
import UserInfo from "./UserInfo.vue";
export default {
  components: { UserInfo },
  name: "mobileHeader",
  props:{
    iconVisibility:{
      type:String,
      default:'hidden'//value :hidden or visible 
    },
    userVisibility:{
      type:String,
      default:'none'//value :hidden or visible 
    },
  },
  methods:{
    routerBack(){
      this.$router.go(-1)
    }
  }
};
</script>

<style>

.mobileHeader {
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 12vh;
  background: #0ac485;
  color: #fff;
}
.title {
  flex: 5;
  margin: 0 0 0 35%;
  font-size: 2.5vh;
  font-weight: 600;
  border: 1 solid #000;
}
.arrowImg {
  position: absolute;
  left: 2%;
  margin: 0 0 0 2vh;
  width: 30px;
  height: 30px;
  background-image: url("../assets/img/arrowLeft.png");
  background-size: 30px;
  background-repeat: no-repeat;
}
.user {
  margin: 0 2vh 0 0;
}
</style>