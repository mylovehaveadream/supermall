export function debounce(func, delay) {
  let timer = null;
  //?这里的timer不会被清除掉，有上一次的引用的存在
  return function (...args) {
    if (timer) {
      //?把之前的timer清除干净
      clearTimeout(timer);
    }
    //?重新计时
    //?setTimeout函数里面的代码永远会放在最后执行的
    timer = setTimeout(() => {
      //?执行函数
      func.apply(this, args);
    }, delay);
  };
}

//?正则表达式是一个字符串的匹配利器
export function formatDate(date, fmt) {
  //?1.获取年份的
  //?yyyy-MM-dd
  if (/(y+)/.test(fmt)) { //?正在匹配
    //?RegExp.$1这个是匹配的yyyy，匹配的结果
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  //?2.
  //?M+ -> 正则表达式中的一个规则
  //? M+ -> 1个或者多个M
  //? M* -> 0个或者多个M
  //? M？ -> 0个或者1个M
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

//?为了实现04:04:04,实现前面的0两位
//?不足两位用0补齐两位
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};
