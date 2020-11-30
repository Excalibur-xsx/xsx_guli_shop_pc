import axios from "axios";
import { Message } from "element-ui";
// 引入进度条插件
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const instance = axios.create({
  // 就是当前服务器地址
  baseURL: "/api",
  headers: {
  },
});

// 设置请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 开始进度条
    NProgress.start();
    return config;
  }
);
// 设置响应拦截器
instance.interceptors.response.use(
  (response) => {
    NProgress.done();
    if (response.data.code === 200) {
      // 返回成功的响应数据
      return response.data.data;
    }

    const { message } = response.data;
    // 提示错误
    Message.error(message);
    // 功能失败
    return Promise.reject(message);
  },
  // 响应失败
  (error) => {
    NProgress.done();
    const message = error.message || "网络错误";
    // 提示错误
    Message.error(message);
    return Promise.reject(message);
  }
);

export default instance;
