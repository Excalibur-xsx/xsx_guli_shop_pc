import axios from "axios";

const instance = axios.create({
    baseURL: "/api",
    headers: {},
});

instance.interceptors.request.use(
    (config) => {
        return config;
    }
);

instance.interceptors.response.use(
    (response) => {
        if (response.data.code === 200) {
            return response.data.data;
        }
        return Promise.reject(response.data.message);
    },
    (error) => {
        const message = error.message || "网络错误";
        return Promise.reject(message);
    }
);

export default instance;