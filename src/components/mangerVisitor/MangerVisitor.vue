<template>
  <div  v-loading="this.$store.state.loading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading">
      <div class="info">
        <el-table
            :data="mangerVisitorInfo"
            style="width: 100%">
            <!-- 数据表格 -->
            <el-table-column
                prop="mangerId"
                label="用户ID"
                width="180">
            </el-table-column>
            <el-table-column
                prop="ipAddress"
                label="IP地址">
            </el-table-column>
            <el-table-column
                prop="areaAddress"
                label="访问位置">
            </el-table-column>
            <el-table-column
                prop="visitorTime"
                label="访问时间">
            </el-table-column>
          </el-table>
          <span>共有&nbsp;<font color="#409EFF">{{pageInfo.pageSum}}</font>&nbsp;条数据,
          本页有<font color="#409EFF">{{pageInfo.thisPageCurrent}}</font>条数据</span>
      </div>
      <!-- 分页组件 -->
      <div class="pageTemplate">
          <el-pagination
            @current-change="pageSend"
            :background="true"
            layout="prev, pager, next"
            :total="pageInfo.pageCurrent*10">
          </el-pagination>
      </div>
  </div>
</template>

<script>
export default {
    name:'MangerVisitor',
    data() {
        return {
            //查询出来的信息储存在此处
            mangerVisitorInfo:[],
            //页数,数据,本页多少条数据
            pageInfo:{
                //共有多少页数
                pageCurrent:0,
                //共有多少条数据
                pageSum:0,
                //本页有多少条数据
                thisPageCurrent:0
            }
        }
      },
      methods: {
          //点击分页发送查询请求
        async pageSend(index){ 
            this.$store.commit('changeLoading',true)//发送请求加载Loading
            var i = await this.$ajaxGet('/ipAddress/manger/'+index)
            //请求发生错误,返回
            if(i.message){
                this.$message.error('请求出错啦'+i.message)
                this.$store.commit('changeLoading',false)//发送请求加载Loading
                return;
            }
            this.pageInfo.pageCurrent=i.data.data.pages;//赋值 最大页数
            this.pageInfo.pageSum=i.data.data.total//共有多少条数据
            this.pageInfo.thisPageCurrent=i.data.data.records.length//赋值本页多少数据
            //格式化时间
            i.data.data.records.forEach(item => {
                item.visitorTime=this.$formatDate(item.visitorTime); 
            });
            this.mangerVisitorInfo=i.data.data.records//表格数据赋值
            this.$store.commit('changeLoading',false)//发送请求加载Loading
        },
         
      },
      mounted() {
          //挂载时加载分页查询事件
          this.pageSend(1)
      },
}
</script>

<style lang="less" scoped>
.info{
    width: 100%;
    height: 580px;
}
</style>