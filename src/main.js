import Vue from 'vue'
import App from './App.vue'
import router from './router';//引入路由
import store from './store';//引入Vuex
import ElementUI from 'element-ui';//引入ElementUI
import 'element-ui/lib/theme-chalk/index.css';//导入ElementUI全局样式
import axiox from "axios";//引入axios

// 注册axios全局插件
Vue.prototype.$axios=axiox;

Vue.use(ElementUI);//使用ElementUI组件

// 关闭Vue控制台提示
Vue.config.productionTip = false

import VueRouter from 'vue-router';
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App)
})
