module.exports = {
  configureWebpack: {
    resolve: {
      // 文件后缀
      extensions: [],
      // 目录别名
      alias: {
        // '@': 'src', 默认配置
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'views': '@/views',
        'network': '@/network'
      }
    }
  }
}