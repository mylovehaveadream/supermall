<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行','新款','精选']"
      @tabClick="tabClicks"
      ref="tabControl1"
      v-show="isTabFixed"
    />
    <!-- //?但设置高度还是由自己来决定的,里面的就可以滚动了 -->
    <!-- //? :probe-type="3":使用的驼峰，所以用-分割；不加v-bind，可以传值，但是统一传的是字符串
        //? 而加了v-bind，就会当成Number类型传过去了，是具体的类型要加
    -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <!-- //?@监听tabClick -->
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClicks" ref="tabControl2" />
      <good-list :goods="showGoods" />
    </scroll>

    <!-- //?组件是不能直接监听的点击，如果想要监听原生组件的点击事件必须加上.native原生修饰符-->
    <!-- //?在我们需要监听一个组件的原生事件（如click等）时，必须给对应的事件加上.native修饰符，才能进行监听-->
    <!-- //?v-show可以直接写true和false -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
//*将他们区分开，更好的管理
//?子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
//?公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";
//?属于一些数据的
import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import { itemListenerMixin } from "common/mixin";

export default {
  components: {
    //?保持与上面的顺序要一致
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  //?这里会与mounted结合的
  mixins: [itemListenerMixin],
  data() {
    return {
      //?这个变量不会被回收
      banners: [],
      recommends: [],
      goods: {
        //?请求第一组的数据，以后通过上拉加载获取更多数据
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  destroyed() {
    console.log("组件被销毁");
  },
  //?钩子函数
  activated() {
    // console.log("activated");
    //?时间写0是迅速来到,但加0我测试有点问题，不加就可以？？
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    //?为了点击回来的时候可以滚动，有时是不能滚动的
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // console.log("deactivated");
    //?1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY();

    //?2.取消全局事件的监听,这需要传入一个函数，不然，所有的地方的关于这个的监听都会被取消掉
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  created() {
    //!created特殊的函数，里面只写主要的逻辑，不写具体的方法实现
    //?created里面有this,指当前组件对象
    //?在组件创建好后，进行网络请求
    //?1.请求多个数据
    //*要写this，才是调下面方法的名字
    this.getHomeMultidata();

    //?2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //*1.图片加载完成的事件监听
    //?加了()就会把返回值传进去了，不加是把函数传进去
    // const refresh = debounce(this.$refs.scroll.refresh, 50);
    //?监听item中图片加载完成
    //?放在created里面可能没有值
    //?对监听的事件进行保存
    // this.itemImgListener = () => {
    //   // this.$refs.scroll.refresh();
    //   refresh();
    // };
    // this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClicks(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      //?这里保持点击哪一个活跃，都是相同的
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      // ?拿到scroll这个组件对象,然后拿到它里面的属性或方法
      //? this.$refs.scroll.scroll.scrollTo(0, 0, 500); //?回到顶部的方法,参数是（x,y,毫秒）5
      //?500毫秒内回到顶部
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      //?1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 100;
      //?2.决定tabControl实现吸顶（position:fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);

      //?重新计算可以滚动的区域，重新计算可滚动的高度就是终的高度
      // this.$refs.scroll.scroll.refresh();
    },
    swiperImageLoad() {
      //*获取tabControl的offsetTop,组件是没有offsetTop，拿他的元素是有offsetTop
      //?所有的组件都有一个属性$el:用于获取组件中的元素的
      //?需要等图片加载完成后，拿的offsetTop才是准确的
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求相关方法
     */
    //!方法里面定义具体的事情
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        //?只把banners数据保存起来
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        console.log(res);
        //?保存数据
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //?默认scroll只能加载一次，所以要调用finishPullUp
        //?完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
/* //* 加上他scoped（作用域），就意味着到时候这里写的所有样式，只会针对当前组件起效果的 */
#home {
  /* padding-top: 44px; */
  /* //?vh:视口高度；解决整体内容将home撑高了，不希望整体撑高，给一个home确定的高度*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 ，所以使用bscroll就没有用了*/
  /*固定导航 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

/* .tab-control { */
/* //?没有达到某个值（top）时，默认是sticky，达到了值，内部会自动改为fixed*/
/* //?使用了better-scroll后，系统没法检查它滚动到哪里了，所以这个已经没有效果了 ，不会停留了*/
/* position: sticky; 这个已经不起作用了 */
/* top: 44px;
  z-index: 9; */
/* } */

.tab-control {
  position: relative;
  /* //?只对定位的元素起效果 */
  z-index: 9;
}

/* //*两种办法解决确定中间部分高度 */
/* //?1.使用定位 */
.content {
  overflow: hidden;
  /* //?脱离标准流 */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* //?2.动态计算 calc */
/* //*也就是Home组件的content有效，在Scroll或其他地方是不起效果的 */
/* .content {
  /* //?整体高度减去上面和下面固定部分 
  height: calc(100% - 93px); 2.动态计算
  overflow: hidden;
  margin-top: 44px;
} */
</style>