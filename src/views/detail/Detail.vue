<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <!-- //?属性topImages 传入值：top-images -->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <good-list :goods="recommends" ref="recommend" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />

    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <!-- <toast :message="message" :show="show" /> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodList from "components/content/goods/GoodsList";
// import Toast from "components/common/toast/Toast";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";

import { mapActions } from "vuex";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodList
    // Toast
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
      // message: "",
      // show: false
    };
  },
  created() {
    //?1.保存传入的iid
    this.iid = this.$route.params.id;

    //?2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      //?1.获取顶部的图片轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      //?2.获取商品的信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //?3.创建店铺信息对象
      this.shop = new Shop(data.shopInfo);

      //?4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //?5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //?6.取出评论信息
      //?可能有些商品是没有评论的
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      /*
      //*第二次获取：值不对；
      //*值不对的原因：图片没有计算在内
      //?等到把组件给渲染完以后，会回调一次这个函数，就保证获取到的是有值的，但图片可能还没有加载完
      this.$nextTick(() => {
        //?根据最新的数据，对应的DOM是已经被渲染出来了
        //?但图片依然是还没有加载完（目前获取到的offsetTop不包含其中的图片的）
        //?offsetTop值不对的时候，都是因为图片的问题
        this.themeTopYs = [];

        this.themeTopYs.push(0);
        //?参数的offsetTop
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        //?评论的offsetTop
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //?推荐的offsetTop
        //?$el就是拿组件中的根组件
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      });
      */
    });

    //?3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });

    //?4.给getThemeTopY赋值(对给this.getThemeTopY赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      //?参数的offsetTop
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //?评论的offsetTop
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //?推荐的offsetTop
      //?$el就是拿组件中的根组件
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //?存入最大值
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);
  },
  mounted() {},
  //?这里不能使用deactivated，它不做keep-alive里面了
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      //?获取他们对应的offsetTop
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    contentScroll(position) {
      //?1.获取y值
      const positionY = -position.y;

      //?2.positionY和主题中的值进行对比
      //?[0,7938,9120,9452]
      //?positionY在0和7938之间，index=0
      //?positionY在7938和9120之间，index=1
      //?positionY在9120和9452之间，index=2
      //?positionY大于等于9452值，index=3

      // for (let i in this.themeTopYs)
      //?注意这样变量i是字符串
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        //?优化做法
        //?[0,7938,9120,9452,Number.MAX_VALUE]
        //? Number.MAX_VALUE,这是number数字里的最大值
        //?positionY在0和7938之间，index=0
        //?positionY在7938和9120之间，index=1
        //?positionY在9120和9452之间，index=2
        //?positionY在9452和非常大的值之间，index=3
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }

        // if (
        //   this.currentIndex !== i && //?判断他们是否一致的
        //   ((i < length - 1 &&
        //     positionY >= this.themeTopYs[i] &&
        //     positionY < this.themeTopYs[i + 1]) ||
        //     (i === length - 1 && positionY >= this.themeTopYs[i]))
        // ) {
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex;
        // }
      }

      //?3.是否显示回到顶部
      //?判断BackTop是否显示
      //?所以这里不能抽到混入中了
      this.isShowBackTop = -position.y > 1;
    },
    ...mapActions(["addToCart"]), //?还可以有对象的方式
    addToCart() {
      //?1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //?2.将商品添加到购物车中
      // this.$store.commit("addCart", product);
      //?dispatch可以返回Promise,在vuex中做了操作想让外界知道完成了操作，就用到Promise
      this.$store.dispatch("addCart", product).then(res => {
        // this.show = true;
        // this.message = res;

        // //?消失
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 1500);

        //?最终的效果
        this.$toast.show(res, 2000);
      });

      //?也可以将actions的方法，映射到methods里面,上面也可以这样写
      // this.addCart(product).then(res => {});
    }
  }
};
</script>

<style scoped>
#detail {
  /* 让tabbar给消失 */
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px - 58px);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>