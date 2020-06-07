import { debounce } from "common/utils";

export const itemListenerMixin = {
  components: {
  },
  methods: {
  },
  //?data也可以混入
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    //*1.图片加载完成的事件监听
    //?加了()就会把返回值传进去了，不加是把函数传进去
    const refresh = debounce(this.$refs.scroll.refresh, 50);

    //?监听item中图片加载完成
    //?放在created里面可能没有值
    //?对监听的事件进行保存
    this.itemImgListener = () => {
      // this.$refs.scroll.refresh();
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  }
}

import BackTop from "components/content/backTop/BackTop";

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    //?注意在methods里面的函数的内部的东西不会进行合并，而是覆盖；但生命周期函数是可以的
    backClick() {
      // ?拿到scroll这个组件对象,然后拿到它里面的属性或方法
      //? this.$refs.scroll.scroll.scrollTo(0, 0, 500); //?回到顶部的方法,参数是（x,y,毫秒）5
      //?500毫秒内回到顶部
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  }
}