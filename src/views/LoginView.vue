<template>
  <div class="loginContainer">
    <!-- 登录组件 -->
      <div class="loginItem">
        <el-form :model="loginDate" :rules="rules" ref="formLogin">
          <h2 style="margin-bottom:30px;">欢迎使用博客管理系统</h2>
          <!-- 用户名 -->
          <el-form-item prop="username">
              <el-input prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="loginDate.username"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="userpassword">
              <el-input show-password prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="loginDate.userpassword"></el-input>
          </el-form-item>
            <!-- 提交注册按钮 -->
          <el-form-item>
              <el-button type="primary" :loading="rules.loading" @click="submitForm" plain>登录</el-button>
          </el-form-item>
          <el-link>点我注册</el-link>
      </el-form>
      </div>
      <BgTemplate/>
  </div>
</template>

<script>
import BgTemplate from '@/components/loginConponent/BgTemplate.vue';//引入背景组件

export default {
  name:'LoginView',
  data() {
    return {
      loginDate:{
        username:'Test',
        userpassword:'123456'
      },
      // 表单验证
      rules:{
        //按钮加载动画 
        loading:false,
        // 验证用户名
        username:[
          {required:true,message:'请输入用户名',trigger:'blur'},
          {min:4,max:20,message:'长度在1-5字符之间',trigger:'blur'}
        ],
        // 验证密码
        userpassword:[
          {required:true,message:'请输入密码',trigger:'blur'},
        ]
      }
    }
  },
  methods: {
    async login(){
      // 发送异步请求
      var i = await this.$ajaxPost(`/login/${this.loginDate.username}/${this.loginDate.userpassword}`)
      //未联网,接口错误返回
      if(i.message){
          this.loading=true
          this.$message.error('请求错误:'+i.message);
          this.rules.loading=false//取消按钮加载
        return;
      }
      //登陆失败(账号密码错误)
      if(i.data.code==400){
        this.$message.error('用户名或密码错误');
        this.rules.loading=false//取消按钮加载
        return;
      }
      //登陆成功
      if(i.data.code==200){
        //将信息存进浏览器自身储存(检测信息直接进入,直到退出)
        localStorage.setItem("userName",i.data.data);
        // 跳转路由
        this.$router.push({
          path:'/home/'
        })
        // 提示信息
        this.$message.success("登陆成功")
        return;
      }
    },
    // 表单提交事件
    submitForm(){
      // 判断表单验证是否成功
      this.$refs['formLogin'].validate((validate)=>{
        this.rules.loading=true
        //通过验证
        if(validate){
            setTimeout(()=>{
              this.login();//调用登陆方法  
              return;
            },1500)
        }
    })
    },
    // 添加访客(每个人进来都要添加记录,且挂载时创建)
    async addVisitor(){
      var Ip=returnCitySN['cip']
      var cityname=returnCitySN['cname']
      var i = await this.$ajaxMethod('post','/ipAddress',{
          ipAddress:Ip,
          areaAddress:cityname
      })
      if(i.message){
        this.$message.error('请联系管理员')
        return;
      }
    }
  },
  // 组件
  components:{
    BgTemplate
  },
  mounted() {
    this.addVisitor()
  },
}
</script>

<style lang="less" scope>
// 使盒子居中
  .loginContainer{
    background: url('https://pic1.zhimg.com/v2-22de238940c7059dbe8963f4c893083f_r.jpg?source=1940ef5c');
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // 表单内组件(弹性布局居中)
    .loginItem{
      z-index: 999;
      width: 600px;
      height: 350px;
      background: white;
      background-color:rgba(0,0,0,0.2);
      // opacity: 0.4;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-input,.el-button{
        width: 240px;
        background-color:rgba(0,0,0,0.3) ;
      }
      // 注册link样式
      .el-link{
        position: relative;
        left: 355px;
        top: 35px;
      }
    }
  }
</style>>

