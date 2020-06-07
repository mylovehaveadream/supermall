<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :item-info="item" :key="index" />
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

import { mapGetters } from "vuex";

export default {
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  activated() {
    //?因为缓存了，所以不在creatde和mounted里面使用
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px -49px - 44px);
}

.content {
  height: 100%;
  /* 这样多出的部分隐藏了，鼠标就不能滚动了 */
  overflow: hidden;
}
</style>