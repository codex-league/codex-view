import axios from "axios";
import { Message } from "element-ui";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config;
  },
  error => {
    // do something with request error
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;

    if (res.code !== undefined && res.code !== "0000") {
      Message({
        message: res.msg || res.message || "Error",
        type: "error"
      });
      return Promise.reject(new Error(res.msg || res.message || "Error"));
    }

    return res;
  },
  error => {
    Message({
      message: error.msg || error.message || error,
      type: "error"
    });

    return Promise.reject(error);
  }
);

export default service;
