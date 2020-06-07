<template>
  <div id="app">
    <!-- //?把Detail排除在外，每次点击详情的时候都是新的数据，要执行created -->
    <!-- //?注意，使用exclude的时候需要在对应的组件加上name属性，name就对应这里的值 -->
    <keep-alive exclude="Detail">
      <!-- //?不要让组件随便销毁 -->
      <router-view />
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabBar/MainTabBar";

export default {
  name: "App",
  components: {
    MainTabBar
  }
};
</script>

<style>
/* //?@是在style里引用的格式；引用base */
@import "./assets/css/base.css";
</style>
