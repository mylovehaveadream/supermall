import axios from 'axios'

//?1.第一种将数据返回出去的处理
// export function request(config, success, failure) {
//   //?1.创建axios的实例
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })

//   //?发送真正的网络请求
//   instance(config).then(res => {
//     success(res)  //?把结果回调出去
//   }).catch(err => {
//     failure(err)
//   })
// }

//?2.第二种将数据返回出去的处理
// export function request(config) {
//   //?1.创建axios的实例
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })

//   //?发送真正的网络请求
//   instance(config.baseConfig).then(res => {
//     config.success(res)  //?把结果回调出去
//   }).catch(err => {
//     config.failure(err)
//   })
// }

//?3.第三种将数据返回出去的处理
// export function request(config) {
//   return new Promise((reslove, reject) => {
//     //?1.创建axios的实例
//     const instance = axios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000
//     })

//     //?发送真正的网络请求
//     instance(config).then(res => {
//       reslove(res)
//     }).catch(err => {
//       reject(err)
//     })
//   })
// }


//?4.第四种将数据返回出去的处理
export function request(config) {
  //?1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  //?2.axios拦截器
  //?2.1请求拦截的作用
  // axios.interceptors  //?拦截全局
  instance.interceptors.request.use(config => { //?请求成功来这
    // console.log(config);  //?拦截是我们的配置
    //*请求拦截一般做的事情：
    //?1.比如说config中的一些信息不符合服务器的要求

    //?2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标（加载图标）；
    //?请求成功了，再去响应拦截哪里将其隐藏起来

    //?3.某些网络请求（比如登录（token令牌）），必须携带一些特殊的信息

    return config;  //?拦截了,还需要把config返回出去，如果不还回去config，请求最后会失败的
  }, err => { //?请求失败来这
    // console.log(err);
  });  //?拦截请求

  //?2.2响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res); //?拿到的是结果
    return res.data;   //?还需要返回结果，不然其他地方拿不到这个结果了
  }, err => {
    // console.log(err);
  }); //?拦截响应

  //?3.发送真正的网络请求
  return instance(config) //?instance返回值是Promise
}


// export function instance2() {}


