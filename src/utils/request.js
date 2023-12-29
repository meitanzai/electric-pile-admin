import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
    baseURL: "http://localhost:8088", // api的base_url
    timeout: 15000, // 请求超时时间
  })

// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
//请求拦截
service.interceptors.request.use((config) => {
  //请求前操作
  let manager = localStorage.getItem("manager")?JSON.parse(localStorage.getItem("manager")):{};
  config.headers['token'] = manager.token;
  return config;
},(error) => {
  return Promise.reject(error)
})

//响应拦截
service.interceptors.response.use((response) => {
  //操作响应数据
  let {code, message} = response.data
  if(code !== 200) {
    Message({message:message || 'error', type: 'warning'})
  }
  return response
},(error) => {
  return Promise.reject(error)
})

export default service