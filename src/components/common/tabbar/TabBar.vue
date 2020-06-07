<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;

  /*至于底部 */
  position: fixed;
  /* 设置left和right是为了使其占据整个屏幕的宽度 */
  left: 0;
  right: 0;
  bottom: 0;

  /*产生阴影效果,x方向不需要平移，y向上平移,1px阴影面积 */
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
}
</style>