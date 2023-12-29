import request from '@/utils/request.js'

export function managerLogin(data) {
    return request({
        url:'/manager/login',
        method:'post',
        data:data
    })
}

export function managerRegister(data) {
    return request({
        url:'/manager/register',
        method:'post',
        data:data
    })
}

export function deleteBatch(data){
    return request({
        url:'/manager/deleteBatch',
        method:'post',
        data:data
    })
}

export function deleteById(id){
    return request({
        url:'/manager/delete/'+id,
        method:'delete',
    })
}

export function getAllManager(params){
    return request({
        url:'/manager/page',
        method:'get',
        params:params
    })
}

export function getNoCheckManager(params){
    return request({
        url:'/manager/waitCheck',
        method:'get',
        params:params
    })
}

export function getAllRole() {
    return request({
        url:'/role/all',
        method:'get',
    })
}

export function getManagerRole(managerId) {
    return request({
        url:'/manager/managerRole/'+managerId,
        method:'get',
    })
}

export function getManagerRoleIds() {
    return request({
        url:'/role/ids',
        method:'get',
    })
}

export function addManager(data) {
    return request({
        url:'/manager/add',
        method:'post',
        data:data
    })
}

export function checkManager(data) {
    return request({
        url:'/manager/checkPass',
        method:'post',
        data:data
    })
}

export function saveManagerMenu(managerId,data) {
    return request({
        url:'/manager/managerRole/'+managerId,
        method:'post',
        data:data
    })
}