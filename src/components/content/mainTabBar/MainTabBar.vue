<template>
  <tab-bar>
    <!-- //!如果以子符串形式传进去，不加v-bind;传进的是变量，就要加v-bind-->
    <!-- //?活跃状态下显示什么颜色；动态的决定颜色activeColor="blue" -->
    <tab-bar-item path="/home" activeColor="deepPink">
      <!-- //*这里不像import那样直接写就可以了，DOM或者标签里面的引用路径的属性需要加上"~"才行 -->
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt />
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="deepPink">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt />
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="deepPink">
      <img slot="item-icon" src="~assets/img/tabbar/cart.svg" alt />
      <img slot="item-icon-active" src="~assets/img/tabbar/cart_active.svg" alt />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="deepPink">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt />
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar"; //?可以这样写：@是src的别名
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style>
</style>
