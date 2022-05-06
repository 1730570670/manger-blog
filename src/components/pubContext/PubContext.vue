<template>
  <div class="pubBlog">
      <div class="inputContext">
        <!-- 文章标题区域 -->
        <div class="contextTitle">
          <span>文章标题:</span>
          <el-input prefix-icon="el-icon-s-comment" v-model="blogInfo.blogTitle" placeholder="请输入文章的标题"></el-input>
        </div>
        <!-- 文章分类 -->
        <div class="classIfy">
          <span>选择分类:</span>
            <el-select  v-model="blogInfo.blogType" placeholder="请选择">
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
            action="http://localhost/upload/success"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="file" :src="file" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <!-- markdown编辑器 -->
      <mavon-editor v-model="context" :toolbars="toolbars"
        @imgAdd="imgAdd" @imgDel="imgDel"
       />
      <el-button type="primary" @click="sendBolg" style="width:100%;margin-top:10px;">发送文章</el-button>
  </div>
</template>

<script>
export default {
    name:'PubContext',
    data () {
        return {
            context: ' ',//输入的数据
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
            blogInfo:{
              blogTitle:'',
              // 分类选择
              blogType: '',
              // 图片的地址
              blogImg:''
            },
            // 图片地址
            file: '',
            classItem:[],
            // MarkDown上传图片存的数组
            imgIndex:0
        }
    },
    methods: {
      // 发送请求,请求博客分类的信息
      async classItemRequest(){
        this.$bus.publish('Loading',true)
        var i =await this.$ajaxGet("/blog/type")
        //发生了错误
        if(i.message){
          this.$message.error('分类请求发生了错误'+i.message)
          this.$bus.publish('Loading',false)
          return ;
        }
        //请求的信息赋值给本地
        this.classItem=i.data.data
        setTimeout(() => {
          this.$bus.publish('Loading',false)
        }, 1500);
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
          this.blogInfo.blogImg=res.data.path;
        }).catch(err=>{
          this.$message.error('上传图片出错啦')
        }) 
        return isJPG1 && isJPG2 && isLt2M;
      },
      imgAdd(pos,file){
        console.log(pos,file);
        this.imgIndex=pos
      },
      imgDel(pos,file){
        
      },
      //点击发送之后的回调函数
      sendBolg () {
        // 验证信息
        if(this.blogInfo.blogTitle=='' || this.blogInfo.blogImg=='' || this.blogInfo.blogType==''){
          this.$message.warning('请将信息填写完整');
          return 
        }
        var title=this.blogInfo.blogTitle;
        var type=this.blogInfo.blogType;
        var img=this.blogInfo.blogImg;
        var opID=1;
        var htmlContent = this.converter.makeHtml(this.context)
        // 对后台接口进行请求
        this.$axios({
          method:'post',
          url:'http://localhost:8089/blog/save',
          data:{
            blogTitle:title,
            blogType:type,
            blogImgUrl:img,
            blogContent:htmlContent,
            opID:opID
          }
        }).then(res=>{
          // 请求成功则提示,并清空数据
          if(res.data.code==200){
            this.$message.success('发布成功')
            // 清空数据
            this.blogInfo.blogTitle=this.blogInfo.blogType=this.blogInfo.blogImg=this.context=''
          }
        }).catch(error=>{
          this.$message.error('发布出问题啦'+error)
        })
      },
  },
  mounted() {
    //调用查询分类的方法
    this.classItemRequest();
  },
}
</script>

<style lang="less">
.pubBlog{
  .inputContext{
    padding: 10px 10px;
    width: 100%;
    height: 275px;
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
    // 头像
    .imgUpload{
      display: flex;
      align-items: center;
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
    }
  }
}
</style>