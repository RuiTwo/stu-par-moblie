//班级点名
<template>
  <div id="ClassCallRoll">
    <div class="view flexCol flex">
      <h2 class="ClassCallRollTitle">班级点名</h2>
      <div class="flex">
        <div class="date flex">
          {{mydate}}
        </div>
      </div>
      <div class="enrolTable">
        <table>
          <tr>
            <th>节次</th>
            <th>时间</th>
            <th>课程名称</th>
            <th>点名</th>
          </tr>
          <tr v-for="item in tableData">
            <td>{{item.classIndex}}</td>
            <td>{{item.classTag}}</td>
            <td>{{item.courseName}}({{item.classHour}}节)</td>
            <td class="removeIcon">
              <div class="editIcon">
                <van-cell
                  is-link
                  @click="showPopup(item.isInput)"
                  closeable
                  close-icon
                >
                  <van-icon
                    name="records"
                    color="#CA0B0B"
                    size="3vh"
                  />
                </van-cell>
              </div>

            </td>
          </tr>
        </table>
      </div>
      <div class="popup">

        <van-popup
          position="bottom"
          v-model="show"
        >
          <div class="bottomPop flexCol flex">
            <div class="tableTitle flex">
              <div>点名</div>
            </div>
            <div class="popTable">
              <table>
                <thead>
                  <tr>
                    <th>学号</th>
                    <th>姓名</th>
                    <th>签到情况</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(std,index) in activeUsers">
                    <td>{{std.stdId}}</td>
                    <td>{{std.name}}</td>
                    <td>
                      <van-dropdown-menu
                        :overlay=overlay
                        class="erollSelect"
                      >
                        <van-dropdown-item
                          v-model="std.enrolSta"
                          :options="enrolStatus"
                        />

                      </van-dropdown-menu>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="stdPagination">
            <van-pagination
              v-model="currentPage"
              :total-items=totalItems
              :show-page-size="3"
            >
              <template #prev-text>
                <van-icon name="arrow-left" />
              </template>
              <template #next-text>
                <van-icon name="arrow"></van-icon>
              </template>
              <template #page="{ text }">{{ text }}</template>
            </van-pagination>
          </div>
        </van-popup>
      </div>
    </div>
  </div>

</template>

