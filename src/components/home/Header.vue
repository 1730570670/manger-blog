<template>
  <div class="headContainer">
      <h3>你好:<font color="#409EFF">{{userName}}</font>,欢迎使用!</h3>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 退出登录 -->
      <div class="backLogin">
        <el-button type="primary" @click="backLogin">退出登录</el-button>
      </div>
  </div>
</template>

<script>
export default {
    name:'Header',
    data() {
      return {
        userName:localStorage.getItem("userName"),
      }
    },
    methods: {
      //退出登录
      async backLogin(){
         //loading加载(组件通信)
         this.$bus.publish('Loading',true);
         //发送请求
         var i =await this.$ajaxGet("/login")
         //发生错误
         if(i.message){
           this.$message.error("请求失败"+i.message)
           this.$bus.publish('Loading',false);
           return ;
         }
         //成功退出
        localStorage.removeItem("userName")//清除登陆记录
        //loading加载1500毫秒
        setTimeout(()=>{
          //跳转路由(登录)
          this.$router.push({
            path:'/'
          })
          //提示信息
          this.$message.success("退出成功")
        },1500)
      }
    },
}
</script>

<style lang="less" scoped>
.headContainer{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  .el-icon-arrow-right{
    margin-left: 20px;
    cursor: pointer;
  }
  .backLogin{
    position: fixed;
    right: 50px;
    width: 80px;
    height: 40px;
  }
  
}
</style>