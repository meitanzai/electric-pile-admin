import request from '@/utils/request.js'

export function deleteBatch(data){
    return request({
        url:'/role/deleteBatch',
        method:'post',
        data:data
    })
}

export function deleteById(id){
    return request({
        url:'/role/delete/'+id,
        method:'delete',
    })
}

export function getAllRole(params){
    return request({
        url:'/role/page',
        method:'get',
        params:params
    })
}

export function getAllMenu() {
    return request({
        url:'/menu/all',
        method:'get',
    })
}

export function getRoleMenu(roleId) {
    return request({
        url:'/role/roleMenu/'+roleId,
        method:'get',
    })
}

export function getRoleMenuIds() {
    return request({
        url:'/menu/ids',
        method:'get',
    })
}
export function addRole(data) {
    return request({
        url:'/role/add',
        method:'post',
        data:data
    })
}

export function saveRoleMenus(roleId,data) {
    return request({
        url:'/role/roleMenu/'+roleId,
        method:'post',
        data:data
    })
}