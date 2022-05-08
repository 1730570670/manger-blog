<template>
  <div>
      <div class="blogInfo">
        <el-table
            :data="blogInfoData"
            style="width: 100%">
            <!-- 数据表格 -->
            <!-- 用户ID -->
            <el-table-column
                prop="blogId"
                label="用户ID"
                width="180">
            </el-table-column> 
            <!-- 博客ID -->
            <el-table-column
                prop="blogTitle"
                label="标题"
                width="180">
            </el-table-column>
            <!-- 博客信息 -->
            <el-table-column
                prop="blogContent"
                show-overflow-tooltip
                label="内容">
            </el-table-column>
            <!-- 博客头像 -->
            <el-table-column
                label="头像"
                width="180">
                <template slot-scope="scope">
                  <img width="100px" height="50px" :src="blogInfoData[scope.$index].blogImgUrl" alt="">
                </template>
            </el-table-column>
            <!-- 创建时间 -->
            <el-table-column
                prop="blogCreateTime"
                label="创建时间"
                width="180">
            </el-table-column>
            <!-- 博客分类 -->
            <el-table-column
                prop="blogType.blogTypename"
                label="分类"
                width="180">
            </el-table-column>  
              <!-- 操作者 -->
            <el-table-column
                prop="blogOperate"
                label="操作者"
                width="180">
            </el-table-column>      
          </el-table>
          <span>共有&nbsp;<font color="#409EFF">{{pageSum}}</font>&nbsp;条数据,
          本页有<font color="#409EFF">{{thisPageCurrent}}</font>条数据</span>
      </div>
      <!-- 分页组件 -->
      <div class="pageTemplate">
          <el-pagination
            @current-change="pageSend"
            :background="true"
            layout="prev, pager, next"
            :total="pageCurrent*10">
          </el-pagination>
      </div>
  </div>
</template>

<script>
export default {
    name:'UpdateContext',
    data() {
      return {
        //博客信息,通过接口获取信息
        blogInfoData:[],
        // 共有几页
        pageCurrent:0,
        //共有的数据,通过后台获取
        pageSum:0,
        //本页数量
        thisPageCurrent:0
      }
    },
    methods: {
      //分页组件发送请求
      async pageSend(index){
        var i = await this.$ajaxMethod('post','/blog/'+index,{})
        //请求发生了错误,返回错误信息
        if(i.message){
          this.$message.error('请求发生错误啦'+i.message)
          return ;
        }
        
        this.pageCurrent=i.data.data.pages//赋值页数
        this.pageSum=i.data.data.total//赋值共有多少条数据
        this.thisPageCurrent=i.data.data.records.length//赋值本页多少条数据
        //格式化时间
        i.data.data.records.forEach(item => {
          item.blogCreateTime=this.$formatDate(item.blogCreateTime);
        });
        
        this.blogInfoData=i.data.data.records//赋值
      },
    },
    mounted() {
      //挂载时触发分页查询事件
      this.pageSend(1);
    },
}
</script>

<style>
.blogInfo{
  height: 560px;
}
</style>