<template>
  <div>
      <div class="info">
          <el-table
            :data="frontVisitorInfo"
            style="width: 100%">
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
          <span>共有&nbsp;<font color="#409EFF">{{pageSum}}</font>&nbsp;条数据</span>
      </div>
      <div class="pageTemplate">
          <el-pagination
            @current-change="pageSend"
            background
            layout="prev, pager, next"
            :total="pageCurrent*10">
          </el-pagination>
      </div>
  </div>
</template>

<script>
export default {
    name:'FrontVisitor',
    data() {
        return {
            //查询出来的信息储存在此处
            frontVisitorInfo:[],
            //共有多少页数
            pageCurrent:0,
            //共有多少条数据
            pageSum:0
        }
    },
    methods: {
        //点击分页发送查询请求
        async pageSend(index){
            var i = await this.$ajaxGet('/ipAddress/front/'+index)
            //请求发生错误,返回
            if(i.message){
                this.$message.error('请求出错啦'+i.message)
                return;
            }
            this.pageCurrent=i.data.data.pages;//赋值 最大页数
            this.pageSum=i.data.data.total//共有多少条数据
            //格式化时间
            i.data.data.records.forEach(item => {
                item.visitorTime=this.$formatDate(item.visitorTime); 
            });
            this.frontVisitorInfo=i.data.data.records//表格数据赋值
        }
    },
    mounted() {
        //挂载是加载分页查询页数为1
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