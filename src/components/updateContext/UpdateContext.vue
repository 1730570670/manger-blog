<template>
  <div v-loading="this.$store.state.loading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading">
      <transition  enter-active-class="animate__animated animate__zoomInDown" appear>
        <div class="blogInfo" v-if="!editStatus">
          <el-table 
              :data="blogInfoData" height="540px"
              style="width: 100%">
              <!-- 数据表格 -->
              <!-- 用户ID -->
              <el-table-column
                  prop="blogId"
                  label="用户ID"
                  width="80">
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
                  show-overflow-tooltip width="280"
                  label="内容">
              </el-table-column>
              <!-- 博客头像 -->
              <el-table-column
                  label="头像"
                  width="180">
                  <template slot-scope="scope">
                    <img width="100px" height="100px" :src="blogInfoData[scope.$index].blogImgUrl" alt="图片加载失败">
                  </template>
              </el-table-column>
              <!-- 创建时间 -->
              <el-table-column
                  prop="blogCreateTime"
                  label="创建时间" width="180px">
              </el-table-column>
              <!-- 博客分类 -->
              <el-table-column
                  prop="blogType.blogTypename"
                  label="分类">
              </el-table-column>  
                <!-- 操作者 -->
              <el-table-column
                  prop="blogOperate"
                  label="操作者">
              </el-table-column>      
              <!-- 操作 -->
              <el-table-column
                  label="操作"
                  align="center"
                  width="180">
                  <template slot-scope="scope">
                    <el-button-group>
                    <el-button type="primary" icon="el-icon-edit" @click="updateBlog(scope)"></el-button>
                    <el-button type="primary" icon="el-icon-delete" @click="deleteBlog(scope)"></el-button>
                  </el-button-group>
                  </template>
              </el-table-column>
            </el-table>
            <!-- 分页信息 -->
            <span>共有&nbsp;<font color="#409EFF">{{pageInfo.pageSum}}</font>&nbsp;条数据,
            本页有<font color="#409EFF">{{pageInfo.thisPageCurrent}}</font>条数据</span>
        </div>
      </transition>

      <transition  enter-active-class="animate__animated animate__fadeInDown">
        <!-- 编辑面板 -->       
        <!-- markdown编辑器 -->
        <div class="editDiag" v-if="editStatus">
          <!-- 文章标题区域 -->
          <div class="contextTitle">
            <span>文章标题:</span>
            <el-input prefix-icon="el-icon-s-comment" v-model="editInfo.blogTitle" placeholder="请输入文章的标题"></el-input>
            
          </div>
          
          <!-- 文章分类 -->
          <div class="classIfy">
            <span>选择分类:</span>
              <el-select  v-model="editInfo.blogType.blogTypename" placeholder="请选择">
                <el-option
                  v-for="item in classItem"
                  :key="item.blogTypename"
                  :label="item.blogTypename"
                  :value="item.blogTypename">
                </el-option>
              </el-select>
          </div>
          <!-- 上传头像 -->
          <div class="imgUpload">
            <span>上传图片:</span>
            <el-upload
              class="avatar-uploader"
              action="http://localhost:8089/upload/success"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="editInfo.blogImgUrl" :src="editInfo.blogImgUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <mavon-editor v-model="editInfo.blogContent" :toolbars="toolbars"/>
          <el-button type="primary" @click="editBlogInfo" style="margin-top:10px;">修改文章</el-button>
          <el-button type="primary" @click="editStatus=false" plain>取消编辑</el-button>
        </div>
      </transition>

      <transition  enter-active-class="animate__animated animate__zoomInDown">
        <!-- 分页组件 -->
        <div class="pageTemplate"  v-if="!editStatus">
            <el-pagination
              @current-change="pageSend" background
              layout="prev, pager, next"
              :total="pageInfo.pageCurrent*10">
            </el-pagination>
        </div>
      </transition>
      
  </div>
</template>

