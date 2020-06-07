import Toast from './Toast';

const obj = {}

//?执行install函数的时候，会把参数vue给传过来
obj.install = function (Vue) {
  //?1.创建组件构造器
  const toastContrustor = Vue.extend(Toast);

  //?2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor();

  //?3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'));

  //?4.toast.$el对应的就是上面创建的div了
  //?需要把模板挂载上去
  document.body.appendChild(toast.$el);

  //? $toast就是Toast.vue组件对象了
  Vue.prototype.$toast = toast;
}

export default obj