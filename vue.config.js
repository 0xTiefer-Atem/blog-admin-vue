module.exports = {
  // 选项...
  devServer: {
    port: 8080,
    // proxy: {
    //   '/api': { // 匹配所有以 '/api'开头的请求路径
    //     target: 'http://47.107.64.157:9090/api', // 代理目标的基础路径
    //     // secure: false,  // 如果是https接口，需要配置这个参数
    //     ws: true,
    //     changeOrigin: true, // 支持跨域
    //   }
    // }
  }
}