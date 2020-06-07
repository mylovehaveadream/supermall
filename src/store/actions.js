import { ADD_COUNTER, ADD_TO_CART } from './mutation-type'

export default {
  addCart(context, playload) {
    return new Promise((resolve, reject) => {
      //?playload新添加的商品
      // let oldProduct = null;
      // for (let item of state.cartList) {
      //   if (item.iid === playload.iid) {
      //     oldProduct = item
      //   }
      // }
      //?find函数，返回item,oldProduct拿到的是item
      //?1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(function (item) {
        return item.iid === playload.iid;
      })
      //?2.判断oldProduct
      //*注意这里现在在做两件的事情，最好不要这样做，很难去跟踪，
      //*出现了这种复杂的代码时，不要搞成mutations,放在actions中
      //*有判断逻辑的放在actions里面
      if (oldProduct) {//?数量加一
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct);
        resolve('当前的商品数量+1')
      } else {  //?添加新的商品
        playload.count = 1;
        // state.cartList.push(playload);
        context.commit(ADD_TO_CART, playload);
        resolve('添加了新的商品')
      }
    })
  }
}