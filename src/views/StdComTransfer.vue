<template>
  <div>
    <std-com-home v-show="$route.name == 'StdComHome'"></std-com-home>
    <router-view></router-view>
  </div>

</template>

<script>
import StdComHome from './StdCommittee/StdComHome.vue'
export default {
  name: "StdTransfer",
  components: {
    StdComHome,
  },
  
};
</script>

<style>
</style>