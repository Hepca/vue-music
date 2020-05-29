import axios from 'axios'
import { Toast } from 'vant'
import router from '../router'

const service = axios.create({
    timeout: 10000
})
// post 请求头
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
service.interceptors.request.use(
    config => {
        return config
    }
),error => {
    return Promise.reject(error)
}
/**
 * 跳转登录页面
 * 携带当前页面路由, 以及在登录页面完成登录后返回当前页面 
 */
const toLogin = () => {
    router.replace({
        path: '/Login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}

/**
 * 提示函数
 * 禁止点击蒙层,显示一秒后关闭
 */
const tip = msg => {
    Toast({
        message: msg,
        duration: 1000,
        forbidClick: true
    })
}
/**
 * 请求失败后的错误统一处理
 * @param { Number } status 请求失败的状态码
 */
const errorHandle = (status, other) => {
    // 状态判断
    switch (status) {
        case 401:
            toLogin()
            break
        // case 403:
        //     tip('登录过期,请重新登录')
        //     setTimeout({
        //         toLogin()
        //     }, 1000)
        //     break
        case 404:
            tip('请求的资源不存在')
            break
        default:
            console.log(other)
    }
}

service.interceptors.response.use(
    // 请求成功
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    // 请求失败
    error => {
        const { response } = error
        if (response) {
            //请求已发出，但是不再2xx范围
            errorHandle(response.status, response.data.message)
            return Promise.reject(response)
        } else {
            /**
             * 处理断网的情况
             * eg:请求超时或断网时,更新state的network状态
             */
            if (!window.navigator.onLine) {
                console.log('store里的取的状态')
            } else {
                return Promise.reject(error)
            }
        }
    }
)

export default service