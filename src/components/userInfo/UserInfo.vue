<template>
  <div class="container">
     <div class="UserInfoContainer" v-if="UserInfo">
       <el-card v-for="item,key,index in UserInfo" :key="index">
        <el-tag>{{key}}</el-tag>
        <span class="spanContext">{{item}}</span>
       </el-card>
       <el-button type="primary" style="width:100%;margin-top:30px" @click="drawerStatus=true">修改信息</el-button>
     </div>

     <!-- 编辑抽屉对话框 -->
       <el-drawer
        title="修改信息"
        :visible.sync="drawerStatus" :before-close="handleClose">
          <div class="drawerDiv" style="margin-top:200px">
            <el-tag>userName</el-tag><el-input v-model="UserInfo.userName"></el-input>
              <br>
            <el-tag>penguin</el-tag><el-input v-model="UserInfo.penguin"></el-input>
              <br>
            <el-tag>weChat</el-tag><el-input v-model="UserInfo.weChat"></el-input>
              <br>
            <el-tag>email</el-tag><el-input v-model="UserInfo.email"></el-input>
              <br>
            <el-button style="width:100%;margin-top:50px" @click="editInfo">修改</el-button>
          </div>
      </el-drawer>
  </div>
</template>

<script>
export default {
    name:'UserInfo',
    data() {
      return {
        //前台显示信息,通过后台信息
        UserInfo:{},
        //点击编辑信息时,编辑信息对话框打开状态
        drawerStatus:false
      }
    },
    methods: {
     //查询前台显示信息
      async searchUserInfo(){
        this.$store.commit('changeLoading',true)//发送请求加载Loading
        var i = await this.$ajaxGet('/AdminInfo')
        //请求发生错误
        if(i.message){
          this.$message.errer('请求发生错误啦'+i.message)
          this.$store.commit('changeLoading',false)//发送请求加载Loading
          return;
        }
        this.UserInfo=i.data.data
        this.$store.commit('changeLoading',false)//发送请求加载Loading
      },
      //修改信息
      async editInfo(){
        //获取信息
        var userName=this.UserInfo.userName
        var penguin=this.UserInfo.penguin
        var weChat=this.UserInfo.weChat
        var email=this.UserInfo.email
        var i =await this.$ajaxPost(`/AdminInfo/${userName}/${penguin}/${weChat}/${email}`);
        //发生错误返回
        if(i.message){
          this.$message.error('请求发生错误啦'+i.message)
          return;
        }
        //未发生错误
        this.$message.success('修改成功')
        this.searchUserInfo()
        this.drawerStatus=false
      },
      //修改信息关闭面板
      handleClose(){
        this.searchUserInfo()
        this.drawerStatus=false
      }
    },
    mounted() {
      this.searchUserInfo()
    },
}
</script>

<style scoped>
/* 组件容器 */
.container{
  height: 100%;
  display: flex;
  align-items: center;
}
/* 装信息用的容器 */
.UserInfoContainer{
  width: 100%;
}
/* 标签标题 */
.el-tag{
  width: 80px;
  text-align: center;
}
/* 内容 */
.spanContext{
  margin-left: 20px;
}

.el-drawer .el-input{
  width: 240px;
  margin-left: 100px;
}
</style>