<template>
  <div>
      <mavon-editor v-model="context" :toolbars="toolbars" />
      <el-button @click="sendBolg">发送</el-button>
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
            }
        };
    },
    methods: {
      //点击发送之后的回调函数
      sendBolg () {
        var htmlContent = this.converter.makeHtml(this.context)
        console.log(htmlContent)
      }
  }
}
</script>

<style>

</style>