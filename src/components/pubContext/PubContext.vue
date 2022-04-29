<template>
  <div class="pubBlog">
      <div class="inputContext">
        <!-- 文章标题区域 -->
        <div class="contextTitle">
          <span>文章标题:</span>
          <el-input v-model="blogInfo.title" placeholder="请输入文章的标题"></el-input>
        </div>
        <!-- 文章分类 -->
        <div class="classIfy">
          <span>选择分类:</span>
            <el-select v-model="blogInfo.classIfyValue" placeholder="请选择">
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
      <mavon-editor v-model="context" :toolbars="toolbars" />
      <el-button @click="sendBolg">发送文章</el-button>
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
                subfield: true, // 是否需要分栏
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                undo: true, // 上一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                navigation: true // 导航目录
            },
            blogInfo:{
              title:'',
              // 分类选择
              classIfyValue: ''
            },
            // 图片地址
            file: '',
            classItem:[],
            
        }
    },
    methods: {
      async sendGet(){
        var i =await this.$ajaxGet('/blog')
        console.log(i);
      },
      // 发送请求,请求博客分类的信息
      async classItemRequest(){
        var i =await this.$ajaxGet("/blog/type")
        //请求的信息赋值给本地
        this.classItem=i.data.data
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
        }
        //超过大小
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }       
        return isJPG1 && isJPG2 && isLt2M;
      },
      //点击发送之后的回调函数
      sendBolg () {
        var htmlContent = this.converter.makeHtml(this.context)
        console.log(htmlContent)
        // var fd = new FormData()
        // fd.append('file',file)
        
        // this.$axios.post('http://localhost/upload',fd).then(res=>{
        //   console.log(res);
        // }).catch(err=>{
        //   console.log(err);
        // })
      }
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