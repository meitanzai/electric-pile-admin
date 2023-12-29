import request from '@/utils/request.js'

export function deleteBatch(data){
    return request({
        url:'/station/deleteBatch',
        method:'post',
        data:data
    })
}

export function getAllStation(data){
    return request({
        url:'/station/page',
        method:'post',
        data:data
    })
}

export function deleteById(id){
    return request({
        url:'/station/delete/'+id,
        method:'delete',
    })
}

export function addStation(data) {
    return request({
        url:'/station/add',
        method:'post',
        data:data
    })
}

export function updateStation(data) {
    return request({
        url:'/station/update',
        method:'post',
        data:data
    })
}