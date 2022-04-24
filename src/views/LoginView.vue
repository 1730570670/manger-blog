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
          <el-form-item prop="password">
              <el-input show-password prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="loginDate.password"></el-input>
          </el-form-item>
            <!-- 提交注册按钮 -->
          <el-form-item>
              <el-button type="primary" @click="submitForm" plain>登录</el-button>
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
        username:'',
        password:''
      },
      // 表单验证
      rules:{
        // 验证用户名
        username:[
          {required:true,message:'请输入用户名',trigger:'blur'},
          {min:4,max:20,message:'长度在1-5字符之间',trigger:'blur'}
        ],
        // 验证密码
        password:[
          {required:true,message:'请输入密码',trigger:'blur'},
        ]
      }
    }
  },
  methods: {
    // 表单提交事件
    submitForm(){
      // 判断表单验证是否成功
      this.$refs['formLogin'].validate((validate)=>{
        console.log(validate);
      });
    }
  },
  // 组件
  components:{
    BgTemplate
  }
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

