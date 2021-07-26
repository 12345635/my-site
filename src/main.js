import Vue from 'vue'
import App from './App.vue'
import "./styles/global.less"
import router from "@/router"
import {showMessage} from "@/utils"
import "@/mock"
import {loading} from "@/directive"
import "@/eventBus"
import { layz } from "./directive"
import store from "@/store"
Vue.directive("Loading",loading);
Vue.directive("layz",layz);
Vue.prototype.$showMessage = showMessage;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')