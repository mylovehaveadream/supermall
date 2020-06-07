import { ADD_COUNTER, ADD_TO_CART } from './mutation-type'

export default {
  //?mutations唯一的目的就是修改state中的状态
  //*mutations中每个方法尽可能完成的事情比较单一一点
  //*这样做让vuex比较好的去跟踪
  [ADD_COUNTER](state, playload) {
    playload.count++;
  },
  [ADD_TO_CART](state, playload) {
    //?选中不选中，在模型里面改的
    playload.checked = true;
    state.cartList.push(playload);
  }
}