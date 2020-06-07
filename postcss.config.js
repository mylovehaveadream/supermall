module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      //?根据iPhone6;转成vw就可以等比例的缩放了
      viewportWidth: 375, // 视窗的宽度,对应设计稿宽度(retina高清屏 1点2个像素)
      viewportHeight: 667, // 视窗的高度, 根据375设备的宽度来指定，一般是667，也可不配置
      unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数
      viewportUnit: "vw", // 指定需要转换成视窗单位
      //?有ignore的类，不需要进行转化了，可以放在类里面的class上
      selectorBlaskList: ["ignore", "tab-bar", "tab-bar-item"], // 指定不需要转换为视窗单位的类
      mediaQuery: false, // 允许在媒体查询中转换`px`
      minPixelValue: 1, // 小于或等于`1px`时不转换为视窗单位
      exclude: [/TabBar/] //里面必须要写正则，来匹配文件的，这是忽略文件
    }
  }
}

//?1.在js中使用正则：/正则相关规则/
//?2.exclude中存放的元素必须是正则表达式
//?3.按照排除的文件写对应的正则
//?正则规则：
//?1. ^abc:表示匹配的内容，必须以什么内容开头(以abc开头)
//?2. abc$:表示匹配的内容，必须以什么内容结尾(以abc结尾)