import request from '@/utils/request.js'

export function getIcons() {
    return request({
        url:'/menu/icons',
        method:'get',
    })
}

export function addMenu(data) {
    return request({
        url: '/menu/add',
        method: 'post',
        data:data
    })
}

export function deleteBatch(data) {
    return request({
        url: '/menu/delete/batch',
        method: 'post',
        data:data
    })
}

export function deleteById(id) {
    return request({
        url:'/menu/delete/'+id,
        method:'delete',
    })
}

export function getAllMenu(params) {
    return request({
        url:'/menu/all',
        method:'get',
        params:params
    })
}