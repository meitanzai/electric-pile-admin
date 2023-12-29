import request from '@/utils/request.js'

export function deleteBatch(data){
    return request({
        url:'/warn/deleteBatch',
        method:'post',
        data:data
    })
}

export function getAllWarn(data){
    return request({
        url:'/warn/page',
        method:'post',
        data:data
    })
}

export function deleteById(id){
    return request({
        url:'/warn/delete/'+id,
        method:'delete',
    })
}

export function addWarn(data) {
    return request({
        url:'/warn/add',
        method:'post',
        data:data
    })
}