<script>
export default {
    name:'UpdateContext',
    data() {
      return {
        //博客信息,通过接口获取信息
        blogInfoData:[],
        //分页相关信息
        pageInfo:{
          // 共有几页
          pageCurrent:0,
          //共有的数据,通过后台获取
          pageSum:0,
          //本页数量
          thisPageCurrent:0,
          // 查询第几页
          searchPageIndex:0
        },
        // 编辑面板状态
        editStatus:false,
        //markdown的功能
        toolbars: {
            bold: true, // 粗体
            italic: true, // 斜体
            header: true, // 标题
            underline: true, // 下划线
            mark: true, // 标记
            superscript: true, // 上角标
            quote: true, // 引用
            ol: true, // 有序列表
            link: true, // 链接
            imagelink: true, // 图片链接
            help: true, // 帮助
            code: true, // code
            subfield: false, // 是否需要分栏
            fullscreen: true, // 全屏编辑
            readmodel: true, // 沉浸式阅读
            undo: true, // 上一步
            trash: true, // 清空
            save: true, // 保存（触发events中的save事件）
            navigation: true // 导航目录
        },
        ///获取的分类
        classItem:[],
        //编辑信息(Session会话中拿值),点击修改信息Session会话将信息存入,在获取,将信息转换为JSON数据格式
        editInfo:{},
      }
    },
    methods: {
      //分页组件发送请求
      async pageSend(index){
        this.$store.commit('changeLoading',true)//发送请求加载Loading
        var i = await this.$ajaxMethod('post','/blog/'+index,{})
        //请求发生了错误,返回错误信息
        if(i.message){
          this.$message.error('请求发生错误啦'+i.message)
          this.$store.commit('changeLoading',false)
          return ;
        }
        //将相关信息赋值
        this.pageInfo.searchPageIndex=i.data.data.current//赋值第几页
        this.pageInfo.pageCurrent=i.data.data.pages//赋值页数
        this.pageInfo.pageSum=i.data.data.total//赋值共有多少条数据
        this.pageInfo.thisPageCurrent=i.data.data.records.length//赋值本页多少条数据
        //格式化时间
        i.data.data.records.forEach(item => {
          item.blogCreateTime=this.$formatDate(item.blogCreateTime);
        });
        this.blogInfoData=i.data.data.records//赋值
        this.$store.commit('changeLoading',false)
      },
      //删除博客
      async deleteBlog(scope){
        var blogID=scope.row.blogId;//获取点击删除列的信息ID
        var i = await this.$ajaxPost('/blog/deleteBlog/'+blogID)//发送请求
        //请求发生错误,返回错误信息
        if(i.message){
          this.$message.error('请求发生错误啦'+i.message)
          return;
        }
        //未发生错误
        this.$message.success('删除成功')
        this.pageSend(this.pageInfo.searchPageIndex)//查询(在第几页,返回第几页)
      },
      // 打开修改信息面板
      updateBlog(scope){
        this.editStatus=true//切换到编辑状态
        //将信息存进Session中,以便编辑时获取信息
        sessionStorage.setItem("editBlogInfo",JSON.stringify(scope.row))
        //将信息赋值给data
        this.editInfo=JSON.parse(sessionStorage.getItem('editBlogInfo'))
      },
       //上传图片成功之后的回调
      handleAvatarSuccess(res, file) {
        this.file = URL.createObjectURL(file.raw);
        this.$message.success('上传博客头像成功')
      },
      //上传图片过程中的回调
      async beforeAvatarUpload(file) {
        const isJPG1 = file.type === 'image/png';//规定格式
        const isJPG2 = file.type === 'image/jpeg';//规定格式
        const isLt2M = file.size / 1024 / 1024 < 2;//规定大小
        //不符合图片规则
        if (!isJPG1 && !isJPG2) {
          this.$message.error('上传头像图片只能是 JPG以及PNG 格式!');
          return ;
        }
        //超过大小
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return ;
        }
        var fd=new FormData()
        fd.append('file',file)
        // 上传头像
        this.$axios.post('http://localhost:8089/upload',fd).then(res=>{
          //上传成功将头像的url替换
          this.editInfo.blogImgUrl=res.data.path;
        }).catch(err=>{
          this.$message.error("上传失败,请检查图片是否符合标准")
        }) 
        return isJPG1 && isJPG2 && isLt2M;
      },
      // MarkDown编辑功能
      async editBlogInfo(){
        var htmlContent = this.converter.makeHtml(this.editInfo.blogContent)
        var i = await this.$ajaxMethod('post','/blog/updateBlog/'+this.editInfo.blogId,{
           blogContent:htmlContent,
           blogImgUrl:this.editInfo.blogImgUrl,
           blogType:this.editInfo.blogType.blogTypename,
           blogTitle:this.editInfo.blogTitle
        })
        //请求出错,返回错误信息
        if(i.message){
          this.$message.error('请求出错啦'+i.message)
          return;
        }
        //未发生错误
        this.pageSend(this.pageInfo.searchPageIndex)//查询信息
        this.$message.success('修改成功')
        this.editStatus=false//修改完成将面板切换为查询状态
      },
       // 发送请求,请求博客分类的信息
      async classItemRequest(){
        var i =await this.$ajaxGet("/blog/type")
        //发生了错误
        if(i.message){
          this.$message.error('分类请求发生了错误'+i.message)
          return ;
        }
        //请求的信息赋值给本地
        this.classItem=i.data.data
      },
    },
    mounted() {
      //挂载时触发分页查询事件
      this.pageSend(1);
      //触发请求分类
      this.classItemRequest();
    },
}
</script>

<style lang="less">
.blogInfo{
  height: 560px;
}
// 标题
.contextTitle{
  .el-input{
    width: 600px;
  }
}
// 分类
.classIfy{
  display: flex;
  align-items: center;
  height: 50px;
}
.imgUpload{
  display: flex;
  align-items: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 158px;
  height: 158px;
  line-height: 158px;
  text-align: center;
}
.avatar {
  width: 158px;
  height: 158px;
  display: block;
    }
</style>