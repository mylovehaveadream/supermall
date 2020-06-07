<template>
  <!-- //?Better-Scroll演示的代码放在这里面 -->
  <div class="wrapper">
    <div>
      <!-- //?1.无论是否设置click:false,button都可以点击 -->
      <button @click="btnClick">按钮</button>
      <!-- //?2.必须设置click:true,那么div才能监听点击 -->
      <div @click="divClick">hehe</div>

      <ul class="content">
        <button @click="btnClick">按钮</button>
        <li>分类变量1</li>
        <li>分类变量2</li>
        <li>分类变量3</li>
        <li>分类变量4</li>
        <li>分类变量5</li>
        <li>分类变量6</li>
        <li>分类变量7</li>
        <li>分类变量8</li>
        <li>分类变量9</li>
        <li>分类变量10</li>
        <li>分类变量11</li>
        <li>分类变量12</li>
        <li>分类变量13</li>
        <li>分类变量14</li>
        <li>分类变量15</li>
        <li>分类变量16</li>
        <li>分类变量17</li>
        <li>分类变量18</li>
        <li>分类变量19</li>
        <li>分类变量20</li>
        <li>分类变量21</li>
        <li>分类变量22</li>
        <li>分类变量23</li>
        <li>分类变量24</li>
        <li>分类变量25</li>
        <li>分类变量26</li>
        <li>分类变量27</li>
        <li>分类变量28</li>
        <li>分类变量29</li>
        <li>分类变量30</li>
        <li>分类变量31</li>
        <li>分类变量32</li>
        <li>分类变量33</li>
        <li>分类变量34</li>
        <li>分类变量35</li>
        <li>分类变量36</li>
        <li>分类变量37</li>
        <li>分类变量38</li>
        <li>分类变量39</li>
        <li>分类变量40</li>
        <li>分类变量41</li>
        <li>分类变量42</li>
        <li>分类变量43</li>
        <li>分类变量44</li>
        <li>分类变量45</li>
        <li>分类变量46</li>
        <li>分类变量47</li>
        <li>分类变量48</li>
        <li>分类变量49</li>
        <li>分类变量50</li>
        <li>分类变量51</li>
        <li>分类变量52</li>
        <li>分类变量53</li>
        <li>分类变量54</li>
        <li>分类变量55</li>
        <li>分类变量56</li>
        <li>分类变量57</li>
        <li>分类变量58</li>
        <li>分类变量59</li>
        <li>分类变量60</li>
        <li>分类变量61</li>
        <li>分类变量62</li>
        <li>分类变量63</li>
        <li>分类变量64</li>
        <li>分类变量65</li>
        <li>分类变量66</li>
        <li>分类变量67</li>
        <li>分类变量68</li>
        <li>分类变量69</li>
        <li>分类变量70</li>
        <li>分类变量71</li>
        <li>分类变量72</li>
        <li>分类变量73</li>
        <li>分类变量74</li>
        <li>分类变量75</li>
        <li>分类变量76</li>
        <li>分类变量77</li>
        <li>分类变量78</li>
        <li>分类变量79</li>
        <li>分类变量80</li>
        <li>分类变量81</li>
        <li>分类变量82</li>
        <li>分类变量83</li>
        <li>分类变量84</li>
        <li>分类变量85</li>
        <li>分类变量86</li>
        <li>分类变量87</li>
        <li>分类变量88</li>
        <li>分类变量89</li>
        <li>分类变量90</li>
        <li>分类变量91</li>
        <li>分类变量92</li>
        <li>分类变量93</li>
        <li>分类变量94</li>
        <li>分类变量95</li>
        <li>分类变量96</li>
        <li>分类变量97</li>
        <li>分类变量98</li>
        <li>分类变量99</li>
        <li>分类变量100</li>
      </ul>
    </div>
  </div>
</template>

<script>
//?使用Better-Scroll，效果是：它底部和上面都有弹簧的效果的，还有顺滑的滚动等
import BScroll from "better-scroll";

export default {
  data() {
    return {
      scroll: null
    };
  },
  //?created组件创建完后调用，组件没有挂载模板template
  //?所以拿.wrapper是拿不到的
  //?所以不能这样做
  created() {
    // //?可以通过类来查找标签
    // this.scroll = new BScroll(".wrapper", {});
  },
  //?模板template挂载完后调用，所以是放在这里用的
  mounted() {
    // ?可以通过类来查找标签
    this.scroll = new BScroll(".wrapper", {
      probeType: 3,
      pullUpLoad: true,
      click: true
    });

    //?监听滚动事件
    this.scroll.on("scroll", position => {
      console.log(position);
    });

    this.scroll.on("pullingUp", () => {
      console.log("上拉加载更多");
    });
  },
  methods: {
    //?可能在新的版本中，可以执行原生的click事件了
    btnClick() {
      console.log("btnClick");
    }
  }
};
</script>

<style scoped>
.wrapper {
  height: 150px;
  background-color: red;
  overflow: hidden;
  /*//? 在y轴上可以滚动 ，当设置成scroll,超出部分会自动的隐藏，相当于包含了hidden*/
  /* //?使用原生的方式实现了局部滚动 ，这样的实现在移动端是非常的卡的*/
  /* overflow-y: scroll; */
  /*  */
}
</style>