/*
 * @Author: 黄叶
 * @Date: 2023-04-19 00:43:01
 * @LastEditTime: 2023-05-30 16:06:28
 * @FilePath: /schoolWall/src/utils/axios.js
 * @Description:
 */
import axios from "axios";
import router from "../router/router";
import config from "../config/config";
import { useDialog } from "naive-ui";

const baseURL = "http://localhost:9200/api"

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
