<template>
  <div class="goods">
    <!-- //?不需要添加插槽 -->
    <goods-list-item v-for="item in goods" :goods-item="item" />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.goods {
  display: flex;
  /* nowrap不包裹，所有的东西都会往一行塞的*/
  /* wrap包裹，会根据item的宽度，决定一行显示多少个 */
  flex-wrap: wrap;
  /* 中间空白部分均等分 */
  justify-content: space-around;
  /* 设置中间的缝隙比左右两边要大的设置 */
  padding: 2px;
}
/* 在flex中一行显示两个 */
</style>