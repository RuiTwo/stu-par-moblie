<template>
  <div>
    <par-home v-show="$route.name == 'ParHome'"></par-home>
    <router-view></router-view>
  </div>

</template>

<script>
import ParHome from "./Parent/ParHome.vue";
export default {
  name: "ParTransfer",
  components: {
    ParHome,
  },
  
};
</script>

<style>
</style>