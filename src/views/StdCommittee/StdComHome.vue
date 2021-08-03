//班委首页
<template>
  <div class="flex Home">
    <div class=" flex items">
      <div class="flex itemRow">
        <home-item class="item" itemText="课程表" path='/classschedule'></home-item>
        <home-item class="item" itemText="班级点名" path='/classcallroll'></home-item>
        <home-item class="item" itemText="日常活动" path='/daliyactivities' numsVisibility></home-item>
      </div>
      <div class="flex itemRow">
        <home-item class="item" itemText="自我评价" path='/selfassessment'></home-item>
        <home-item class="item" itemText="上报心理预警" path='/reportwarning'></home-item>
        <home-item class="item" itemText="培养建议" path="/cultivatesuggestion" numsVisibility></home-item>
      </div>
      <div class="flex itemRow">
        <home-item class="item" itemText="成长通知" path= '/growthnotice' numsVisibility></home-item>
        <home-item class="item" itemText="问卷调查" path= '/questionsurvey' numsVisibility></home-item>
        <home-item class="item unVisible" itemText="待添加" ></home-item>
      </div>
    </div>
  </div>

</template>

<script>
export default {};
</script>

<style>
</style>

<script>
export default {

}
</script>

<style>

</style>