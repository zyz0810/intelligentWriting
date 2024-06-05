import request from '@/utils/request'
import Qs from 'qs'

// 条件分页查询列表
export function search(data) {
  return request({
    url: `/api-order/validityReplacement/search`,
    method: 'post',
    data: Qs.stringify(data)
  })
} 

// 导出详情
// exportList(params) {
//   return request({
//     url: `/api-order/validityReplacement/export`,
//     method: 'Liu',
//     params:params
//   })
// }

// 导出详情
export function exportList(params) {
  return request
    .post('//api-order/validityReplacement/export', Qs.stringify(params, {
      arrayFormat: "indices",
      allowDots: true
    }), {
      responseType: "blob"
    })
}

// 根据ID查询 
export function findById(data) {
  return request({
    url: `/api-order/validityReplacement/findById`,
    method: 'get',
    params: data
  })
}

// 协商日志
export function logDetail(data) {
  return request({
    url: `/api-order/validityReplacement/logDetail`,
    method: 'post',
    data: Qs.stringify(data)
  })
}  

// 物流信息
export function logistic(data) {
  return request({
    url: `/api-order/validityReplacement/logistic`,
    method: 'post',
    data: Qs.stringify(data)
  })
} 

// 关联换货订单
export function orderDetail(data) {
  return request({
    url: `/api-order/validityReplacement/orderDetail`,
    method: 'post',
    data: Qs.stringify(data)
  })
} 
 
