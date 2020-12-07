import axios from "axios";
import { Message } from "element-ui";
import getUserTempId from "@utils/getUserTempId";
import store from "../store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const userTempId = getUserTempId();

const instance = axios.create({
	baseURL: "/api",
	headers: {},
});

// 设置请求拦截器
instance.interceptors.request.use(
	(config) => {
		NProgress.start();

		const token = store.state.user.token;
		if (token) {
			config.headers.token = token;
		}

		config.headers.userTempId = userTempId;

		return config;
	}
);
// 设置响应拦截器
instance.interceptors.response.use(
	(response) => {
		// 进度条结束
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
		// 进度条结束
		NProgress.done();
		const message = error.message || "网络错误";
		// 提示错误
		Message.error(message);
		return Promise.reject(message);
	}
);

export default instance;
