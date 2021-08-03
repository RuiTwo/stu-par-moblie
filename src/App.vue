<template>
  <div id="app">
    <mobile-header v-if="$route.name=='StdHome'||$route.name=='StdComHome'||$route.path=='/parhome'" userVisibility></mobile-header>
    <mobile-header v-else-if="$route.name!='Login'" iconVisibility userVisibility></mobile-header>
    <!-- <std-com-transfer></std-com-transfer> -->
    <!-- <std-transfer></std-transfer> -->
    <keep-alive><router-view></router-view></keep-alive>
    <!-- <par-transfer></par-transfer> -->
  </div>
</template>
<script>
import StdComTransfer from "./views/StdComTransfer.vue";
import StdTransfer from "./views/StdTransfer.vue";
import ParTransfer from "./views/ParTransfer.vue";
import StdHome from "./views/Student/StdHome.vue";
import StdComHome from "./views/StdCommittee/StdComHome.vue";
import ParHome from "./views/Parent/ParHome.vue";
export default {
  data() {
    return {
      show: false,
    };
  },
  components: {
    StdHome,
    StdComHome,
    ParHome,
    StdTransfer,
    ParTransfer,
    StdComTransfer,
  },
  beforeRouteEnter(to, from, next){
    
  }
};
</script>
<style>
@import url("./assets/css/normalize.css");
@import url("./assets/css/base.css");
</style>
