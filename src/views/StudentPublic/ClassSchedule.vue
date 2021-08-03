//课程表
<template>
  <div>
    <div class="classview flex">
      <h2 class="classTitle">课程表</h2>
      <div
        class="classTime flex"
      >
        <van-dropdown-menu
          class="downmenu"
          :overlay="overlayNo"
        >
          <van-dropdown-item
            v-model="value1"
            :options="option1"
            @change="selectTerm"
          />
        </van-dropdown-menu>

      </div>
      <div class="classSchedule">
        <table
          class="table"
          style="cellspacing:0"
        >
          <tr>
            <th>星期</th>
            <th>上午1~2节</th>
            <th>上午3~4节</th>
            <th>中午5~6节</th>
            <th>下午7~8节</th>
            <th>下午9~10节</th>
            <th>晚上11~13节</th>
          </tr>
          <tr v-for="row in tableData">
            <td>{{row[0]}}</td>
            <td>{{row[1]}}</td>
            <td>{{row[2]}}</td>
            <td>{{row[3]}}</td>
            <td>{{row[4]}}</td>
            <td>{{row[5]}}</td>
            <td>{{row[6]}}</td>
          </tr>

        </table>
      </div>
    </div>
  </div>

</template>

<script>
import { getClass } from "../../network/requestMethods";
export default {
  data() {
    return {
      schoolYear: 4,
      stdNum: "1925122000",
      overlayNo: false,
      currentPage: 1,
      totalPage: 50,
      value1: 0,
      value2: "a",
      option1: [
        { text: "大一 第一学期", value: 0 },
        { text: "大一 第二学期", value: 1 },
        { text: "大二 第一学期", value: 2 },
        { text: "大二 第二学期", value: 3 },
        { text: "大三 第一学期", value: 4 },
        { text: "大三 第二学期", value: 5 },
        { text: "大四 第一学期", value: 6 },
        { text: "大四 第二学期", value: 7 },
      ],
      option2: [
        { text: "大一 第一学期", value: 0 },
        { text: "大一 第二学期", value: 1 },
        { text: "大二 第一学期", value: 2 },
        { text: "大二 第二学期", value: 3 },
        { text: "大三 第一学期", value: 4 },
        { text: "大三 第二学期", value: 5 },
        { text: "大四 第一学期", value: 6 },
        { text: "大四 第二学期", value: 7 },
        { text: "大五 第一学期", value: 8 },
        { text: "大五 第二学期", value: 9 },
      ],
      tableData: [
        ["一", "", "", "", "", "", ""],
        ["二", "", "", "", "", "", ""],
        ["三", "", "", "", "", "", ""],
        ["四", "", "", "", "", "", ""],
        ["五", "", "", "", "", "", ""],
        ["六", "", "", "", "", "", ""],
        ["日", "", "", "", "", "", ""],
      ],
      classData: [],
    };
  },
  mounted() {},
  methods: {
    selectTerm(value) {
      // console.log(value);
      let username = this.$store.getters.getUserName;
      getClass(username, value + 1).then((res) => {
        console.log(res.data);
        let clearTable = [
          ["一", "", "", "", "", "", ""],
          ["二", "", "", "", "", "", ""],
          ["三", "", "", "", "", "", ""],
          ["四", "", "", "", "", "", ""],
          ["五", "", "", "", "", "", ""],
          ["六", "", "", "", "", "", ""],
          ["日", "", "", "", "", "", ""],
        ];
        this.tableData = clearTable;
        let classlength = res.data.length;
        this.classData = res.data;
        let row = 0;
        let column = 0;
        let unitStr = "";
        for (let i = 0; i < classlength; i++) {
          row = res.data[i].classDay - 1;
          column = res.data[i].classTime;
          unitStr =
            res.data[i].courseName + " " + res.data[i].classWeek + " 周 ";
          if (res.data[i].classHour > 2) {
            unitStr += "(" + res.data[i].classHour + "节)";
            this.$set(this.tableData[row], column, unitStr);
          } else {
            this.$set(this.tableData[row], column, unitStr);
          }
        }
      });
    },
  },
  computed: {
    isShow(value) {
      return value < 2 * this.schoolYear;
    },
  },
};
</script>

<style>
.classview {
  flex-direction: column;
  color: #777777;
  margin: 0px;
}
.classTitle {
  margin: 3vh 0 -3vh 0;
  width: 100%;
  text-align: center;
  font-weight: bold;
}
.classTime {
  justify-content: space-between;
  width: 100%;
  height: 1vh;
}

.downmenu {
  font-size: 1vh;
}
.van-pagination__item--active {
  color: #000;
  background: #fff;
}
.van-pagination__item {
  color: #777777;
}
.classview .van-popup--top {
  width: 50%;
}
.van-dropdown-menu__title {
  font-size: 2vh;
  font-weight: 100;
  color: #777;
}
.van-dropdown-menu__title--active {
  color: #777;
}
.van-dropdown-menu__bar {
  box-shadow: 0 0 0 0;
}
.van-dropdown-item__option--active {
  color: #000;
}
.van-dropdown-item__option {
  font-size: 2vh;
}
.classview .van-cell__title {
  flex: 2;
}
.classSchedule {
  margin: 7vh 0 7vh 0;
}
.table {
  width: 100%;
  border: 0.1vh solid #bbbbbb;
  font-size: 2vh;
}
table {
  text-align: center;
  /* border-collapse:collapse; */
}
td,
th {
  padding: 1.2vh;
  border: 0.1vh solid #bbbbbb;
}
</style>