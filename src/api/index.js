import axios from "axios";

// const baseURL = "http://localhost:9200/api"
const baseURL = "http://192.168.31.141:9200/api"

const instance = axios.create({
  baseURL: baseURL,
  timeout: 30000, //最大请求时间
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
);

/**
 * 响应拦截器
 */
instance.interceptors.response.use(

);


// // 暴露所写的内容
export default instance;
