import request from '@/utils/request'
import Qs from 'qs'

/**
 * 
 * @param {短信验证码登录} data 
 * @returns 
 */
export function login(data) {
  return request({
    url: 'api-auth/oauth/platform/login',
    // url: '/api/login',
    method: 'post',
    // data
    data: Qs.stringify(data)
  })
}

/**
 * 获取二维码
 * @returns 
 */
export function getQRCode() {
  return request({
    url: '/art/api/getWxLoginQr',
    method: 'get'
  })
}

/**
 * 
 * @param {轮训查询登录信息} seceneId 
 * @returns 
 */
export function checkLoginInfo(seceneId) {
  return request({
    url: '/art/api/checkWxScan',
    method: 'get',
    params: seceneId
  })
}

/*移除token
 * access_token
 */
export function logout(data) {
  return request({
    url: 'api-auth/oauth/token/logout',
    // url: 'api/logout',
    method: 'post',
    data: Qs.stringify(data)
  })
}


export function getInfo() {
  return request({
    url:'api-user/users/current',
    method: 'get'
  })
}

/* 忘记密码
 * confirmPassword  确认密码
 * mobile 手机号
 * password 密码
 * verifyCode 验证码
 */
export function updatePassword(data) {
  return request({
    url:'api-user/users/forgetPassword',
    method: 'post',
    data: Qs.stringify(data)
  })
}
/* 用户查询列表
 * limit 分页结束位置
 * page  分页起始位置
 * enabled  是否禁用
 * mobile  手机号
 * username  用户username
 */
export function getUsers(query) {
  return request({
    url:'api-user/users/getUsers',
    method: 'get',
    params: query
  })
}
/* 获取单个用户信息
 * id 用户id
 */
export function findSysUserById(query) {
  return request({
    url:'api-user/users/findSysUserById',
    method: 'get',
    params: query
  })
}


/* 新增、修改系统用户
 * enabled 是否启用
 // * id  用户id
 * mobile 手机号
 * sex 	性别
 * username 用户username
 * headImgUrl 头像地址
 * roleId  角色多个用,隔开
 */
export function saveOrUpdateSysUser(data) {
  return request({
    url:'api-user/users/saveOrUpdateSysUser',
    method: 'post',
    data: Qs.stringify(data)
  })
}

/* 修改用户状态
 * enabled 是否启用
 * id  用户id
 */
export function updateEnabled(data) {
  return request({
    url:'api-user/users/updateEnabled',
    method: 'post',
    data: Qs.stringify(data)
  })
}


/* 重置用户密码
 * id  用户id
 */
export function resetPassword(data) {
  return request({
    url:'api-user/users/resetPassword',
    method: 'post',
    data: Qs.stringify(data)
  })
}


/* 批量删除用户
 * ids  用户id
 */
export function deleteSysUser(data) {
  return request({
    url:'api-user/users/deleteSysUser',
    method: 'post',
    data: Qs.stringify(data)
  })
}
