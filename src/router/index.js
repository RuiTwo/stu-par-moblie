
import Vue from 'vue'
import VueRouter from 'vue-router'
StuRecent
Vue.use(VueRouter)
const ParHome = () => import('../views/Parent/ParHome.vue')
const EvalueChild = () => import('../views/Parent/EvalueChild.vue')
const PsychoWarning = () => import('../views/Parent/PsychoWarning.vue')
const StdCare = () => import('../views/Student/StudentCare')
const StuRecent = () => import('../views/Parent/StuRecent.vue')

const GrowthNotice = () => import('../views/StudentPublic/GrowthNotice.vue')
const QuestionSurvey = () => import('../views/StudentPublic/QuestionSurvey.vue')

const StdHome = () => import('../views/Student/StdHome')
const StdComHome = () => import('../views/StdCommittee/StdComHome')
const ClassCallRoll = () => import('../views/StdCommittee/ClassCallRoll')

const DaliyActivities = () =>import('../views/StudentPublic/DaliyActivities.vue')
const ReportWarning = () =>import('../views/StudentPublic/ReportWarning.vue')
const CultivateSuggestion = () =>import('../views/StudentPublic/CultivateSuggestion.vue')
const ClassSchedule = () =>import('../views/StudentPublic/ClassSchedule.vue')
const SelfAssessment = () =>import('../views/StudentPublic/SelfAssessment.vue')


const Login = () => import('../views/LoginAndAlter/Login')
const AlterPwd = () => import('../views/LoginAndAlter/AlterPwd')
const routes = [

  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/parhome',
    name: ParHome,
    component: ParHome,
  },
  {
    path:'/stdcomhome',
    name:'StdComHome',
    component:StdComHome,
  },
  {
    path: '/evaluechild',
    name: 'EvalueChild',
    component: EvalueChild,
  },
  {
    path: '/psychowarning',
    name: 'PsychoWarning',
    component: PsychoWarning,
  },
  {
    path: '/stdcare',
    name: 'StdCare',
    component: StdCare,
  },
  {
    //三者公共组件
    path: '/questionsurvey',
    name: 'QuestionSurvey',
    component: QuestionSurvey,
  },
  {
    path: '/sturecent',
    name: 'StuRecent',
    component: StuRecent,
  },
  {
    //三者公共组件
    path: '/growthnotice',
    name: 'GrowthNotice',
    component: GrowthNotice,
  },
  {
    path: '/stdhome',
    name: 'StdHome',
    component: StdHome,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/alterpwd',
    name: 'AlterPwd',
    component: AlterPwd,
  },
  {
    //公共
    path:'/classschedule',
    name:'ClassSchedule',
    component:ClassSchedule,
  },
  {
    //公共
    path:'/daliyactivities',
    name:'DaliyActivities',
    component:DaliyActivities,
  },
  {
    //公共
    path:'/reportwarning',
    name:'ReportWarning',
    component:ReportWarning,
  },
  {
    //三者公共组件
    path:'/cultivatesuggestion',
    name:'CultivateSuggestion',
    component:CultivateSuggestion,
  },
  {
    //公共
    path:'/selfassessment',
    name:'SelfAssessment',
    component:SelfAssessment,
  },
  {
    path:'/classcallroll',
    name:'ClassCallRoll',
    component:ClassCallRoll,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
    // to.query = { ...to.query, ...query }  注意不能这样直接整个赋值query，会报错
    // console.log(to);
    let arr = Object.keys(from.query) // 获取须带参数对象的所有key
    for (let i = 0; i < arr.length; i++) {
        if (!to.query[arr[i]]) to.query[arr[i]] = from.query[arr[i]] // 没有带上的就赋值带上
    }
    next()
})

export default router
