import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //相当于子组件中的数据，专门放全局的数据
  state: {
    username: localStorage.getItem('username')||'?',
    realName: localStorage.getItem('realname')||'?',
    password: localStorage.getItem('password')||'?',
    isCommitee:localStorage.getItem('isCommitee')||false,
    identity:localStorage.getItem('identity'),
    childId:localStorage.getItem('childId')||'',
    userInfo: {},
  },
  //相当于组件内部的computed，getters是全局的
  getters: {
    getUserName: state => {
      return state.username
    },
    getRealName: state => {
      return state.realName
    },
    getPwd: state => {
      return state.password
    },
    getIsCommitee:state =>{
      return state.isCommitee
    },
    getIdentity: state => {
      return state.identity
    },
    getChildId:state => {
      return state.childId
    },
  },
  //相当于组件中的methods，但是它不能使用异步方法
  mutations: {
    setName(state, userName) {
      state.username = userName;
      localStorage.setItem('username',userName);
    },
    setRealName(state, name) {
      state.realName = name;
      localStorage.setItem('realname',name);
    },
    setPwd(state, pwd) {
      state.password = pwd;
      localStorage.setItem('password',pwd);
    },
    setUserInfo(state,user){
      state.userInfo = user;
    },
    setIsCommitee(state,iscommitee){
      state.isCommitee = iscommitee;
      localStorage.setItem('isCommitee',iscommitee);
    },
    setIdentity(state,identity){
      state.identity = identity;
      localStorage.setItem('identity',identity);
    },
    setChildId(state,childId){
      state.childId = childId;
      localStorage.setItem('childId',childId);
    }
  },
  //专门来处理异步，实际修改状态的还是mutations
  actions: {
    setNameAsy(context, name) {
      context.commit('setName', name)
    },
    setRealNameAsy(context, name) {
      context.commit('setRealName', name)
    },
    setPwdAsy(context, pwd) {
      context.commit('setPwd', pwd)
    },
    setIsCommiteeAsy(context, iscommitee){
      context.commit('setIsCommitee',iscommitee)
    },
    setIdentityAsy(context,identity){
      context.commit('setIdentity',identity)
    },
    setChildIdAsy(context,childId){
      context.commit('setChildId',childId)
    },
  },
  modules: {
  }
})
