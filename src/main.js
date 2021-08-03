import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MobileHeader from './components/MobileHeader.vue'
import UserInfo from './components/UserInfo.vue'
import HomeItem from './components/HomeItem.vue'
import { Button } from 'vant';
import { Icon } from 'vant';
import 'vant/lib/index.css'
import { Field } from 'vant';
import { Form } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Popup } from 'vant';
import { DropdownMenu, DropdownItem } from 'vant';
import { Pagination } from 'vant';
import { Dialog } from 'vant';

Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Popup);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Form);
Vue.use(Field);
Vue.use(Icon);
Vue.use(Button);

Vue.config.productionTip = false

Vue.component("mobile-header",MobileHeader)
Vue.component("user-info",UserInfo)
Vue.component("home-item",HomeItem)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
