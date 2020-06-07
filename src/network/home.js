//?这里封装了首页所有的数据的请求
//?好处就是方便的查找，减少耦合，方便管理首页的所有请求
import { request } from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata',
  })
}

//?传过来类型和页码
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}


//?补充：函数调用 -> 压入函数栈（保存函数调用过程中所有的变量）
//?函数调用结束 -> 弹出函数栈（释放函数所有变量,被内存给回收的）
// function f() {
//   const a = 'aaa';
// }
// f()

// let totalNums = []
//?把这些塞进大数组中
// const nums1 = [19, 20, 19];
// const nums2 = [11, 10, 19];

//?把nums1数组里面的东西依次拿出来，放在大的数组里面
//?这种语法也是一个解构，将数组的元素依次的解析出来，然后依次塞进大数组中
// totalNums.push(...nums1);//?这样就一个一个取出来，再一个一个的传进去，如([11, 10, 19]

//totalNums.push([11, 10, 19]); //?这样会整个塞进数组中，是不行的，如[[11, 10, 19],...]