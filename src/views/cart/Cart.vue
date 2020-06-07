<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list />

    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CarBottomBar";
import { mapGetters } from "vuex";

export default {
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    //?将getters里面的方法直接转成计算属性，就可以直接用了
    //?这个属性将getters里面的转成了计算属性
    //?两种语法
    //?这样告诉他哪个getters转成计算属性
    //?数组语法
    ...mapGetters(["cartLength"])
    //?可以起别称
    //?对象语法
    // ...mapGetters({
    //   length:"cartLength"
    // })
  }
};
</script>

<style scoped>
.cart {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #ffffff;
  /* font-weight: 600; */
}
</style>