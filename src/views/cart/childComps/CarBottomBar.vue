<template>
  <div class="bottom-menu">
    <check-button class="select-all" :is-checked="isSelectAll" @click.native="checkClick" />
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="calcClick">去计算({{checkLength}})</span>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";

export default {
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return this.cartList
        .filter(item => {
          //?是true才要
          return item.checked;
        })
        .reduce((preValue, item) => {
          //?将过滤后的进行汇总
          return preValue + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      //?数字可以取反，找出不被选中的，如果有不被选中数组是有长度的，在进行一次取反就为false了
      //?1.使用filter
      // return !this.cartList.filter(item => !item.checked).length;

      //?还要考虑是否有数据的,就不选中
      if (this.cartList.length === 0) {
        return false;
      }
      //?第二种，找到一个不选中，就不往下找了,就进行取反，这个性能高
      //?2.使用find
      return !this.cartList.find(item => !item.checked);

      //?3.普通遍历
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        //?全部选中,点击后，全部不选了
        this.cartList.forEach(item => (item.checked = false));
      } else {
        //?部分或全部不选中，点击后，全部选中
        //?反之
        this.cartList.forEach(item => (item.checked = true));
      }

      //?不能进行简化，会有影响的
      // this.cartList.forEach(item => (item.checked = !this.isSelectAll));
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择购买的商品", 2000);
      }
    }
  }
};
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>