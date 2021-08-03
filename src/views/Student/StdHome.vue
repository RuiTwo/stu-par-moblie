<template>
  <div class="flex Home">
    <div class=" flex items">
      <div class="flex itemRow">
        <home-item class="item" itemText="课程表" path="/classschedule" ></home-item>
        <home-item class="item" itemText="日常活动" path="/daliyactivities" numsVisibility></home-item>
        <home-item class="item" itemText="自我评价" path="/selfassessment" ></home-item>
      </div>
      <div class="flex itemRow">
        <home-item class="item" itemText="上报心理预警" path="/reportwarning"></home-item>
        <home-item class="item" itemText="培养建议" path="/cultivatesuggestion" numsVisibility></home-item>
        <home-item class="item" itemText="成长通知" path="/growthnotice" numsVisibility></home-item>
      </div>
      <div class="flex itemRow">
        <home-item class="item" itemText="学生关怀" path="/stdcare" numsVisibility></home-item>
        <home-item class="item" itemText="问卷调查" path="/questionsurvey" numsVisibility></home-item>
        <home-item class="item unVisible" itemText="待添加" path="/"></home-item>
      </div>
    </div>
  </div>

</template>

<script>
export default {};
</script>

<style>

</style>