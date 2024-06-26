import axios from 'axios'
import Qs from 'qs'
import { MessageBox, Message, Confirm } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
let requestUrl =''//测试环境

switch (process.env.VUE_APP_MODE) {
 //  break;
  //开发环境
 case 'development':
  requestUrl='http://116.63.110.19:9200/'
  break;
 case 'production':
 requestUrl ='https://omc.kyaoduo.com/'
 break;
 case 'uat':
 requestUrl ='http://uat.omc.kyaoduo.com/'
 break;
 case 'test':
 requestUrl ='http://test.omc.kyaoduo.com/'
 break;
 default:
  requestUrl =''//测试环境
  break;
}
export { requestUrl }
// create an axios instance
const service = axios.create({
  // withCredentials: false, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'
// request interceptor
service.interceptors.request.use(
  config => {
    config.baseURL = requestUrl
    config.headers['client_id'] = 'webApp'
    config.headers['client_secret'] = 'webApp'
    if (store.getters.token) {
      // config.headers['Authorization'] = store.getters.token
      config.headers.Authorization = 'Bearer ' + store.getters.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.

    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || '获取数据失败',
    //     type: 'error',
    //     duration: 5 * 1000
    //   });

    // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;

    // else{
    //   return Promise.reject(error)
    // }
    // return Promise.reject(new Error(res.message || 'Error'))

    // if(res.resp_code){
    if (res.resp_code === 0 || !res.resp_code) {
      return res
    }
    if (res.resp_code === 401) {
      // to re-login
      // MessageBox.confirm('您已注销，您可以取消以停留在此页，或重新登录', '确认注销', {
      //   confirmButtonText: '重新登录',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
      // })
    } else if (res.resp_code == 1 && res.resp_msg == 'Bad credentials') {
      Message({
        message: '登录密码错误',
        type: 'error',
        duration: 5 * 1000
      })
    } else if (res.resp_code === 3) {
      Message({
        message: '您没此权限',
        type: 'error',
        duration: 5 * 1000
      })
    } else if (res.resp_code === 4) {
      Message({
        message: '该数据不存在',
        type: 'error',
        duration: 5 * 1000
      })
    } else if (res.resp_code === 5) {
      Message({
        message: '该数据已存在',
        type: 'error',
        duration: 5 * 1000
      })
    } else if (res.resp_code === 6) {
      // MessageBox.confirm('该数据有关联数据，不能删除', '提示', {
      //   confirmButtonText: '确定',
      //   showCancelButton:false,
      //   type: 'warning'
      // });
      Message({
        message: '该数据有关联数据，不能删除',
        type: 'error',
        duration: 5 * 1000
      })
      return res
    } else {
      console.log('错误')
      Message({
        message: res.resp_msg || '获取数据失败',
        type: 'error',
        duration: 5 * 1000
      })
    }
    // }else{
    //   Message({
    //     message:'444',
    //     type: 'error',
    //     duration: 5 * 1000
    //   });
    //
    // }
  },
  error => {
    Message({
      message:error.response.data.resp_msg || error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
