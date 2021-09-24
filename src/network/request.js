import axios from 'axios'


export default function request(config) {
  // 创建实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  });
  // 响应拦截器
  instance.interceptors.response.use(response => {
    return response.data;
  }, err => {
    return err;
  });
  // 发送真正的网络请求
  return instance(config);
}