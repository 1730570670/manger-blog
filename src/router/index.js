import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    // 重定向页面
    {
      path:'/',
      redirect:'/login',
    },
    // 登陆
    {
      path: '/login',
      name: 'login',
      component:  () => import('../views/LoginView.vue')
    },
    // 主页
    {
      path: '/home',  
      component:  HomeView,
      children:[
        // 个人信息
        {
          path:'/',
          name:'userInfo',
          component:()=>import('@/components/userInfo/UserInfo.vue')
        },
        // 添加分类
        {
          path:'/home/addClassify',
          name:'addClassify',
          component:()=>import('@/components/addClassify/AddClassify.vue')
        },
        // 发布文章
        {
          path:'/home/pubContext',
          name:'pubContext',
          component:()=>import('@/components/pubContext/PubContext.vue')
        },
        // 分类管理
        {
          path:'/home/updateClassify',
          name:'updateClassify',
          component:()=>import('@/components/updateClassify/UpdateClassify.vue')
        },
        // 文章管理
        {
          path:'/home/updateContext',
          name:'updateContext',
          component:()=>import('@/components/updateContext/UpdateContext.vue')
        }
      ]
    }
  ]
})
// 路由守卫
// router.beforeEach((to, from, next) => {
//   console.log(to);
//   console.log(from);
//   next();
// })

export default router
