<template>
  <div class="goods" @click="itemClick">
    <!-- //?@load这是在vue中通过load监听图片加载完成了 -->
    <img v-lazy="showImage" alt @load="imageLoad" />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("itemImageLoad");

      //?可以这来做进行区分
      // if (this.$route.path.indexOf("/home")) {
      //   this.$bus.$emit("homeItemImageLoad");
      // } else if (this.$route.path.indexOf("/detail")) {
      //   this.$bus.$emit("detailItemImageLoad");
      // }
    },
    itemClick() {
      //?详情页有返回的，所有用push
      this.$router.push("/detail/" + this.goodsItem.iid);

      //?也可以使用query
      // this.$router.push({
      //   path: "/detail",
      //   query: {
      //     iid: this.goodsItem.iid
      //   }
      // });
    }
  }
};
</script>

<style scoped>
.goods {
  padding-bottom: 40px;
  /* 相对定位，子绝父相 */
  position: relative;
  /* 设置宽度 */
  /* 设置百分比，可以适配 */
  width: 48%;
}
.goods img {
  width: 100%;
  border-radius: 5px;
}

/* 文字定位到图片下面的40px的位置 */
.goods-info {
  font-size: 12px;
  /* 绝对定位 */
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>