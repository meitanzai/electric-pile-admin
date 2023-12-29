import request from '@/utils/request.js'

export function deleteBatch(data){
    return request({
        url:'/consumption/deleteBatch',
        method:'post',
        data:data
    })
}

export function getAllConsumption(data){
    return request({
        url:'/consumption/page',
        method:'post',
        data:data
    })
}

export function deleteById(id){
    return request({
        url:'/consumption/delete/'+id,
        method:'delete',
    })
}

export function addOrUpdateConsumption(data) {
    return request({
        url:'/consumption/addOrUpdate',
        method:'post',
        data:data
    })
}