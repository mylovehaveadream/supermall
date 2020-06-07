<template>
  <div class="nav-bar">
    <!-- //?使用flex进行布局 -->
    <div class="left">
      <!-- //?slot里面不能写class,所以用div进行一个的包裹 -->
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.nav-bar {
  display: flex;
  /* height: 44px; */
  line-height: 44px; /*//?导航高度；文字也会上下居中的；有内容才可以将整个的div给撑起来,才有效果，否则*/
  text-align: center;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
}

.left,
.right {
  width: 60px;
}

.center {
  flex: 1; /*//?其他有确定的宽度的话，会将剩余的部分进行占据的*/
}
</style>