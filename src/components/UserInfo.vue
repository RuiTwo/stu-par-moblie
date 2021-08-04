<template>
  <div
    class=" UserInfo"
    @click="userNavClick"
  >
    <div class="showName">
      Hi , {{userName}}
    </div>
    <div
      v-if="isShow"
      class="userNav"
    >
      <ul>
        <li @click="alterPwd">修改密码</li>
        <li @click="toLogin">退出</li>
      </ul>
    </div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      userName: "???",
      isShow: false,
      isVilible: "visible",
    };
  },
  computed: {},
  methods: {
    userNavClick() {
      this.isShow = !this.isShow;
    },
    toLogin() {
      this.$router.push("/login");
      this.$store.commit("setName", "");
      this.$store.commit("setPwd", "");
      localStorage.clear();
      console.log(this.$store.getters.getUserName);
      console.log(localStorage.getItem("username"));
    },
    alterPwd() {
      this.$router.push("/alterpwd");
    },
  },
  mounted() {
    if (this.$route.name != "Login") {
      let checkParUserName = new RegExp(/^p\d{10}$/); //匹配以p开头的十一位数字 家长账号
      let username = this.$store.getters.getUserName;
      let realname = this.$store.getters.getRealName;
      if (checkParUserName.test(username)) {
        this.userName = realname[0] + "家长";
      } else {
        this.userName = realname[0] + "同学";
      }
    }
  },
  created() {
    // console.log(this.userName);
  },
};
</script>

<style>
.UserInfo {
  z-index: 3;
  font-size: 2.2vh;
  font-weight: 550;
}

.showName {
  margin: 0 2vh 0 0;
}
.userNav {
  position: absolute;
  top: 12vh;
  right: 0.2vh;
  font-size: 2.5vh;
  color: #777777;
  font-weight: lighter;
  text-align: center;
  line-height: 2vh;
}
.userNav > ul {
  z-index: 10;
  background: #fff;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.3);
}
.userNav > ul > li {
  padding: 2vh 1vh 0 1vh;
  width: 10vh;
  height: 4vh;
}
</style>