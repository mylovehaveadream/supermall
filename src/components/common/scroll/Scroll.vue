<template>
  <!--//? ref/children :通过父组件获取子组件 -->
  <!-- //?div上也是可以绑定ref ,this.$refs拿到div元素了-->
  <!-- //?ref如果是绑定在组件中的，那么通过this.$refs.refname获取到的是一个组件对象 -->
  <!-- //?ref如果是绑定在普通的元素中的，那么通过this.$refs.refname获取到的是一个元素对象 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    //*1.创建better-scroll对象
    //?通过document.querySelector(".wrapper")来拿，可能拿到的并不是本组件中的class很多地方都有，拿的不够准确
    //?ref可以明确的拿到是本组件中的元素
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, //?必须设置为true,因为tab-control,里面封装的是div需要被点击
      probeType: this.probeType, //?这样做减少影响性能的，因为不是每个组件都需要实时监听的
      pullUpLoad: this.pullUpLoad
    });

    //*2.监听滚动的位置
    //*加了if会更加的严谨
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        this.$emit("scroll", position);
      });
    }

    //*3.监听上拉事件
    //*监听scroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp"); //?把它给传出去
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      //? this.scroll && 加这个做判断，防止没有值的时候会报异常
      this.scroll && this.scroll.scrollTo(x, y, time); //?回到顶部的方法
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      //?防止图片加载过快，而导致BScroll对象没有创建出来，报异常
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  }
};
</script>

<style>
</style>