import { request } from "./request";

//登录页面和修改密码页面使用 返回姓名，和是否是学委
export function isLogin(username, password) {
  return request({
    url: 'http://test.linlicheng.kooboo.site/LoginCheck?username=' + username + '&password=' + password
  })
}
//获得课程数据，在课程表页面使用
export function getClass1(stdId, term) {
  return request({
    url: 'http://test.linlicheng.kooboo.site/getclass?stdNum=' + stdId + '&term=' + term
  })
}

export function getClass(stuId, classTerm) {
  return request({
    url: '	http://zh.zhihao.kooboo.site/moblieClass/getClassSchedule?stuId=' + stuId + '&classTerm=' + classTerm
  })
}
//家长登录调用
export function isParentLogin(pUserName, password) {
  return request({
    url: 'http://zh.zhihao.kooboo.site/mobileLogin?pUserName=' + pUserName + '&password=' + password
  })
}
export function isStdLogin(stuId, password) {
  return request({
    url: '	http://zh.zhihao.kooboo.site/stdMobileLogin?stuId=' + stuId + '&password=' + password
  })
}
// ?stuId=1925102000&password=123456
// ?newpassword=123&username=p1925102000
//修改家长的密码
export function alterParPwd(username, newpassword) {
  return request({
    url: '	http://zh.zhihao.kooboo.site/mobileAtlerParPwd?newpassword=' + newpassword + '&username=' + username
  })
}
export function alterStuPwd(username, newpassword) {
  return request({
    url: 'http://zh.zhihao.kooboo.site/moblieAlterStuPsw?newpassword=' + newpassword + '&username=' + username
  })
}
//拿到培养建议
export function getCultivateSuggestionlist(stuId) {
  return request({
    url: '	http://test.linlicheng.kooboo.site/cultivatesuggestion?stuId=' + stuId
  })
}
export function cultivateSuggestionRemove(SuggestionId) {
  return request({
    url: '	http://test.linlicheng.kooboo.site/cultivatesuggestionremove?SuggestionId=' + SuggestionId
  })
}
export function getGrowNotice(stuId) {
  return request({
    url: '	http://test.linlicheng.kooboo.site/growthnotice?stuId=' + stuId
  })
}
export function growNoticeRemove(noticeId) {
  return request({
    url: 'http://test.linlicheng.kooboo.site/growthnoticeremove?noticeId=' + noticeId
  })
}
export function getTodayClass(classDay, classTerm) {
  return request({
    url: 'http://zh.zhihao.kooboo.site/MobileEnrol/getTodayClass?classDay=' + classDay + '&classTerm=' + classTerm
  })
}
export function getSturecentList() {
  return request({
    url: 'http://test.linlicheng.kooboo.site/sturecent'
  })
}
export function sturecentRemove() {
  return request({
    url: 'http://test.linlicheng.kooboo.site/sturecentremove?id=' + id
  })
}
export function getPsychoWarninglist() {
  return request({
    url: 'http://test.linlicheng.kooboo.site/psychowarning'
  })
}
export function psychoWarningRemove(id) {
  return request({
    url: "http://test.linlicheng.kooboo.site/psychowarningremove?id=" + id
  })
}
export function getStudentcareList() {
  return request({
    url: 'http://test.linlicheng.kooboo.site/studentcare',
  })
}
export function studentCareRemove(id) {
  return request({
    url:"http://test.linlicheng.kooboo.site/studentcareremove?id=" + id
  })
}