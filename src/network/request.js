import axios from 'axios'

//方式

export function request(config) {
  //1. 创建axios实例
  const instance = axios.create({
    baseURL: 'http://47.107.64.157:8080/api',
    // timeout: 5000,

    //跨域
    crossDomain:true

  });

  //2. 发送网络请求,instance本身就是一个Promise类型可以直接返回
  return instance(config)
}
