
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

const DaliyActivities = () => import('../views/StudentPublic/DaliyActivities.vue')
const ReportWarning = () => import('../views/StudentPublic/ReportWarning.vue')
const CultivateSuggestion = () => import('../views/StudentPublic/CultivateSuggestion.vue')
const ClassSchedule = () => import('../views/StudentPublic/ClassSchedule.vue')
const SelfAssessment = () => import('../views/StudentPublic/SelfAssessment.vue')


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
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/stdcomhome',
    name: 'StdComHome',
    component: StdComHome,
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/evaluechild',
    name: 'EvalueChild',
    component: EvalueChild,
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/psychowarning',
    name: 'PsychoWarning',
    component: PsychoWarning,
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/stdcare',
    name: 'StdCare',
    component: StdCare,
    meta: {
      requireAuth: true,
    }
  },
  {
    //三者公共组件
    path: '/questionsurvey',
    name: 'QuestionSurvey',
    component: QuestionSurvey,
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/sturecent',
    name: 'StuRecent',
    component: StuRecent,
    meta: {
      requireAuth: true,
    }
  },
  {
    //三者公共组件
    path: '/growthnotice',
    name: 'GrowthNotice',
    component: GrowthNotice,
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/stdhome',
    name: 'StdHome',
    component: StdHome,
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requireAuth: false,
    }
  },
  {
    path: '/alterpwd',
    name: 'AlterPwd',
    component: AlterPwd,
    meta: {
      requireAuth: true,
    }
  },
  {
    //公共
    path: '/classschedule',
    name: 'ClassSchedule',
    component: ClassSchedule,
    meta: {
      requireAuth: true,
    }
  },
  {
    //公共
    path: '/daliyactivities',
    name: 'DaliyActivities',
    component: DaliyActivities,
    meta: {
      requireAuth: true,
    }
  },
  {
    //公共
    path: '/reportwarning',
    name: 'ReportWarning',
    component: ReportWarning,
  },
  {
    //三者公共组件
    path: '/cultivatesuggestion',
    name: 'CultivateSuggestion',
    component: CultivateSuggestion,
    meta: {
      requireAuth: true,
    }
  },
  {
    //公共
    path: '/selfassessment',
    name: 'SelfAssessment',
    component: SelfAssessment,
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/classcallroll',
    name: 'ClassCallRoll',
    component: ClassCallRoll,
    meta: {
      requireAuth: true,
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // to.query = { ...to.query, ...query }  注意不能这样直接整个赋值query，会报错
  let arr = Object.keys(from.query) // 获取须带参数对象的所有key
  for (let i = 0; i < arr.length; i++) {
    if (!to.query[arr[i]]) to.query[arr[i]] = from.query[arr[i]] // 没有带上的就赋值带上
  }
  next()
})

export default router
