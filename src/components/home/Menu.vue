<template>
  <div>
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
  </div>
</template>

<script>
export default {
    name:'Menu',
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
          label:"查看信息",
          index:"1-3",
          icon:"el-icon-edit-outline",
          children:[
            {
              label:"前台浏览记录",
              index:"/home/frontVisitor",
              icon:"el-icon-document"
            },
            {
              label:"后台浏览记录",
              index:"/home/mangerVisitor",
              icon:"el-icon-document"
            },
            {
              label:"文章管理",
              index:"/home/updateContext",
              icon:"el-icon-edit"
            }
          ]
        }
      ],
    }
  },
}
</script>

<style scoped lange="less">
.el-menu{
    border: none;
}
</style>