<script>
import { getTodayClass } from "../../network/requestMethods";
export default {
  data() {
    return {
      overlay: false,
      value1: 0,
      mydate: "",
      show: false,
      currentPage: 1,
      showRowNum: 4,
      enrolStatus: [
        { text: "出勤", value: 0 },
        { text: "缺勤", value: 1 },
        { text: "事假", value: 2 },
        { text: "病假", value: 3 },
        { text: "迟到", value: 4 },
        { text: "早退", value: 5 },
      ],
      studentData: [
        { stdId: "1000000002", name: "黄蓉", enrolSta: 0 },
        { stdId: "1000000003", name: "谢雨", enrolSta: 0 },
        { stdId: "1000000004", name: "张三", enrolSta: 0 },
        { stdId: "1000000005", name: "李四", enrolSta: 0 },
        { stdId: "1000000006", name: "王五", enrolSta: 0 },
        { stdId: "1000000007", name: "王力量", enrolSta: 0 },
        { stdId: "1000000008", name: "王五", enrolSta: 0 },
        { stdId: "1000000009", name: "王里", enrolSta: 0 },
        { stdId: "10000000010", name: "王对", enrolSta: 0 },
        { stdId: "10000000011", name: "王法", enrolSta: 0 },
        { stdId: "10000000012", name: "王会", enrolSta: 0 },
        { stdId: "10000000013", name: "王年", enrolSta: 0 },
        { stdId: "10000000014", name: "王五", enrolSta: 0 },
        { stdId: "10000000015", name: "王华诞", enrolSta: 0 },
        { stdId: "10000000016", name: "王本身", enrolSta: 0 },
      ],
      tableData: [
        {
          classTime: "",
          classHour: "",
          courseName: "",
        },
      ],
    };
  },
  methods: {
    whichIcon(type) {
      return type ? "checked" : "records";
    },
    whichColor(type, isinput) {
      if (isinput) {
        return type ? "#1BC88E" : "#CA0B0B"; //可输入出勤情况的颜色
      } else {
        return type ? "#BBEFDD" : "#F5D0D0"; //不可输入时的颜色
      }
      // return  type ? "#1BC88E" : "#CA0B0B"; isInput is true
    },
    getToday() {
      let myDate = new Date();
      let year = myDate.getFullYear();
      let month =
        myDate.getMonth() + 1 > 10
          ? myDate.getMonth() + 1
          : "0" + (myDate.getMonth() + 1);
      let date =
        myDate.getDate() > 10 ? myDate.getDate() : "0" + myDate.getDate();
      let day = myDate.getDay();
      switch (day) {
        case 0:
          day = "星期天";
          break;
        case 1:
          day = "星期一";
          break;
        case 2:
          day = "星期二";
          break;
        case 3:
          day = "星期三";
          break;
        case 4:
          day = "星期四";
          break;
        case 5:
          day = "星期五";
          break;
        case 6:
          day = "星期六";
      }
      let str = "" + year + " - " + month + " - " + date + " " + day;
      this.mydate = str;
      let min = myDate.getMinutes();
      let hours = myDate.getHours();
      console.log(hours + " " + min);
    },
    showPopup(isInput) {
      this.show = true;
    },
    showedRows(index, showRowNum) {
      return (
        index <= this.currentPage * showRowNum - 1 &&
        index >= (this.currentPage - 1) * showRowNum
      );
    },
  },
  mounted() {
    this.getToday();
    let date = new Date();
    let weekday = date.getDay();
    getTodayClass(weekday, 4).then((res) => {
      this.tableData = res.data;
      for (let i = 0; i < this.tableData.length; i++) {
        switch (this.tableData[i].classTime) {
          case "1":
            this.tableData[i].classIndex = "第1~2节";
            this.tableData[i].classTag = "8:00~9:50";
            break;
          case "2":
            this.tableData[i].classIndex = "第3~4节";
            this.tableData[i].classTag = "10:10~12:00";
            break;
          case "3":
            this.tableData[i].classIndex = "第5~6节";
            this.tableData[i].classTag = "12:30~14:20";
            break;
          case "4":
            this.tableData[i].classIndex = "第7~8节";
            this.tableData[i].classTag = "14:30~16:20";
            break;
          case "5":
            this.tableData[i].classIndex = "第9~10节";
            this.tableData[i].classTag = "16:30~18:20";
            break;
          case "6":
            this.tableData[i].classIndex = "第11~13节";
            this.tableData[i].classTag = "19:10~22:00";
            break;
        }
      }
    });
  },
  computed: {
    // 筛选当前页面需要展示的数据
    activeUsers: function () {
      let pageIndex = this.currentPage;
      let showRowNums = this.showRowNum;
      return this.studentData.slice(
        (pageIndex - 1) * showRowNums,
        pageIndex * showRowNums
      );
    },
    totalItems() {
      console.log(this.studentData.length);
      return ((this.studentData.length % this.showRowNum) + 1) * 10;
    },
  },
};
</script>

<style>
.view {
  margin: 3vh 0 0vh 0;
  color: #777777;
}

.date {
  font-size: 2vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.enrolTable {
  margin: 3vh 0 0 0;
  width: 100%;
}

.enrolTable > table {
  width: 100%;
  border: 0.1vh solid rgb(199, 199, 199);
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 2vh;
  text-align: center;
  border-collapse: collapse;
}

.enrolTable > table th {
  font-size: 2vh;
  font-weight: inherit;
}

.van-icon-arrow::before {
  content: " ";
}

.stdPagination .van-icon-arrow::before {
  content: "\F00A";
}

td,
table th {
  padding: 1vh;
  border: 0.1vh solid rgb(199, 199, 199);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.erollSelect .van-cell__value {
  display: none;
}

#ClassCallRoll .van-cell__value {
  display: flex;
  justify-content: center;
}

.editIcon {
  display: flex;
  justify-content: center;
  width: 100%;
}

.van-cell {
  overflow: visible;
}

.bottomPop {
  color: #777777;
  margin: 3vh 0 10vh 0;
  width: 100%;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.tableTitle {
  width: 100%;
  justify-content: space-around;
  align-items: center;
  margin: 0 0 2vh 0;
  font-weight: bold;
  font-size: 2.5vh;
  text-align: center;
}

.popTable {
  width: 100%;
}

.bottomPop table {
  width: 100%;
  border: 0.1vh solid rgb(199, 199, 199);
  font-size: 2vh;
  font-weight: lighter;
  text-align: center;
  border-collapse: collapse;
}

.bottomPop td {
  padding: 0.1vh;
}

.van-dropdown-item__option--active {
  color: #777777;
}

.bottomPop .van-cell {
  width: 35%;
  font-size: 1.8vh;
  height: 6vh;
}

.van-dropdown-menu__title--active {
  color: #777777;
}

.van-dropdown-menu__title {
  font-size: 2vh;
}

.van-pagination__item--active {
  color: #0ac485;
  background-color: #fff;
}

#enrol {
  display: block;
  width: 18vh;
  height: 5vh;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}
</style>