import Vue from 'vue'
import App from './App.vue'
import router from './router';//引入路由
import store from './store';//引入Vuex
import ElementUI from 'element-ui';//引入ElementUI
import 'element-ui/lib/theme-chalk/index.css';//导入ElementUI全局样式
import axiox from "axios";//引入axios
import Pubsub from 'pubsub-js'//组件通信组件
import "animate.css";//引入animat动画样式
Vue.prototype.$axios=axiox;
//注册组件通信组件
Vue.prototype.$bus=Pubsub;

Vue.use(ElementUI);//使用ElementUI组件

// 关闭Vue控制台提示
Vue.config.productionTip = false

import VueRouter from 'vue-router';
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
//将封装的axios进行全局使用
import {ajaxGet,ajaxPost,ajaxMethod} from './http/axios'
Vue.prototype.$ajaxGet=ajaxGet;
Vue.prototype.$ajaxPost=ajaxPost;
Vue.prototype.$ajaxMethod=ajaxMethod;
import FormatDate from '@/common/formatDate'//引入格式化时间函数
//注册格式化时间函数
Vue.prototype.$formatDate=FormatDate;
// markdown
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
Vue.use(mavonEditor);
// showdown
import showdown from 'showdown';
Vue.prototype.converter = new showdown.Converter();

new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App)
})
