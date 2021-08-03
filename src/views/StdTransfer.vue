<template>
  <div>
    <std-home v-show="$route.name == 'StdName'"></std-home>
    <router-view></router-view>
  </div>
</template>

<script>
import StdHome from './Student/StdHome.vue'
export default {
  name:'StdTransfer',
  components:{
    StdHome
  }
}
</script>

<style>

</style>