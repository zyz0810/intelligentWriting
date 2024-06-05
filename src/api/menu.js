import request from '@/utils/request'
import Qs from 'qs'
// 查询所有菜单、权限
export function findMenuTree(query) {
  return request({
    url: `api-user/menus/findMenuTree`,
    method: 'get',
    params: query
  })
}
/* 根据角色查询菜单、权限列表
  * roleId
 */
export function findMenuByRole(query) {
  return request({
    url: `api-user/menus/findMenuByRole`,
    method: 'get',
    params: query
  })
}

/* 菜单权限新增
  * name 菜单名称
  * menuType 菜单类型:0目录,1菜单,2按钮
  * parentId 上级菜单id
  * permission 	权限标识
  * sort 显示排序
 */
export function saveMenuPermission(data) {
  return request({
    url: `api-user/menus/saveMenuPermission`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 菜单权限编辑
  * id
  * name 菜单名称
  * menuType 菜单类型:0目录,1菜单,2按钮
  * parentId 上级菜单id
  * permission 	权限标识
  * sort 显示排序
 */
export function updateMenuPermission(data) {
  return request({
    url: `api-user/menus/updateMenuPermission`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 菜单权限删除
  * id
 */
export function deleteMenuPermission(data) {
  return request({
    url: `api-user/menus/deleteMenuPermission`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}



/* 供应商菜单接口 */
// 查询所有菜单、权限
export function findMenuTreeSupplier(query) {
  return request({
    url: `api-user/menus/supplier/findMenuTree`,
    method: 'get',
    params: query
  })
}
// /* 根据角色查询菜单、权限列表
//   * roleId
//  */
// export function findMenuByRole(query) {
//   return request({
//     url: `api-user/menus/supplier/findMenuByRole`,
//     method: 'get',
//     params: query
//   })
// }

/* 供应商菜单权限新增
  * name 菜单名称
  * menuType 菜单类型:0目录,1菜单,2按钮
  * parentId 上级菜单id
  * permission 	权限标识
  * sort 显示排序
 */
export function saveMenuPermissionSupplier(data) {
  return request({
    url: `api-user/menus/supplier/saveMenuPermission`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 供应商菜单权限编辑
  * id
  * name 菜单名称
  * menuType 菜单类型:0目录,1菜单,2按钮
  * parentId 上级菜单id
  * permission 	权限标识
  * sort 显示排序
 */
export function updateMenuPermissionSupplier(data) {
  return request({
    url: `api-user/menus/supplier/updateMenuPermission`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 供应商菜单权限删除
  * id
 */
export function deleteMenuPermissionSupplier(data) {
  return request({
    url: `api-user/menus/supplier/deleteMenuPermission`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
