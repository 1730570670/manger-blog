<template>
  <div class="home" v-loading="fullscreenLoading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-container class="OperateContrainer">
        <!-- 头部 -->
        <el-header height="80px">
          <!--头部组件-->
            <Header/>
        </el-header>
        <!-- 头部以下内容区域 -->
        <el-container class="contextContrainer">
          <!-- 左边菜单栏 -->
          <el-aside width="200px">
            <!--菜单组件-->
            <Menu class="menu"/>
          </el-aside>
          <!-- 内容县市区 -->
          <el-main>
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
  </div>
</template>

<script>
import Header from '@/components/home/Header.vue'
import Menu from '@/components/home/Menu.vue'
export default {
  name: 'HomeView',
  data() {
    return {
      //加载状态
      fullscreenLoading: false,
    }
  },
  mounted() {
    
  },
  components: {
    Header,//顶部组件
    Menu,//菜单组件
  },
  // 生命周期钩子(挂载函数)
  mounted(){
    //Header组件通信(点击退出发生Loading)
    this.$bus.subscribe('Loading',(name,res)=>{
        this.fullscreenLoading=res;
    })
  },
  beforeDestroy() {
    this.$bus.unsubscribe('Loading')
  },
}
</script>

<style lang="less" scoped>
.home{
  height: 100%;
  // 菜单容器
  .OperateContrainer{
    height: 100%;
    // 头部区域
    .el-header{
        background-color: #2C3E50;
    }
      // 菜单栏区域
    .el-aside {
      background: #545c64;
    }
    // 内容显示区域
    .el-main {
      background-color: #E9EEF3;
    }
  }
  
}

</style>
