import request from '@/utils/request.js'

export function deleteBatch(data){
    return request({
        url:'/evaluate/deleteBatch',
        method:'post',
        data:data
    })
}

export function getAllEvaluate(data){
    return request({
        url:'/evaluate/page',
        method:'post',
        data:data
    })
}

export function deleteById(id){
    return request({
        url:'/evaluate/delete/'+id,
        method:'delete',
    })
}

export function addOrUpdateEvaluate(data) {
    return request({
        url:'/evaluate/addOrUpdate',
        method:'post',
        data:data
    })
}