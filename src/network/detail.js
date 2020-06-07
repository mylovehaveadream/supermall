import { request } from "./request";

export function getDetail(id) {
  return request({
    url: '/detail',
    params: {
      id
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

//?es6可以定义class
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.realPrice = itemInfo.lowNowPrice;
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.highNowPrice;
    //?动态获取颜色
    this.discountBgColor = itemInfo.discountBgColor;
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

//?判断对象是否是空的对象
// const obj = {}

//?获取对象所有的key
// Object.keys(obj).length === 0