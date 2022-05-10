<template>
  <div v-loading="this.$store.state.loading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading">
    <div class="addClassifyContainer">
      <el-input v-model="saveType" placeholder="请输入添加的分类" prefix-icon="el-icon-circle-plus"></el-input>
      <el-button type="primary" @click="saveBlogType" style="margin-left:20px;">添加分类</el-button>
    </div>
    <div>
      <el-table :data="typeData" height="540px">
        <el-table-column label="序号" width="180">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <!-- 分类名称 -->
        <el-table-column prop="blogTypename" label="分类名称">
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button-group>
              <!-- 编辑 -->
              <el-button type="primary" icon="el-icon-edit" @click="editStatus(scope)"></el-button>
              <!-- 修改 -->
              <el-button type="primary" icon="el-icon-delete" @click="deleteType(scope)"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑对话框 -->
    <el-dialog
        title="修改分类"
        :visible.sync="dialogVisible"
        width="30%">
        <div style="width:100%;display:flex;justify-content: center;align-items:center">
          <span>修改分类:</span>
          <el-input v-model="editData" placeholder="请输入你要修改的值" style="width:240px"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editFunction">确 定</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
    name:'AddClassify',
    data() {
      return {
        //保存分类值
        saveType:'',
        // 表格数据
        typeData:[],
        //编辑对话框状态
        dialogVisible:false,
        //编辑的值
        editData:'',
        // 修改分类名时,要穿新值旧值,将值设定,方便使用
        oldEditData:''
      }
    },
    methods: {
      //查询分类信息回调函数
      async searchType(){
        this.$store.commit('changeLoading',true)//发送请求加载Loading
        var i = await this.$ajaxGet('/blog/type')
        // 发生错误,返回
        if(i.message){
          this.$message.error('请求失败啦'+i.message)
          this.$store.commit('changeLoading',false)//发送请求加载Loading
          return;
        }
        this.typeData=i.data.data
        this.$store.commit('changeLoading',false)//发送请求加载Loading
      },
      // 添加分类
      async saveBlogType(){
        // 信息为空,返回错误
        if(this.saveType==''){
          this.$message.error('分类信息不能为空')
          return;
        }
        //请求接口后端交互
        var i = await this.$ajaxGet('/blog/saveType/'+this.saveType)
        // 请求发生错误
        if(i.message){
            this.$message.error('请求失败啦'+i.message)
            return;
        }
        //请求名称发生重复
        if(i.data==false){
          this.$message.error('分类名称已存在或不能使用')
          return;
        }
        this.$message.success('添加成功')
        //查询信息
        this.searchType()
        //清空输入的消息
        this.saveType=''
      },
      //删除分类
      async deleteType(scope){
        //获取点击到的下标,到数组下标获取值
        var typeName=this.typeData[scope.$index].blogTypename;
        // 提示是否删除
        var reslut=confirm("确定要删除"+typeName+"分类嘛")
        //点击删除
        if(reslut==true){
          var i = await this.$ajaxGet('/blog/deleteType/'+typeName)
          //发生错误返回提示
          if(i.message){
            this.$message.error('请求失败啦'+i.message)
            return;
          }
          this.$message.success('删除成功')
          this.searchType();
        }
        
      },
      //编辑对话框
      editStatus(scope){
        this.dialogVisible=true
        //获取下标到对应数组中的值
        var typeName=scope.row.blogTypename;
        // 将值复制到编辑框
        this.editData=typeName;
        // 修改值传两个参数(新值,旧值,故新增值)
        this.oldEditData=typeName;
      },
      // 编辑修改功能
      async editFunction(){
        //请求修改接口
        var i = await this.$ajaxGet(`/blog/updateType/${this.oldEditData}/${this.editData}`)
        //请求失败,返回错误信息
        if(i.message){
          this.$message.error('修改失败'+i.message)
          return ;
        }
        // 已存在分类名
        if(i.data.code==400){
          this.$message.error('该分类名称已存在')
          return ;
        }
        //请求成功
        this.$message.success('修改成功')
        //修改后关闭对话框
        this.dialogVisible=false
        //将信息更新(查询信息)
        this.searchType();
      }
    },
    mounted() {
      //挂载生命周期函数
      this.searchType()
    },
}
</script>

<style lang="less" scoped>
.addClassifyContainer{
  width: 100%;
  height: 80px;
  // background: #000;
  overflow: hidden;
  .el-input{
    width: 240px;
  }
}
</style>