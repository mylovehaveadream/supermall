import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'

import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false

//?Vue实例是可以作为事件总线的
Vue.prototype.$bus = new Vue()

//?安装toast插件,调用vue.use本质上会去调用toast对象的install
Vue.use(toast)

//?解决移动端300ms延迟
FastClick.attach(document.body)

//?使用懒加载的插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


// console.log("aaa");

// setTimeout(() => {
//   console.log("bbb");
// })
//?即使没有延迟的时间，也会放在后面来执行他，加入事件循环的尾部执行
// console.log("ccc");
//?执行的顺序是aaa->ccc->bbb
