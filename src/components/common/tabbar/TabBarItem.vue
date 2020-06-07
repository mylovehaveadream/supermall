<template>
  <!--//?在组件内部监听  -->
  <div class="tab-bar-item" @click="itemClick">
    <!-- //?设置属性时，最好在slot的外面加个div,防止被代替 -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>

    <!-- 接收活跃的图片 -->
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>

    <div :style="activeStyle">
      <!--//? 这里slot会被替换的,所以外面加div后，加的颜色就还在，就不会被代替了 -->
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script scoped>
export default {
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red" //?默认为红色
    }
  },
  data() {
    return {
      //isActive: true
    };
  },
  computed: {
    isActive() {
      //?当前活跃路由的path包不包含this.path
      //? /home -> item1(/home) = true
      //? /home -> item1(/category) = false
      //? /home -> item1(/cart) = false
      //? /home -> item1(/profile) = false
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    }
  }
};
</script>

<style>
.tab-bar-item {
  flex: 1; /* 对多个的flex进行一个均等分 */
  text-align: center;
  height: 49px; /*tabbar的高度一般是49 */
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  /*除去图片下的3像素 */
  vertical-align: middle;
  /*改为2像素 */
  margin-bottom: 2px;
}

/*动态的决定颜色 ，这里没有用了*/
/* .active {
  color: brown;
} */
</style>