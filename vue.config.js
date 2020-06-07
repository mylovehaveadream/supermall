//?导出配置,这些配置最后和公共的配置进行合并
module.exports = {
  //?配置webpack的config
  configureWebpack: {
    resolve: {  //?解决路径相关的问题
      alias: {  //?别名
        //?@:src已经配置了
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}