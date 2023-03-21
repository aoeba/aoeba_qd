import axios from "axios";
import { useUserStore } from '../stores/user'
import { MessagePlugin } from "tdesign-vue-next";
import nProgress from "nprogress";

// 后端环境地址，在.env.[***] 中配置的VITE_BASE_URL
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
// 设置请求超时
axios.defaults.timeout = 10000;
// 设置请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.delete['Content-Type'] = 'application/json;charset=UTF-8';

init(axios)
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err)
        })
    });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
/** 
 * put方法，对应put请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function put(url, params) {
    return new Promise((resolve, reject) => {
        axios.put(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
/** 
 * del方法，对应delete请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function del(url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
/**
 * 上传文件
 * @param {String} url [请求的url地址] 
 * @param {FormData} formdata 
 * @param {Object} uploadProgress 
 * @returns 
 */
export function uploadFile(url, formdata, uploadProgress) {
    return new Promise((resolve, reject) => {
        var options = ({
            url: url,
            method: 'post',
            data: formdata,
            onUploadProgress: uploadProgress,
            headers: {
                'Content-Type': 'multipart-formData'
            }
        });
        axios.request(options).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(res.data)
        })
    })
}

/**
 * 对axios进行初始化
 * @param {axios} req axios
 */
function init(req) {
    // 存在token时，在请求头加上token
    req.interceptors.request.use(
        config => {
            const userStore = useUserStore()
            nProgress.inc()
            const token = userStore.userInfo.token
            token && (config.headers.token = token)
            return config
        },
        error => {
            nProgress.done()
            return Promise.error(error)
        }
    )
    // 响应拦截器
    req.interceptors.response.use(
        response => {
            nProgress.done()
            if (response.data.code === 0) {
                return Promise.resolve(response.data)
            } else {
                MessagePlugin.error(response.data.msg)
                return Promise.reject(response.data)
            }
        },
        error => {
            nProgress.done()
            MessagePlugin.error(error.message)
            // 与服务端返回类型保持一致
            const err = {
                code: 99,
                msg: error.message,
                data: null
            }
            return Promise.reject(err)
        }
    )
}