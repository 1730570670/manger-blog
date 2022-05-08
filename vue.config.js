const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:'./',
  transpileDependencies: true,
  lintOnSave:false,//关闭于法检测
  devServer: {
    host: '0.0.0.0',
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
},

})
