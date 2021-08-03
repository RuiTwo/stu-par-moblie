//家长首页
<template>

    <div class="flex Home">
      <div class=" flex items">
        <div class="flex itemRow" >     
          <home-item class="item" itemText="问卷调查" path="/questionsurvey" numsVisibility></home-item>
          <home-item class="item" itemText="学生近况通知" path="/sturecent" numsVisibility></home-item>
          <home-item class="item" itemText="学生培养建议" path="/cultivatesuggestion" numsVisibility></home-item>
        </div>
        <div class="flex itemRow">
          <home-item class="item" itemText="学生成长通知" path="/growthnotice" numsVisibility></home-item>
          <home-item class="item" itemText="学生关怀" path="/stdcare" numsVisibility></home-item>
          <home-item class="item" itemText="学生心理预警" path="/psychowarning" numsVisibility></home-item>
        </div>
        <div class="flex itemRow">
          <home-item class="item" itemText="评价子女" path="/evaluechild"></home-item>
          <home-item class="item unVisible" itemText="待添加"></home-item>
          <home-item class="item unVisible" itemText="待添加" ></home-item>
        </div>
      </div>
    </div>


</template>

<script>
export default {
  props:{
    isShow:{
      type:Boolean,
      default:true
    }
  },
  name:'ParHome',
  data(){
    return {
      
    }
  },
  methods:{
    isShowPage(isShowIt){
      this.isShow = isShowIt;
    }
   
  }
};
</script>

<style>
.TopHome{
  width: 100%;
}
</style>