import axios from "axios";

//请求拦截器
axios.interceptors.request.use(function (config) {
    return config
})
//响应拦截器
axios.interceptors.response.use(function (response) {
    return response
})