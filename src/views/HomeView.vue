<template>
  <div class="home">
      <el-container class="OperateContrainer">
        <!-- 头部 -->
        <el-header>Header</el-header>
        <!-- 头部以下内容区域 -->
        <el-container class="contextContrainer">
          <!-- 左边菜单栏 -->
          <el-aside width="200px">
            <!-- 菜单 -->
            <el-menu class="el-menu-vertical-demo" background-color="#545c64" :router="true"
              text-color="#fff" active-text-color="#409EFF" default-active="/home/">
              <!-- 菜单选项 -->
              <el-submenu :index="item.index" v-for="(item,index) in menuTitle" :key="index">
                <template slot="title" width="100%">
                  <!-- 选项图标 -->
                  <i :class="item.icon"></i>
                  <!-- 选项标题 -->
                  <span>{{item.label}}</span>
                </template>
                <el-menu-item-group v-if="item.children">
                  <!-- 子选项,判断数据中书否含有子数据 -->
                  <el-menu-item :index="ls.index" v-for="(ls,index) in item.children" :key="index">
                    <!-- 子选项图标 -->
                    <i :class="ls.icon"></i>
                    <!-- 子选项标题 -->
                    <span>{{ls.label}}</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
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

export default {
  name: 'HomeView',
  data() {
    return {
      // 导航栏标题等信息
      menuTitle:[
        {
          label:"个人信息",
          index:"/",
          icon:"el-icon-user",
          children:[
            {
              label:"修改信息",
              index:"/home/",
              icon:"el-icon-s-data"
            }
          ]
        },
        {
          label:"发布信息",
          icon:"el-icon-postcard",
          index:"1-2",
          children:[
            {
              label:"添加分类",
              index:"/home/addClassify",
              icon:"el-icon-s-operation"
            },
            {
              label:"发布文章",
              index:"/home/pubContext",
              icon:"el-icon-tickets"
            }
          ]
        }, 
        {
          label:"修改信息",
          index:"1-3",
          icon:"el-icon-edit-outline",
          children:[
            {
              label:"分类管理",
              index:"/home/updateClassify",
              icon:"el-icon-s-operation"
            },
            {
              label:"文章管理",
              index:"/home/updateContext",
              icon:"el-icon-edit"
            }
          ]
        }
      ]
    }
  },
  mounted() {
    
  },
  components: {

  }
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
        background-color: #B3C0D1;
    }
      // 菜单栏区域
    .el-aside {
      .el-menu{
        height: 100%;
        border: none;
        border-right-width: 0;
      }
    }
    // 内容显示区域
    .el-main {
      background-color: #E9EEF3;
    }
  }
  
}

</style>
